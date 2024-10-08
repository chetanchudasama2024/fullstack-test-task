'use client'
import { useCallback, useEffect } from 'react';
import forwardArrow from '../../public/icons/icons8-forward-24.png'
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-hot-toast';

import {
  toggleSidebar,
  setIsActive,
  setActiveMenu,
  setIsAllExpanded,
  setActiveSubMenu,
  setParentData,
  setSubMenuName,
  setDepth,
  setMenuId,
  setData,
  setParentIndex,
  setIsedit,
  setIsLoading
} from './redux/menuSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/store';
import Loader from './loading';

export default function Home() {
  const baseUrl = "https://fullstack-test-task.onrender.com"
  const dispatch = useDispatch();
  const {
    isOpenSidebar,
    isActive,
    activeMenu,
    isAllExpanded,
    activeSubMenu,
    subMenuName,
    parentData,
    depth,
    menuId,
    getData,
    parentIndex,
    isEdit,
    isLoading
  } = useSelector((state: RootState) => state.menues)

  const expandAllMenu = () => {
    dispatch(setIsActive("expand"))
    dispatch(setActiveMenu(null))
    dispatch(setIsAllExpanded(true))
  }

  const collapsAllMenus = () => {
    dispatch(setIsActive("collapse"))
    dispatch(setActiveMenu(null))
    dispatch(setIsAllExpanded(false))
  };

  const getMenu = async () => {
    dispatch(setIsLoading(true))
    try {
      const res = await fetch(`${baseUrl}/menu`,
        { method: 'GET' }
      );
      const data = await res.json();
      dispatch(setData(data.data))
    } catch (err) {
      toast.error("Failed to load menu data.");
    }
    finally {
      dispatch(setIsLoading(false))
    }
  }
  useEffect(() => {
    getMenu()
  }, []);

  const addMenuItem = async (menuId: string, depth: number, label: string, parentId: string | null) => {
    const adjustDepth = parentId && depth > 0 ? depth + 1 : depth
    const payload = {
      menuId: uuidv4(),
      depth: adjustDepth,
      parentId: menuId,
      name: label,
    };
    dispatch(setIsLoading(true))
    try {
      const res = await fetch(`${baseUrl}/menu`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      })
      if (res.ok) {
        setIsLoading(false)
        const data = await res.json();
        dispatch(setData([...getData, data]));
        await getMenu()
        toast.success("Menu item added successfully")
      }
    }
    catch (error) {
      toast.success(`Menu item ${label} not added successfully`)

    } finally {
      dispatch(setIsLoading(false))
    }
  };

  const updateMenuById = async (menuId: string, parentIndex: string | null, depth: number, label: string) => {
    const payload = {
      menuId: menuId,
      depth: depth,
      parentId: parentIndex,
      name: label,
    };
    dispatch(setIsLoading(true))
    try {
      const res = await fetch(`${baseUrl}/menu/${menuId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      })
      if (res.ok) {
        await getMenu()
        toast.success('MenuItem update  SuccessFully');
      }
    }
    catch (error) {
      toast.error(`Menu Item ${menuId} Not Update`)
    }
    finally {
      dispatch(setIsLoading(false))
    }
  }

  const deleteMenuById = async (menuId: string) => {
    dispatch(setIsLoading(true))
    try {
      const res = await fetch(`${baseUrl}/menu/${menuId}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        const childrenIds = getData
          .filter(item => item.parentId === menuId)
          .map(item => item.menuId);

        const idsToDelete = [menuId, ...childrenIds];
        for (const id of idsToDelete) {
          await fetch(`${baseUrl}/menu/${id}`, { method: 'DELETE' });
        }
        dispatch(setData(getData.filter(item => !idsToDelete.includes(item.menuId))));
        toast.success("SuccessFully Deleted Data")
      }
    }
    catch (err) {
      toast.error(`Fail to delete ${menuId}`)
    }
    finally {
      dispatch(setIsLoading(false))
    }
  }

  const addSubMenuItem = (depth: number, subItemId: string, parentLabel: string, parentId: string) => {
    resetForm()
    dispatch(setIsedit(false))
    dispatch(setMenuId(subItemId))
    if (parentId) {
      dispatch(setParentIndex(parentId))
      dispatch(setDepth(depth))
    } else {
      dispatch(setParentIndex(null))
      dispatch(setDepth(0))
    }
    if (parentId) {
      dispatch(setParentData(parentLabel))
    } else {
      dispatch(setParentData(''))
    }
  };

  const handleEditMenuItem = (menuId: string, depth: number, subItemName: string, parentLabel: string, parentId: string) => {
    dispatch(setIsedit(true))
    dispatch(setDepth(depth))
    dispatch(setMenuId(menuId))
    dispatch(setSubMenuName(subItemName))
    dispatch(setParentIndex(parentId))
    if (parentId) {
      dispatch(setParentData(parentLabel))
    } else {
      dispatch(setParentData(""))

    }
  }

  const resetForm = () => {
    dispatch(setMenuId(''));
    dispatch(setDepth(0));
    dispatch(setParentData(''));
    dispatch(setSubMenuName(''));
  };

  const handleSave = (menuId: string, depth: number, parentId: string | null, name: string) => {
    if (isEdit) {
      updateMenuById(menuId, parentId, depth, name);
    } else {
      addMenuItem(menuId, depth, name, parentId);
    }
    resetForm()
  }

  const SubMenuItem = useCallback(({ parentId, depth, parentLabel }: { parentId: string; depth: number; parentLabel: string }) => {
    const subMenuItems = getData.filter(item => item.parentId === parentId);
    return (
      <div className='ml-5'>
        {subMenuItems.map((subItem) => (
          <div key={subItem.menuId} className='flex py-1'>
            <img className="h-5"
              src={activeSubMenu === subItem.menuId ? '/icons/button.svg' : forwardArrow.src}
              alt="collapse icon" />
            <div className='flex flex-col'>
              <div className='flex'>
                <a href='#' className='text-gray-600'
                  onClick={() => dispatch(setActiveSubMenu(activeSubMenu === subItem.menuId ? null : subItem.menuId))}>
                  {subItem.name}
                </a>
                <div className='flex'>
                  <img
                    onClick={() => addSubMenuItem(depth, subItem.menuId, parentLabel, parentId)}
                    className='w-6 h-6 ml-2'
                    src="icons/Large - Icon Only.svg"
                    alt="add button"
                  />
                  <img
                    onClick={() => handleEditMenuItem(subItem.menuId, depth, subItem.name, parentLabel, parentId)}
                    className='w-6 h-6 ml-2'
                    src="icons/icons8-edit.svg"
                    alt="edit button"
                  />
                  <img
                    onClick={() => deleteMenuById(subItem.menuId)}
                    className='w-6 h-6 ml-2'
                    src="icons/icons8-delete.svg"
                    alt="edit button"
                  />
                </div>
              </div>
              {(isAllExpanded || activeSubMenu === subItem.menuId) && (
                <SubMenuItem parentId={subItem.menuId} depth={depth} parentLabel={subItem.name} />
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }, [activeSubMenu, isAllExpanded, getData]);

  return (
    <div className="block sm:flex">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <Loader />
        </div>
      )}
      <div className={`w-60 bg-gray-800 h-[100vh]   sm:${isOpenSidebar ? 'block' : 'hidden'} `}>
        <div className=" flex justify-between py-7 px-8">
          <div className="flex">
            <img className="h-5" src="/icons/logo.svg" alt="Logo" />
            <h1 className="font-extrabold text-white relative right-8">IT</h1>
          </div>
          <img onClick={() => dispatch(toggleSidebar())}
            className="w-6 h-6 cursor-pointer"
            src="/icons/vector.svg"
            alt="menu-expand" />
        </div>
        <div className='px-6'>
          <p className='font-extrabold text-white'>Menus</p>
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
                {getData.filter(item => item.parentId === null).map((parentItem) => (
                  <option value="system Management">{parentItem.name}</option>
                ))}
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
            {getData.filter(item => item.parentId === null).map((parentItem) => (
              <>
                <div
                  className={'flex mt-2 cursor-pointer'}
                  key={parentItem.menuId}
                  onClick={() => dispatch(setActiveMenu(activeMenu === parentItem.menuId ? null : parentItem.menuId))}
                >
                  <div className='flex'>
                    <img className="h-5"
                      src={activeMenu === parentItem.menuId ? '/icons/button.svg' : forwardArrow.src} />
                    <a href='#' >{parentItem.name}</a>
                    {activeMenu === parentItem.menuId && (
                      <div className='flex'>
                        <img

                          onClick={() => addSubMenuItem(depth, parentItem.menuId, parentItem.name, parentItem.parentId)}
                          className='w-6 h-6 ml-2'
                          src="icons/Large - Icon Only.svg"
                          alt="add button"
                        />
                        <img
                          onClick={() => handleEditMenuItem(parentItem.menuId, depth, parentItem.name, parentItem.name, parentItem.parentId)}
                          className='w-6 h-6 ml-2'
                          src="icons/icons8-edit.svg"
                          alt="edit button"
                        />
                        <img
                          onClick={() => deleteMenuById(parentItem.menuId)}
                          className='w-6 h-6 ml-2'
                          src="icons/icons8-delete.svg"
                          alt="edit button"
                        />
                      </div>
                    )}
                  </div>
                </div>
                {(isAllExpanded || activeMenu === parentItem.menuId) && (
                  <SubMenuItem parentId={parentItem.menuId} depth={parentItem.depth} parentLabel={parentItem.name} />
                )}
              </>
            ))}
          </div>
          <div className="relative h-[454px] mt-14 left-0  sm:w-[532px] sm:left-52">
            <label className="block gap-y-2 text-sm	">Menu ID</label>
            <input
              className="py-3 px-4 bg-stone-50 rounded-2xl w-full"
              type="text"
              value={menuId}
              disabled
            />
            <label className="block text-sm mt-1">Depth</label>
            <input
              className="py-3 px-4 bg-stone-50 rounded-2xl w-80"
              type="text"
              disabled
              value={depth}
            />
            <label className="block text-sm mt-1">Parent Data</label>
            <input
              className="py-3 px-4 bg-stone-50 rounded-2xl w-80"
              type="text"
              value={parentData}
              onChange={(e) => dispatch(setParentData(e.target.value))}
              disabled={parentData ? false : true}
            />
            <label className="block text-sm mt-1">Name</label>
            <input
              className="py-3 px-4 bg-stone-50 rounded-2xl w-80"
              type="text"
              value={subMenuName}
              onChange={(e) => dispatch(setSubMenuName(e.target.value))}
            />
            <button
              onClick={() => handleSave(menuId, depth, parentIndex, subMenuName)}
              className="border-2 rounded-3xl py-2 px-5 w-80 block mt-2 bg-blue-600 text-white"
            >Save</button>
          </div>
        </div>
      </div>
    </div >
  );
}
