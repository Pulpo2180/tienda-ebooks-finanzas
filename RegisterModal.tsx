
/**
 * Presenta un formulario de registro gratuito con correo y contraseña.
 */
import { useEffect, useRef, useState } from 'react';
import { Check, LockKeyhole, Mail, X } from 'lucide-react';

type LangCode = 'en' | 'es' | 'pt';

/** Propiedades del modal de registro. */
interface Props {
  open: boolean;
  onClose: () => void;
  lang: LangCode;
}

/** Textos traducidos para el formulario de registro. */
const labels = {
  en: {
    title: 'Create your account',
    description: 'Create your account is 100% free',
    email: 'Email address',
    password: 'Password',
    submit: 'Create my account',
    close: 'Close registration',
    success: 'Your account has been created on this device.',
    invalidEmail: 'Enter a valid email address.',
    invalidPassword: 'Use a password with at least 8 characters.',
    saved: 'Account saved locally in this browser.',
  },
  es: {
    title: 'Crea tu cuenta',
    description: 'Crear tu cuenta es 100% gratuita',
    email: 'Correo electrónico',
    password: 'Contraseña',
    submit: 'Crear mi cuenta',
    close: 'Cerrar registro',
    success: 'Tu cuenta se ha creado en este dispositivo.',
    invalidEmail: 'Escribe un correo electrónico válido.',
    invalidPassword: 'Usa una contraseña de al menos 8 caracteres.',
    saved: 'La cuenta se guardó localmente en este navegador.',
  },
  pt: {
    title: 'Crie sua conta',
    description: 'Criar sua conta é 100% grátis',
    email: 'E-mail',
    password: 'Senha',
    submit: 'Criar minha conta',
    close: 'Fechar cadastro',
    success: 'Sua conta foi criada neste dispositivo.',
    invalidEmail: 'Informe um e-mail válido.',
    invalidPassword: 'Use uma senha com pelo menos 8 caracteres.',
    saved: 'A conta foi salva localmente neste navegador.',
  },
} satisfies Record<LangCode, Record<string, string>>;

/** Muestra un modal accesible con los únicos campos necesarios para registrarse. */
export default function RegisterModal({ open, onClose, lang }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const dialogRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const text = labels[lang];

  useEffect(() => {
    if (!open) return;
    emailRef.current?.focus();

    /** Cierra el diálogo con Escape mientras está abierto. */
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  /** Valida los campos y guarda una cuenta de demostración en este navegador. */
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage('');

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setMessage(text.invalidEmail);
      emailRef.current?.focus();
      return;
    }
    if (password.length < 8) {
      setMessage(text.invalidPassword);
      return;
    }

    try {
      localStorage.setItem('user_email', email.trim());
      localStorage.setItem('user_password', password);
      setMessage(text.success);
      setPassword('');
      window.setTimeout(() => {
        onClose();
        setMessage('');
        setEmail('');
      }, 1200);
    } catch {
      setMessage(text.saved);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/65 p-4 backdrop-blur-sm"
      onMouseDown={event => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="register-title"
        aria-describedby="register-description"
        className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/70 bg-white shadow-[0_30px_90px_-30px_rgba(15,23,42,.55)]"
      >
        <div className="h-2 bg-gradient-to-r from-indigo-700 via-violet-500 to-teal-400" />
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-indigo-50 text-indigo-700">
                <LockKeyhole size={23} aria-hidden="true" />
              </div>
              <h2 id="register-title" className="text-2xl font-black tracking-tight text-slate-950">
                {text.title}
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label={text.close}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <X size={19} aria-hidden="true" />
            </button>
          </div>

          <p
            id="register-description"
            className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-900"
          >
            <Check size={17} className="mr-2 inline-block" aria-hidden="true" />
            {text.description}
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <label htmlFor="register-email" className="mb-2 block text-sm font-semibold text-slate-800">
                {text.email}
              </label>
              <div className="relative">
                <Mail size={18} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                <input
                  ref={emailRef}
                  id="register-email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                  placeholder="nombre@ejemplo.com"
                  className="min-h-12 w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100"
                />
              </div>
            </div>

            <div>
              <label htmlFor="register-password" className="mb-2 block text-sm font-semibold text-slate-800">
                {text.password}
              </label>
              <div className="relative">
                <LockKeyhole size={18} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                <input
                  id="register-password"
                  type="password"
                  autoComplete="new-password"
                  minLength={8}
                  required
                  value={password}
                  onChange={event => setPassword(event.target.value)}
                  placeholder="••••••••"
                  className="min-h-12 w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100"
                />
              </div>
              <p className="mt-2 text-xs text-slate-500">Mínimo 8 caracteres</p>
            </div>

            {message && (
              <p role="status" aria-live="polite" className="rounded-xl bg-indigo-50 px-4 py-3 text-sm font-medium text-indigo-900">
                {message}
              </p>
            )}

            <button
              type="submit"
              className="flex min-h-12 w-full items-center justify-center rounded-xl bg-indigo-700 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-900/20 transition hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {text.submit}
            </button>
          </form>

          <p className="mt-5 text-center text-xs leading-5 text-slate-500">
            Tus datos se guardan únicamente en este navegador.
          </p>
        </div>
      </div>
    </div>
  );
}
