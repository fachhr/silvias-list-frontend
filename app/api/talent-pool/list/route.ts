import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import {
  AnonymizedTalentProfile,
  TalentPoolListResponse,
  SeniorityLevel
} from '@/types/talentPool';
import {
  getSeniorityLevel,
  getSeniorityYearsRange,
  formatTalentId
} from '@/lib/utils/talentPoolHelpers';

/**
 * GET /api/talent-pool/list
 *
 * Fetches anonymized talent pool profiles with filtering, sorting, and pagination
 *
 * Query Parameters:
 * - seniority: all | junior | mid | senior
 * - cantons: comma-separated canton codes (e.g., "ZH,BE,GE")
 * - salary_min: minimum salary
 * - salary_max: maximum salary
 * - sort_by: talent_id | created_at | years_of_experience | salary_max
 * - sort_order: asc | desc
 * - page: page number (default: 1)
 * - limit: results per page (default: 20, max: 100)
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // Parse query parameters
    const seniority = searchParams.get('seniority') as SeniorityLevel | 'all' | null;
    const cantonsParam = searchParams.get('cantons');
    const salaryMin = searchParams.get('salary_min');
    const salaryMax = searchParams.get('salary_max');
    const sortBy = searchParams.get('sort_by') || 'created_at';
    const sortOrder = (searchParams.get('sort_order') || 'desc') as 'asc' | 'desc';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = Math.min(parseInt(searchParams.get('limit') || '20', 10), 100);

    // Calculate offset for pagination
    const offset = (page - 1) * limit;

    // Build Supabase query
    let query = supabaseAdmin
      .from('user_profiles')
      .select('*', { count: 'exact' });

    // Apply seniority filter (convert to years_of_experience range)
    if (seniority && seniority !== 'all') {
      const yearsRange = getSeniorityYearsRange(seniority);
      if (yearsRange) {
        query = query.gte('years_of_experience', yearsRange.min.toString());
        if (yearsRange.max !== null) {
          query = query.lte('years_of_experience', yearsRange.max.toString());
        }
      }
    }

    // Apply cantons filter
    if (cantonsParam) {
      const cantons = cantonsParam.split(',').map(c => c.trim()).filter(Boolean);
      if (cantons.length > 0) {
        // Supabase: array overlaps filter
        query = query.overlaps('desired_locations', cantons);
      }
    }

    // Apply salary filters
    if (salaryMin) {
      const minSalary = parseInt(salaryMin, 10);
      if (!isNaN(minSalary)) {
        // Candidate's max salary should be >= employer's min requirement
        query = query.gte('salary_max', minSalary);
      }
    }

    if (salaryMax) {
      const maxSalary = parseInt(salaryMax, 10);
      if (!isNaN(maxSalary)) {
        // Candidate's min salary should be <= employer's max budget
        query = query.lte('salary_min', maxSalary);
      }
    }

    // Apply sorting
    const sortColumn = sortBy === 'talent_id' ? 'talent_id' :
                       sortBy === 'years_of_experience' ? 'years_of_experience' :
                       sortBy === 'salary_max' ? 'salary_max' :
                       'created_at';

    query = query.order(sortColumn, { ascending: sortOrder === 'asc' });

    // Apply pagination
    query = query.range(offset, offset + limit - 1);

    // Execute query
    const { data, error, count } = await query;

    if (error) {
      console.error('Talent pool query error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch talent pool' },
        { status: 500 }
      );
    }

    // Transform data to anonymized profiles
    const candidates: AnonymizedTalentProfile[] = (data || []).map((profile) => {
      // Parse years_of_experience (could be string or number)
      const years = profile.years_of_experience ?
        (typeof profile.years_of_experience === 'string' ?
          parseFloat(profile.years_of_experience) :
          profile.years_of_experience) :
        null;

      return {
        talent_id: formatTalentId(profile.talent_id || profile.id), // Fallback to profile ID if talent_id not set
        entry_date: profile.created_at,
        years_of_experience: years,
        preferred_cantons: profile.desired_locations || [],
        salary_range: {
          min: profile.salary_min || null,
          max: profile.salary_max || null,
        },
        seniority_level: getSeniorityLevel(years),
      };
    });

    // Calculate pagination metadata
    const total = count || 0;
    const totalPages = Math.ceil(total / limit);

    // Build response
    const response: TalentPoolListResponse = {
      success: true,
      data: {
        candidates,
        pagination: {
          total,
          page,
          limit,
          total_pages: totalPages,
        },
        filters_applied: {
          seniority: seniority && seniority !== 'all' ? seniority as SeniorityLevel : undefined,
          cantons: cantonsParam ? cantonsParam.split(',').map(c => c.trim()) : undefined,
          salary_min: salaryMin ? parseInt(salaryMin, 10) : undefined,
          salary_max: salaryMax ? parseInt(salaryMax, 10) : undefined,
        },
      },
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Talent pool list error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}
