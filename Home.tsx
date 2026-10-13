/**
 * Presenta la tienda multilingüe y el panel local de revisión editorial.
 */

import React, { useEffect, useMemo, useState } from 'react';
import { Download, Eye, FileText, ShieldCheck } from 'lucide-react';
import Header from '../components/Header';
import BookCard from '../components/BookCard';
import RegisterModal from '../components/RegisterModal';
import AddBookModal from '../components/AddBookModal';
import { getBooks, saveBooks } from '../lib/db';
import { Book } from '../lib/data';
import { portugueseBooks } from '../lib/portugueseBooks';

type LangCode = 'en' | 'es' | 'pt';

/**
 * Convierte contenido HTML editorial en texto para el archivo de descarga.
 * @param book Libro que se descargará.
 */
function downloadBook(book: Book): void {
  const documentHtml = `<!doctype html>
<html lang="${book.lang}">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${book.title}</title>
<style>
body{max-width:760px;margin:48px auto;padding:0 28px;color:#243047;font:16px/1.8 Georgia,serif}
.edition-label{margin-bottom:22px;color:#8b6b2f;font:bold 12px Arial,sans-serif;letter-spacing:.14em;text-transform:uppercase}
h1,h2{font-family:Arial,sans-serif;color:#172033}
h1{font-size:34px}h2{margin-top:30px;font-size:22px}
</style>
</head>
<body>${book.content}</body>
</html>`;
  const blob = new Blob([documentHtml], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `${book.title.replace(/[^a-z0-9]+/gi, '-')}.html`;
  anchor.click();
  URL.revokeObjectURL(url);
}

/**
 * Presenta una ventana editorial con vista previa y opción de imprimir como PDF.
 * @param props Libro seleccionado y acciones disponibles.
 */
function ReviewModal({
  book,
  onClose,
  onDownload,
  lang,
}: {
  book: Book;
  onClose: () => void;
  onDownload: (book: Book) => void;
  lang: LangCode;
}) {
  const labels = {
    es: { preview: 'Vista previa editorial', close: 'Cerrar', download: 'Descargar / imprimir PDF' },
    en: { preview: 'Editorial preview', close: 'Close', download: 'Download / print PDF' },
    pt: { preview: 'Prévia editorial', close: 'Fechar', download: 'Baixar / imprimir PDF' },
  }[lang];

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/70 p-4">
      <section className="max-h-[92vh] w-full max-w-4xl overflow-auto rounded-3xl bg-[#f8f6f0] shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-stone-200 bg-white/95 px-6 py-4 backdrop-blur">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-700">{labels.preview}</p>
            <h2 className="mt-1 text-lg font-bold text-slate-900">{book.title}</h2>
          </div>
          <button type="button" onClick={onClose} className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
            {labels.close}
          </button>
        </div>
        <article className="mx-auto my-8 max-w-2xl bg-white px-8 py-10 shadow-lg sm:px-14">
          <img src={book.cover} alt={book.title} className="mb-8 h-64 w-full rounded-xl object-cover" />
          <div className="book-preview leading-8 text-slate-700" dangerouslySetInnerHTML={{ __html: book.content }} />
        </article>
        <div className="flex flex-wrap justify-end gap-3 border-t border-stone-200 bg-white px-6 py-4">
          <button type="button" onClick={onClose} className="rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700">
            {labels.close}
          </button>
          <button type="button" onClick={() => onDownload(book)} className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-slate-800">
            <Download size={16} />{labels.download}
          </button>
        </div>
      </section>
    </div>
  );
}

/**
 * Muestra libros, acciones de compra y herramientas de administración.
 */
export default function Home() {
  const [lang, setLang] = useState<LangCode>(() => {
    const stored = localStorage.getItem('store_lang');
    return stored === 'en' || stored === 'pt' || stored === 'es' ? stored : 'es';
  });
  const [books, setBooks] = useState<Book[]>([]);
  const [reviewBook, setReviewBook] = useState<Book | null>(null);
  const [regOpen, setRegOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem('isAdmin') === '1');

  useEffect(() => {
    localStorage.setItem('store_lang', lang);
  }, [lang]);

  useEffect(() => {
    setBooks([...getBooks(), ...portugueseBooks]);
  }, [regOpen, addOpen]);

  const visibleBooks = useMemo(
    () => books.filter(book => book.lang === lang || isAdmin),
    [books, isAdmin, lang],
  );

  /**
   * Alterna el estado editorial; la vista previa y la impresión quedan disponibles
   * al entrar en revisión o al publicar.
   * @param bookId Identificador del libro.
   */
  function toggleReview(bookId: string): void {
    const updated = books.map(book => {
      if (book.id !== bookId) return book;
      const nextStatus = book.reviewStatus === 'review' ? 'draft' : 'review';
      return { ...book, reviewStatus: nextStatus };
    });
    setBooks(updated);
    saveBooks(updated);
  }

  /**
   * Abre el flujo de pago de demostración de PayPal.
   * @param book Libro que se desea comprar.
   */
  function handleBuy(book: Book): void {
    const business = encodeURIComponent('lunamanchi9@gmail.com');
    const returnUrl = encodeURIComponent(window.location.href);
    const paypalUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${business}&amount=${book.price.toFixed(2)}&currency_code=USD&item_name=${encodeURIComponent(book.title)}&return=${returnUrl}`;
    window.open(paypalUrl, '_blank', 'noopener,noreferrer');
  }

  const copy = {
    es: {
      eyebrow: 'Biblioteca digital · Finanzas personales',
      title: 'Ideas claras. Mejores decisiones.',
      description: 'Guías prácticas para construir una relación más consciente y segura con tu dinero.',
      catalog: 'Catálogo',
      admin: 'Panel editorial',
      review: 'Pasar a revisión',
      reviewing: 'En revisión · Borrador',
      preview: 'Vista previa',
      note: 'Las versiones traducidas comparten portada. Los textos dentro de la imagen requieren portadas editables para traducirse.',
    },
    en: {
      eyebrow: 'Digital library · Personal finance',
      title: 'Clear ideas. Better decisions.',
      description: 'Practical guides to build a more confident and thoughtful relationship with money.',
      catalog: 'Library',
      admin: 'Editorial panel',
      review: 'Send to review',
      reviewing: 'In review · Draft',
      preview: 'Preview',
      note: 'Translated editions share the original cover. Text embedded in the image requires editable cover artwork to translate.',
    },
    pt: {
      eyebrow: 'Biblioteca digital · Finanças pessoais',
      title: 'Ideias claras. Melhores decisões.',
      description: 'Guias práticos para construir uma relação mais consciente e segura com o seu dinheiro.',
      catalog: 'Catálogo',
      admin: 'Painel editorial',
      review: 'Enviar para revisão',
      reviewing: 'Em revisão · Rascunho',
      preview: 'Prévia',
      note: 'As versões traduzidas compartilham a capa original. Textos incorporados à imagem exigem arquivos editáveis para tradução.',
    },
  }[lang];

  return (
    <div className="min-h-screen bg-[#f5f3ed] text-slate-900">
      <Header
        lang={lang}
        onSetLang={setLang}
        onOpenRegister={() => setRegOpen(true)}
        onOpenAddBook={() => setAddOpen(true)}
      />

      <main>
        <section className="relative overflow-hidden bg-[#111b2d] text-white">
          <div className="absolute -right-16 -top-36 h-96 w-96 rounded-full bg-amber-400/15 blur-3xl" />
          <div className="absolute -bottom-36 left-1/4 h-80 w-80 rounded-full bg-sky-400/10 blur-3xl" />
          <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-[1.2fr_.8fr] md:items-center md:py-24">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-amber-300">{copy.eyebrow}</p>
              <h1 className="mt-5 max-w-2xl text-4xl font-bold leading-tight tracking-tight sm:text-6xl">{copy.title}</h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-slate-300">{copy.description}</p>
              <a href="#catalog" className="mt-8 inline-flex rounded-xl bg-amber-400 px-5 py-3 font-bold text-slate-950 transition hover:bg-amber-300">
                {copy.catalog}
              </a>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-7 backdrop-blur">
              <div className="flex items-center gap-4">
                <div className="rounded-2xl bg-amber-300 p-3 text-slate-950"><FileText size={25} /></div>
                <div>
                  <p className="font-bold">{copy.admin}</p>
                  <p className="mt-1 text-sm text-slate-300">ES · EN · PT</p>
                </div>
              </div>
              <p className="mt-5 text-sm leading-6 text-slate-300">{copy.note}</p>
              <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-emerald-300">
                <ShieldCheck size={16} /> {isAdmin ? 'Admin mode' : 'Editorial workflow'}
              </div>
            </div>
          </div>
        </section>

        <section id="catalog" className="mx-auto max-w-6xl px-6 py-14">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">{copy.catalog}</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight">{copy.title}</h2>
            </div>
            <p className="text-sm text-slate-500">{visibleBooks.length} ebooks</p>
          </div>

          {isAdmin && (
            <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="font-bold">{copy.admin}</h3>
              <p className="mt-1 text-sm text-slate-500">Marca una edición para revisión y abre su vista previa imprimible.</p>
              <div className="mt-4 divide-y divide-slate-100">
                {books.map(book => {
                  const inReview = book.reviewStatus === 'review';
                  return (
                    <div key={book.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                      <div>
                        <p className="font-semibold">{book.title}</p>
                        <p className="text-xs uppercase tracking-wider text-slate-500">{book.lang} · {book.seriesId}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => toggleReview(book.id)}
                          className={`rounded-lg px-3 py-2 text-xs font-bold transition ${inReview ? 'bg-amber-300 text-amber-950' : 'bg-slate-100 text-slate-700 hover:bg-amber-100'}`}
                        >
                          {inReview ? copy.reviewing : copy.review}
                        </button>
                        {inReview && (
                          <button
                            type="button"
                            onClick={() => setReviewBook(book)}
                            className="inline-flex items-center gap-1 rounded-lg bg-slate-950 px-3 py-2 text-xs font-bold text-white hover:bg-slate-800"
                          >
                            <Eye size={14} />{copy.preview}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleBooks.map(book => (
              <BookCard key={book.id} book={book} lang={lang} onPreview={() => setReviewBook(book)} onBuy={handleBuy} />
            ))}
          </div>
        </section>
      </main>

      {reviewBook && (
        <ReviewModal
          book={reviewBook}
          lang={lang}
          onClose={() => setReviewBook(null)}
          onDownload={downloadBook}
        />
      )}
      <RegisterModal open={regOpen} onClose={() => setRegOpen(false)} lang={lang} />
      <AddBookModal open={addOpen} onClose={() => setAddOpen(false)} lang={lang} />
    </div>
  );
}
