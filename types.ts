export enum ViewState {
  HOME = 'HOME',
  TRAMITES = 'TRAMITES',
  TRANSPARENCIA = 'TRANSPARENCIA',
  PARTICIPA = 'PARTICIPA',
  PQRSD = 'PQRSD',
  NOSOTROS = 'NOSOTROS',
  LEGAL = 'LEGAL'
}

export interface Tramite {
  id: string;
  title: string;
  category: 'Escrituración' | 'Autenticación' | 'Registro Civil' | 'No Escriturarios';
  description: string;
  requirements?: string[];
  cost?: string;
  time?: string;
}

export interface NavItem {
  label: string;
  view: ViewState;
  subItems?: { label: string; view: ViewState }[];
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  date: string;
  image: string;
}

export enum AccessibilityMode {
  DEFAULT = 'DEFAULT',
  HIGH_CONTRAST = 'HIGH_CONTRAST',
  LARGE_TEXT = 'LARGE_TEXT',
  DYSLEXIA_FRIENDLY = 'DYSLEXIA_FRIENDLY'
}
