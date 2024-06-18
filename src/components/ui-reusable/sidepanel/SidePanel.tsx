import React, { useState } from 'react';
import './SidePanel.css';
import Logo from '../../images/logo.png'; // Add your logo image here
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
      isOpen: false, 
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
      ]
    },
    {
      title: 'Users',
      isOpen: false,
      subOptions: [
        { title: 'Users', icon: UsersIcon },
        { title: 'Teams', icon: SettingsIcon },
        { title: 'Roles', icon: AuthIcon },
        { title: 'Auth Log', icon: NotificationIcon },
        { title: 'Auth Tokens', icon: UsersIcon },
        { title: 'Action History', icon: SettingsIcon },
        { title: 'API Users', icon: AuthIcon },
      ]
    },
    {
      title: 'Customization',
      isOpen: false,
      subOptions: [
        { title: 'Entity Manager', icon: EntityManagerIcon },
        { title: 'Layout Manager', icon: LayoutManagerIcon },
        { title: 'Label Manager', icon: LabelManagerIcon },
        { title: 'Template Manager', icon: TemplateManagerIcon },
        { title: 'Report Filters', icon: ReportFilterIcon },
        { title: 'Report Panels', icon: ReportPortalIcon },
      ]
    },
    // Add other menu items as needed
  ]);

  const toggleMenuItem = (index: number) => {
    const updatedMenuItems = [...menuItems];
    updatedMenuItems[index].isOpen = !updatedMenuItems[index].isOpen;
    setMenuItems(updatedMenuItems);
  };

  return (
    <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-gray-50 text-white">
      <div className="fixed top-0 left-0 w-64 bg-red h-full border-r" style={{ backgroundColor: '#613FAA'}}>
        <div className="flex items-center justify-start h-10 w-52 border-b mx-auto" style={{ backgroundColor: 'white', borderRadius: '4px', marginTop: '1.3rem', paddingLeft: '0.5rem' }}>
          <img src={Logo} alt="Logo" className="h-8" />
        </div>
        <div className="overflow-y-auto overflow-x-hidden flex-grow">
          <ul className="flex flex-col py-4 space-y-1">
            {menuItems.map((item, index) => (
              <li key={index} className={`relative sidebar-item ${item.isOpen ? '' : ''}`}>
                <button
                  onClick={() => toggleMenuItem(index)}
                  className={`flex items-center justify-between h-11 focus:outline-none ${item.isOpen ? 'text-white' : 'text-white'} hover:text-white`}
                >
                  <span className="ml-2 text-sm tracking-wide truncate">{item.title}</span>
                  <img
                    src={ArrowIcon}
                    alt="Arrow"
                    className={`w-4 h-4 ml-auto transform transition-transform ${item.isOpen ? 'rotate-180' : '-rotate-0'}`}
                  />
                </button>
                {item.isOpen && (
                  <ul className="pl-6 mt-1">
                    {item.subOptions.map((option, subIndex) => (
                      <li key={subIndex} className="mb-1">
                        <a href="#" className="flex items-center text-sm hover:bg-gray-800 hover:text-white rounded-lg py-1 px-3">
                          <img src={option.icon} alt="" className="w-4 h-4 mr-2" />
                          <span className="ml-2">{option.title}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
