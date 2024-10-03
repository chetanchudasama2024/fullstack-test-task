'use client'
import { useCallback, useState } from 'react';
import { menuItem, SubMenu, MenuItem, sidebarMenuItem } from '../app/sidebarMenu'
import forwardArrow from '../../public/icons/icons8-forward-24.png'
import { useDispatch } from 'react-redux';

export default function Home() {
  const [isOpenSidebar, setIsOpenSidebar] = useState(true)
  const [isActive, setIsActive] = useState<'expand' | 'collapse' | null>(null);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [isAllExpanded, setIsAllExpanded] = useState<boolean>(false);
  const [menuInputValue, setMenuInputValue] = useState<{ [key: string]: string }>({});
  const [activeSubMenu, setActiveSubMenu] = useState<{ [key: string]: boolean }>({});
  const [showInputForSubMenu, setShowInputForSubMenu] = useState<string | null>(null);
  
  const expandAllMenu = () => {
    setIsActive('expand');
    setActiveMenu(null);
    setIsAllExpanded(true);

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

  const toggleSubMenu = (parentIndex: number, subIndex: number, depth: number, label: string) => {
    const key = `${parentIndex}-${subIndex}-${depth}-${label}`;
    setActiveSubMenu((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
  const addSubMenuItem = (subMenus: any[], parentIndex: number, subIndex: number, depth: number, label: string) => {
    const key = `${parentIndex}-${subIndex}-${depth}-${label}`;
    setShowInputForSubMenu((prev) => (prev === key ? null : key));
    const newInputValue = menuInputValue[`${parentIndex}-${subIndex}`];

    if (newInputValue) {
      const targetSubMenu = getDeepSubMenu(subMenus, subIndex, depth);
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

  const getDeepSubMenu = (menuData: MenuItem[], subIndex: number, depth: number): SubMenu | null => {
    let currentMenu = menuData[subIndex];
    for (let i = 0; i <= depth; i++) {
      currentMenu = currentMenu;
    }
    return currentMenu;
  };
  const renderSubMenu = useCallback((subMenus: any[], parentIndex: number, depth: number, label: string) => {
    return subMenus.map((subData, subIndex) => {
      const key = `${parentIndex}-${subIndex}-${depth}-${label}`;
      return (
        <div className='flex py-1' key={key}>
          <img className="h-5"
            src={activeSubMenu[key] ? '/icons/button.svg' : forwardArrow.src}
            alt="collapse icon" />
          <div className='flex flex-col'>
            <div className='flex'>
              <a href='#' className='text-gray-600' onClick={() => toggleSubMenu(parentIndex, subIndex, depth, label)}>
                {subData.label}
              </a>
              {activeSubMenu[key] && (
                <img
                  onClick={() => addSubMenuItem(subMenus, parentIndex, subIndex, depth, label)}
                  className='w-6 h-6 ml-2'
                  src="icons/Large - Icon Only.svg"
                  alt="add button"
                />
              )}
            </div>
            {(isAllExpanded || activeSubMenu[key]) && (
              <>
                {showInputForSubMenu === key && (
                  <input
                    className='py-3 px-4 bg-stone-50 rounded-2xl w-full mt-2'
                    onChange={(e) => handleInputValue(e, parentIndex, subIndex)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addSubMenuItem(subMenus, parentIndex, subIndex, depth, label);
                      }
                    }}
                    value={menuInputValue[`${parentIndex}-${subIndex}`] || ''}
                    type="text"
                  />
                )}
                {subData.subMenu && subData.subMenu.length > 0 && (
                  <div className="ml-5">
                    {renderSubMenu(subData.subMenu, parentIndex, depth + 1, subData.label)}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      );
    });
  }, [activeSubMenu, showInputForSubMenu, isAllExpanded, menuInputValue]);


  return (
    <div className="block sm:flex">
      <div className={`w-60 bg-gray-800 h-[100vh]   sm:${isOpenSidebar ? 'block' : 'hidden'} `}>
        <div className=" flex justify-between py-7 px-8">
          <div className="flex">
            <img className="h-5" src="/icons/logo.svg" alt="Logo" />
            <h1 className="font-extrabold text-white relative right-8">IT</h1>
          </div>
          <img onClick={() => setIsOpenSidebar(!isOpenSidebar)}
            className="w-6 h-6 cursor-pointer"
            src="/icons/vector.svg"
            alt="menu-expand" />
        </div>
        <div className='px-6'>
          {sidebarMenuItem.map((data, index) => (
            <div className='bg-slate-700	 rounded px-3 ' key={index}>
              <div
                className={`flex mt-2  py-2 cursor-pointer
                 ${activeMenu === index ? 'text-white font-bold	' : 'text-gray-600'
                  }`}
              >
                <img className=" h-5" src='/icons/folder.svg' alt="Logo" />
                <a href='#' className=''>{data.label}</a>
              </div>
              <>
                {data.subMenu?.map((subData, subIndex) => (
                  <div className='flex py-2' key={subIndex}>
                    <img className="h-5" src='/icons/submenu.svg' alt="Logo" />
                    <a href='#' className='text-gray-600 '>{subData.label}</a>
                  </div>
                ))}
              </>
            </div>
          ))}
        </div>
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
            {menuItem.map((data, index) => (
              <div key={index}>
                <div
                  className={'flex mt-2 cursor-pointer'}
                  onClick={() => toggleMenu(index)}
                >
                  <img className="h-5"
                    src={activeMenu === index ? '/icons/button.svg' : forwardArrow.src}
                    alt="Logo" />
                  <div>
                    <a href='#' className=''>{data.label}</a>
                  </div>
                </div>
                {(isAllExpanded || activeMenu === index) && (
                  <div className='ml-5'>
                    {renderSubMenu(data.subMenu || [], index, 0, data.label)}
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
            <button className="border-2 rounded-3xl py-2 px-5 w-80 block mt-2 bg-blue-600 text-white	">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}
