export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      appointments: {
        Row: {
          appointment_date: string
          appointment_type: string
          created_at: string
          id: string
          notes: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          appointment_date: string
          appointment_type: string
          created_at?: string
          id?: string
          notes?: string | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          appointment_date?: string
          appointment_type?: string
          created_at?: string
          id?: string
          notes?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      contact_inquiries: {
        Row: {
          created_at: string
          id: string
          message: string | null
          name: string
          phone: string
        }
        Insert: {
          created_at?: string
          id?: string
          message?: string | null
          name: string
          phone: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string | null
          name?: string
          phone?: string
        }
        Relationships: []
      }
      health_profiles: {
        Row: {
          age: number | null
          avg_sleep_hours: number | null
          caffeine_intake: number | null
          created_at: string
          exercise_frequency: number | null
          gender: string | null
          health_conditions: string[] | null
          height: number | null
          id: string
          overall_health_score: number | null
          screen_time_hours: number | null
          sleep_health_score: number | null
          sleep_quality_score: number | null
          stress_level: number | null
          stress_management_score: number | null
          updated_at: string
          user_id: string
          weight: number | null
        }
        Insert: {
          age?: number | null
          avg_sleep_hours?: number | null
          caffeine_intake?: number | null
          created_at?: string
          exercise_frequency?: number | null
          gender?: string | null
          health_conditions?: string[] | null
          height?: number | null
          id?: string
          overall_health_score?: number | null
          screen_time_hours?: number | null
          sleep_health_score?: number | null
          sleep_quality_score?: number | null
          stress_level?: number | null
          stress_management_score?: number | null
          updated_at?: string
          user_id: string
          weight?: number | null
        }
        Update: {
          age?: number | null
          avg_sleep_hours?: number | null
          caffeine_intake?: number | null
          created_at?: string
          exercise_frequency?: number | null
          gender?: string | null
          health_conditions?: string[] | null
          height?: number | null
          id?: string
          overall_health_score?: number | null
          screen_time_hours?: number | null
          sleep_health_score?: number | null
          sleep_quality_score?: number | null
          stress_level?: number | null
          stress_management_score?: number | null
          updated_at?: string
          user_id?: string
          weight?: number | null
        }
        Relationships: []
      }
      intervention_recommendations: {
        Row: {
          causal_factors: Json | null
          completed_at: string | null
          created_at: string
          description: string | null
          expected_improvement: string | null
          health_profile_id: string | null
          id: string
          intervention_type: string
          predicted_effectiveness: number | null
          priority: number
          started_at: string | null
          status: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          causal_factors?: Json | null
          completed_at?: string | null
          created_at?: string
          description?: string | null
          expected_improvement?: string | null
          health_profile_id?: string | null
          id?: string
          intervention_type: string
          predicted_effectiveness?: number | null
          priority?: number
          started_at?: string | null
          status?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          causal_factors?: Json | null
          completed_at?: string | null
          created_at?: string
          description?: string | null
          expected_improvement?: string | null
          health_profile_id?: string | null
          id?: string
          intervention_type?: string
          predicted_effectiveness?: number | null
          priority?: number
          started_at?: string | null
          status?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "intervention_recommendations_health_profile_id_fkey"
            columns: ["health_profile_id"]
            isOneToOne: false
            referencedRelation: "health_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          addons: Json | null
          created_at: string
          id: string
          model_id: string
          model_name: string
          model_price: number
          order_number: string
          payment_method: string | null
          quantity: number
          shipping_address: Json | null
          status: string
          total_price: number
          updated_at: string
          user_id: string
        }
        Insert: {
          addons?: Json | null
          created_at?: string
          id?: string
          model_id: string
          model_name: string
          model_price: number
          order_number: string
          payment_method?: string | null
          quantity?: number
          shipping_address?: Json | null
          status?: string
          total_price: number
          updated_at?: string
          user_id: string
        }
        Update: {
          addons?: Json | null
          created_at?: string
          id?: string
          model_id?: string
          model_name?: string
          model_price?: number
          order_number?: string
          payment_method?: string | null
          quantity?: number
          shipping_address?: Json | null
          status?: string
          total_price?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          phone: string | null
          preferred_language: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          preferred_language?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          preferred_language?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      saved_configurations: {
        Row: {
          addon_ids: string[]
          created_at: string
          exterior_id: string
          id: string
          interior_id: string
          model_id: string
          total_price: number
          updated_at: string
          user_id: string
        }
        Insert: {
          addon_ids?: string[]
          created_at?: string
          exterior_id: string
          id?: string
          interior_id: string
          model_id: string
          total_price?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          addon_ids?: string[]
          created_at?: string
          exterior_id?: string
          id?: string
          interior_id?: string
          model_id?: string
          total_price?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
