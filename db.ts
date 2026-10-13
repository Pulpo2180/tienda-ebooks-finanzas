/**
 * Proporciona almacenamiento local para libros y usuarios de la tienda.
 */

import { Book, initialBooks } from './data';

const BOOKS_KEY = 'bookstore_books_v1';
const USERS_KEY = 'bookstore_users_v1';

/** Describe la información de un usuario local. */
export interface User {
  /** Correo electrónico del usuario. */
  email: string;
  /** Contraseña opcional guardada en el navegador. */
  password?: string;
  /** Fecha ISO de registro. */
  createdAt: string;
}

/**
 * Lee los libros y migra registros guardados sin versiones editoriales.
 * @returns Catálogo local.
 */
export function getBooks(): Book[] {
  let saved: Book[] = [];

  try {
    const raw = localStorage.getItem(BOOKS_KEY);
    saved = raw ? (JSON.parse(raw) as Book[]) : [];
  } catch {
    saved = [];
  }

  const defaults = initialBooks.map(book => {
    const existing = saved.find(item => item.id === book.id);
    return existing
      ? {
          ...book,
          ...existing,
          content: existing.content || book.content,
          seriesId: existing.seriesId || book.seriesId,
          reviewStatus: existing.reviewStatus || book.reviewStatus,
        }
      : book;
  });

  const customBooks = saved.filter(
    savedBook => !defaults.some(book => book.id === savedBook.id),
  );
  const merged = [...defaults, ...customBooks];

  localStorage.setItem(BOOKS_KEY, JSON.stringify(merged));
  return merged;
}

/**
 * Persiste el catálogo completo en localStorage.
 * @param books Libros a guardar.
 */
export function saveBooks(books: Book[]): void {
  localStorage.setItem(BOOKS_KEY, JSON.stringify(books));
}

/**
 * Añade un libro nuevo al principio del catálogo.
 * @param book Libro que se añadirá.
 */
export function addBook(book: Book): void {
  saveBooks([book, ...getBooks()]);
}

/**
 * Devuelve los usuarios almacenados.
 * @returns Usuarios locales.
 */
export function getUsers(): User[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as User[]) : [];
  } catch {
    return [];
  }
}

/**
 * Registra o actualiza un usuario local.
 * @param email Correo electrónico.
 * @param password Contraseña opcional.
 */
export function registerUser(email: string, password?: string): void {
  const users = getUsers();
  const user = { email, password, createdAt: new Date().toISOString() };
  const index = users.findIndex(item => item.email === email);

  if (index >= 0) users[index] = user;
  else users.push(user);

  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}
