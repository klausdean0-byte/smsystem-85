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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      admins: {
        Row: {
          created_at: string | null
          email: string | null
          id: string | null
          is_verified: boolean | null
          name: string | null
          password_hash: string | null
          personal_email: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id?: string | null
          is_verified?: boolean | null
          name?: string | null
          password_hash?: string | null
          personal_email?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string | null
          is_verified?: boolean | null
          name?: string | null
          password_hash?: string | null
          personal_email?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      classes: {
        Row: {
          created_at: string | null
          description: string | null
          id: string | null
          name: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string | null
          name?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string | null
          name?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      electoral_applications: {
        Row: {
          age: string | null
          class_name: string | null
          class_teacher_name: string | null
          class_teacher_tel: string | null
          created_at: string | null
          experience: string | null
          id: string | null
          parent_name: string | null
          parent_tel: string | null
          position: string | null
          qualifications: string | null
          sex: string | null
          status: string | null
          stream_name: string | null
          student_email: string | null
          student_id: string | null
          student_name: string | null
          student_photo: string | null
          submitted_at: string | null
          updated_at: string | null
          why_apply: string | null
        }
        Insert: {
          age?: string | null
          class_name?: string | null
          class_teacher_name?: string | null
          class_teacher_tel?: string | null
          created_at?: string | null
          experience?: string | null
          id?: string | null
          parent_name?: string | null
          parent_tel?: string | null
          position?: string | null
          qualifications?: string | null
          sex?: string | null
          status?: string | null
          stream_name?: string | null
          student_email?: string | null
          student_id?: string | null
          student_name?: string | null
          student_photo?: string | null
          submitted_at?: string | null
          updated_at?: string | null
          why_apply?: string | null
        }
        Update: {
          age?: string | null
          class_name?: string | null
          class_teacher_name?: string | null
          class_teacher_tel?: string | null
          created_at?: string | null
          experience?: string | null
          id?: string | null
          parent_name?: string | null
          parent_tel?: string | null
          position?: string | null
          qualifications?: string | null
          sex?: string | null
          status?: string | null
          stream_name?: string | null
          student_email?: string | null
          student_id?: string | null
          student_name?: string | null
          student_photo?: string | null
          submitted_at?: string | null
          updated_at?: string | null
          why_apply?: string | null
        }
        Relationships: []
      }
      electoral_positions: {
        Row: {
          created_at: string | null
          description: string | null
          eligible_classes: Json | null
          id: string | null
          is_active: boolean | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          eligible_classes?: Json | null
          id?: string | null
          is_active?: boolean | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          eligible_classes?: Json | null
          id?: string | null
          is_active?: boolean | null
          title?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      electoral_votes: {
        Row: {
          candidate_id: string
          created_at: string
          id: string
          position: string
          updated_at: string
          voted_at: string
          voter_id: string
        }
        Insert: {
          candidate_id: string
          created_at?: string
          id?: string
          position: string
          updated_at?: string
          voted_at?: string
          voter_id: string
        }
        Update: {
          candidate_id?: string
          created_at?: string
          id?: string
          position?: string
          updated_at?: string
          voted_at?: string
          voter_id?: string
        }
        Relationships: []
      }
      streams: {
        Row: {
          Class: string | null
          class_id: string | null
          "Created At": string | null
          created_at: string | null
          Description: string | null
          id: string | null
          ID: string | null
          name: string | null
          Name: string | null
          Students: number | null
          "Updated At": string | null
          updated_at: string | null
        }
        Insert: {
          Class?: string | null
          class_id?: string | null
          "Created At"?: string | null
          created_at?: string | null
          Description?: string | null
          id?: string | null
          ID?: string | null
          name?: string | null
          Name?: string | null
          Students?: number | null
          "Updated At"?: string | null
          updated_at?: string | null
        }
        Update: {
          Class?: string | null
          class_id?: string | null
          "Created At"?: string | null
          created_at?: string | null
          Description?: string | null
          id?: string | null
          ID?: string | null
          name?: string | null
          Name?: string | null
          Students?: number | null
          "Updated At"?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      students: {
        Row: {
          class_id: string | null
          created_at: string | null
          default_password: string | null
          email: string | null
          id: string | null
          is_verified: boolean | null
          name: string | null
          password_hash: string | null
          personal_email: string | null
          photo_url: string | null
          stream_id: string | null
        }
        Insert: {
          class_id?: string | null
          created_at?: string | null
          default_password?: string | null
          email?: string | null
          id?: string | null
          is_verified?: boolean | null
          name?: string | null
          password_hash?: string | null
          personal_email?: string | null
          photo_url?: string | null
          stream_id?: string | null
        }
        Update: {
          class_id?: string | null
          created_at?: string | null
          default_password?: string | null
          email?: string | null
          id?: string | null
          is_verified?: boolean | null
          name?: string | null
          password_hash?: string | null
          personal_email?: string | null
          photo_url?: string | null
          stream_id?: string | null
        }
        Relationships: []
      }
      teachers: {
        Row: {
          classesTaught: string | null
          contactNumber: number | null
          created_at: string | null
          email: string | null
          id: string | null
          is_verified: boolean | null
          name: string | null
          nationality: string | null
          password_hash: string | null
          personal_email: string | null
          photo: string | null
          photo_url: string | null
          sex: string | null
          subjectsTaught: string | null
          updated_at: string | null
        }
        Insert: {
          classesTaught?: string | null
          contactNumber?: number | null
          created_at?: string | null
          email?: string | null
          id?: string | null
          is_verified?: boolean | null
          name?: string | null
          nationality?: string | null
          password_hash?: string | null
          personal_email?: string | null
          photo?: string | null
          photo_url?: string | null
          sex?: string | null
          subjectsTaught?: string | null
          updated_at?: string | null
        }
        Update: {
          classesTaught?: string | null
          contactNumber?: number | null
          created_at?: string | null
          email?: string | null
          id?: string | null
          is_verified?: boolean | null
          name?: string | null
          nationality?: string | null
          password_hash?: string | null
          personal_email?: string | null
          photo?: string | null
          photo_url?: string | null
          sex?: string | null
          subjectsTaught?: string | null
          updated_at?: string | null
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
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
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
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
