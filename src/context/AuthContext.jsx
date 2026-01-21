import { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase/config';

const AuthContext = createContext();

// Allowed admin emails from environment variable (comma-separated)
const ALLOWED_ADMINS = (import.meta.env.VITE_ALLOWED_ADMINS || '')
  .split(',')
  .map(email => email.trim().toLowerCase())
  .filter(email => email);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  const checkAuthorization = (email) => {
    return ALLOWED_ADMINS.includes(email?.toLowerCase());
  };

  const loginWithEmail = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      if (!checkAuthorization(result.user.email)) {
        await signOut(auth);
        throw new Error('Unauthorized email address');
      }
      return result;
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        // Auto-create user if email is authorized
        if (checkAuthorization(email)) {
          return createUserWithEmailAndPassword(auth, email, password);
        }
      }
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    if (!checkAuthorization(result.user.email)) {
      await signOut(auth);
      throw new Error('Unauthorized email address. Contact admin for access.');
    }
    return result;
  };

  const logout = () => {
    setIsAuthorized(false);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && checkAuthorization(user.email)) {
        setCurrentUser(user);
        setIsAuthorized(true);
      } else {
        setCurrentUser(null);
        setIsAuthorized(false);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    isAuthorized,
    loginWithEmail,
    loginWithGoogle,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
