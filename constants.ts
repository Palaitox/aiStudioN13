
import { Tramite, NewsItem, ViewState, InterestItem } from './types';

export const NOTARIA_INFO = {
  name: "Notaría 13 de Cali",
  address: "Cl. 5 #50-103, Panamericano, Cali, Valle del Cauca",
  phone: "(602) 551-8877", 
  email: "notaria13cali@ucnc.com.co",
  hours: "Lunes a Viernes: 8:00 AM - 5:00 PM | Sábados: 9:00 AM - 12:00 PM"
};

export const TRAMITES_DATA: Tramite[] = [
  // --- 1.8.1.1 ESCRITURACIÓN ---
  {
    id: 'esc-1',
    title: 'Escritura Pública',
    category: 'Escrituración',
    description: 'Documento que contiene la declaración de voluntad de una o varias personas, emitidas ante el notario, para hacer un determinado contrato o acto jurídico individual.',
    requirements: [
      'Recepción de declaraciones del usuario',
      'Transcripción en texto escrito',
      'Lectura y aceptación del texto',
      'Firma del notario y de los interesados'
    ],
    time: 'Variable según el acto',
    cost: 'Según tarifa notarial'
  },
  {
    id: 'esc-2',
    title: 'Poder',
    category: 'Escrituración',
    description: 'Acto mediante el cual una persona autoriza a otra para que la represente en la realización de un contrato o acto jurídico.',
    requirements: [
      'Asistir personalmente a la notaría',
      'Cédula de ciudadanía',
      'Documento escrito para autenticar y reconocer'
    ],
    time: 'El mismo día',
    cost: 'Según tarifa notarial'
  },
  {
    id: 'esc-3',
    title: 'Cambio de Nombre',
    category: 'Escrituración',
    description: 'Modificación, supresión o adición de nombres o apellidos. Por regla general, solo puede hacerse una vez en la vida por escritura pública.',
    requirements: [
      'Solicitud directa (mayor de edad) o padres (menor de edad)',
      'Documento de identificación',
      'Copia auténtica del Registro Civil de Nacimiento',
      'Permiso de autoridad indígena (si aplica)'
    ],
    time: 'El mismo día',
    cost: 'Según tarifa notarial'
  },
  {
    id: 'esc-4',
    title: 'Corrección Identidad Sexual',
    category: 'Escrituración',
    description: 'Cambio legal del sexo que figura en el Registro Civil. Permitido una vez cada 10 años.',
    requirements: [
      'Solicitud por escrito con nombre y cédula',
      'Copia del Registro Civil de Nacimiento',
      'Copia de la cédula de ciudadanía',
      'Declaración bajo juramento de voluntad'
    ],
    time: 'Máximo 5 días hábiles',
    cost: 'Según tarifa notarial'
  },
  {
    id: 'esc-5',
    title: 'Matrimonio Civil',
    category: 'Escrituración',
    description: 'Contrato solemne por el cual se unen legalmente dos personas para vivir juntos y auxiliarse mutuamente.',
    requirements: [
      'Solicitud escrita con datos completos',
      'Registros Civiles de Nacimiento (< 1 mes)',
      'Documentos de identificación',
      'Inventario de bienes de hijos menores (si aplica)',
      'Sentencia de divorcio anterior (si aplica)'
    ],
    time: 'Consultar con notario',
    cost: 'Según tarifa notarial'
  },
  {
    id: 'esc-6',
    title: 'Unión Marital de Hecho',
    category: 'Escrituración',
    description: 'Declaración de convivencia permanente y libre entre dos personas por mínimo 2 años.',
    requirements: [
      'Solicitud escrita de mutuo acuerdo',
      'Registros Civiles de Nacimiento (< 1 mes)',
      'Documentos de identificación',
      'Identificación de hijos comunes (si aplica)',
      'Inventario de bienes de hijos no comunes (si aplica)'
    ],
    time: 'Una semana aprox.',
    cost: 'Según tarifa notarial'
  },
  {
    id: 'esc-7',
    title: 'Capitulaciones Matrimoniales',
    category: 'Escrituración',
    description: 'Acuerdos sobre los bienes (inclusión o exclusión) antes de contraer matrimonio.',
    requirements: [
      'Documentos de identificación',
      'Relación detallada de bienes y deudas',
      'Recibo Impuesto Predial (Avalúo catastral)'
    ],
    time: 'Consultar con notario',
    cost: 'Según tarifa notarial'
  },
  {
    id: 'esc-8',
    title: 'Divorcio / Cesación Efectos Civiles',
    category: 'Escrituración',
    description: 'Terminación del Matrimonio Civil o Religioso de mutuo acuerdo ante notario.',
    requirements: [
      'Poder a abogado',
      'Registros Civiles (Nacimiento y Matrimonio)',
      'Acuerdo de divorcio y liquidación sociedad conyugal',
      'Acuerdo sobre hijos menores (Alimentos, Visitas, Custodia)',
      'Concepto del defensor de familia (si hay menores)'
    ],
    time: 'Variable (Depende defensoría)',
    cost: 'Según tarifa notarial'
  },
  {
    id: 'esc-9',
    title: 'Separación de Bienes',
    category: 'Escrituración',
    description: 'Reparto de bienes adquiridos durante la sociedad conyugal sin necesidad de divorcio.',
    requirements: [
      'Mutuo acuerdo y capacidad plena',
      'Registro Civil de Matrimonio',
      'Paz y salvo Impuesto Predial / Administración',
      'Prueba de deudas (si hay)'
    ],
    time: 'Consultar con notario',
    cost: 'Según tarifa notarial'
  },
  {
    id: 'esc-10',
    title: 'Sucesión por Causa de Muerte',
    category: 'Escrituración',
    description: 'Repartición de bienes del difunto entre herederos de común acuerdo.',
    requirements: [
      'Poder a abogado',
      'Registro Civil de Defunción',
      'Registros Civiles de Nacimiento (Herederos)',
      'Inventario y avalúo de bienes',
      'Paz y salvo impuestos',
      'Testamento (si existe)'
    ],
    time: 'Variable',
    cost: 'Según tarifa notarial'
  },
  {
    id: 'esc-11',
    title: 'Testamento',
    category: 'Escrituración',
    description: 'Acto para disponer de los bienes después de la muerte. Puede ser Abierto o Cerrado.',
    requirements: [
      'Ser mayor de edad',
      'Documento de identificación',
      '3 testigos (Abierto) o 5 testigos (Cerrado)',
      'Minuta o sobre cerrado según modalidad'
    ],
    time: 'Consultar con notario',
    cost: 'Según tarifa notarial'
  },
  {
    id: 'esc-12',
    title: 'Afectación a Vivienda Familiar',
    category: 'Escrituración',
    description: 'Protección de la vivienda familiar. Requiere firma de ambos cónyuges para vender.',
    requirements: [
      'Documentos de identificación',
      'Certificado de libertad',
      'Presencia de ambos cónyuges'
    ],
    time: 'Variable',
    cost: 'Según tarifa notarial'
  },
  {
    id: 'esc-13',
    title: 'Patrimonio de Familia',
    category: 'Escrituración',
    description: 'Protección inembargable de la vivienda a favor de la familia y menores.',
    requirements: [
      'Documentos de identificación',
      'Certificado de libertad',
      'Registro Civil de hijos beneficiarios'
    ],
    time: 'Mínimo 8 días hábiles',
    cost: 'Según tarifa notarial'
  },
  {
    id: 'esc-14',
    title: 'Compraventa de Inmuebles',
    category: 'Escrituración',
    description: 'Traspaso de propiedad de un inmueble a cambio de dinero.',
    requirements: [
      'Documentos de identificación',
      'Paz y salvo Predial y Valorización',
      'Paz y salvo Administración (Propiedad Horizontal)',
      'Certificado de Libertad y Tradición',
      'Escritura anterior'
    ],
    time: 'Mínimo 8 días hábiles',
    cost: 'Según tarifa + Impuestos'
  },
  {
    id: 'esc-15',
    title: 'Cancelación de Hipoteca',
    category: 'Escrituración',
    description: 'Levantamiento del gravamen una vez pagada la deuda.',
    requirements: [
      'Minuta o declaración del acreedor',
      'Certificado de libertad'
    ],
    time: 'Mínimo 8 días hábiles',
    cost: 'Según tarifa notarial'
  },
  {
    id: 'esc-16',
    title: 'Permuta de Inmuebles',
    category: 'Escrituración',
    description: 'Intercambio de propiedades (valor mayor en cosas que en dinero).',
    requirements: [
      'Similares a Compraventa',
      'Documentos de ambos inmuebles'
    ],
    time: 'Mínimo 8 días hábiles',
    cost: 'Según tarifa notarial'
  },
  {
    id: 'esc-17',
    title: 'Donación',
    category: 'Escrituración',
    description: 'Traspaso gratuito de una propiedad. Requiere Insinuación si supera 50 SMMLV.',
    requirements: [
      'Solicitud de donante y donatario',
      'Prueba de solvencia del donante',
      'Documentos del inmueble (si aplica)'
    ],
    time: 'Variable',
    cost: 'Según tarifa notarial'
  },
  {
    id: 'esc-18',
    title: 'Constitución de Hipoteca',
    category: 'Escrituración',
    description: 'Garantía sobre inmueble para asegurar el pago de una deuda.',
    requirements: [
      'Paz y salvo impuestos',
      'Certificado de libertad',
      'Escritura de propiedad'
    ],
    time: 'Variable',
    cost: 'Según tarifa notarial'
  },

  // --- 1.8.1.2 AUTENTICACIÓN ---
  {
    id: 'aut-1',
    title: 'Firma a Ruego',
    category: 'Autenticación',
    description: 'Para personas que no saben o no pueden firmar. Un testigo firma por ellos.',
    requirements: [
      'Asistir personalmente',
      'Cédula de ciudadanía',
      'Testigo con cédula',
      'Documento a firmar'
    ],
    time: 'El mismo día',
    cost: 'Según tarifa notarial'
  },
  {
    id: 'aut-2',
    title: 'Reconocimiento Firma y Contenido',
    category: 'Autenticación',
    description: 'Declaración ante notario de que la firma y el contenido de un documento son ciertos.',
    requirements: [
      'Asistir personalmente',
      'Cédula de ciudadanía',
      'Documento original'
    ],
    time: 'El mismo día',
    cost: 'Según tarifa notarial'
  },
  {
    id: 'aut-3',
    title: 'Autenticación de Firma',
    category: 'Autenticación',
    description: 'Testimonio de que la firma corresponde a la registrada o fue puesta en presencia del notario.',
    requirements: [
      'Asistir personalmente',
      'Cédula de ciudadanía',
      'Documento original'
    ],
    time: 'El mismo día',
    cost: 'Según tarifa notarial'
  },
  {
    id: 'aut-4',
    title: 'Autenticación de Copias',
    category: 'Autenticación',
    description: 'Certificación de que una copia es fiel y exacta al original.',
    requirements: [
      'Documento original a la vista',
      'Cédula de ciudadanía',
      'Copias a autenticar'
    ],
    time: 'El mismo día',
    cost: 'Según tarifa notarial'
  },

  // --- 1.8.1.3 REGISTRO CIVIL ---
  {
    id: 'reg-1',
    title: 'Registro Civil de Nacimiento',
    category: 'Registro Civil',
    description: 'Prueba la existencia legal. Base para la identidad y filiación.',
    requirements: [
      'Certificado de nacido vivo (o testigos)',
      'Documentos de identificación de padres',
      'RH del inscrito'
    ],
    time: 'El mismo día',
    cost: 'Sin costo (Inscripción y 1ra copia)'
  },
  {
    id: 'reg-2',
    title: 'Registro Civil de Matrimonio',
    category: 'Registro Civil',
    description: 'Prueba legal del matrimonio.',
    requirements: [
      'Copia Registro Civil Nacimiento contrayentes',
      'Documentos de identidad',
      'Partida eclesiástica / Acta matrimonio / Escritura'
    ],
    time: 'El mismo día',
    cost: 'Sin costo (Inscripción)'
  },
  {
    id: 'reg-3',
    title: 'Registro Civil de Defunción',
    category: 'Registro Civil',
    description: 'Prueba el fallecimiento y sus causas. Necesario para sucesión.',
    requirements: [
      'Certificado médico de defunción',
      'Cédula de quien denuncia',
      'Orden judicial (muerte violenta)',
      'Plazo: 2 días (sino requiere orden inspector)'
    ],
    time: 'El mismo día',
    cost: 'Sin costo (Inscripción)'
  },

  // --- 1.8.1.4 NO ESCRITURARIOS ---
  {
    id: 'no-esc-1',
    title: 'Declaración Extra-proceso',
    category: 'No Escriturarios',
    description: 'Manifestación verbal o escrita bajo juramento sobre hechos específicos.',
    requirements: [
      'Asistir personalmente',
      'Cédula de ciudadanía',
      'Relato de los hechos'
    ],
    time: 'El mismo día',
    cost: 'Según tarifa (Gratis Madres Cabeza de Familia)'
  },
  {
    id: 'no-esc-2',
    title: 'Acta de Comparecencia',
    category: 'No Escriturarios',
    description: 'Prueba de que una persona asistió a la notaría a cumplir una cita (ej. firma escritura).',
    requirements: [
      'Presencia del compareciente',
      'Cédula de ciudadanía',
      'Promesa de compraventa (si aplica)'
    ],
    time: 'El mismo día',
    cost: 'Según tarifa notarial'
  },
  {
    id: 'no-esc-3',
    title: 'Permiso Salida del País',
    category: 'No Escriturarios',
    description: 'Autorización de padres para que un menor salga de Colombia.',
    requirements: [
      'Presencia de padres/representantes',
      'Cédulas de ciudadanía',
      'Registro Civil de Nacimiento (Reciente)'
    ],
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

export const INTEREST_DATA: InterestItem[] = [
  {
    id: 'int-1',
    title: 'Niñez y Adolescencia',
    description: 'Prioridad en trámites, permisos de salida y registro civil. Garantizamos sus derechos.',
    image: 'https://picsum.photos/600/400?random=10',
    actionLabel: 'Ver Guía',
    category: 'Población',
    view: ViewState.TRANSPARENCIA
  },
  {
    id: 'int-2',
    title: 'Discapacidad e Inclusión',
    description: 'Ajustes razonables, interpretación de señas y accesibilidad física en sede.',
    image: 'https://picsum.photos/600/400?random=11',
    actionLabel: 'Conocer Servicios',
    category: 'Accesibilidad',
    view: ViewState.TRANSPARENCIA
  },
  {
    id: 'int-3',
    title: 'Nuestra Notaría',
    description: 'Conozca nuestra misión, visión y el equipo humano detrás de su seguridad jurídica.',
    image: 'https://picsum.photos/600/400?random=12',
    actionLabel: 'Quiénes Somos',
    category: 'Institucional',
    view: ViewState.NOSOTROS
  },
  {
    id: 'int-4',
    title: 'Normatividad 2026',
    description: 'Acceso directo al SUIN y normativas vigentes del sector notarial.',
    image: 'https://picsum.photos/600/400?random=13',
    actionLabel: 'Consultar Leyes',
    category: 'Legal',
    view: ViewState.TRANSPARENCIA
  },
  {
    id: 'int-5',
    title: 'PQRSD Digital',
    description: 'Canal directo para peticiones, quejas, reclamos y sugerencias.',
    image: 'https://picsum.photos/600/400?random=14',
    actionLabel: 'Radicar Solicitud',
    category: 'Servicio',
    view: ViewState.PQRSD
  },
  {
    id: 'int-6',
    title: 'Multimedia y Tutoriales',
    description: 'Aprenda cómo realizar sus trámites con nuestros videos explicativos.',
    image: 'https://picsum.photos/600/400?random=15',
    actionLabel: 'Ver Videos',
    category: 'Educación',
    view: ViewState.HOME
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
