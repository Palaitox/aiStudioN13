import { Tramite, NewsItem, ViewState } from './types';

export const NOTARIA_INFO = {
  name: "Notaría 13 de Cali",
  address: "Calle 12 # 34-56, Cali, Valle del Cauca", // Placeholder address
  phone: "(602) 555-1234",
  email: "notaria13cali@ucnc.com.co",
  hours: "Lunes a Viernes: 8:00 AM - 5:00 PM | Sábados: 9:00 AM - 12:00 PM"
};

export const TRAMITES_DATA: Tramite[] = [
  // --- ESCRITURACIÓN ---
  {
    id: 'esc-1',
    title: 'Escritura Pública',
    category: 'Escrituración',
    description: 'Documento que contiene la declaración de voluntad de una o varias personas ante notario.',
    time: 'Inmediato (Firma)',
    cost: 'Según tarifa notarial'
  },
  {
    id: 'esc-2',
    title: 'Poder',
    category: 'Escrituración',
    description: 'Facultad que una persona da a otra para que obre en su nombre y por su cuenta.',
    time: 'Inmediato',
    cost: 'Según tarifa'
  },
  {
    id: 'esc-3',
    title: 'Cambio de Nombre',
    category: 'Escrituración',
    description: 'Trámite para modificar el nombre o apellido en el registro civil.',
    time: '5 días hábiles',
    cost: 'Según tarifa'
  },
  {
    id: 'esc-4',
    title: 'Corrección identidad sexual',
    category: 'Escrituración',
    description: 'Corrección del componente de sexo en el Registro Civil.',
    time: '5 días hábiles',
    cost: 'Según tarifa'
  },
  {
    id: 'esc-5',
    title: 'Matrimonio Civil',
    category: 'Escrituración',
    description: 'Contrato solemne por el cual se unen legalmente dos personas.',
    requirements: ['Solicitud escrita', 'Registros Civiles (< 1 mes)', 'Documentos de identidad'],
    time: 'Consultar con notario',
    cost: 'Según tarifa notarial'
  },
  {
    id: 'esc-6',
    title: 'Unión Marital de Hecho',
    category: 'Escrituración',
    description: 'Declaración de la comunidad de vida permanente y singular.',
    time: 'Inmediato',
    cost: 'Según tarifa'
  },
  {
    id: 'esc-7',
    title: 'Capitulaciones Matrimoniales',
    category: 'Escrituración',
    description: 'Acuerdos celebrados antes del matrimonio sobre bienes.',
    time: '2-3 días',
    cost: 'Según tarifa'
  },
  {
    id: 'esc-8',
    title: 'Divorcio',
    category: 'Escrituración',
    description: 'Cesación de efectos civiles de matrimonio religioso o divorcio civil.',
    time: 'Variable',
    cost: 'Según tarifa'
  },
  {
    id: 'esc-9',
    title: 'Separación de Bienes',
    category: 'Escrituración',
    description: 'Disolución y liquidación de la sociedad conyugal.',
    time: 'Variable',
    cost: 'Según tarifa'
  },
  {
    id: 'esc-10',
    title: 'Sucesión por Causa de Muerte',
    category: 'Escrituración',
    description: 'Transmisión de los bienes de una persona fallecida a sus herederos.',
    time: 'Variable',
    cost: 'Según tarifa + Impuestos'
  },
  {
    id: 'esc-11',
    title: 'Testamento',
    category: 'Escrituración',
    description: 'Acto por el cual una persona dispone de sus bienes para después de sus días.',
    time: 'Inmediato',
    cost: 'Según tarifa'
  },
  {
    id: 'esc-12',
    title: 'Afectación a Vivienda Familiar',
    category: 'Escrituración',
    description: 'Protección del inmueble destinado a la vivienda de la familia.',
    time: 'Inmediato',
    cost: 'Exento o tarifa mínima'
  },
  {
    id: 'esc-13',
    title: 'Patrimonio de Familia',
    category: 'Escrituración',
    description: 'Constitución de patrimonio inembargable a favor de la familia.',
    time: 'Inmediato',
    cost: 'Según tarifa'
  },
  {
    id: 'esc-14',
    title: 'Compraventa de Inmuebles',
    category: 'Escrituración',
    description: 'Transferencia de la propiedad de un bien raíz.',
    time: '3-4 días hábiles',
    cost: 'Según tarifa + Retención + Registro'
  },
  {
    id: 'esc-15',
    title: 'Cancelación de Hipoteca',
    category: 'Escrituración',
    description: 'Levantamiento del gravamen hipotecario una vez pagada la deuda.',
    time: '3 días hábiles',
    cost: 'Según tarifa'
  },
  {
    id: 'esc-16',
    title: 'Permuta de Inmuebles',
    category: 'Escrituración',
    description: 'Intercambio de propiedades entre dos partes.',
    time: '3-4 días hábiles',
    cost: 'Según tarifa'
  },
  {
    id: 'esc-17',
    title: 'Donación',
    category: 'Escrituración',
    description: 'Transferencia gratuita de bienes a otra persona.',
    time: '3-4 días hábiles',
    cost: 'Según tarifa'
  },
  {
    id: 'esc-18',
    title: 'Constitución de Hipoteca',
    category: 'Escrituración',
    description: 'Garantía real sobre un inmueble para asegurar una obligación.',
    time: '3-4 días hábiles',
    cost: 'Según tarifa'
  },

  // --- AUTENTICACIÓN ---
  {
    id: 'aut-1',
    title: 'Firma a Ruego',
    category: 'Autenticación',
    description: 'Para personas que no saben o no pueden firmar.',
    requirements: ['Huella dactilar', 'Testigo'],
    time: 'Inmediato',
    cost: 'Según tarifa'
  },
  {
    id: 'aut-2',
    title: 'Reconocimiento Firma y Contenido',
    category: 'Autenticación',
    description: 'El interesado declara que firma y contenido son suyos.',
    time: 'Inmediato',
    cost: 'Según tarifa'
  },
  {
    id: 'aut-3',
    title: 'Autenticación de Firma',
    category: 'Autenticación',
    description: 'Testimonio notarial de que la firma corresponde a la persona.',
    time: 'Inmediato',
    cost: 'Según tarifa'
  },
  {
    id: 'aut-4',
    title: 'Autenticación de Copias',
    category: 'Autenticación',
    description: 'Certificación de que una copia es fiel al original.',
    requirements: ['Original a la vista'],
    time: 'Inmediato',
    cost: 'Por hoja'
  },

  // --- REGISTRO CIVIL ---
  {
    id: 'reg-1',
    title: 'Registro Civil de Nacimiento',
    category: 'Registro Civil',
    description: 'Prueba la existencia legal de la persona.',
    requirements: ['Certificado de nacido vivo', 'Documentos de padres'],
    time: 'Inmediato',
    cost: 'Sin costo (Inscripción)'
  },
  {
    id: 'reg-2',
    title: 'Registro Civil de Matrimonio',
    category: 'Registro Civil',
    description: 'Inscripción del matrimonio celebrado religiosa o civilmente.',
    time: 'Inmediato',
    cost: 'Sin costo (Inscripción)'
  },
  {
    id: 'reg-3',
    title: 'Registro Civil de Defunción',
    category: 'Registro Civil',
    description: 'Acredita el fallecimiento de una persona.',
    time: 'Inmediato',
    cost: 'Sin costo (Inscripción)'
  },

  // --- NO ESCRITURARIOS ---
  {
    id: 'no-esc-1',
    title: 'Declaración Extra-proceso',
    category: 'No Escriturarios',
    description: 'Declaración bajo la gravedad de juramento ante notario.',
    time: 'Inmediato',
    cost: 'Según tarifa'
  },
  {
    id: 'no-esc-2',
    title: 'Acta de Comparecencia',
    category: 'No Escriturarios',
    description: 'Constancia de presencia física para otorgar escritura.',
    time: 'Variable',
    cost: 'Según tarifa'
  },
  {
    id: 'no-esc-3',
    title: 'Permiso Salida del País',
    category: 'No Escriturarios',
    description: 'Autorización de padres para salida de menores.',
    requirements: ['Registro Civil', 'Padres presentes', 'Cédulas'],
    time: 'Inmediato',
    cost: 'Según tarifa'
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
  { title: "Información de la Entidad", view: ViewState.NOSOTROS },
  { title: "Normativa (SUIN)", url: "https://www.suin-juriscol.gov.co" },
  { title: "Planeación y Gestión", view: ViewState.TRANSPARENCIA },
  { title: "Trámites y Servicios", view: ViewState.TRAMITES },
  { title: "Datos Abiertos", view: ViewState.TRANSPARENCIA },
  { title: "Grupos Específicos", view: ViewState.TRANSPARENCIA },
  { title: "Obligación de Reporte", view: ViewState.TRANSPARENCIA },
  { title: "Atención al Ciudadano", view: ViewState.PQRSD },
  { title: "Noticias y Actualidad", view: ViewState.HOME },
];

export const PARTICIPA_SECTIONS = [
  "Diagnóstico e identificación de problemas",
  "Planeación y presupuesto participativo",
  "Consulta ciudadana",
  "Rendición de cuentas",
  "Control Social",
  "Colaboración e innovación abierta"
];
