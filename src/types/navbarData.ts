export interface NavLink {
  name: string;
  href: string;
  target?: string;
}

export interface CTA {
  label: string;
  href: string;
}

export interface NavbarCTA {
  primary: CTA;
  secondary: CTA;
}
