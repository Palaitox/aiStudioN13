import { Tramite, NewsItem, ViewState } from './types';

export const NOTARIA_INFO = {
  name: "Notaría 13 de Cali",
  address: "Calle 12 # 34-56, Cali, Valle del Cauca", // Placeholder address based on context
  phone: "(602) 555-1234",
  email: "notaria13cali@ucnc.com.co",
  hours: "Lunes a Viernes: 8:00 AM - 5:00 PM | Sábados: 9:00 AM - 12:00 PM"
};

export const TRAMITES_DATA: Tramite[] = [
  {
    id: 'esc-1',
    title: 'Escritura Pública',
    category: 'Escrituración',
    description: 'Documento que contiene la declaración de voluntad de una o varias personas ante notario.',
    requirements: ['Documento de identidad', 'Declaración verbal'],
    time: 'Inmediato (Firma)',
    cost: 'Según tarifa notarial'
  },
  {
    id: 'esc-2',
    title: 'Matrimonio Civil',
    category: 'Escrituración',
    description: 'Contrato solemne por el cual se unen legalmente dos personas.',
    requirements: ['Solicitud escrita', 'Registros Civiles (< 1 mes)', 'Documentos de identidad'],
    time: 'Consultar con notario',
    cost: 'Según tarifa notarial'
  },
  {
    id: 'aut-1',
    title: 'Autenticación de Firma',
    category: 'Autenticación',
    description: 'Testimonio escrito de que la firma corresponde a la persona.',
    requirements: ['Cédula de ciudadanía', 'Documento original', 'Presencia personal'],
    time: 'El mismo día',
    cost: 'Según tarifa notarial'
  },
  {
    id: 'reg-1',
    title: 'Registro Civil de Nacimiento',
    category: 'Registro Civil',
    description: 'Documento indispensable para probar la existencia legal.',
    requirements: ['Certificado de nacido vivo', 'Documentos de padres'],
    time: 'El mismo día',
    cost: 'Sin costo (Inscripción y primera copia)'
  },
  {
    id: 'no-esc-1',
    title: 'Permiso Salida del País',
    category: 'No Escriturarios',
    description: 'Autorización de padres para salida de menores.',
    requirements: ['Presencia de padres', 'Registro Civil del menor', 'Cédulas'],
    time: 'El mismo día',
    cost: 'Según tarifa notarial'
  }
];

export const NEWS_DATA: NewsItem[] = [
  {
    id: 'news-1',
    title: 'Notaritech: El Futuro del Notariado',
    summary: 'Avances en la digitalización notarial y biometría segura.',
    date: '2026-01-15',
    image: 'https://picsum.photos/800/600?random=1'
  },
  {
    id: 'news-2',
    title: 'Nuevo Entorno de Inclusión',
    summary: 'Implementación de nuevas herramientas para personas con discapacidad.',
    date: '2026-01-20',
    image: 'https://picsum.photos/800/600?random=2'
  },
  {
    id: 'news-3',
    title: 'Novedades UCNC',
    summary: 'Actualización de tarifas y normativas para el año en curso.',
    date: '2026-01-22',
    image: 'https://picsum.photos/800/600?random=3'
  }
];

export const TRANSPARENCY_LINKS = [
  { title: "Misión, Visión y Funciones", view: ViewState.NOSOTROS },
  { title: "Normatividad (SUIN)", url: "https://www.suin-juriscol.gov.co" },
  { title: "Plan de Acción", view: ViewState.TRANSPARENCIA },
  { title: "Datos Abiertos", view: ViewState.TRANSPARENCIA },
];

export const PARTICIPA_SECTIONS = [
  "Diagnóstico e identificación de problemas",
  "Planeación y presupuesto participativo",
  "Consulta ciudadana",
  "Rendición de cuentas",
  "Control Social",
  "Colaboración e innovación abierta"
];
