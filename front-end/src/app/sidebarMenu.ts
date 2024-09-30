
interface subItem{
    subMenuItem: string;
}
interface sidebarMenu {
    menuItem: string;
    subMenu?:subItem[];
}

export const sidebarMenuData: sidebarMenu[] = [
   {
    menuItem:"Syetem",
    subMenu:[
        {
            subMenuItem:'System Code',
        },
        {
            subMenuItem:'Properties',
        },
        {
            subMenuItem:'Menus',
        },
        {
            subMenuItem:'Api List',
        },
    ]
   },
   {
    menuItem:"Users & Group",
   },
   {
    menuItem:"Competition",
   },
]


export const menuTree=[
    
]