/**
 * Cabecera de Luna Libros con navegación, selector de idioma y menú informativo.
 */
import { useEffect, useState } from 'react';
import { ChevronDown, Globe2, MoonStar } from 'lucide-react';

type LangCode = 'en' | 'es' | 'pt';

/** Propiedades de la cabecera y sus acciones. */
interface Props {
  /** Idioma activo en la tienda. */
  lang: LangCode;
  /** Actualiza el idioma activo. */
  onSetLang: (language: LangCode) => void;
  /** Abre el registro. */
  onOpenRegister: () => void;
  /** Abre el formulario para agregar un libro. */
  onOpenAddBook: () => void;
}

/** Opción disponible en el selector de idiomas. */
interface LanguageOption {
  /** Código del idioma. */
  code: LangCode;
  /** Nombre visible del idioma. */
  label: string;
  /** URL de la bandera correspondiente. */
  flagUrl: string;
}

/** Presenta la bandera y el nombre de un idioma. */
function LanguageLabel({ flagUrl, label }: { flagUrl: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <img src={flagUrl} alt="" aria-hidden="true" width="24" height="18" className="h-[18px] w-6 rounded-sm object-cover" />
      <span>{label}</span>
    </span>
  );
}

/** Muestra el contenido editorial completo de Luna Libros. */
function AboutMenuContent() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <section>
        <h3 className="text-xs font-black uppercase tracking-[0.16em] text-[#D7FF3F]">¿QUIÉNES SOMOS? - LUNA LIBROS</h3>
        <p className="mt-2 text-sm leading-6 text-slate-200">
          En Luna Libros somos una tienda online especializada en ebooks de Finanzas Personales, plantillas en Excel y mucho más. Nuestro compromiso es enseñar sobre finanzas personales de forma simple, práctica y accesible, para que cualquier persona pueda tomar el control de su dinero, salir de deudas, ahorrar e invertir con confianza.
        </p>
      </section>
      <section>
        <h3 className="text-xs font-black uppercase tracking-[0.16em] text-[#26C6B8]">NUESTRA MISIÓN - LUNA LIBROS</h3>
        <p className="mt-2 text-sm leading-6 text-slate-200">
          Empoderar a las personas a través de la educación financiera, brindándoles herramientas prácticas como ebooks y plantillas en Excel que les permitan organizar sus finanzas, tomar decisiones inteligentes y construir una vida financiera saludable y libre de estrés.
        </p>
      </section>
      <section>
        <h3 className="text-xs font-black uppercase tracking-[0.16em] text-[#26C6B8]">NUESTRA VISIÓN - LUNA LIBROS</h3>
        <p className="mt-2 text-sm leading-6 text-slate-200">
          Ser la tienda online de referencia en educación financiera en habla hispana, reconocida por transformar la relación de las personas con el dinero y ayudar a miles de familias a lograr libertad y bienestar financiero.
        </p>
      </section>
      <section>
        <h3 className="text-xs font-black uppercase tracking-[0.16em] text-[#26C6B8]">NUESTROS VALORES - LUNA LIBROS</h3>
        <ol className="mt-2 space-y-1.5 text-sm leading-5 text-slate-200">
          <li>1. Educación: Creemos que el conocimiento financiero debe ser para todos.</li>
          <li>2. Accesibilidad: Creamos recursos simples, prácticos y a precios justos.</li>
          <li>3. Compromiso: Acompañamos a cada cliente en su camino financiero.</li>
          <li>4. Transparencia: Hablamos de dinero de forma clara, honesta y sin letra chica.</li>
          <li>5. Empoderamiento: Queremos que tomes el control total de tus finanzas.</li>
          <li>6. Calidad: Ofrecemos contenido actualizado, útil y de alto valor.</li>
        </ol>
      </section>
    </div>
  );
}

/** Renderiza navegación de marca, menús desplegables y acciones. */
export default function Header({ lang, onSetLang, onOpenRegister, onOpenAddBook }: Props) {
  const [isAdmin, setIsAdmin] = useState<boolean>(() => localStorage.getItem('isAdmin') === '1');
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [aboutMenuOpen, setAboutMenuOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('isAdmin', isAdmin ? '1' : '0');
  }, [isAdmin]);

  /** Cambia el modo administrador persistido en el navegador. */
  function handleToggleAdmin() {
    setIsAdmin(previous => !previous);
  }

  /** Cambia el idioma activo y cierra su selector. */
  function handleSelectLanguage(language: LangCode) {
    onSetLang(language);
    setLanguageMenuOpen(false);
  }

  const storeName = lang === 'es' ? 'LunaLibros' : 'LunaBooks';
  const tagline = lang === 'es'
    ? 'Ideas claras. Decisiones con propósito.'
    : lang === 'pt'
      ? 'Ideias claras. Decisões com propósito.'
      : 'Clear ideas. More confident choices.';

  const languages: LanguageOption[] = [
    { code: 'es', label: 'Español', flagUrl: 'https://flagcdn.com/w40/es.png' },
    { code: 'en', label: 'English', flagUrl: 'https://flagcdn.com/w40/us.png' },
    { code: 'pt', label: 'Português', flagUrl: 'https://flagcdn.com/w40/br.png' },
  ];
  const activeLanguage = languages.find(language => language.code === lang) ?? languages[0];

  return (
    <header className="relative z-40 border-b border-white/10 bg-[#111827] text-white shadow-[0_12px_40px_-24px_rgba(17,24,39,.8)]">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 px-5 py-4 sm:px-6 lg:flex-row lg:justify-between lg:gap-8">
        <a href="#catalog" className="group mx-auto w-fit rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D7FF3F] lg:mx-0">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#D7FF3F] text-[#111827]">
              <MoonStar size={23} strokeWidth={2.4} aria-hidden="true" />
            </span>
            <span>
              <span className="block text-xl font-black tracking-tight sm:text-2xl">{storeName}</span>
              <span className="mt-0.5 block text-xs font-medium tracking-wide text-slate-300">{tagline}</span>
            </span>
          </div>
        </a>

        <nav aria-label="Navegación principal" className="flex w-full flex-wrap items-center justify-center gap-2 sm:gap-3 lg:w-auto lg:justify-end">
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setAboutMenuOpen(open => !open);
                setLanguageMenuOpen(false);
              }}
              aria-haspopup="dialog"
              aria-expanded={aboutMenuOpen}
              className="flex min-h-11 max-w-full items-center justify-center gap-2 whitespace-normal rounded-xl border border-white/20 bg-white/[0.09] px-5 py-2.5 text-center text-sm font-semibold leading-5 text-white transition hover:border-[#D7FF3F]/60 hover:bg-white/[0.14] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D7FF3F]"
            >
              <span>¿Quiénes somos?</span>
              <ChevronDown size={15} aria-hidden="true" className={`shrink-0 text-[#D7FF3F] transition-transform ${aboutMenuOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setLanguageMenuOpen(open => !open);
                setAboutMenuOpen(false);
              }}
              aria-haspopup="listbox"
              aria-expanded={languageMenuOpen}
              className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/15 bg-white/[0.07] px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-white/[0.12]"
            >
              <Globe2 size={16} className="text-[#26C6B8]" aria-hidden="true" />
              <LanguageLabel flagUrl={activeLanguage.flagUrl} label={activeLanguage.label} />
              <ChevronDown size={15} aria-hidden="true" className={`text-slate-300 transition-transform ${languageMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            {languageMenuOpen && (
              <div role="listbox" aria-label="Seleccionar idioma" className="absolute right-0 top-full z-[70] mt-2 min-w-full overflow-hidden rounded-xl border border-slate-200 bg-white py-1 text-slate-800 shadow-2xl">
                {languages.map(language => (
                  <button
                    key={language.code}
                    type="button"
                    role="option"
                    aria-selected={lang === language.code}
                    onClick={() => handleSelectLanguage(language.code)}
                    className="flex w-full items-center px-4 py-2.5 text-left text-sm hover:bg-violet-50"
                  >
                    <LanguageLabel flagUrl={language.flagUrl} label={language.label} />
                  </button>
                ))}
              </div>
            )}
          </div>

          <button type="button" onClick={onOpenAddBook} className="min-h-11 rounded-xl border border-white/15 bg-white/[0.07] px-3.5 py-2.5 text-sm font-semibold text-white">
            {lang === 'es' ? 'Agregar libro' : lang === 'pt' ? 'Adicionar livro' : 'Add book'}
          </button>
          <button type="button" onClick={onOpenRegister} className="min-h-11 rounded-xl border border-white/15 bg-white/[0.07] px-3.5 py-2.5 text-sm font-semibold text-white">
            {lang === 'es' ? 'Registrar' : lang === 'pt' ? 'Registrar' : 'Register'}
          </button>
          <button type="button" onClick={handleToggleAdmin} aria-pressed={isAdmin} className={`min-h-11 rounded-xl px-4 py-2.5 text-sm font-black ${isAdmin ? 'bg-[#D7FF3F] text-[#111827]' : 'border border-white/20 bg-transparent text-white'}`}>
            {isAdmin ? 'Admin ON' : 'Admin'}
          </button>
        </nav>
      </div>

      {aboutMenuOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-3 sm:p-6" onClick={() => setAboutMenuOpen(false)}>
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="about-title"
            className="relative max-h-[90vh] w-full max-w-6xl overflow-y-auto rounded-2xl border border-white/15 bg-[#172033] p-5 shadow-2xl sm:p-8"
            onClick={event => event.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between gap-4 border-b border-white/15 pb-4">
              <h2 id="about-title" className="text-lg font-black text-white sm:text-xl">¿Quiénes somos? · Luna Libros</h2>
              <button type="button" onClick={() => setAboutMenuOpen(false)} aria-label="Cerrar cartel" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/10 text-xl text-white hover:bg-white/20">
                ×
              </button>
            </div>
            <AboutMenuContent />
          </section>
        </div>
      )}
      <div className="h-px bg-gradient-to-r from-transparent via-violet-400/50 to-transparent" />
    </header>
  );
}
