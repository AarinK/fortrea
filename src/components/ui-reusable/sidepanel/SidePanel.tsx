import React, { useState, useEffect, useRef } from 'react';
import SmallLogo from '../../images/smallLogo.png';
import Logo from '../../images/logo.png';
import ArrowIcon from '../../images/arrow-icon.png';
import SettingsIcon from '../../images/settings.png';
import UsersIcon from '../../images/userManagement.png';
import AuthIcon from '../../images/auth.png';
import EntityManagerIcon from '../../images/entityManager.png';
import LabelManagerIcon from '../../images/labelManager.png';
import CurrencyIcon from '../../images/currency.png';
import ReportPortalIcon from '../../images/reportPortal.png';
import ReportFilterIcon from '../../images/reportFilters.png';
import LayoutManagerIcon from '../../images/layoutManager.png';
import NotificationIcon from '../../images/notification.png';
import ScheduleIcon from '../../images/schedule.png';
import TemplateManagerIcon from '../../images/templateManager.png';

const Sidebar: React.FC = () => {
  const [menuItems, setMenuItems] = useState([
    {
      title: 'System',
      isOpen: true,
      subOptions: [
        { title: 'Settings', icon: SettingsIcon },
        { title: 'User Interface', icon: UsersIcon },
        { title: 'Authentication', icon: AuthIcon },
        { title: 'Scheduled Jobs', icon: ScheduleIcon },
        { title: 'Currency', icon: CurrencyIcon },
        { title: 'Notifications', icon: NotificationIcon },
        { title: 'Integrations', icon: SettingsIcon },
        { title: 'Extensions', icon: UsersIcon },
        { title: 'System Requirements', icon: AuthIcon },
        { title: 'Job Settings', icon: ScheduleIcon },
        { title: 'Upgrade', icon: CurrencyIcon },
        { title: 'Clear Cache', icon: NotificationIcon },
        { title: 'Rebuild', icon: SettingsIcon },
      ],
    },
    {
      title: 'Users',
      isOpen: true,
      subOptions: [
        { title: 'Users', icon: UsersIcon },
        { title: 'Teams', icon: SettingsIcon },
        { title: 'Roles', icon: AuthIcon },
        { title: 'Auth Log', icon: NotificationIcon },
        { title: 'Auth Tokens', icon: UsersIcon },
        { title: 'Action History', icon: SettingsIcon },
        { title: 'API Users', icon: AuthIcon },
      ],
    },
    {
      title: 'Customization',
      isOpen: true,
      subOptions: [
        { title: 'Entity Manager', icon: EntityManagerIcon },
        { title: 'Layout Manager', icon: LayoutManagerIcon },
        { title: 'Label Manager', icon: LabelManagerIcon },
        { title: 'Template Manager', icon: TemplateManagerIcon },
        { title: 'Report Filters', icon: ReportFilterIcon },
        { title: 'Report Panels', icon: ReportPortalIcon },
      ],
    },
  ]);

  const [isCollapsed, setIsCollapsed] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsCollapsed(true);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleSidebarClick = () => {
    setIsCollapsed(false);
  };

  const toggleMenuItem = (index: number) => {
    const updatedMenuItems = [...menuItems];
    updatedMenuItems[index].isOpen = !updatedMenuItems[index].isOpen;
    setMenuItems(updatedMenuItems);
  };

  return (
    <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-gray-50 text-white">
      <div
        ref={sidebarRef}
        onClick={handleSidebarClick}
        className={`fixed top-0 left-0 h-full border-r sidebar ${isCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded'} bg-sidebar-bg border-gray-200 transition-width duration-400`}
      >
        <div
          className={`flex items-center justify-center h-12 logo-container ${isCollapsed ? 'logo-collapsed' : 'logo-expanded'} bg-white rounded-md mt-5rem px-5 transition-width duration-400 ml-5rem`}
        >
          <img src={isCollapsed ? SmallLogo : Logo} alt="New Logo" className={`h-8`} />
        </div>
        <div className="overflow-y-auto overflow-x-hidden flex-grow">
          <ul className="flex flex-col py-4 space-y-1">
            {menuItems.map((item, index) => (
              <li key={index} className={`relative sidebar-item`}>
                <button
                  onClick={() => toggleMenuItem(index)}
                  className={`flex items-center justify-between h-11 focus:outline-none ${item.isOpen ? 'text-white' : 'text-white'} hover:text-white`}
                >
                  <span className={`ml-2 text-sm tracking-wide truncate ${isCollapsed ? 'block' : 'block'}`}>{item.title}</span>
                  {!isCollapsed && (
                    <img
                      src={ArrowIcon}
                      alt="Arrow"
                      className={`w-4 h-4 ml-auto transform transition-transform duration-400 ${item.isOpen ? 'rotate-0' : 'rotate-90'}`}
                    />
                  )}
                </button>
                <ul className={`pl-6 mt-1 ${item.isOpen ? 'block' : 'hidden'}`}>
                  {item.subOptions.map((option, subIndex) => (
                    <li key={subIndex} className="mb-1">
                      <a href="#" className="flex items-center text-sm hover:bg-sidebar-item-hover hover:text-white rounded-lg py-1 px-3">
                        <img src={option.icon} alt="" className="w-4 h-4 mr-2" />
                        <span className={`ml-2 ${isCollapsed ? 'hidden' : 'block'}`}>{option.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
