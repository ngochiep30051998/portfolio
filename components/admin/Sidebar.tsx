'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  HomeIcon, 
  UserIcon, 
  DocumentTextIcon, 
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
  DocumentDuplicateIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';
import { authService } from '@/services/api/auth.service';
import { useState } from 'react';

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: HomeIcon },
  { 
    name: 'Landing Page', 
    href: '/admin/landing',
    icon: DocumentDuplicateIcon,
    subItems: [
      { name: 'Intro Section', href: '/admin/landing/intro' },
      { name: 'About Section', href: '/admin/landing/about' },
      { name: 'Projects Section', href: '/admin/landing/projects' },
      { name: 'Skills Section', href: '/admin/landing/skills' },
      { name: 'Experience Section', href: '/admin/landing/experience' },
      { name: 'Contact Section', href: '/admin/landing/contact' },
    ]
  },
  { name: 'Bài viết', href: '/admin/posts', icon: DocumentTextIcon },
  { name: 'Người dùng', href: '/admin/users', icon: UserIcon },
  { name: 'Cài đặt', href: '/admin/settings', icon: Cog6ToothIcon },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  const handleLogout = async () => {
    try {
      await authService.logout();
      window.location.href = '/admin/login';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const isActive = (href: string) => pathname === href;
  const isSubItemActive = (subItems: any[]) => subItems?.some(item => isActive(item.href));

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      <div className="flex items-center h-16 px-4 border-b border-gray-200">
        <h1 className="text-xl font-semibold text-gray-900">Admin Panel</h1>
      </div>
      
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navigation.map((item) => {
          const hasSubItems = item.subItems && item.subItems.length > 0;
          const isItemActive = isActive(item.href) || (hasSubItems && isSubItemActive(item.subItems));
          
          return (
            <div key={item.name}>
              <button
                onClick={() => hasSubItems && setExpandedMenu(expandedMenu === item.name ? null : item.name)}
                className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-md ${
                  isItemActive
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 ${
                    isItemActive ? 'text-indigo-700' : 'text-gray-400'
                  }`}
                  aria-hidden="true"
                />
                {item.name}
                {hasSubItems && (
                  <svg
                    className={`ml-auto h-5 w-5 transform transition-transform ${
                      expandedMenu === item.name ? 'rotate-180' : ''
                    }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
              
              {hasSubItems && expandedMenu === item.name && (
                <div className="ml-8 mt-1 space-y-1">
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.name}
                      href={subItem.href}
                      className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                        isActive(subItem.href)
                          ? 'bg-indigo-50 text-indigo-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50"
        >
          <ArrowLeftOnRectangleIcon className="mr-3 h-5 w-5 text-gray-400" />
          Đăng xuất
        </button>
      </div>
    </div>
  );
} 