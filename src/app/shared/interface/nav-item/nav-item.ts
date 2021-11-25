export interface NavItem {
  title: string;
  disabled?: boolean;
  icon: string;
  route?: string;
  children?: NavItem[];
}

export const MenuItem: NavItem[] = [
  {
    title: 'Dashboard',
    disabled: false,
    icon: 'dashboard',
    route: 'dashboard',
  },
  {
    title: 'Settings',
    disabled: false,
    icon: 'settings',
    children: [
      {
        title: 'Management',
        disabled: false,
        icon: 'article',
        route: 'management',
      },
    ],
  },
];
