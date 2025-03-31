'use client';

import { useEffect, useState } from 'react';
import { landingAdminService } from '@/services/api/landing-admin.service';
import type { LandingConfig } from '@/lib/config/landing';
import { defaultLandingConfig } from '@/lib/config/landing';
import toast from 'react-hot-toast';

export default function AboutConfigPage() {
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">About Section Configuration</h1>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Save Changes
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            value={config.about.title}
            onChange={(e) => setConfig({ ...config, about: { ...config.about, title: e.target.value } })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={config.about.description}
            onChange={(e) => setConfig({ ...config, about: { ...config.about, description: e.target.value } })}
            className="w-full p-2 border rounded"
            rows={3}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">About Image</label>
          <div className="space-y-2">
            <input
              type="text"
              value={config.about.image.src}
              onChange={(e) => setConfig({ ...config, about: { ...config.about, image: { ...config.about.image, src: e.target.value } } })}
              className="w-full p-2 border rounded"
              placeholder="Image URL"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                value={config.about.image.width}
                onChange={(e) => setConfig({ ...config, about: { ...config.about, image: { ...config.about.image, width: parseInt(e.target.value) } } })}
                className="w-full p-2 border rounded"
                placeholder="Width"
              />
              <input
                type="number"
                value={config.about.image.height}
                onChange={(e) => setConfig({ ...config, about: { ...config.about, image: { ...config.about.image, height: parseInt(e.target.value) } } })}
                className="w-full p-2 border rounded"
                placeholder="Height"
              />
            </div>
            <input
              type="text"
              value={config.about.image.alt}
              onChange={(e) => setConfig({ ...config, about: { ...config.about, image: { ...config.about.image, alt: e.target.value } } })}
              className="w-full p-2 border rounded"
              placeholder="Alt text"
            />
          </div>
        </div>
      </div>
    </div>
  );
} 