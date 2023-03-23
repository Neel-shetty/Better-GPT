export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface DatabaseType {
  public: {
    Tables: {
      chats: {
        Row: {
          created_at: string | null;
          id: number;
          owner_id: string | null;
          title: string | null;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          owner_id?: string | null;
          title?: string | null;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          owner_id?: string | null;
          title?: string | null;
          updated_at?: string | null;
        };
      };
      message: {
        Row: {
          created_at: string | null;
          id: number;
          parent_chat_id: number | null;
          seen: boolean | null;
          text: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          parent_chat_id?: number | null;
          seen?: boolean | null;
          text?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          parent_chat_id?: number | null;
          seen?: boolean | null;
          text?: string | null;
        };
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type chatType = DatabaseType["public"]["Tables"]["chats"]['Row'];
