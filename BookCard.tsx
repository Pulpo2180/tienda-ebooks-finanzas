/**
 * Tarjeta editorial de catálogo con etiqueta de idioma, insignias y acciones comerciales.
 */

import React from 'react';
import { Eye, ShoppingCart, Sparkles, TrendingUp } from 'lucide-react';
import { Book } from '../lib/data';

type LangCode = 'es' | 'en' | 'pt';

interface Props {
  /** Edición editorial que se presenta en el catálogo. */
  book: Book;
  /** Idioma activo de la tienda. */
  lang: LangCode;
  /** Abre la vista previa del libro. */
  onPreview: (book: Book) => void;
  /** Inicia el flujo comercial del libro. */
  onBuy: (book: Book) => void;
}

/** Traduce el rótulo de edición para identificar claramente el idioma de la portada. */
function getEditionLabel(lang: LangCode): string {
  const labels: Record<LangCode, string> = {
    es: 'Versión en Español',
    en: 'English Version',
    pt: 'Versão em Português',
  };

  return labels[lang];
}

/** Renderiza una tarjeta de libro con jerarquía visual orientada a conversión. */
export default function BookCard({ book, lang, onPreview, onBuy }: Props) {
  const isNew = book.id === 'orcamento-dividas-pt';
  const isPopular = book.id === 'habitos-finanzas-personales-es';
  const labels = {
    es: { preview: 'Vista previa', buy: 'Comprar', new: 'Novedad', popular: 'Más vendido' },
    en: { preview: 'Preview', buy: 'Buy now', new: 'New', popular: 'Bestseller' },
    pt: { preview: 'Prévia', buy: 'Comprar', new: 'Novidade', popular: 'Mais vendido' },
  }[lang];

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#172033] text-white shadow-[0_24px_70px_-38px_rgba(0,0,0,.75)] transition duration-300 hover:-translate-y-1.5 hover:border-[#D7FF3F]/45 hover:shadow-[0_30px_80px_-38px_rgba(17,24,39,.9)]">
      <div className="relative overflow-hidden bg-[#222d43]">
        <div className="absolute left-4 top-4 z-10 rounded-full border border-white/20 bg-[#111827]/90 px-3 py-1.5 text-[11px] font-bold tracking-wide text-white shadow-lg backdrop-blur">
          {getEditionLabel(book.lang)}
        </div>
        <div className="absolute right-4 top-4 z-10 flex flex-col items-end gap-2">
          {isPopular && (
            <span className="inline-flex items-center gap-1 rounded-full bg-[#D7FF3F] px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-[#111827]">
              <TrendingUp size={12} />{labels.popular}
            </span>
          )}
          {isNew && (
            <span className="inline-flex items-center gap-1 rounded-full bg-[#26C6B8] px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-[#082b2a]">
              <Sparkles size={12} />{labels.new}
            </span>
          )}
        </div>
        <img
          src={book.cover}
          alt={`Portada: ${book.title} — ${getEditionLabel(book.lang)}`}
          className="h-72 w-full object-cover transition duration-500 ease-out group-hover:scale-[1.04] sm:h-80"
          loading="lazy"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#172033]/65 to-transparent" />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#26C6B8]">
          {getEditionLabel(book.lang)}
        </p>
        <h3 className="mt-2 text-xl font-extrabold leading-snug tracking-tight text-white">{book.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-6 text-slate-300">{book.description}</p>

        <div className="mt-6 flex items-center justify-between gap-3 border-t border-white/10 pt-5">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
              {lang === 'es' ? 'Edición digital' : lang === 'pt' ? 'Edição digital' : 'Digital edition'}
            </p>
            <p className="mt-1 text-2xl font-black tracking-tight text-[#D7FF3F]">${book.price.toFixed(2)}</p>
          </div>
          <div className="flex flex-wrap justify-end gap-2">
            <button
              type="button"
              onClick={() => onPreview(book)}
              aria-label={`${labels.preview}: ${book.title}`}
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-transparent px-3 py-2.5 text-xs font-bold text-white transition hover:border-white/50 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#26C6B8]"
            >
              <Eye size={15} aria-hidden="true" />
              <span className="hidden sm:inline">{labels.preview}</span>
            </button>
            <button
              type="button"
              onClick={() => onBuy(book)}
              aria-label={`${labels.buy}: ${book.title}`}
              className="inline-flex items-center gap-2 rounded-xl bg-[#D7FF3F] px-3.5 py-2.5 text-xs font-black text-[#111827] transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#D7FF3F] focus:ring-offset-2 focus:ring-offset-[#172033]"
            >
              <ShoppingCart size={15} aria-hidden="true" />
              {labels.buy}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}