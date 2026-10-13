/**
 * Página de lectura de libros con opción para guardar el contenido completo como PDF.
 */

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { getBooks } from '../lib/db';
import { Book } from '../lib/data';

/**
 * Abre una página imprimible con el libro completo para guardar o imprimir como PDF.
 */
function printBook(book: Book): void {
  const printWindow = window.open('', '_blank');

  if (!printWindow) {
    window.alert('El navegador bloqueó la ventana. Permite ventanas emergentes para este sitio y vuelve a intentarlo.');
    return;
  }

  const printableDocument = `<!doctype html>
<html lang="${book.lang}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title></title>
  <style>
    * { box-sizing: border-box; }
    body { max-width: 760px; margin: 48px auto; padding: 0 28px; color: #1e293b; font: 16px/1.8 Georgia, "Times New Roman", serif; }
    h1 { margin: 0 0 12px; color: #0f172a; font: 700 32px/1.2 Arial, sans-serif; }
    .description { margin: 0 0 32px; color: #475569; font: 15px/1.6 Arial, sans-serif; }
    h2 { margin-top: 32px; color: #0f172a; font: 700 22px/1.35 Arial, sans-serif; }
    img { max-width: 100%; height: auto; }
    @page { margin: 20mm; }
    @media print {
      body { max-width: none; margin: 0; padding: 0; }
      a { color: inherit; text-decoration: none; }
    }
  </style>
</head>
<body>
  <h1 id="book-title"></h1>
  <p class="description" id="book-description"></p>
  <article id="book-content"></article>
</body>
</html>`;

  printWindow.document.open();
  printWindow.document.write(printableDocument);
  printWindow.document.close();

  printWindow.document.title = book.title;
  const title = printWindow.document.getElementById('book-title');
  const description = printWindow.document.getElementById('book-description');
  const content = printWindow.document.getElementById('book-content');

  if (title) title.textContent = book.title;
  if (description) description.textContent = book.description;
  if (content) content.innerHTML = book.content;

  printWindow.focus();
  window.setTimeout(() => printWindow.print(), 400);
}

/**
 * Muestra el contenido íntegro del libro seleccionado y permite imprimirlo o guardarlo como PDF.
 */
export default function BookPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    const selectedBook = getBooks().find((item) => item.id === id);

    if (!selectedBook) {
      navigate('/');
      return;
    }

    setBook(selectedBook);
  }, [id, navigate]);

  if (!book) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-200">
        <p className="text-sm">Cargando libro…</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f3f1ec] px-4 py-8 text-slate-900 sm:px-6 sm:py-12">
      <article className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-xl shadow-slate-900/5">
        <header className="bg-slate-950 px-6 py-8 text-white sm:px-10 sm:py-10">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="mb-7 text-sm font-medium text-amber-300 transition hover:text-amber-200"
          >
            ← Volver a la biblioteca
          </button>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-amber-300">
            Edición digital
          </p>
          <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            {book.title}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">{book.description}</p>
        </header>

        <div className="p-6 sm:p-10">
          <section className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <div>
              <h2 className="font-semibold text-slate-900">Descargar el libro completo</h2>
              <p className="mt-1 text-sm text-slate-600">
                Abre el diálogo de impresión y selecciona «Guardar como PDF».
              </p>
            </div>
            <button
              type="button"
              onClick={() => printBook(book)}
              className="rounded-xl bg-amber-500 px-5 py-3 text-sm font-bold text-slate-950 shadow-sm transition hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
            >
              Descargar / imprimir
            </button>
          </section>

          <img
            src={book.cover}
            alt={`Portada de ${book.title}`}
            className="mb-8 h-64 w-full rounded-2xl object-cover sm:h-80"
          />

          <div
            className="book-content max-w-none space-y-5 text-base leading-8 text-slate-700 [&_h1]:mb-5 [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:leading-tight [&_h1]:text-slate-950 [&_h2]:mb-3 [&_h2]:mt-9 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-slate-900 [&_li]:ml-6 [&_li]:list-disc [&_p]:mb-4 [&_ul]:space-y-2 [&_img]:hidden"
            dangerouslySetInnerHTML={{ __html: book.content }}
          />
        </div>
      </article>
    </main>
  );
}