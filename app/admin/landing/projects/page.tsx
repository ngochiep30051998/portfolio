'use client';

import { useEffect, useState } from 'react';
import { landingAdminService } from '@/services/api/landing-admin.service';
import type { LandingConfig } from '@/lib/config/landing';
import { defaultLandingConfig } from '@/lib/config/landing';
import toast from 'react-hot-toast';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function ProjectsConfigPage() {
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

  const addProject = () => {
    setConfig({
      ...config,
      projects: {
        ...config.projects,
        items: [
          ...config.projects.items,
          {
            title: '',
            description: '',
            image: { src: '', width: 0, height: 0, alt: '' },
            technologies: [],
            link: ''
          }
        ]
      }
    });
  };

  const removeProject = (index: number) => {
    setConfig({
      ...config,
      projects: {
        ...config.projects,
        items: config.projects.items.filter((_, i) => i !== index)
      }
    });
  };

  const updateProject = (index: number, field: string, value: any) => {
    const newProjects = [...config.projects.items];
    newProjects[index] = {
      ...newProjects[index],
      [field]: value
    };
    setConfig({
      ...config,
      projects: {
        ...config.projects,
        items: newProjects
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projects Section Configuration</h1>
          <p className="text-gray-600 mt-1">Configure your portfolio projects section</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className={`px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center ${
            isSaving ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSaving ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Saving...
            </>
          ) : (
            'Save Changes'
          )}
        </button>
      </div>

      <div className="space-y-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
          <input
            type="text"
            value={config.projects.title}
            onChange={(e) => setConfig({ ...config, projects: { ...config.projects, title: e.target.value } })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            placeholder="Enter section title"
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-medium text-gray-900">Projects</h2>
              <p className="text-sm text-gray-600 mt-1">Add and manage your portfolio projects</p>
            </div>
            <button
              onClick={addProject}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 flex items-center"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Add Project
            </button>
          </div>

          <div className="space-y-6">
            {config.projects.items.map((project, index) => (
              <div key={index} className="p-6 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors duration-200">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-md font-medium text-gray-900">Project {index + 1}</h3>
                  <button
                    onClick={() => removeProject(index)}
                    className="text-red-500 hover:text-red-700 transition-colors duration-200 flex items-center"
                  >
                    <TrashIcon className="h-5 w-5 mr-1" />
                    Remove
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      value={project.title}
                      onChange={(e) => updateProject(index, 'title', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                      placeholder="Enter project title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      value={project.description}
                      onChange={(e) => updateProject(index, 'description', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                      rows={3}
                      placeholder="Enter project description"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Project Image</label>
                    <div className="space-y-4">
                      <input
                        type="text"
                        value={project.image.src}
                        onChange={(e) => updateProject(index, 'image', { ...project.image, src: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        placeholder="Image URL"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Width</label>
                          <input
                            type="number"
                            value={project.image.width}
                            onChange={(e) => updateProject(index, 'image', { ...project.image, width: parseInt(e.target.value) })}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                            placeholder="Width"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Height</label>
                          <input
                            type="number"
                            value={project.image.height}
                            onChange={(e) => updateProject(index, 'image', { ...project.image, height: parseInt(e.target.value) })}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                            placeholder="Height"
                          />
                        </div>
                      </div>
                      <input
                        type="text"
                        value={project.image.alt}
                        onChange={(e) => updateProject(index, 'image', { ...project.image, alt: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        placeholder="Alt text"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Technologies (comma-separated)</label>
                    <input
                      type="text"
                      value={project.technologies.join(', ')}
                      onChange={(e) => updateProject(index, 'technologies', e.target.value.split(',').map(t => t.trim()))}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                      placeholder="e.g., React, TypeScript, Tailwind CSS"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Project Link</label>
                    <input
                      type="text"
                      value={project.link}
                      onChange={(e) => updateProject(index, 'link', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                      placeholder="https://"
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