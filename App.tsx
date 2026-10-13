
/**
 * Presenta el catálogo de LunaLibros con la interfaz traducida según el idioma activo.
 */
import { useState } from 'react';
import { CreditCard, Eye, ShoppingCart } from 'lucide-react';
import Header from './components/Header';
import RegisterModal from './components/RegisterModal';
import { books } from './lib/data';
import { portugueseBooks } from './lib/portugueseBooks';

type Language = 'en' | 'es' | 'pt';
type ContentLanguage = 'en' | 'es' | 'pt';

/** Estructura del contenido localizado de una edición. */
interface BookContent {
  title: string;
  subtitle: string;
  versionLabel: string;
  coverTitle: string;
  coverSubtitle: string;
  tableOfContents: string[];
  chapters: { chapterNumber: number; title: string; text: string }[];
}

/** Carga las traducciones de la interfaz por idioma. */
const translations = {
  es: {
    edition: 'LunaLibros · Edición teórica',
    spanishVersion: 'Versión en Español',
    priceLabel: 'Precio: 9 dólares con 99 centavos',
    buy: 'Comprar ahora',
    viewPdf: 'Ver PDF',
    acceptedPayments: 'Métodos de pago aceptados',
    securePayments: 'Pagos 100% seguros procesados por Lemon Squeezy. Aceptamos tarjetas de crédito, débito y PayPal.',
    checkoutNotice: 'Al hacer clic en Comprar, se abrirá una ventana de pago segura de Lemon Squeezy donde podrás ingresar los datos de tu tarjeta de crédito, débito o cuenta de PayPal para completar la compra de tu PDF.',
    contents: 'Índice',
    reading: 'Lectura',
    bookContent: 'Contenido del libro',
    sections: 'secciones',
    chapter: 'Capítulo',
    checkoutMissing: 'El enlace de checkout de Lemon Squeezy para este libro todavía no está configurado.',
    popupBlocked: 'Permite las ventanas emergentes para abrir el libro.',
    registerComingSoon: 'El registro estará disponible próximamente.',
    addBookComingSoon: 'La carga de libros estará disponible próximamente.',
  },
  en: {
    edition: 'LunaLibros · Theoretical edition',
    spanishVersion: 'English version',
    priceLabel: 'Price: 9 dollars and 99 cents',
    buy: 'Buy now',
    viewPdf: 'View PDF',
    acceptedPayments: 'Accepted payment methods',
    securePayments: '100% secure payments processed by Lemon Squeezy. We accept credit cards, debit cards, and PayPal.',
    checkoutNotice: 'When you click Buy, a secure Lemon Squeezy checkout window will open. Enter your credit or debit card details, or sign in to PayPal, to complete your PDF purchase.',
    contents: 'Contents',
    reading: 'Read',
    bookContent: 'Book contents',
    sections: 'sections',
    chapter: 'Chapter',
    checkoutMissing: 'The Lemon Squeezy checkout link for this book has not been set up yet.',
    popupBlocked: 'Please allow pop-ups to open the book.',
    registerComingSoon: 'Registration will be available soon.',
    addBookComingSoon: 'Book uploads will be available soon.',
  },
  pt: {
    edition: 'LunaLibros · Edição teórica',
    spanishVersion: 'Versão em português',
    priceLabel: 'Preço: 9 dólares e 99 centavos',
    buy: 'Comprar agora',
    viewPdf: 'Ver PDF',
    acceptedPayments: 'Formas de pagamento aceitas',
    securePayments: 'Pagamentos 100% seguros processados pela Lemon Squeezy. Aceitamos cartões de crédito, débito e PayPal.',
    checkoutNotice: 'Ao clicar em Comprar, uma janela segura da Lemon Squeezy será aberta. Informe os dados do cartão ou acesse sua conta PayPal para concluir a compra do PDF.',
    contents: 'Sumário',
    reading: 'Leitura',
    bookContent: 'Conteúdo do livro',
    sections: 'seções',
    chapter: 'Capítulo',
    checkoutMissing: 'O link de checkout da Lemon Squeezy para este livro ainda não foi configurado.',
    popupBlocked: 'Permita janelas pop-up para abrir o livro.',
    registerComingSoon: 'O cadastro estará disponível em breve.',
    addBookComingSoon: 'O envio de livros estará disponível em breve.',
  },
} satisfies Record<Language, Record<string, string>>;

/** Carga una selección de idioma válida del almacenamiento local. */
function getSavedLanguage(): Language {
  try {
    const saved = localStorage.getItem('luna-language');
    return saved === 'en' || saved === 'pt' || saved === 'es' ? saved : 'es';
  } catch {
    return 'es';
  }
}

/** Presenta una portada tipográfica localizada. */
function BookCover({
  title,
  subtitle,
  color,
  editionLabel,
  versionLabel,
}: {
  title: string;
  subtitle: string;
  color: string;
  editionLabel: string;
  versionLabel: string;
}) {
  return (
    <div
      className="flex min-h-[300px] flex-col justify-between overflow-hidden rounded-2xl p-7 text-white shadow-xl"
      style={{ background: `linear-gradient(145deg, ${color}, #172554)` }}
    >
      <span className="text-xs font-semibold uppercase tracking-[0.28em] text-white/75">{editionLabel}</span>
      <div>
        <div className="mb-4 h-1 w-12 rounded-full bg-amber-300" />
        <h2 className="max-w-sm text-3xl font-black uppercase leading-tight tracking-tight">{title}</h2>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/80">{subtitle}</p>
      </div>
      <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/70">{versionLabel}</span>
    </div>
  );
}

/** Expone el contenido completo de un capítulo al desplegarlo. */
function Chapter({
  number,
  title,
  text,
  chapterLabel,
}: {
  number: number;
  title: string;
  text: string;
  chapterLabel: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <section className="border-b border-slate-200 last:border-0">
      <button
        type="button"
        onClick={() => setOpen(value => !value)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 py-4 text-left"
      >
        <span className="font-semibold text-slate-800">{number === 0 ? title : `${chapterLabel} ${number}: ${title}`}</span>
        <span aria-hidden="true" className="shrink-0 text-xl text-indigo-700">{open ? '−' : '+'}</span>
      </button>
      {open && <div className="whitespace-pre-line pb-5 text-sm leading-7 text-slate-600">{text}</div>}
    </section>
  );
}

/** Muestra los detalles, el índice y los capítulos de una edición. */
function BookEditionCard({
  book,
  language,
  isAdmin,
  onBuy,
  onViewPdf,
}: {
  book: (typeof books)[number];
  language: Language;
  isAdmin: boolean;
  onBuy: () => void;
  onViewPdf: () => void;
}) {
  const contentLanguage: ContentLanguage = language;
  const translationsByLanguage = book.translations as
    | Partial<Record<ContentLanguage, BookContent & { chapters?: BookContent['chapters'] }>>
    | undefined;
  const localized = translationsByLanguage?.[contentLanguage];

  const content: BookContent = localized
    ? {
        title: localized.title,
        subtitle: localized.subtitle,
        versionLabel: localized.versionLabel,
        coverTitle: localized.coverTitle,
        coverSubtitle: localized.coverSubtitle,
        tableOfContents: localized.tableOfContents,
        chapters: localized.chapters,
      }
    : {
        title: book.title,
        subtitle: book.subtitle,
        versionLabel: language === 'es' ? book.versionLabel : language === 'pt' ? 'Versão em português' : 'English version',
        coverTitle: book.coverData.title,
        coverSubtitle: book.coverData.subtitle,
        tableOfContents: book.tableOfContents,
        chapters: book.content,
      };

  const text = translations[language];

  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_60px_-35px_rgba(15,23,42,0.3)]">
      <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-10">
        <BookCover
          title={content.coverTitle}
          subtitle={content.coverSubtitle}
          color={book.coverData.themeColor}
          editionLabel={text.edition}
          versionLabel={content.versionLabel}
        />
        <div className="flex flex-col justify-center">
          <span className="mb-3 inline-flex w-fit rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-indigo-700">
            {content.versionLabel}
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-slate-950">{content.title}</h2>
          <p className="mt-3 text-base leading-7 text-slate-600">{content.subtitle}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="rounded-xl bg-slate-100 px-4 py-3 text-xl font-black text-slate-950" aria-label={text.priceLabel}>
              US$9.99
            </span>
            <button
              type="button"
              onClick={onBuy}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-indigo-700 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-900/20 transition hover:-translate-y-0.5 hover:bg-indigo-800 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
            >
              <ShoppingCart size={18} aria-hidden="true" />
              {text.buy}
            </button>
            {isAdmin && (
              <button
                type="button"
                onClick={onViewPdf}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-transparent px-5 py-3 text-sm font-bold text-slate-800 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
              >
                <Eye size={17} aria-hidden="true" />
                {text.viewPdf}
              </button>
            )}
          </div>
          <div className="mt-3 max-w-xl">
            <div className="flex flex-wrap items-center gap-2" aria-label={text.acceptedPayments}>
              <span className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-black italic text-blue-800">VISA</span>
              <span className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-bold text-slate-700">
                <span className="flex -space-x-1" aria-hidden="true">
                  <span className="h-3 w-3 rounded-full bg-red-500" />
                  <span className="h-3 w-3 rounded-full bg-amber-400/90" />
                </span>
                Mastercard
              </span>
              <span className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-black italic text-blue-700">PayPal</span>
              <CreditCard size={15} className="text-slate-500" aria-hidden="true" />
            </div>
            <p className="mt-2 text-xs leading-5 text-slate-500">{text.securePayments}</p>
            <p className="mt-2 text-xs leading-5 text-slate-500">{text.checkoutNotice}</p>
          </div>
          <div className="mt-7 rounded-2xl bg-amber-50 p-5">
            <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-amber-800">{text.contents}</h3>
            <ol className="mt-3 space-y-2">
              {content.tableOfContents.map((item, index) => (
                <li key={`${book.id}-toc-${index}`} className="flex gap-3 text-sm leading-6 text-slate-700">
                  <span className="font-bold text-amber-700">{String(index + 1).padStart(2, '0')}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-100 bg-slate-50/70 px-5 py-6 sm:px-8">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-700">{text.reading}</p>
            <h3 className="mt-1 text-xl font-bold text-slate-900">{text.bookContent}</h3>
          </div>
          <span className="text-sm text-slate-500">{content.chapters.length} {text.sections}</span>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white px-5">
          {content.chapters.map(chapter => (
            <Chapter
              key={`${book.id}-chapter-${chapter.chapterNumber}`}
              number={chapter.chapterNumber}
              title={chapter.title}
              text={chapter.text}
              chapterLabel={text.chapter}
            />
          ))}
        </div>
      </div>
    </article>
  );
}

/** Presenta el catálogo y las acciones de compra y vista previa. */
export default function App() {
  const [lang, setLang] = useState<Language>(getSavedLanguage);
  const [isAdmin] = useState(() => localStorage.getItem('isAdmin') === '1');
  const [registerOpen, setRegisterOpen] = useState(false);
  const text = translations[lang];

  /** Cambia idioma, persiste la selección y actualiza instantáneamente la interfaz. */
  function handleSetLanguage(language: Language) {
    setLang(language);
    try {
      localStorage.setItem('luna-language', language);
    } catch {
      /* La selección permanece activa aunque el almacenamiento esté bloqueado. */
    }
  }

  /** Abre el checkout configurado para esta edición. */
  function handleBuy(book: (typeof books)[number]) {
    if (!book.checkoutUrl) {
      window.alert(text.checkoutMissing);
      return;
    }
    window.open(book.checkoutUrl, '_blank', 'noopener,noreferrer');
  }

  /** Abre el PDF adjunto o genera una vista imprimible del contenido. */
  function handleViewPdf(book: (typeof books)[number]) {
    if (book.pdfUrl) {
      window.open(book.pdfUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      window.alert(text.popupBlocked);
      return;
    }

    const localized = (book.translations as
      | Partial<Record<ContentLanguage, BookContent & { chapters?: BookContent['chapters'] }>>
      | undefined)?.[lang];
    const title = localized?.title ?? book.title;
    const subtitle = localized?.subtitle ?? book.subtitle;
    const chapters = localized?.chapters ?? book.content;
    const chapterMarkup = chapters.map(chapter => `
      <section>
        <h2>${chapter.chapterNumber === 0 ? '' : `${text.chapter} ${chapter.chapterNumber}: `}${escapeHtml(chapter.title)}</h2>
        <p>${escapeHtml(chapter.text).replace(/\n/g, '<br />')}</p>
      </section>
    `).join('');

    printWindow.document.write(`<!doctype html>
      <html lang="${lang}">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>${escapeHtml(title)}</title>
          <style>body{max-width:760px;margin:48px auto;padding:0 28px;color:#263247;font:16px/1.8 Georgia,serif}h1,h2{font-family:Arial,sans-serif;color:#172033}h1{font-size:34px}h2{margin-top:32px;font-size:22px}@media print{body{margin:20mm auto}}</style>
        </head>
        <body>
          <p>${escapeHtml(text.edition)}</p>
          <h1>${escapeHtml(title)}</h1>
          <p>${escapeHtml(subtitle)}</p>
          ${chapterMarkup}
          <script>window.onload=()=>window.print();</script>
        </body>
      </html>`);
    printWindow.document.close();
  }

  const displayedBooks = lang === 'pt'
    ? portugueseBooks.map(portugueseBook => ({
        ...portugueseBook,
        subtitle: portugueseBook.description,
        coverData: {
          title: portugueseBook.title,
          subtitle: portugueseBook.description,
          themeColor: '#166534',
        },
        tableOfContents: ['Introdução', ...getPortugueseSections(portugueseBook.content)],
        content: getPortugueseChapters(portugueseBook.content),
        translations: undefined,
        versionLabel: 'Versão em português',
      }))
    : books;

  return (
    <div lang={lang} className="min-h-screen bg-[#f5f7fb] text-slate-900">
      <Header
        lang={lang}
        onSetLang={handleSetLanguage}
        onOpenRegister={() => setRegisterOpen(true)}
        onOpenAddBook={() => window.alert(text.addBookComingSoon)}
      />
      <section className="bg-[#111827] px-5 pb-9 pt-3 sm:px-6 sm:pb-12">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-white/10 bg-black shadow-[0_24px_70px_-32px_rgba(0,0,0,.7)]">
          <video
            controls
            playsInline
            preload="metadata"
            width="100%"
            className="block aspect-video w-full bg-black object-contain"
            aria-label={lang === 'es' ? 'Video de presentación de LunaLibros' : lang === 'pt' ? 'Vídeo de apresentação da LunaLibros' : 'LunaLibros presentation video'}
          >
            <source src="https://01m4maqvx05cnt5fkxefwk1ajn.vojk.siderusercontent.com/video-presentacion/video.mp4" type="video/mp4" />
            {lang === 'es' ? 'Tu navegador no admite la reproducción de video.' : lang === 'pt' ? 'Seu navegador não oferece suporte à reprodução de vídeo.' : 'Your browser does not support video playback.'}
          </video>
        </div>
      </section>
      <RegisterModal open={registerOpen} onClose={() => setRegisterOpen(false)} lang={lang} />
      <main id="catalog" className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
        <section className="mb-10 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-indigo-700">
            {lang === 'es' ? 'Biblioteca editorial' : lang === 'pt' ? 'Biblioteca editorial' : 'Editorial library'}
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
            {lang === 'es' ? 'Ideas para una vida financiera más serena.' : lang === 'pt' ? 'Ideias para uma vida financeira mais tranquila.' : 'Ideas for a calmer financial life.'}
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            {lang === 'es'
              ? 'Lecturas claras y reflexivas para comprender tus hábitos, cuidar tus decisiones y construir libertad con el tiempo.'
              : lang === 'pt'
                ? 'Leituras claras e reflexivas para compreender seus hábitos, cuidar das suas decisões e construir liberdade com o tempo.'
                : 'Clear, thoughtful reading to understand your habits, make confident choices, and build lasting financial freedom.'}
          </p>
        </section>
        <div className="space-y-8">
          {displayedBooks.map(book => (
            <BookEditionCard
              key={book.id}
              book={book as (typeof books)[number]}
              language={lang}
              isAdmin={isAdmin}
              onBuy={() => handleBuy(book as (typeof books)[number])}
              onViewPdf={() => handleViewPdf(book as (typeof books)[number])}
            />
          ))}
        </div>
      </main>
      <footer className="border-t border-slate-200 bg-white px-5 py-8 text-center text-sm text-slate-500">
        {lang === 'es'
          ? '© 2026 LunaLibros · Educación financiera para decisiones con propósito.'
          : lang === 'pt'
            ? '© 2026 LunaLibros · Educação financeira para decisões com propósito.'
            : '© 2026 LunaLibros · Financial education for more purposeful decisions.'}
      </footer>
    </div>
  );
}

/** Extrae os títulos de seção do ebook HTML para formar o índice. */
function getPortugueseSections(content: string): string[] {
  const matches = Array.from(content.matchAll(/<h2>(.*?)<\/h2>/g));
  return matches.map(match => stripHtml(match[1]));
}

/** Converte os títulos e textos das seções em capítulos expansíveis. */
function getPortugueseChapters(content: string): BookContent['chapters'] {
  const sections = Array.from(content.matchAll(/<h2>(.*?)<\/h2>([\s\S]*?)(?=<h2>|$)/g));
  return sections.map((section, index) => ({
    chapterNumber: index,
    title: stripHtml(section[1]),
    text: stripHtml(section[2]).trim(),
  }));
}

/** Retira tags y convierte entidades básicas del HTML editorial en texto. */
function stripHtml(value: string): string {
  return value
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

/** Escapa contenido editorial antes de insertarlo en la vista imprimible. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
