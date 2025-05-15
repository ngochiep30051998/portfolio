'use client';

import { useEffect, useState } from 'react';
import { landingAdminService } from '@/services/api/landing-admin.service';
import type { LandingConfig } from '@/lib/config/landing';
import { defaultLandingConfig } from '@/lib/config/landing';
import toast from 'react-hot-toast';

export default function ExperienceConfigPage() {
  const [config, setConfig] = useState<LandingConfig>(defaultLandingConfig);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    try {
      const data = await landingAdminService.getConfig();
      setConfig(data);
    } catch (error) {
      toast.error('Failed to load configuration');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await landingAdminService.updateConfig(config);
      toast.success('Configuration saved successfully');
    } catch (error) {
      toast.error('Failed to save configuration');
    } finally {
      setIsSaving(false);
    }
  };

  const addExperience = () => {
    setConfig({
      ...config,
      experience: {
        ...config.experience,
        items: [
          ...config.experience.items,
          {
            title: '',
            company: '',
            period: '',
            description: '',
            technologies: []
          }
        ]
      }
    });
  };

  const removeExperience = (index: number) => {
    setConfig({
      ...config,
      experience: {
        ...config.experience,
        items: config.experience.items.filter((_, i) => i !== index)
      }
    });
  };

  const updateExperience = (index: number, field: string, value: any) => {
    const newExperiences = [...config.experience.items];
    newExperiences[index] = {
      ...newExperiences[index],
      [field]: value
    };
    setConfig({
      ...config,
      experience: {
        ...config.experience,
        items: newExperiences
      }
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Experience Section Configuration</h1>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
              Saving...
            </>
          ) : (
            'Save Changes'
          )}
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Section Title</label>
          <input
            type="text"
            value={config.experience.title}
            onChange={(e) => setConfig({ ...config, experience: { ...config.experience, title: e.target.value } })}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Experience</h2>
            <button
              onClick={addExperience}
              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Add Experience
            </button>
          </div>

          <div className="space-y-6">
            {config.experience.items.map((exp, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-md font-medium">Experience {index + 1}</h3>
                  <button
                    onClick={() => removeExperience(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <input
                      type="text"
                      value={exp.title}
                      onChange={(e) => updateExperience(index, 'title', e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Company</label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => updateExperience(index, 'company', e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Period</label>
                    <input
                      type="text"
                      value={exp.period}
                      onChange={(e) => updateExperience(index, 'period', e.target.value)}
                      className="w-full p-2 border rounded"
                      placeholder="e.g., Jan 2023 - Present"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                      value={exp.description}
                      onChange={(e) => updateExperience(index, 'description', e.target.value)}
                      className="w-full p-2 border rounded"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Technologies (comma-separated)</label>
                    <input
                      type="text"
                      value={exp.technologies.join(', ')}
                      onChange={(e) => updateExperience(index, 'technologies', e.target.value.split(',').map(t => t.trim()))}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}