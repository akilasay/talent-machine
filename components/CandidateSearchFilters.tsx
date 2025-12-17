'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, X } from 'lucide-react';

const educationLevels = [
  { value: 'no', label: 'High School' },
  { value: 'diploma', label: 'Diploma' },
  { value: 'bsc', label: 'Bachelor\'s Degree' },
  { value: 'msc', label: 'Master\'s Degree' },
];

const experienceRanges = [
  { value: '0-1', label: '0-1 years' },
  { value: '1-3', label: '1-3 years' },
  { value: '3-5', label: '3-5 years' },
  { value: '5-10', label: '5-10 years' },
  { value: '10+', label: '10+ years' },
];

const jobTitles = [
  // Accounting & Finance
  { value: 'accountant', label: 'Accountant' },
  { value: 'tax-adviser', label: 'Tax Adviser' },
  { value: 'financial-analyst', label: 'Financial Analyst' },
  { value: 'bookkeeper', label: 'Bookkeeper' },
  { value: 'auditor', label: 'Auditor' },
  { value: 'tax-consultant', label: 'Tax Consultant' },
  { value: 'finance-manager', label: 'Finance Manager' },
  { value: 'cost-accountant', label: 'Cost Accountant' },
  { value: 'payroll-specialist', label: 'Payroll Specialist' },
  { value: 'credit-analyst', label: 'Credit Analyst' },
  
  // Marketing & Sales
  { value: 'marketing-manager', label: 'Marketing Manager' },
  { value: 'digital-marketing-specialist', label: 'Digital Marketing Specialist' },
  { value: 'social-media-manager', label: 'Social Media Manager' },
  { value: 'content-marketer', label: 'Content Marketer' },
  { value: 'marketing-coordinator', label: 'Marketing Coordinator' },
  { value: 'brand-manager', label: 'Brand Manager' },
  { value: 'sales-manager', label: 'Sales Manager' },
  { value: 'sales-representative', label: 'Sales Representative' },
  { value: 'business-development', label: 'Business Development' },
  { value: 'marketing-analyst', label: 'Marketing Analyst' },
  
  // Technology
  { value: 'software-developer', label: 'Software Developer' },
  { value: 'web-developer', label: 'Web Developer' },
  { value: 'frontend-developer', label: 'Frontend Developer' },
  { value: 'backend-developer', label: 'Backend Developer' },
  { value: 'full-stack-developer', label: 'Full Stack Developer' },
  { value: 'data-scientist', label: 'Data Scientist' },
  { value: 'data-analyst', label: 'Data Analyst' },
  { value: 'ui-ux-designer', label: 'UI/UX Designer' },
  { value: 'product-manager', label: 'Product Manager' },
  { value: 'project-manager', label: 'Project Manager' },
  
  // Human Resources
  { value: 'hr-manager', label: 'HR Manager' },
  { value: 'hr-specialist', label: 'HR Specialist' },
  { value: 'recruiter', label: 'Recruiter' },
  { value: 'talent-acquisition', label: 'Talent Acquisition' },
  { value: 'hr-coordinator', label: 'HR Coordinator' },
  
  // Operations & Administration
  { value: 'operations-manager', label: 'Operations Manager' },
  { value: 'administrative-assistant', label: 'Administrative Assistant' },
  { value: 'executive-assistant', label: 'Executive Assistant' },
  { value: 'office-manager', label: 'Office Manager' },
  { value: 'customer-service', label: 'Customer Service' },
  
  // Healthcare
  { value: 'nurse', label: 'Nurse' },
  { value: 'doctor', label: 'Doctor' },
  { value: 'pharmacist', label: 'Pharmacist' },
  { value: 'medical-assistant', label: 'Medical Assistant' },
  { value: 'healthcare-administrator', label: 'Healthcare Administrator' },
  
  // Education
  { value: 'teacher', label: 'Teacher' },
  { value: 'professor', label: 'Professor' },
  { value: 'education-coordinator', label: 'Education Coordinator' },
  { value: 'curriculum-developer', label: 'Curriculum Developer' },
  
  // Other
  { value: 'consultant', label: 'Consultant' },
  { value: 'analyst', label: 'Analyst' },
  { value: 'coordinator', label: 'Coordinator' },
  { value: 'specialist', label: 'Specialist' },
  { value: 'assistant', label: 'Assistant' },
];


export default function CandidateSearchFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [skills, setSkills] = useState(searchParams.get('topic') || '');
  const [jobTitle, setJobTitle] = useState(searchParams.get('job') || 'any');
  const [education, setEducation] = useState(searchParams.get('education') || 'any');
  const [experience, setExperience] = useState(searchParams.get('experience') || 'any');

  const handleSearch = () => {
    const params = new URLSearchParams();
    
    if (skills.trim()) params.set('topic', skills.trim());
    if (jobTitle && jobTitle !== 'any') params.set('job', jobTitle);
    if (education && education !== 'any') params.set('education', education);
    if (experience && experience !== 'any') params.set('experience', experience);
    
    const queryString = params.toString();
    router.push(`/candidates${queryString ? `?${queryString}` : ''}`);
  };

  const handleClear = () => {
    setSkills('');
    setJobTitle('any');
    setEducation('any');
    setExperience('any');
    router.push('/candidates');
  };

  const hasFilters = skills || (jobTitle && jobTitle !== 'any') || (education && education !== 'any') || (experience && experience !== 'any');

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-blue-200 p-6 mb-8">
      <div className="mb-6">
        {/* <h2 className="text-xl font-semibold text-blue-900 mb-2">
          Find Your Perfect Candidate
        </h2> */}
        <p className="text-blue-700 text-sm">
        <i>Use the filters below to find candidates by skills, job title education, and experience</i>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Skills/Topic Filter */}
        <div className="space-y-2">
          <Label htmlFor="skills" className="text-sm font-medium text-blue-900">
            Skills & Expertise
          </Label>
          <Input
            id="skills"
            placeholder="e.g., QuickBooks, Excel, Marketing"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="w-full border-blue-200 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {/* Job Title Filter */}
        <div className="space-y-2">
          <Label htmlFor="jobTitle" className="text-sm font-medium text-blue-900">
            Job Title
          </Label>
          <Select value={jobTitle} onValueChange={setJobTitle}>
            <SelectTrigger className="w-full border-blue-200 focus:border-blue-500 focus:ring-blue-500">
              <SelectValue placeholder="Select job title" />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              <SelectItem value="any">Any Job Title</SelectItem>
              {jobTitles.map((title) => (
                <SelectItem key={title.value} value={title.value}>
                  {title.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Education Filter */}
        <div className="space-y-2">
          <Label htmlFor="education" className="text-sm font-medium text-blue-900">
            Education Level
          </Label>
          <Select value={education} onValueChange={setEducation}>
            <SelectTrigger className="w-full border-blue-200 focus:border-blue-500 focus:ring-blue-500">
              <SelectValue placeholder="Select education" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Education</SelectItem>
              {educationLevels.map((level) => (
                <SelectItem key={level.value} value={level.value}>
                  {level.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Experience Filter */}
        <div className="space-y-2">
          <Label htmlFor="experience" className="text-sm font-medium text-blue-900">
            Experience
          </Label>
          <Select value={experience} onValueChange={setExperience}>
            <SelectTrigger className="w-full border-blue-200 focus:border-blue-500 focus:ring-blue-500">
              <SelectValue placeholder="Select experience" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Experience</SelectItem>
              {experienceRanges.map((range) => (
                <SelectItem key={range.value} value={range.value}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-3 mt-6">
        <Button
          onClick={handleSearch}
          disabled={!hasFilters}
          className="px-8 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <Search className="w-4 h-4" />
          Search Candidates
        </Button>
        
        {hasFilters && (
          <Button
            onClick={handleClear}
            variant="outline"
            className="px-6 py-2 border-blue-300 text-blue-700 hover:bg-blue-50 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Clear Filters
          </Button>
        )}
      </div>

      {/* Active Filters Display */}
      {hasFilters && (
        <div className="mt-4 pt-4 border-t border-blue-200">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-blue-700">Active filters:</span>
            {skills && (
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                Skills: {skills}
              </span>
            )}
            {jobTitle && jobTitle !== 'any' && (
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                Job: {jobTitles.find(t => t.value === jobTitle)?.label}
              </span>
            )}
            {education && education !== 'any' && (
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                Education: {educationLevels.find(e => e.value === education)?.label}
              </span>
            )}
            {experience && experience !== 'any' && (
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                Experience: {experienceRanges.find(e => e.value === experience)?.label}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
