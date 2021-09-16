import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
    {
        id: 1,
        label: 'MENUITEMS.MENU.TEXT',
        isTitle: true
    },
    {
        id: 4,
        label: 'Dashboard',
        link: '/home',
        icon: 'bxs-report',
    },
    {
        id: 2,
        label: 'Clientes',
        link: '/customer',
        icon: 'bx-user-circle',
    },
    {
        id: 3,
        label: 'Produtos',
        link: '/product',
        icon: 'bx-basket',
    },

];

