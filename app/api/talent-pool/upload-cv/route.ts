import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

/**
 * POST /api/talent-pool/upload-cv
 *
 * Handles CV file upload to Supabase Storage.
 *
 * Flow:
 * 1. Receive CV file from form
 * 2. Validate file (type, size)
 * 3. Generate unique profile ID
 * 4. Upload to Supabase Storage: talent-pool-cvs/{profileId}/cv.{ext}
 * 5. Return profileId and storage path
 */
export async function POST(req: NextRequest) {
  try {
    // Get file from form data
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, error: 'File size must be less than 5MB' },
        { status: 400 }
      );
    }

    // Validate file type
    const validTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: 'File must be PDF or DOCX' },
        { status: 400 }
      );
    }

    // Generate unique profile ID
    const profileId = uuidv4();

    // Get file extension
    const fileExt = file.name.split('.').pop()?.toLowerCase() || 'pdf';
    const fileName = `${profileId}/cv.${fileExt}`;

    // Initialize Supabase client with service role key for upload
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    // Convert File to ArrayBuffer for upload
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('talent-pool-cvs')
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: false
      });

    if (error) {
      console.error('Supabase upload error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to upload CV to storage' },
        { status: 500 }
      );
    }

    // Return success with profile ID and storage path
    return NextResponse.json({
      success: true,
      profileId,
      cvStoragePath: data.path,
      originalFilename: file.name
    });

  } catch (error) {
    console.error('Upload CV error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Upload failed'
      },
      { status: 500 }
    );
  }
}
