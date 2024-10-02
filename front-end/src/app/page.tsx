'use client'
import { useState } from 'react';
import { sidebarMenuData, SubMenu, SidebarMenu } from '../app/sidebarMenu'

export default function Home() {
  const [isOpenSidebar, setIsOpenSidebar] = useState(true)
  const [isActive, setIsActive] = useState<'expand' | 'collapse' | null>(null);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [isAllExpanded, setIsAllExpanded] = useState<boolean>(false);
  const [menuInputValue, setMenuInputValue] = useState<{ [key: string]: string }>({});
  const [activeSubMenu, setActiveSubMenu] = useState<{ [key: string]: boolean }>({});
  const [showInputForSubMenu, setShowInputForSubMenu] = useState<string | null>(null);

  const handleSidebar = () => {
    setIsOpenSidebar(!isOpenSidebar)
  }
  const expandAllMenu = () => {
    setIsActive('expand');
    setActiveMenu(null);
    setIsAllExpanded(true);
    sidebarMenuData.forEach((_, index) => {
      setActiveSubMenu((prev) => ({ ...prev, [`${index}`]: true })); 
    });
  }
  const collapsAllMenus = () => {
    setIsActive('collapse');
    setActiveMenu(null);
    setIsAllExpanded(false);
    
  };

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>, menuIndex: number, subIndex: number) => {
    const key = `${menuIndex}-${subIndex}`;
    setMenuInputValue((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const toggleMenu = (menuIndex: any) => {
    setActiveMenu((prev) => (prev === menuIndex ? null : menuIndex));
  };

  const toggleSubMenu = (parentIndex: number, subIndex: number, depth: number) => {
    const key = `${parentIndex}-${subIndex}-${depth}`;
    setActiveSubMenu((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
  const addSubMenuItem = (parentIndex: number, subIndex: number, depth: number) => {
    const key = `${parentIndex}-${subIndex}-${depth}`;
    setShowInputForSubMenu((prev) => (prev === key ? null : key));
    const newInputValue = menuInputValue[`${parentIndex}-${subIndex}`];

    if (newInputValue) {
      const targetSubMenu = getDeepSubMenu(sidebarMenuData, parentIndex, subIndex, depth);
      if (targetSubMenu) {
        const newSubMenuItem = { label: newInputValue, subMenu: [] };

        if (!targetSubMenu.subMenu || targetSubMenu.subMenu.length === 0) {
          targetSubMenu.subMenu = [newSubMenuItem];
        } else {
          targetSubMenu.subMenu.push(newSubMenuItem);
        }
        setMenuInputValue((prev) => ({ ...prev, [`${parentIndex}-${subIndex}`]: '' }));
      }
    }
  };

  const getDeepSubMenu = (menuData: SidebarMenu[], parentIndex: number, subIndex: number, depth: number): SubMenu | null => {
    let currentMenu = menuData[parentIndex];
    for (let i = 0; i <= depth; i++) {
      if (!currentMenu || !currentMenu.subMenu) return null;
      currentMenu = currentMenu.subMenu[subIndex];
    }
    return currentMenu;
  };

  const renderSubMenu = (subMenus: any[], parentIndex: number, depth: number) => {
    return subMenus.map((subData, subIndex) => {
      const key = `${parentIndex}-${subIndex}-${depth}`;
      return (
        <div className='flex py-1 items-center' key={key}>
          <img className="w-20 h-5" src='/icons/button.svg' alt="Logo" />
          <div className='flex flex-col'>
            <div className='flex'>
              <a href='#' className='text-gray-600' onClick={() => toggleSubMenu(parentIndex, subIndex, depth)}>
                {subData.label}
              </a>
              {activeSubMenu[key] && (
                <img
                  onClick={() => addSubMenuItem(parentIndex, subIndex, depth)}
                  className='w-6 h-6 ml-2'
                  src="icons/Large - Icon Only.svg"
                  alt="add button" />
              )}
            </div>
            {activeSubMenu[key] && (
              <>
                {showInputForSubMenu === key && (
                  <input
                    className='py-3 px-4 bg-stone-50 rounded-2xl w-full mt-2'
                    onChange={(e) => handleInputValue(e, parentIndex, subIndex)}
                    value={menuInputValue[`${parentIndex}-${subIndex}`] || ''}
                    type="text"
                  />
                )}
                {subData.subMenu && subData.subMenu.length > 0 && (
                  <div className="ml-5">
                    {renderSubMenu(subData.subMenu, subIndex, depth + 1)}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="block sm:flex">
      <div className={`w-60 bg-gray-800 h-[100vh]   sm:${isOpenSidebar ? 'block' : 'hidden'} `}>
        <div className=" flex justify-between py-7 px-8">
          <div className="flex">
            <img className="w-20 h-5" src="/icons/logo.svg" alt="Logo" />
            <h1 className="font-extrabold text-white relative right-8">IT</h1>
          </div>
          <img onClick={handleSidebar} className="w-6 h-6 cursor-pointer	" src="/icons/vector.svg" alt="menu-expand" />
        </div>
        {sidebarMenuData.map((data, index) => (
          <div key={index}>
            <div
              className={`flex mt-2 cursor-pointer
                 ${activeMenu === index ? 'text-white font-bold	' : 'text-gray-600'
                }`}
              onClick={() => toggleMenu(index)}
            >
              <img className="w-20 h-5" src='/icons/folder.svg' alt="Logo" />
              <a href='#' className=''>{data.label}</a>
            </div>
            {activeMenu === index && (
              <>
                {data.subMenu?.map((subData, subIndex) => (
                  <div className='flex py-1' key={subIndex}>
                    <img className="w-20 h-5" src='/icons/submenu.svg' alt="Logo" />
                    <a href='#' className='text-gray-600'>{subData.label}</a>
                  </div>
                ))}
              </>
            )}
          </div>
        ))}
      </div>
      <div className="w-calc([100%-w-60])">
        <img className="w-6 h-6 block ml-12 mt-5 sm:hidden"
          src="/icons/menu.svg"
          alt="menu-expand-icon" />
        <div className="flex items-center py-4 px-12 ">
          <img className="w-6 h-6" src="/icons/folder.svg" alt="folder icon" />
          <span>/</span>
          <small>Menus</small>
        </div>
        <div className="flex items-center py-4 px-12 gap-1 ">
          <img className="w-15 h-15" src="/icons/icon-title.svg" alt="menu icon" />
          <h4 className="font-extrabold text-2xl ">Menus</h4>
        </div>
        <div className="block ml-12 sm:flex">
          <div>
            <div>
              <small className="block">Menu</small>
              <select className="py-3 px-4 bg-stone-50 rounded-2xl w-80" name="menu-item">
                <option value="system Management">system Management</option>
              </select>
            </div>
            <div className="my-3 flex gap-2">
              <button
                onClick={expandAllMenu}
                className={`border-2 rounded-2xl py-1 px-5 
                  ${isActive === 'expand' ? 'bg-gray-800 text-white' : ""}`}
              >
                Expand All
              </button>

              <button
                onClick={collapsAllMenus}
                className={`border-2 rounded-2xl py-1 px-5
                   ${isActive === 'collapse' ? 'bg-gray-800 text-white' : ""}`}
              >
                Collapse All
              </button>
            </div>
            {sidebarMenuData.map((data, index) => (
              <div key={index}>
                <div
                  className={'flex mt-2 cursor-pointer'}
                  onClick={() => toggleMenu(index)}
                >
                  <img className="w-20 h-5" src='/icons/button.svg' alt="Logo" />
                  <div>
                    <a href='#' className=''>{data.label}</a>
                  </div>
                </div>
                {(isAllExpanded || activeMenu === index) && (
                  <div className='ml-5'>
                    {renderSubMenu(data.subMenu || [], index, 0)}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="relative h-[454px] mt-14 left-0  sm:w-[532px] sm:left-52">
            <label className="block gap-y-2 text-sm	">Menu ID</label>
            <input className="py-3 px-4 bg-stone-50 rounded-2xl w-full" type="text" />
            <label className="block text-sm mt-1">Depth</label>
            <input className="py-3 px-4 bg-stone-50 rounded-2xl w-80" type="text" />
            <label className="block text-sm mt-1">Parent Data</label>
            <input className="py-3 px-4 bg-stone-50 rounded-2xl w-80" type="text" />
            <label className="block text-sm mt-1">Name</label>
            <input className="py-3 px-4 bg-stone-50 rounded-2xl w-80" type="text" />
            <button className="border-2 rounded-3xl py-2 px-5 w-80 block mt-2 bg-blue-700">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}
