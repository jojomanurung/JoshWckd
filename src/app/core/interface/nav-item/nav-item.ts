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
    icon: 'home',
    route: '',
  }
]
