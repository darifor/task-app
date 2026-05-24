import { useState } from 'react';
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  signOut,
} from 'firebase/auth';
import { auth, googleProvider } from '../services/firebase';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

type AuthMode = 'login' | 'register';
type ViewState = 'auth' | 'verify-email';

const firebaseErrorMessages: Record<string, string> = {
  'auth/email-already-in-use': 'Este correo electrónico ya está registrado.',
  'auth/invalid-email': 'El correo electrónico no es válido.',
  'auth/operation-not-allowed': 'Método de autenticación no habilitado.',
  'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres.',
  'auth/user-disabled': 'Esta cuenta ha sido deshabilitada.',
  'auth/user-not-found': 'No existe una cuenta con este correo electrónico.',
  'auth/wrong-password': 'La contraseña es incorrecta.',
  'auth/invalid-credential': 'Credenciales inválidas. Verifica tu correo y contraseña.',
  'auth/too-many-requests': 'Demasiados intentos. Inténtalo más tarde.',
  'auth/popup-closed-by-user': 'Se cerró la ventana de autenticación.',
};

function getErrorMessage(error: any): string {
  const code = error?.code;
  return firebaseErrorMessages[code] || 'Ha ocurrido un error. Inténtalo de nuevo.';
}

const Onboarding = () => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [view, setView] = useState<ViewState>('auth');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState('');

  const handleGoogleSignIn = async () => {
    setError(null);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      setError(getErrorMessage(err));
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError('Completa todos los campos.');
      return;
    }

    if (mode === 'register' && !displayName.trim()) {
      setError('Introduce tu nombre.');
      return;
    }

    setLoading(true);
    try {
      if (mode === 'register') {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: displayName.trim() });
        await sendEmailVerification(userCredential.user);
        setVerificationEmail(email);
        setView('verify-email');
        // Sign out so the user can't access the app until verified
        await signOut(auth);
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        // Check if email is verified (skip for Google-linked accounts)
        if (!userCredential.user.emailVerified) {
          await sendEmailVerification(userCredential.user);
          setVerificationEmail(email);
          setView('verify-email');
          await signOut(auth);
        }
      }
    } catch (err: any) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    if (resendCooldown) return;

    setError(null);
    setLoading(true);
    try {
      // Need to sign in temporarily to resend
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);
      await signOut(auth);
      setResendCooldown(true);
      setTimeout(() => setResendCooldown(false), 60000); // 60s cooldown
    } catch (err: any) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = async () => {
    setView('auth');
    setMode('login');
    setError(null);
    setPassword('');
  };

  const handleCheckVerification = async () => {
    setError(null);
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      await userCredential.user.reload();
      if (userCredential.user.emailVerified) {
        // Email verified — onAuthStateChanged in App.tsx will handle the rest
      } else {
        await signOut(auth);
        setError('Tu correo aún no ha sido verificado. Revisa tu bandeja de entrada.');
      }
    } catch (err: any) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setMode((prev) => (prev === 'login' ? 'register' : 'login'));
    setError(null);
  };

  // ─── Verification pending view ───
  if (view === 'verify-email') {
    return (
      <div className="min-h-screen bg-background flex flex-col justify-center items-center p-6 relative overflow-hidden">
        <div className="absolute top-[-100px] right-[-100px] w-64 h-64 bg-primary-container rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-[-100px] left-[-100px] w-64 h-64 bg-secondary-container rounded-full opacity-20 blur-3xl"></div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md z-10 flex flex-col items-center text-center"
        >
          <div className="w-20 h-20 bg-tertiary-container text-on-tertiary-container rounded-2xl flex items-center justify-center mb-8 shadow-lg">
            <span className="material-symbols-outlined text-4xl">mark_email_unread</span>
          </div>

          <h1 className="text-headline-lg-mobile md:text-headline-lg font-bold text-on-background mb-3">
            Verifica tu correo
          </h1>
          <p className="text-body-lg text-on-surface-variant mb-2">
            Hemos enviado un enlace de verificación a:
          </p>
          <p className="text-body-lg font-semibold text-primary mb-8">
            {verificationEmail}
          </p>
          <p className="text-body-md text-on-surface-variant mb-8">
            Revisa tu bandeja de entrada (y la carpeta de spam) y haz clic en el enlace para activar tu cuenta.
          </p>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-error text-body-md mb-4"
            >
              {error}
            </motion.p>
          )}

          <div className="w-full flex flex-col gap-3">
            <Button
              variant="filled"
              color="primary"
              onClick={handleCheckVerification}
              disabled={loading}
              className="w-full"
              icon="verified"
            >
              {loading ? 'Comprobando...' : 'Ya he verificado mi correo'}
            </Button>

            <Button
              variant="outlined"
              color="primary"
              onClick={handleResendVerification}
              disabled={loading || resendCooldown}
              className="w-full"
              icon="send"
            >
              {resendCooldown ? 'Reenviado (espera 60s)' : 'Reenviar correo de verificación'}
            </Button>

            <Button
              variant="text"
              color="secondary"
              onClick={handleBackToLogin}
              className="w-full"
              icon="arrow_back"
            >
              Volver al inicio de sesión
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  // ─── Main auth view ───
  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center p-6 relative overflow-hidden">
      {/* Decorative background circles */}
      <div className="absolute top-[-100px] right-[-100px] w-64 h-64 bg-primary-container rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-[-100px] left-[-100px] w-64 h-64 bg-secondary-container rounded-full opacity-20 blur-3xl"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md z-10 flex flex-col items-center text-center"
      >
        <div className="w-20 h-20 bg-primary text-on-primary rounded-2xl flex items-center justify-center mb-8 shadow-lg">
          <span className="material-symbols-outlined text-4xl">task_alt</span>
        </div>

        <h1 className="text-headline-lg-mobile md:text-headline-lg font-bold text-on-background mb-2">
          Lumina
        </h1>
        <p className="text-body-lg text-on-surface-variant mb-8">
          {mode === 'login'
            ? 'Inicia sesión para continuar.'
            : 'Crea tu cuenta y empieza a organizarte.'}
        </p>

        {/* Email / Password form */}
        <AnimatePresence mode="wait">
          <motion.form
            key={mode}
            initial={{ opacity: 0, x: mode === 'register' ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: mode === 'register' ? -20 : 20 }}
            transition={{ duration: 0.25 }}
            onSubmit={handleEmailAuth}
            className="w-full flex flex-col gap-3 mb-4"
          >
            {mode === 'register' && (
              <Input
                id="auth-display-name"
                label="Nombre"
                type="text"
                placeholder="Tu nombre"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                autoComplete="name"
              />
            )}

            <Input
              id="auth-email"
              label="Correo electrónico"
              type="email"
              placeholder="correo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />

            <Input
              id="auth-password"
              label="Contraseña"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
            />

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-error text-body-md text-left"
              >
                {error}
              </motion.p>
            )}

            <Button
              type="submit"
              variant="filled"
              color="primary"
              disabled={loading}
              className="w-full mt-1"
              icon={mode === 'register' ? 'person_add' : 'login'}
            >
              {loading
                ? 'Cargando...'
                : mode === 'register'
                ? 'Crear cuenta'
                : 'Iniciar sesión'}
            </Button>
          </motion.form>
        </AnimatePresence>

        {/* Toggle login / register */}
        <p className="text-body-md text-on-surface-variant mb-6">
          {mode === 'login' ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}{' '}
          <button
            type="button"
            onClick={toggleMode}
            className="text-primary font-semibold hover:underline focus:outline-none"
          >
            {mode === 'login' ? 'Regístrate' : 'Inicia sesión'}
          </button>
        </p>

        {/* Separator */}
        <div className="w-full flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-outline-variant"></div>
          <span className="text-label-md text-on-surface-variant">o</span>
          <div className="flex-1 h-px bg-outline-variant"></div>
        </div>

        {/* Google sign-in */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-3 bg-surface-container-highest text-on-surface hover:bg-surface-variant transition-colors py-3 px-6 rounded-full font-label-lg shadow-sm"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="w-6 h-6"
          />
          Continuar con Google
        </button>
      </motion.div>
    </div>
  );
};

export default Onboarding;
