import { useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../services/firebase';
import { motion } from 'framer-motion';

const Onboarding = () => {
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      setError(err.message);
    }
  };

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
        
        <h1 className="text-headline-lg-mobile md:text-headline-lg font-bold text-on-background mb-4">
          Lumina
        </h1>
        <p className="text-body-lg text-on-surface-variant mb-12">
          Empieza a centrarte en lo que importa.<br/>
          Organiza, planifica y logra tus objetivos sin distracciones.
        </p>

        {error && <p className="text-error mb-4">{error}</p>}

        <button 
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-3 bg-surface-container-highest text-on-surface hover:bg-surface-variant transition-colors py-3 px-6 rounded-full font-label-lg shadow-sm"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-6 h-6" />
          Continuar con Google
        </button>
      </motion.div>
    </div>
  );
};

export default Onboarding;
