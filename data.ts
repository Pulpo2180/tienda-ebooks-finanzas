/** Catálogo editorial con las ediciones de educación financiera disponibles. */

/** Describe una edición de un libro del catálogo. */
export interface BookEdition {
  /** Identificador único de la edición. */
  id: string;
  /** Título de la edición. */
  title: string;
  /** Subtítulo de la edición. */
  subtitle: string;
  /** Idioma de la edición. */
  language: 'es';
  /** Etiqueta visible del idioma. */
  versionLabel: 'Versión en Español';
  /** Metadatos visuales de la portada. */
  coverData: {
    /** Título mostrado en la portada. */
    title: string;
    /** Subtítulo mostrado en la portada. */
    subtitle: string;
    /** Color principal del tema de portada. */
    themeColor: string;
    /** Estilo de diseño de portada. */
    layoutStyle: string;
  };
  /** Índice de capítulos de la edición. */
  tableOfContents: string[];
  /** Capítulos y contenido editorial de la edición. */
  content: {
    /** Número del capítulo. */
    chapterNumber: number;
    /** Título del capítulo. */
    title: string;
    /** Texto del capítulo. */
    text: string;
  }[];
  /** Estado de revisión editorial. */
  reviewStatus: 'draft';
  /** Indica si está habilitada la acción de vista previa. */
  isYellowActive: true;
  /** URL opcional del PDF. */
  pdfUrl?: string;
  /** Enlace de compra, si está configurado. */
  checkoutUrl?: string;
  /** Traducciones de título, resumen, índice y capítulos. */
  translations?: Partial<Record<'en' | 'pt', {
    /** Título traducido. */
    title: string;
    /** Subtítulo traducido. */
    subtitle: string;
    /** Etiqueta de versión traducida. */
    versionLabel: string;
    /** Título de portada traducido. */
    coverTitle: string;
    /** Subtítulo de portada traducido. */
    coverSubtitle: string;
    /** Índice traducido. */
    tableOfContents: string[];
    /** Capítulos traducidos. */
    chapters: { chapterNumber: number; title: string; text: string }[];
  }>>;
}

/** Crea los capítulos de una edición a partir de su índice y resumen editorial. */
function createChapters(titles: string[], introduction: string, closing: string) {
  return [
    { chapterNumber: 0, title: titles[0], text: introduction },
    ...titles.slice(1, -1).map((title, index) => ({
      chapterNumber: index + 1,
      title,
      text: 'Esta sección presenta los conceptos centrales del tema con un enfoque teórico, claro y sereno. La edición busca ayudar al lector a comprender sus hábitos, decisiones y principios financieros antes de actuar. No contiene ejercicios ni recomendaciones personalizadas.',
    })),
    { chapterNumber: titles.length - 1, title: titles[titles.length - 1], text: closing },
  ];
}

/** Construye una edición editorial con contenido disponible en español e inglés. */
function createBook({
  id,
  title,
  subtitle,
  coverTitle,
  coverSubtitle,
  color,
  contents,
  introduction,
  closing,
  englishTitle,
  englishSubtitle,
  englishCoverTitle,
  englishCoverSubtitle,
  englishContents,
  englishIntroduction,
  englishClosing,
}: {
  id: string;
  title: string;
  subtitle: string;
  coverTitle: string;
  coverSubtitle: string;
  color: string;
  contents: string[];
  introduction: string;
  closing: string;
  englishTitle: string;
  englishSubtitle: string;
  englishCoverTitle: string;
  englishCoverSubtitle: string;
  englishContents: string[];
  englishIntroduction: string;
  englishClosing: string;
}): BookEdition {
  return {
    id,
    title,
    subtitle,
    language: 'es',
    versionLabel: 'Versión en Español',
    coverData: {
      title: coverTitle,
      subtitle: coverSubtitle,
      themeColor: color,
      layoutStyle: 'editorial-teorico',
    },
    tableOfContents: contents,
    content: createChapters(contents, introduction, closing),
    reviewStatus: 'draft',
    isYellowActive: true,
    translations: {
      en: {
        title: englishTitle,
        subtitle: englishSubtitle,
        versionLabel: 'English version',
        coverTitle: englishCoverTitle,
        coverSubtitle: englishCoverSubtitle,
        tableOfContents: englishContents,
        chapters: createChapters(englishContents, englishIntroduction, englishClosing),
      },
    },
  };
}

const habitsContents = [
  'Introducción: Por qué tus finanzas son un reflejo de tus hábitos y no de tu sueldo',
  'Capítulo 1: Los fundamentos invisibles: qué es realmente un hábito financiero',
  'Capítulo 2: La psicología del dinero: creencias, emociones y decisiones',
  'Capítulo 3: Los pilares del orden financiero: ingresos, gastos, ahorro y deuda',
  'Capítulo 4: Hábitos que sostienen la estabilidad: constancia, simplicidad y automatización mental',
  'Capítulo 5: De la estabilidad al crecimiento: patrimonio, protección e inversión como mentalidad',
  'Cierre: Una nueva relación con el dinero',
];

const investingContents = [
  'Introducción: Por qué invertir no es para ricos ni expertos, sino para pacientes',
  'Capítulo 1: El fundamento invisible: qué es realmente invertir y qué no es',
  'Capítulo 2: El lenguaje esencial: rentabilidad, riesgo, tiempo e inflación sin miedo',
  'Capítulo 3: Los grandes vehículos: de la cuenta segura a la bolsa global con calma',
  'Capítulo 4: La psicología del inversor: miedo, euforia y no hacer nada',
  'Capítulo 5: De ahorrador a confiado: largo plazo, diversificación y protección',
  'Cierre: Tu identidad inversora',
];

const budgetContents = [
  'Introducción: Por qué sientes que el dinero te controla y cómo recuperar el mando sin culpa',
  'Capítulo 1: El mapa invisible: por qué gastas y debes como lo haces',
  'Capítulo 2: El presupuesto como lenguaje: a dónde va tu vida cada mes',
  'Capítulo 3: La deuda al desnudo: qué es deber y por qué el mínimo atrapa',
  'Capítulo 4: El orden que se sostiene: simplicidad, prioridades y calma',
  'Capítulo 5: De la presión a la paz: colchón, libertad y control adulto',
  'Cierre: Retomar el control no es apretar, es dirigir',
];

const englishInvestingContents = [
  'Introduction: Why investing is for patient people, not just the wealthy or experts',
  'Chapter 1: The invisible foundation: what investing really is—and is not',
  'Chapter 2: Essential language: returns, risk, time, and inflation without fear',
  'Chapter 3: The major investment vehicles: from safe accounts to global markets',
  'Chapter 4: Investor psychology: fear, euphoria, and doing nothing',
  'Chapter 5: From saver to confident investor: time, diversification, and protection',
  'Closing: Your investor identity',
];

const englishBudgetContents = [
  'Introduction: Why money feels in control—and how to take the reins without blame',
  'Chapter 1: The invisible map: why you spend and borrow the way you do',
  'Chapter 2: Budgeting as a language: where your life goes each month',
  'Chapter 3: Debt laid bare: what borrowing means and why minimum payments trap you',
  'Chapter 4: Order that lasts: simplicity, priorities, and calm',
  'Chapter 5: From pressure to peace: a cushion, freedom, and adult control',
  'Closing: Taking control means directing, not tightening',
];

const books: BookEdition[] = [
  createBook({
    id: 'habitos-finanzas-personales-es',
    title: 'Hábitos de Finanzas Personales',
    subtitle: 'Una guía para organizar objetivos y crear hábitos financieros sostenibles.',
    coverTitle: 'HÁBITOS DE FINANZAS PERSONALES',
    coverSubtitle: 'Una guía para organizar objetivos y crear hábitos financieros sostenibles. Comprender antes de actuar.',
    color: '#D2A52A',
    contents: habitsContents,
    introduction: 'Tu tranquilidad financiera es una cuestión de comportamiento repetido, no de cantidad. Dos personas con el mismo ingreso pueden tener destinos opuestos: la diferencia suele estar en los hábitos, las emociones y las decisiones cotidianas. Este libro propone comprender por qué actuamos como actuamos antes de intentar cambiar presupuestos o inversiones. Es una edición teórica: busca lucidez, no prisa.',
    closing: 'Tus finanzas son hábitos, no veredictos. Mira tu dinero sin culpa ni comparación y pregúntate: “¿esto me da libertad o me la quita?”. La verdadera riqueza es vivir en paz con lo que tienes mientras construyes lo que sueñas. Esta edición es educativa y no constituye asesoría financiera personalizada.',
    englishTitle: 'Personal Finance Habits',
    englishSubtitle: 'A guide to organizing your goals and building sustainable financial habits.',
    englishCoverTitle: 'PERSONAL FINANCE HABITS',
    englishCoverSubtitle: 'A guide to building sustainable financial habits. Understand before you act.',
    englishContents: [
      'Introduction: Why your finances reflect your habits, not your salary',
      'Chapter 1: The invisible foundations of financial habits',
      'Chapter 2: The psychology of money: beliefs, emotions, and decisions',
      'Chapter 3: Income, spending, saving, and debt',
      'Chapter 4: Consistency, simplicity, and sustainable habits',
      'Chapter 5: From stability to growth: wealth and protection',
      'Closing: A new relationship with money',
    ],
    englishIntroduction: 'Financial peace of mind is shaped by repeated behavior, not income alone. Two people with the same income can reach very different outcomes because of their habits, emotions, and everyday choices. This book explores why we act as we do before attempting to change budgets or investments. It is a theoretical edition designed for clarity, not haste.',
    englishClosing: 'Your finances are habits, not verdicts. Look at your money without guilt or comparison and ask: “Does this give me freedom or take it away?” True wealth is being at peace with what you have while building what you dream of. This educational edition is not personalized financial advice.',
  }),
  createBook({
    id: 'inversion-esencial-es',
    title: 'Inversión esencial: de cero a confiado',
    subtitle: 'Comprender los principios de inversión con calma, sin tecnicismos intimidantes.',
    coverTitle: 'INVERSIÓN ESENCIAL',
    coverSubtitle: 'De cero a confiado. Comprender antes de actuar.',
    color: '#176B55',
    contents: investingContents,
    introduction: 'Invertir no es especular. Es darle a tu dinero la tarea de trabajar en silencio. No necesitas ser experto para pensar como inversor: necesitas comprender el interés compuesto, el riesgo, el tiempo y la importancia de mantener la calma. Esta guía teórica explica cómo el capital puede participar del crecimiento productivo y por qué la confianza nace de comprender, no de ganar una vez.',
    closing: 'Invertir es una tarea productiva cuyo lenguaje ya puedes comprender. Solo lo lejano debe exponerse; nada esencial debería ponerse en algo que no entiendes. Prefiere lo simple, barato y diversificado, aporta con constancia y desconfía de la prisa y las garantías. Esta edición educativa no constituye asesoría financiera personalizada.',
    englishTitle: 'Essential Investing: From Beginner to Confident',
    englishSubtitle: 'Understand investing principles calmly, without intimidating jargon.',
    englishCoverTitle: 'ESSENTIAL INVESTING',
    englishCoverSubtitle: 'From beginner to confident. Understand before you act.',
    englishContents: englishInvestingContents,
    englishIntroduction: 'Investing is not speculation. It is giving your money the task of working quietly. You do not need to be an expert to think like an investor: you need to understand compound growth, risk, time, and the value of staying calm. This theoretical guide explains how capital can participate in productive growth and why confidence comes from understanding, not from winning once.',
    englishClosing: 'Investing is a productive practice whose language you can understand. Expose only money you will not need soon, and never invest in something you do not understand. Prefer simple, low-cost, diversified choices, contribute consistently, and be wary of urgency and guarantees. This educational edition is not personalized financial advice.',
  }),
  createBook({
    id: 'presupuesto-deuda-es',
    title: 'Presupuesto & Deuda: Retoma el control',
    subtitle: 'De la presión a la paz. Comprender antes de actuar, sin culpa ni planillas.',
    coverTitle: 'PRESUPUESTO & DEUDA',
    coverSubtitle: 'Retoma el control. De la presión a la paz.',
    color: '#72512D',
    contents: budgetContents,
    introduction: 'Retomar el control no es apretarte más, es entender más. Trabajar todo el mes y sentir que el dinero desapareció, o pagar y sentir que la deuda no baja, no es señal de falta de inteligencia o pereza. A menudo es descontrol aprendido en un entorno que facilita gastar y dificulta ordenar. Esta guía propone recuperar el mando mediante comprensión, no presión.',
    closing: 'Retomar el control significa pasar de automatismos a dirección, de anestesia a claridad y de complejidad a simplicidad. Dirige con una sintaxis sencilla: sostener lo esencial, construir futuro y disfrutar con medida. Dejar de huir, entender y poner el dinero a trabajar para vivir. Esta edición educativa no constituye asesoría financiera personalizada.',
    englishTitle: 'Budgeting & Debt: Take Back Control',
    englishSubtitle: 'From pressure to peace. Understand your money without blame or complicated spreadsheets.',
    englishCoverTitle: 'BUDGETING & DEBT',
    englishCoverSubtitle: 'Take back control. From pressure to peace.',
    englishContents: englishBudgetContents,
    englishIntroduction: 'Taking back control does not mean being harder on yourself; it means understanding more. Working all month while money seems to disappear, or making payments while debt barely shrinks, is not proof of laziness or lack of intelligence. Often it reflects learned patterns in an environment that makes spending easy and organizing difficult. This guide offers understanding—not pressure—as a way to regain direction.',
    englishClosing: 'Taking control means moving from automatic patterns to direction, from numbness to clarity, and from complexity to simplicity. Use a clear framework: support what matters, build for the future, and enjoy life within limits. Stop avoiding your finances, understand them, and put your money to work for the life you want. This educational edition is not personalized financial advice.',
  }),
];

/** Catálogo editorial disponible para la aplicación. */
export { books };

/** Alias del catálogo inicial para mantener compatibilidad con el resto del proyecto. */
export const initialBooks: BookEdition[] = books;
