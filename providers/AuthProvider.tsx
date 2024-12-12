import { Session } from '@supabase/supabase-js';
import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

import { supabase } from '~/lib/supabase';

type AuthContextType = {
  isAuthenticated: boolean;
  session?: Session | null;
  userId?: string;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    //this is for fetch the sessiion from supabase client
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsReady(true);
    });
    //This is for subscribe for auth changes
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  if (!isReady) {
    return <ActivityIndicator />;
  }

  //   console.log(session?.user);

  return (
    <AuthContext.Provider
      value={{ session, isAuthenticated: !!session?.user, userId: session?.user.id }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

// isAuthenticated: !!session?.user; to make it boolean
