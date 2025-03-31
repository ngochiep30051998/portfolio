'use client';

import { useEffect, useState } from 'react';
import { landingAdminService } from '@/services/api/landing-admin.service';
import type { LandingConfig } from '@/lib/config/landing';
import { defaultLandingConfig } from '@/lib/config/landing';
import toast from 'react-hot-toast';

export default function SkillsConfigPage() {
  const [config, setConfig] = useState<LandingConfig>(defaultLandingConfig);
  const [isLoading, setIsLoading] = useState(true);

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
    try {
      await landingAdminService.updateConfig(config);
      toast.success('Configuration saved successfully');
    } catch (error) {
      toast.error('Failed to save configuration');
    }
  };

  const addSkill = () => {
    setConfig({
      ...config,
      skills: {
        ...config.skills,
        items: [
          ...config.skills.items,
          {
            name: '',
            level: 0,
            category: ''
          }
        ]
      }
    });
  };

  const removeSkill = (index: number) => {
    setConfig({
      ...config,
      skills: {
        ...config.skills,
        items: config.skills.items.filter((_, i) => i !== index)
      }
    });
  };

  const updateSkill = (index: number, field: string, value: any) => {
    const newSkills = [...config.skills.items];
    newSkills[index] = {
      ...newSkills[index],
      [field]: value
    };
    setConfig({
      ...config,
      skills: {
        ...config.skills,
        items: newSkills
      }
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Skills Section Configuration</h1>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Save Changes
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Section Title</label>
          <input
            type="text"
            value={config.skills.title}
            onChange={(e) => setConfig({ ...config, skills: { ...config.skills, title: e.target.value } })}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Skills</h2>
            <button
              onClick={addSkill}
              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Add Skill
            </button>
          </div>

          <div className="space-y-6">
            {config.skills.items.map((skill, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-md font-medium">Skill {index + 1}</h3>
                  <button
                    onClick={() => removeSkill(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input
                      type="text"
                      value={skill.name}
                      onChange={(e) => updateSkill(index, 'name', e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <input
                      type="text"
                      value={skill.category}
                      onChange={(e) => updateSkill(index, 'category', e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Level (0-100)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={skill.level}
                      onChange={(e) => updateSkill(index, 'level', parseInt(e.target.value))}
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