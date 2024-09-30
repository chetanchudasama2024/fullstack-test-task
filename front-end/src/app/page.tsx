'use client'
import { useState } from 'react';
import { sidebarMenuData } from '../app/sidebarMenu'

export default function Home() {
  const [isOpenSidebar, setIsOpenSidebar] = useState(true)
  const [isActive, setIsActive] = useState<'expand' | 'collapse' | null>(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const [isAllExpanded, setIsAllExpanded] = useState(false);

  const handleSidebar = () => {
    setIsOpenSidebar(!isOpenSidebar)
  }
  const toggleMenu = (menuIndex: any) => {
    setActiveMenu((prev) => (prev === menuIndex ? null : menuIndex));
  };

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

  return (
    <div className="block sm:flex">
      <div className={`w-60 bg-gray-800 h-[100vh]  hidden sm:${isOpenSidebar ? 'block' : 'hidden'} `}>
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
              className={`flex mt-2 cursor-pointer ${activeMenu === index ? 'text-white font-bold	' : 'text-gray-600'
                }`}

              onClick={() => toggleMenu(index)}
            >
              <img className="w-20 h-5" src='/icons/folder.svg' alt="Logo" />
              <a href='#' className=''>{data.menuItem}</a>
            </div>
            {activeMenu === index && (
              <>
                {data.subMenu?.map((subData, subIndex) => (
                  <div className='flex py-1' key={subIndex}>
                    <img className="w-20 h-5" src='/icons/submenu.svg' alt="Logo" />
                    <a href='#' className='text-gray-600'>{subData.subMenuItem}</a>
                  </div>
                ))}
              </>
            )}
          </div>
        ))}
      </div>
      <div className="w-calc([100%-w-60])">
        <img className="w-6 h-6 block ml-12 mt-5 sm:hidden" src="/icons/menu.svg" alt="menu-expand" />
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
              <select className="py-3 px-4 bg-stone-50 rounded-2xl w-80" name="menu-item" id="">
                <option value="system Management">system Management</option>
              </select>
            </div>
            <div className="my-3 flex gap-2">
              <button
                onClick={expandAllMenu}
                className={`border-2 rounded-2xl py-1 px-5 ${isActive === 'expand' ? 'bg-gray-800 text-white' : ""
                  }`}
              >
                Expand All
              </button>

              <button
                onClick={collapsAllMenus}
                className={`border-2 rounded-2xl py-1 px-5 ${isActive === 'collapse' ? 'bg-gray-800 text-white' : ""
                  }`}
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
                    <a href='#' className=''>{data.menuItem}</a>
                  </div>
                </div>
                {(isAllExpanded || activeMenu === index) && ( 
                  <div className='ml-5'>
                    {data.subMenu?.map((subData, subIndex) => (
                      <div className='flex py-1 items-center' key={subIndex}>
                        <img className="w-20 h-5" src='/icons/button.svg' alt="Logo" />
                        <a href='#' className='text-gray-600'>{subData.subMenuItem}</a>
                        {subIndex ===subData.subMenuItem.length- 1 && (
                          <img src="icons/Large-Icon only.svg" alt="add button" />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="relative h-[454px] mt-14 left-0  sm:w-[532px] sm:left-52">
            <label className="block gap-y-2 text-sm	">Menu ID</label>
            <input className="py-3 px-4 bg-stone-50 rounded-2xl w-full" type="text" name="" id="" />
            <label className="block text-sm mt-1">Depth</label>
            <input className="py-3 px-4 bg-stone-50 rounded-2xl w-80" type="text" name="" id="" />
            <label className="block text-sm mt-1">Parent Data</label>
            <input className="py-3 px-4 bg-stone-50 rounded-2xl w-80" type="text" name="" id="" />
            <label className="block text-sm mt-1">Name</label>
            <input className="py-3 px-4 bg-stone-50 rounded-2xl w-80" type="text" name="" id="" />
            <button className="border-2 rounded-3xl py-2 px-5 w-80 block mt-2 bg-blue-700">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}
