export interface MenuItem {
  title: string;
  disabled?: boolean;
  icon: string;
  route?: string;
  children?: MenuItem[];
}

export const MenuItems: MenuItem[] = [
  {
    title: 'Kanban',
    disabled: false,
    icon: 'view_kanban',
    route: 'kanban',
  },
  {
    title: 'Quick Quiz',
    disabled: false,
    icon: 'emoji_events',
    route: 'quick-quiz',
  },
  {
    title: 'CNN Cancer',
    disabled: false,
    icon: 'insights',
    route: 'cnn-cancer',
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
