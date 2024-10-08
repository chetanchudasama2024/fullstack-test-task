import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MenuItem {
    menuId: string,
    name: string,
    parentId: string,
    depth: number,
}
interface MenuState {
    isOpenSidebar: boolean;
    isActive: 'expand' | 'collapse' | null,
    activeMenu: string | null,
    isAllExpanded: boolean,
    activeSubMenu: string | null;
    menuId: string,
    depth: number,
    parentData: string,
    subMenuName: string,
    getData: MenuItem[];
    parentIndex: string | null;
    isEdit: boolean,
    isLoading: boolean,
}

const initialState: MenuState = {
    isOpenSidebar: true,
    isActive: null,
    activeMenu: null,
    isAllExpanded: false,
    activeSubMenu: null,
    menuId: '',
    depth: 0,
    parentData: "",
    subMenuName: "",
    getData: [],
    parentIndex: null,
    isEdit: false,
    isLoading: false,
}

const menuSlice = createSlice({
    name: "menus",
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.isOpenSidebar = !state.isOpenSidebar;
        },
        setIsActive: (state, action: PayloadAction<'expand' | 'collapse' | null>) => {
            state.isActive = action.payload;
        },
        setActiveMenu: (state, action: PayloadAction<string | null>) => {
            state.activeMenu = action.payload;
        },
        setIsAllExpanded: (state, action: PayloadAction<boolean>) => {
            state.isAllExpanded = action.payload;
        },
        setActiveSubMenu: (state, action: PayloadAction<string | null>) => {
            state.activeSubMenu = action.payload
        },
        setMenuId: (state, action: PayloadAction<string>) => {
            state.menuId = action.payload;
        },
        setParentData: (state, action: PayloadAction<string>) => {
            state.parentData = action.payload;
        },
        setSubMenuName: (state, action: PayloadAction<string>) => {
            state.subMenuName = action.payload;
        },
        setDepth: (state, action: PayloadAction<number>) => {
            state.depth = action.payload;
        },
        setData: (state, action: PayloadAction<MenuItem[]>) => {
            state.getData = action.payload;
        },
        setParentIndex: (state, action: PayloadAction<string | null>) => {
            state.parentIndex = action.payload;
        },
        setIsEdit: (state, action: PayloadAction<boolean>) => {
            state.isEdit = action.payload;
        },
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        }

    }
})

export const { toggleSidebar,
    setIsActive,
    setActiveMenu,
    setIsAllExpanded,
    setActiveSubMenu,
    setMenuId,
    setParentData,
    setSubMenuName,
    setDepth,
    setData,
    setParentIndex,
    setIsEdit,
    setIsLoading
} = menuSlice.actions
export default menuSlice.reducer;
