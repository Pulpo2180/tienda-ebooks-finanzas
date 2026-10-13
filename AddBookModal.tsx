/**
 * src/components/AddBookModal.tsx
 * Modal para agregar un nuevo libro (título, descripción, contenido, portada, idioma).
 */

import React, { useState } from 'react';
import { addBook } from '../lib/db';
import { Book } from '../lib/data';
import { v4 as uuidv4 } from 'uuid';

/**
 * Nota: la función uuidv4 se implementa manualmente si la dependencia no existe.
 * Como no podemos instalar paquetes en la versión gratuita, incluimos una alternativa simple.
 */
/** Generador simple de id (no CRYPTO-STRONG pero suficiente para esta app) */
function simpleId(prefix = 'book') {
  return prefix + '-' + Math.random().toString(36).slice(2, 9);
}

type LangCode = 'en' | 'es' | 'pt' | 'uy';

type Props = {
  open: boolean;
  onClose: () => void;
  lang: LangCode;
};

/**
 * AddBookModal: formulario que permite añadir un libro a la base local.
 */
export default function AddBookModal({ open, onClose, lang }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [cover, setCover] = useState('');
  const [content, setContent] = useState('');
  const [bookLang, setBookLang] = useState<'es' | 'en'>('es');

  if (!open) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newBook: Book = {
      id: simpleId('book'),
      title: title || (bookLang === 'es' ? 'Nuevo Libro' : 'New Book'),
      description: description || '',
      content: content || '<p>Contenido pendiente.</p>',
      cover:
        cover ||
        'https://pub-cdn.sider.ai/u/U0X7H47829Y/web-coder/6a399748a419c8a5108fef65/resource/7c368db9-e3d5-411e-8862-bc2cf214e54f.jpg',
      lang: bookLang,
      price: 9.99,
    };
    addBook(newBook);
    alert(lang === 'es' ? 'Libro agregado. Puedes escribir su contenido y editarlo después.' : 'Book added. You can write its content later.');
    setTitle('');
    setDescription('');
    setCover('');
    setContent('');
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-40">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">{lang === 'es' ? 'Agregar libro' : 'Add book'}</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder={lang === 'es' ? 'Título' : 'Title'} className="border rounded px-3 py-2" />
          <select value={bookLang} onChange={e => setBookLang(e.target.value as 'es' | 'en')} className="border rounded px-3 py-2">
            <option value="es">Español</option>
            <option value="en">English</option>
          </select>
          <input value={cover} onChange={e => setCover(e.target.value)} placeholder={lang === 'es' ? 'URL de portada (opcional)' : 'Cover URL (optional)'} className="border rounded px-3 py-2 md:col-span-2" />
          <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder={lang === 'es' ? 'Breve descripción' : 'Short description'} className="border rounded px-3 py-2 md:col-span-2" />
          <textarea value={content} onChange={e => setContent(e.target.value)} placeholder={lang === 'es' ? 'Contenido completo (HTML permitido)' : 'Full content (HTML allowed)'} className="border rounded px-3 py-2 md:col-span-2 h-40" />
          <div className="md:col-span-2 flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-3 py-2 bg-gray-100 rounded">{lang === 'es' ? 'Cancelar' : 'Cancel'}</button>
            <button type="submit" className="px-3 py-2 bg-indigo-600 text-white rounded">{lang === 'es' ? 'Agregar libro' : 'Add book'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}