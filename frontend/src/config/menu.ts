export type MenuOptions = {
  label: string;
  icon: string;
  iconSelected: string;
  to: { name: string };
};

export const menuOptions: MenuOptions[] = [
  {
    label: 'Dashboard',
    icon: 'eva-grid-outline',
    iconSelected: 'eva-grid',
    to: { name: 'Dashboard' },
  },
  {
    label: 'Goals',
    icon: 'eva-star-outline',
    iconSelected: 'eva-star',
    to: { name: 'Goals' },
  },
]