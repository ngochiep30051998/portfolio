'use client';

import { useEffect, useState } from 'react';
import { landingAdminService } from '@/services/api/landing-admin.service';
import type { LandingConfig } from '@/lib/config/landing';
import { defaultLandingConfig } from '@/lib/config/landing';
import toast from 'react-hot-toast';

export default function LandingConfigPage() {
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

  const handleReset = async () => {
    if (window.confirm('Are you sure you want to reset to default configuration?')) {
      try {
        await landingAdminService.resetConfig();
        setConfig(defaultLandingConfig);
        toast.success('Configuration reset to default');
      } catch (error) {
        toast.error('Failed to reset configuration');
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Landing Page Configuration</h1>
        <div className="space-x-4">
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Reset to Default
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save Changes
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Intro Section */}
        <section className="border p-4 rounded">
          <h2 className="text-xl font-semibold mb-4">Intro Section</h2>
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
        </section>

        {/* About Section */}
        <section className="border p-4 rounded">
          <h2 className="text-xl font-semibold mb-4">About Section</h2>
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
        </section>

        {/* Projects Section */}
        <section className="border p-4 rounded">
          <h2 className="text-xl font-semibold mb-4">Projects Section</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                value={config.projects.title}
                onChange={(e) => setConfig({ ...config, projects: { ...config.projects, title: e.target.value } })}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Projects</label>
              {config.projects.items.map((project, index) => (
                <div key={index} className="border p-4 mb-4 rounded">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Title</label>
                      <input
                        type="text"
                        value={project.title}
                        onChange={(e) => {
                          const newProjects = [...config.projects.items];
                          newProjects[index] = { ...project, title: e.target.value };
                          setConfig({ ...config, projects: { ...config.projects, items: newProjects } });
                        }}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Description</label>
                      <textarea
                        value={project.description}
                        onChange={(e) => {
                          const newProjects = [...config.projects.items];
                          newProjects[index] = { ...project, description: e.target.value };
                          setConfig({ ...config, projects: { ...config.projects, items: newProjects } });
                        }}
                        className="w-full p-2 border rounded"
                        rows={2}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Project Image</label>
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={project.image.src}
                          onChange={(e) => {
                            const newProjects = [...config.projects.items];
                            newProjects[index] = { ...project, image: { ...project.image, src: e.target.value } };
                            setConfig({ ...config, projects: { ...config.projects, items: newProjects } });
                          }}
                          className="w-full p-2 border rounded"
                          placeholder="Image URL"
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="number"
                            value={project.image.width}
                            onChange={(e) => {
                              const newProjects = [...config.projects.items];
                              newProjects[index] = { ...project, image: { ...project.image, width: parseInt(e.target.value) } };
                              setConfig({ ...config, projects: { ...config.projects, items: newProjects } });
                            }}
                            className="w-full p-2 border rounded"
                            placeholder="Width"
                          />
                          <input
                            type="number"
                            value={project.image.height}
                            onChange={(e) => {
                              const newProjects = [...config.projects.items];
                              newProjects[index] = { ...project, image: { ...project.image, height: parseInt(e.target.value) } };
                              setConfig({ ...config, projects: { ...config.projects, items: newProjects } });
                            }}
                            className="w-full p-2 border rounded"
                            placeholder="Height"
                          />
                        </div>
                        <input
                          type="text"
                          value={project.image.alt}
                          onChange={(e) => {
                            const newProjects = [...config.projects.items];
                            newProjects[index] = { ...project, image: { ...project.image, alt: e.target.value } };
                            setConfig({ ...config, projects: { ...config.projects, items: newProjects } });
                          }}
                          className="w-full p-2 border rounded"
                          placeholder="Alt text"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Link</label>
                      <input
                        type="text"
                        value={project.link}
                        onChange={(e) => {
                          const newProjects = [...config.projects.items];
                          newProjects[index] = { ...project, link: e.target.value };
                          setConfig({ ...config, projects: { ...config.projects, items: newProjects } });
                        }}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Technologies (comma-separated)</label>
                      <input
                        type="text"
                        value={project.technologies.join(', ')}
                        onChange={(e) => {
                          const newProjects = [...config.projects.items];
                          newProjects[index] = { ...project, technologies: e.target.value.split(',').map(t => t.trim()) };
                          setConfig({ ...config, projects: { ...config.projects, items: newProjects } });
                        }}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      const newProjects = config.projects.items.filter((_, i) => i !== index);
                      setConfig({ ...config, projects: { ...config.projects, items: newProjects } });
                    }}
                    className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Remove Project
                  </button>
                </div>
              ))}
              <button
                onClick={() => {
                  setConfig({
                    ...config,
                    projects: {
                      ...config.projects,
                      items: [
                        ...config.projects.items,
                        {
                          title: 'New Project',
                          description: 'Description',
                          image: {
                            src: 'https://placehold.co/800x600',
                            width: 800,
                            height: 600,
                            alt: 'New project screenshot'
                          },
                          link: 'https://example.com',
                          technologies: ['React', 'Next.js']
                        }
                      ]
                    }
                  });
                }}
                className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Add Project
              </button>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="border p-4 rounded">
          <h2 className="text-xl font-semibold mb-4">Skills Section</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                value={config.skills.title}
                onChange={(e) => setConfig({ ...config, skills: { ...config.skills, title: e.target.value } })}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Skills</label>
              {config.skills.items.map((skill, index) => (
                <div key={index} className="border p-4 mb-4 rounded">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Name</label>
                      <input
                        type="text"
                        value={skill.name}
                        onChange={(e) => {
                          const newSkills = [...config.skills.items];
                          newSkills[index] = { ...skill, name: e.target.value };
                          setConfig({ ...config, skills: { ...config.skills, items: newSkills } });
                        }}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Level (0-100)</label>
                      <input
                        type="number"
                        value={skill.level}
                        onChange={(e) => {
                          const newSkills = [...config.skills.items];
                          newSkills[index] = { ...skill, level: parseInt(e.target.value) };
                          setConfig({ ...config, skills: { ...config.skills, items: newSkills } });
                        }}
                        className="w-full p-2 border rounded"
                        min="0"
                        max="100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Category</label>
                      <input
                        type="text"
                        value={skill.category}
                        onChange={(e) => {
                          const newSkills = [...config.skills.items];
                          newSkills[index] = { ...skill, category: e.target.value };
                          setConfig({ ...config, skills: { ...config.skills, items: newSkills } });
                        }}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      const newSkills = config.skills.items.filter((_, i) => i !== index);
                      setConfig({ ...config, skills: { ...config.skills, items: newSkills } });
                    }}
                    className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Remove Skill
                  </button>
                </div>
              ))}
              <button
                onClick={() => {
                  setConfig({
                    ...config,
                    skills: {
                      ...config.skills,
                      items: [
                        ...config.skills.items,
                        {
                          name: 'New Skill',
                          level: 80,
                          category: 'Frontend'
                        }
                      ]
                    }
                  });
                }}
                className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Add Skill
              </button>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="border p-4 rounded">
          <h2 className="text-xl font-semibold mb-4">Experience Section</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                value={config.experience.title}
                onChange={(e) => setConfig({ ...config, experience: { ...config.experience, title: e.target.value } })}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Experience Items</label>
              {config.experience.items.map((item, index) => (
                <div key={index} className="border p-4 mb-4 rounded">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Title</label>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => {
                          const newItems = [...config.experience.items];
                          newItems[index] = { ...item, title: e.target.value };
                          setConfig({ ...config, experience: { ...config.experience, items: newItems } });
                        }}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Company</label>
                      <input
                        type="text"
                        value={item.company}
                        onChange={(e) => {
                          const newItems = [...config.experience.items];
                          newItems[index] = { ...item, company: e.target.value };
                          setConfig({ ...config, experience: { ...config.experience, items: newItems } });
                        }}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Period</label>
                      <input
                        type="text"
                        value={item.period}
                        onChange={(e) => {
                          const newItems = [...config.experience.items];
                          newItems[index] = { ...item, period: e.target.value };
                          setConfig({ ...config, experience: { ...config.experience, items: newItems } });
                        }}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Description</label>
                      <textarea
                        value={item.description}
                        onChange={(e) => {
                          const newItems = [...config.experience.items];
                          newItems[index] = { ...item, description: e.target.value };
                          setConfig({ ...config, experience: { ...config.experience, items: newItems } });
                        }}
                        className="w-full p-2 border rounded"
                        rows={2}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Technologies (comma-separated)</label>
                      <input
                        type="text"
                        value={item.technologies.join(', ')}
                        onChange={(e) => {
                          const newItems = [...config.experience.items];
                          newItems[index] = { ...item, technologies: e.target.value.split(',').map(t => t.trim()) };
                          setConfig({ ...config, experience: { ...config.experience, items: newItems } });
                        }}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      const newItems = config.experience.items.filter((_, i) => i !== index);
                      setConfig({ ...config, experience: { ...config.experience, items: newItems } });
                    }}
                    className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Remove Experience
                  </button>
                </div>
              ))}
              <button
                onClick={() => {
                  setConfig({
                    ...config,
                    experience: {
                      ...config.experience,
                      items: [
                        ...config.experience.items,
                        {
                          title: 'New Position',
                          company: 'Company Name',
                          period: '2020 - Present',
                          description: 'Description',
                          technologies: ['React', 'Node.js']
                        }
                      ]
                    }
                  });
                }}
                className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Add Experience
              </button>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="border p-4 rounded">
          <h2 className="text-xl font-semibold mb-4">Contact Section</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
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
              <div className="space-y-2">
                <div>
                  <label className="block text-sm font-medium mb-1">GitHub</label>
                  <input
                    type="text"
                    value={config.contact.social.github || ''}
                    onChange={(e) => setConfig({
                      ...config,
                      contact: {
                        ...config.contact,
                        social: { ...config.contact.social, github: e.target.value }
                      }
                    })}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">LinkedIn</label>
                  <input
                    type="text"
                    value={config.contact.social.linkedin || ''}
                    onChange={(e) => setConfig({
                      ...config,
                      contact: {
                        ...config.contact,
                        social: { ...config.contact.social, linkedin: e.target.value }
                      }
                    })}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Twitter</label>
                  <input
                    type="text"
                    value={config.contact.social.twitter || ''}
                    onChange={(e) => setConfig({
                      ...config,
                      contact: {
                        ...config.contact,
                        social: { ...config.contact.social, twitter: e.target.value }
                      }
                    })}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 