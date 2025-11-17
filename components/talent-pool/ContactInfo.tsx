'use client';

import React, { useState } from 'react';

export default function ContactInfo() {
  const [copied, setCopied] = useState(false);
  const email = 'silvia@silviaslist.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="rounded-lg p-6 shadow-lg"
      style={{
        backgroundColor: 'var(--surface-2)',
        borderColor: 'var(--accent-gold-border)',
        borderWidth: '1px'
      }}
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div
          className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
          style={{
            backgroundColor: 'var(--accent-gold-alpha)',
            borderColor: 'var(--accent-gold-border)',
            borderWidth: '1px'
          }}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="var(--accent-gold)"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3
            className="text-lg font-semibold mb-2"
            style={{ color: 'var(--text-primary)' }}
          >
            Interested in a candidate?
          </h3>
          <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
            Email us with the <span style={{ color: 'var(--accent-gold)' }}>Talent ID</span> to request an introduction.
          </p>

          {/* Email Display */}
          <div className="flex items-center gap-3 flex-wrap">
            <a
              href={`mailto:${email}`}
              className="font-medium transition-colors"
              style={{ color: 'var(--accent-gold)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-gold-hover)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--accent-gold)'}
            >
              {email}
            </a>

            {/* Copy Button */}
            <button
              onClick={handleCopyEmail}
              className="px-3 py-1 rounded-md text-xs font-medium transition-all"
              style={{
                backgroundColor: copied ? 'var(--success-bg)' : 'var(--accent-gold-alpha)',
                color: copied ? 'var(--success-color)' : 'var(--accent-gold)',
                borderColor: copied ? 'var(--success-color)' : 'var(--accent-gold-border)',
                borderWidth: '1px'
              }}
            >
              {copied ? (
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Copied!
                </span>
              ) : (
                'Copy Email'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
