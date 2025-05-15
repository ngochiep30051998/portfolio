'use client';

import { useEffect, useState } from 'react';
import { landingAdminService } from '@/services/api/landing-admin.service';
import type { LandingConfig } from '@/lib/config/landing';
import { defaultLandingConfig } from '@/lib/config/landing';
import toast from 'react-hot-toast';

export default function ContactConfigPage() {
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Contact Section Configuration</h1>
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
            value={config.contact.title}
            onChange={(e) => setConfig({ ...config, contact: { ...config.contact, title: e.target.value } })}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={config.contact.description}
            onChange={(e) => setConfig({ ...config, contact: { ...config.contact, description: e.target.value } })}
            className="w-full p-2 border rounded"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={config.contact.email}
            onChange={(e) => setConfig({ ...config, contact: { ...config.contact, email: e.target.value } })}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Social Links</label>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">GitHub</label>
              <input
                type="text"
                value={config.contact.social.github}
                onChange={(e) => setConfig({
                  ...config,
                  contact: {
                    ...config.contact,
                    social: { ...config.contact.social, github: e.target.value }
                  }
                })}
                className="w-full p-2 border rounded"
                placeholder="GitHub URL"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">LinkedIn</label>
              <input
                type="text"
                value={config.contact.social.linkedin}
                onChange={(e) => setConfig({
                  ...config,
                  contact: {
                    ...config.contact,
                    social: { ...config.contact.social, linkedin: e.target.value }
                  }
                })}
                className="w-full p-2 border rounded"
                placeholder="LinkedIn URL"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Twitter</label>
              <input
                type="text"
                value={config.contact.social.twitter}
                onChange={(e) => setConfig({
                  ...config,
                  contact: {
                    ...config.contact,
                    social: { ...config.contact.social, twitter: e.target.value }
                  }
                })}
                className="w-full p-2 border rounded"
                placeholder="Twitter URL"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}