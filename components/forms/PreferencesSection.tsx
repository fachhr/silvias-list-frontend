'use client';

import React, { useState } from 'react';
import { UseFormRegister, FieldErrors, UseFormWatch, UseFormSetValue } from 'react-hook-form';
import { TalentPoolFormData } from '@/lib/validation/talentPoolSchema';
import {
  DURATION_OPTIONS,
  JOB_TYPE_OPTIONS,
  LOCATION_OPTIONS,
  INDUSTRY_PREFERENCE_OPTIONS
} from '@/lib/formOptions';

interface PreferencesSectionProps {
  register: UseFormRegister<TalentPoolFormData>;
  errors: FieldErrors<TalentPoolFormData>;
  watch: UseFormWatch<TalentPoolFormData>;
  setValue: UseFormSetValue<TalentPoolFormData>;
}

export function PreferencesSection({
  register,
  errors,
  watch,
  setValue
}: PreferencesSectionProps) {
  const [showOtherLocation, setShowOtherLocation] = useState(false);

  const workingCapacity = watch('working_capacity_percent') || 50;
  const salaryMin = watch('salary_min') || 0;
  const salaryMax = watch('salary_max') || 15000;
  const salaryConfidential = watch('salary_confidential') || false;
  const selectedLocations = watch('desired_locations') || [];
  const selectedJobTypes = watch('desired_job_types') || [];
  const selectedIndustries = watch('desired_industries') || [];

  const toggleJobType = (type: string) => {
    const current = selectedJobTypes;
    const updated = current.includes(type)
      ? current.filter(t => t !== type)
      : [...current, type];
    setValue('desired_job_types', updated, { shouldValidate: true });
  };

  const toggleLocation = (location: string) => {
    if (location === 'Other') {
      setShowOtherLocation(!showOtherLocation);
      return;
    }

    const current = selectedLocations;
    if (current.includes(location)) {
      setValue('desired_locations', current.filter(l => l !== location), { shouldValidate: true });
    } else if (current.length < 5) {
      setValue('desired_locations', [...current, location], { shouldValidate: true });
    }
  };

  const toggleIndustry = (industry: string) => {
    const current = selectedIndustries;
    if (current.includes(industry)) {
      setValue('desired_industries', current.filter(i => i !== industry), { shouldValidate: true });
    } else if (current.length < 5) {
      setValue('desired_industries', [...current, industry], { shouldValidate: true });
    }
  };

  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-[var(--foreground)] mb-2">Job Preferences</h2>
        <p className="text-[var(--dark-600)]">
          Help us find the perfect match by sharing your preferences and expectations.
        </p>
      </div>

      {/* Working Capacity */}
      <div>
        <label htmlFor="working_capacity_percent" className="label-base">
          Working Capacity <span className="text-red-500">*</span>
        </label>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>10%</span>
            <span className="font-semibold text-lg text-primary">{workingCapacity}%</span>
            <span>100%</span>
          </div>
          <input
            type="range"
            id="working_capacity_percent"
            min="10"
            max="100"
            step="5"
            {...register('working_capacity_percent', { valueAsNumber: true })}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
          />
        </div>
        {errors.working_capacity_percent && (
          <p className="error-message">{errors.working_capacity_percent.message}</p>
        )}
      </div>

      {/* Available From */}
      <div>
        <label htmlFor="available_from_date" className="label-base">
          Available From <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          id="available_from_date"
          {...register('available_from_date')}
          min={new Date().toISOString().split('T')[0]}
          className={`input-base ${errors.available_from_date ? 'input-error' : ''}`}
        />
        {errors.available_from_date && (
          <p className="error-message">{errors.available_from_date.message}</p>
        )}
      </div>

      {/* Desired Duration */}
      <div>
        <label htmlFor="desired_duration_months" className="label-base">
          Desired Contract Duration <span className="text-red-500">*</span>
        </label>
        <select
          id="desired_duration_months"
          {...register('desired_duration_months')}
          className={`input-base ${errors.desired_duration_months ? 'input-error' : ''}`}
        >
          <option value="">Select duration</option>
          {DURATION_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.desired_duration_months && (
          <p className="error-message">{errors.desired_duration_months.message}</p>
        )}
      </div>

      {/* Desired Job Types */}
      <div>
        <label className="label-base">
          Desired Job Types <span className="text-red-500">*</span>
        </label>
        <p className="text-xs text-gray-500 mb-3">Select all that apply (maximum 5)</p>
        <div className="space-y-2">
          {JOB_TYPE_OPTIONS.map((type) => (
            <label
              key={type}
              className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <input
                type="checkbox"
                checked={selectedJobTypes.includes(type)}
                onChange={() => toggleJobType(type)}
                disabled={!selectedJobTypes.includes(type) && selectedJobTypes.length >= 5}
                className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary accent-primary"
              />
              <span className="ml-3 text-sm font-medium text-gray-700">{type}</span>
            </label>
          ))}
        </div>
        {errors.desired_job_types && (
          <p className="error-message">{errors.desired_job_types.message}</p>
        )}
        {selectedJobTypes.length > 0 && (
          <p className="text-xs text-gray-500 mt-2">
            {selectedJobTypes.length} of 5 selected
          </p>
        )}
      </div>

      {/* Desired Locations */}
      <div>
        <label className="label-base">
          Desired Locations <span className="text-red-500">*</span>
        </label>
        <p className="text-xs text-gray-500 mb-3">Select up to 5 Swiss cantons</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-64 overflow-y-auto border rounded-lg p-3">
          {LOCATION_OPTIONS.map((location) => (
            <label
              key={location.value}
              className={`
                flex items-center p-2 rounded cursor-pointer transition-colors
                ${selectedLocations.includes(location.value) ? 'bg-primary/10 border border-primary' : 'hover:bg-gray-50'}
                ${!selectedLocations.includes(location.value) && selectedLocations.length >= 5 ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              <input
                type="checkbox"
                checked={selectedLocations.includes(location.value)}
                onChange={() => toggleLocation(location.value)}
                disabled={!selectedLocations.includes(location.value) && selectedLocations.length >= 5}
                className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary accent-primary"
              />
              <span className="ml-2 text-sm text-gray-700">{location.label}</span>
            </label>
          ))}
        </div>
        {showOtherLocation && (
          <div className="mt-3">
            <input
              type="text"
              {...register('desired_other_location')}
              placeholder="Specify other location"
              className="input-base"
            />
          </div>
        )}
        {errors.desired_locations && (
          <p className="error-message">{errors.desired_locations.message}</p>
        )}
        {selectedLocations.length > 0 && (
          <p className="text-xs text-gray-500 mt-2">
            {selectedLocations.length} of 5 selected: {selectedLocations.join(', ')}
          </p>
        )}
      </div>

      {/* Desired Industries */}
      <div>
        <label className="label-base">
          Desired Industries/Fields <span className="text-red-500">*</span>
        </label>
        <p className="text-xs text-gray-500 mb-3">Select up to 5 industries</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-80 overflow-y-auto border rounded-lg p-3">
          {INDUSTRY_PREFERENCE_OPTIONS.map((industry) => (
            <label
              key={industry.value}
              className={`
                flex items-center p-2 rounded cursor-pointer transition-colors
                ${selectedIndustries.includes(industry.value) ? 'bg-primary/10 border border-primary' : 'hover:bg-gray-50'}
                ${!selectedIndustries.includes(industry.value) && selectedIndustries.length >= 5 ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              <input
                type="checkbox"
                checked={selectedIndustries.includes(industry.value)}
                onChange={() => toggleIndustry(industry.value)}
                disabled={!selectedIndustries.includes(industry.value) && selectedIndustries.length >= 5}
                className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary accent-primary"
              />
              <span className="ml-2 text-sm text-gray-700">{industry.label}</span>
            </label>
          ))}
        </div>
        {errors.desired_industries && (
          <p className="error-message">{errors.desired_industries.message}</p>
        )}
        {selectedIndustries.length > 0 && (
          <p className="text-xs text-gray-500 mt-2">
            {selectedIndustries.length} of 5 selected
          </p>
        )}
      </div>

      {/* Salary Expectation */}
      <div>
        <label className="label-base">
          Salary Expectation (CHF/month)
        </label>

        <div className="space-y-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              {...register('salary_confidential')}
              className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary accent-primary"
            />
            <span className="text-sm text-gray-700">Prefer not to disclose</span>
          </label>

          {!salaryConfidential && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>CHF 0</span>
                <div className="text-center">
                  <span className="font-semibold text-lg text-primary">
                    CHF {salaryMin?.toLocaleString()} - CHF {salaryMax?.toLocaleString()}
                  </span>
                  <p className="text-xs text-gray-500">per month</p>
                </div>
                <span>CHF 15,000+</span>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-gray-600">Minimum</label>
                <input
                  type="range"
                  min="0"
                  max="15000"
                  step="500"
                  {...register('salary_min', { valueAsNumber: true })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-gray-600">Maximum</label>
                <input
                  type="range"
                  min="0"
                  max="15000"
                  step="500"
                  {...register('salary_max', { valueAsNumber: true })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>
            </div>
          )}
        </div>

        {errors.salary_min && (
          <p className="error-message">{errors.salary_min.message}</p>
        )}
        {errors.salary_max && (
          <p className="error-message">{errors.salary_max.message}</p>
        )}
      </div>
    </div>
  );
}
