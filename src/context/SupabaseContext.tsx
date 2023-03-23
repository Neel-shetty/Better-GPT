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
import { DatabaseType } from "../schema/databaseTypes";

const SUPABASE_URL = "https://ebbuynmmekaybrilfldy.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImViYnV5bm1tZWtheWJyaWxmbGR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzkxMjQ5OTksImV4cCI6MTk5NDcwMDk5OX0.BSDvAQxYsDy6JhgeIRe04NaJfLtCHqVjXp0hPQgwW3E";

type SupabaseContextType = {
  user: User | null;
  supabaseClient: SupabaseClient<DatabaseType, "public", any> | null;
};

export const SupabaseContext = createContext<SupabaseContextType>({
  user: null,
  supabaseClient: null,
});

const SupabaseProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [supabaseClient, setSupabaseClient] = useState<SupabaseClient<
    DatabaseType,
    "public",
    any
  > | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient<DatabaseType>(
      SUPABASE_URL,
      SUPABASE_ANON_KEY,
      {
        auth: {
          storage: AsyncStorage,
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: false,
        },
        realtime: {
          params: {
            eventsPerSecond: 10,
          },
        },
      }
    );
    setSupabaseClient(supabase);
    async function fetchSession() {
      // setLoading(true);
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
        console.log(
          "🚀 ~ file: SupabaseContext.tsx:74 ~ useEffect ~ event:",
          event
        );
        if (event === "SIGNED_IN") {
          if (session) setUser(session.user);
        }
        if (event === "SIGNED_OUT") {
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
