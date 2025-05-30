'use client';
import { useEffect, useState } from 'react';
import { landingAdminService } from '@/services/api/landing-admin.service';
import type { LandingConfig } from '@/lib/config/landing';
import { defaultLandingConfig } from '@/lib/config/landing';
import toast from 'react-hot-toast';

export default function IntroConfigPage() {
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
        <h1 className="text-2xl font-bold">Intro Section Configuration</h1>
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

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            value={config.intro.name}
            onChange={(e) => setConfig({ ...config, intro: { ...config.intro, name: e.target.value } })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            value={config.intro.title}
            onChange={(e) => setConfig({ ...config, intro: { ...config.intro, title: e.target.value } })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={config.intro.description}
            onChange={(e) => setConfig({ ...config, intro: { ...config.intro, description: e.target.value } })}
            className="w-full p-2 border rounded"
            rows={3}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Profile Image</label>
          <div className="space-y-2">
            <input
              type="text"
              value={config.intro.image.src}
              onChange={(e) => setConfig({ ...config, intro: { ...config.intro, image: { ...config.intro.image, src: e.target.value } } })}
              className="w-full p-2 border rounded"
              placeholder="Image URL"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                value={config.intro.image.width}
                onChange={(e) => setConfig({ ...config, intro: { ...config.intro, image: { ...config.intro.image, width: parseInt(e.target.value) } } })}
                className="w-full p-2 border rounded"
                placeholder="Width"
              />
              <input
                type="number"
                value={config.intro.image.height}
                onChange={(e) => setConfig({ ...config, intro: { ...config.intro, image: { ...config.intro.image, height: parseInt(e.target.value) } } })}
                className="w-full p-2 border rounded"
                placeholder="Height"
              />
            </div>
            <input
              type="text"
              value={config.intro.image.alt}
              onChange={(e) => setConfig({ ...config, intro: { ...config.intro, image: { ...config.intro.image, alt: e.target.value } } })}
              className="w-full p-2 border rounded"
              placeholder="Alt text"
            />
          </div>
        </div>
      </div>
    </div>
  );
}