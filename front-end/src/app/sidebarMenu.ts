export interface SubMenu {
    label: string;
    subMenu?: SubMenu[];
}
export interface SidebarMenu {
    label: string;
    subMenu?: SubMenu[];
}


export const sidebarMenuData: SidebarMenu[] = [
    {
        label: 'System Management',
        subMenu: [
            {
                label: 'Systems',
                subMenu: [
                    {
                        label: 'System Code',
                        subMenu: [
                            { label: 'API Registration' },
                            { label: 'API Edit' },
                        ]
                    },
                    { label: 'Code Registration' },
                    { label: 'Code Registration - 2' },
                    { label: 'Properties' },
                ],
            },
            {
                label: 'Menus',
                subMenu: [{ label: 'Menu Registration' }],
            },
            {
                label: 'API List',
                subMenu: [
                    { label: 'API Registration' },
                    { label: 'API Edit' },
                ],
            },
        ],
    },
    {
        label: 'Users & Groups',
        subMenu: [
            {
                label: 'Users',
                subMenu: [{ label: 'User Account Registration' }],
            },
            {
                label: 'Groups',
                subMenu: [{ label: 'User Group Registration' }],
            },

        ],
    },
]



