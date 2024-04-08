interface PageLink {
  label: string,
  icon: string,
  route: string,
};

export const pageLinks: Array<PageLink> = [
  {
    label: 'Home',
    icon: '/icons/house.svg',
    route: '/'
  },
  {
    label: 'Links',
    icon: '/icons/link.svg',
    route: '/links'
  },
]
