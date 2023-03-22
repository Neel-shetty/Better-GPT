import React, { createContext, useEffect, useState } from "react";
import {
  createClient,
  User,
  Subscription,
  SupabaseClient,
  AuthChangeEvent,
  Session,
} from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SUPABASE_URL = "https://ebbuynmmekaybrilfldy.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImViYnV5bm1tZWtheWJyaWxmbGR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzkxMjQ5OTksImV4cCI6MTk5NDcwMDk5OX0.BSDvAQxYsDy6JhgeIRe04NaJfLtCHqVjXp0hPQgwW3E";

type SupabaseContextType = {
  user: User | null;
  supabaseClient: SupabaseClient | null;
};

export const SupabaseContext = createContext<SupabaseContextType>({
  user: null,
  supabaseClient: null,
});

const SupabaseProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [supabaseClient, setSupabaseClient] = useState<SupabaseClient | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
      },
    });
    setSupabaseClient(supabase);
    async function fetchSession() {
      setLoading(true);
      const { data, error } = await supabase.auth.getSession();
      if (!data?.session) {
        setLoading(false);
        return;
      }
      setUser(data.session.user);
      setLoading(false);
    }
    fetchSession();

    const authListener = supabase.auth.onAuthStateChange(
      (event: AuthChangeEvent, session: Session | null) => {
        if (event === "SIGNED_IN" && session?.user) {
          setUser(session.user);
        } else {
          setUser(null);
        }
      }
    );

    return () => {
      authListener.data.subscription.unsubscribe();
    };
  }, []);

  const value = {
    user,
    supabaseClient,
  };

  return (
    <SupabaseContext.Provider value={value}>
      {!loading && children}
    </SupabaseContext.Provider>
  );
};

export default SupabaseProvider;
