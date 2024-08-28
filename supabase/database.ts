export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admin: {
        Row: {
          auth_id: string | null
          avatar: string | null
          birthday: string | null
          created_at: string | null
          email: string
          id: string
          name: string | null
          password: string
          phone: string | null
          role: Database["public"]["Enums"]["ROLE"] | null
          sex: Database["public"]["Enums"]["SEX"] | null
          status: boolean | null
          updated_at: string | null
          username: string
          verify: boolean | null
        }
        Insert: {
          auth_id?: string | null
          avatar?: string | null
          birthday?: string | null
          created_at?: string | null
          email: string
          id?: string
          name?: string | null
          password: string
          phone?: string | null
          role?: Database["public"]["Enums"]["ROLE"] | null
          sex?: Database["public"]["Enums"]["SEX"] | null
          status?: boolean | null
          updated_at?: string | null
          username: string
          verify?: boolean | null
        }
        Update: {
          auth_id?: string | null
          avatar?: string | null
          birthday?: string | null
          created_at?: string | null
          email?: string
          id?: string
          name?: string | null
          password?: string
          phone?: string | null
          role?: Database["public"]["Enums"]["ROLE"] | null
          sex?: Database["public"]["Enums"]["SEX"] | null
          status?: boolean | null
          updated_at?: string | null
          username?: string
          verify?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_auth_id_fkey"
            columns: ["auth_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      blog: {
        Row: {
          content: string | null
          created_at: string | null
          id: string
          image: string | null
          title: string | null
          type: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          id?: string
          image?: string | null
          title?: string | null
          type?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          id?: string
          image?: string | null
          title?: string | null
          type?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      brand: {
        Row: {
          auth_id: string | null
          created_at: string
          id: string
          image: string | null
          key: string
          name: string
          updated_at: string
        }
        Insert: {
          auth_id?: string | null
          created_at?: string
          id?: string
          image?: string | null
          key: string
          name: string
          updated_at?: string
        }
        Update: {
          auth_id?: string | null
          created_at?: string
          id?: string
          image?: string | null
          key?: string
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "brand_auth_id_fkey"
            columns: ["auth_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      car: {
        Row: {
          auth_id: string | null
          carType_id: string | null
          color: string
          created_at: string | null
          default: boolean
          detail: Json | null
          id: string
          license_plate: string
          name: string
          type: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          auth_id?: string | null
          carType_id?: string | null
          color: string
          created_at?: string | null
          default?: boolean
          detail?: Json | null
          id?: string
          license_plate: string
          name: string
          type: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          auth_id?: string | null
          carType_id?: string | null
          color?: string
          created_at?: string | null
          default?: boolean
          detail?: Json | null
          id?: string
          license_plate?: string
          name?: string
          type?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "car_auth_id_fkey"
            columns: ["auth_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "car_carType_id_fkey"
            columns: ["carType_id"]
            isOneToOne: false
            referencedRelation: "carType"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "car_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      cart: {
        Row: {
          auth_id: string | null
          count: number | null
          created_at: string | null
          detail: Json | null
          garage_id: string | null
          id: string
          note: string | null
          product_id: string | null
          updated_at: string | null
        }
        Insert: {
          auth_id?: string | null
          count?: number | null
          created_at?: string | null
          detail?: Json | null
          garage_id?: string | null
          id?: string
          note?: string | null
          product_id?: string | null
          updated_at?: string | null
        }
        Update: {
          auth_id?: string | null
          count?: number | null
          created_at?: string | null
          detail?: Json | null
          garage_id?: string | null
          id?: string
          note?: string | null
          product_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cart_auth_id_fkey"
            columns: ["auth_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cart_garage_id_fkey"
            columns: ["garage_id"]
            isOneToOne: false
            referencedRelation: "garage"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cart_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["id"]
          },
        ]
      }
      carType: {
        Row: {
          auth_id: string | null
          brand_id: string | null
          code: string | null
          created_at: string
          id: string
          image: string | null
          key: string | null
          model: string | null
          name: string
          updated_at: string
          version: string | null
        }
        Insert: {
          auth_id?: string | null
          brand_id?: string | null
          code?: string | null
          created_at?: string
          id?: string
          image?: string | null
          key?: string | null
          model?: string | null
          name: string
          updated_at?: string
          version?: string | null
        }
        Update: {
          auth_id?: string | null
          brand_id?: string | null
          code?: string | null
          created_at?: string
          id?: string
          image?: string | null
          key?: string | null
          model?: string | null
          name?: string
          updated_at?: string
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "carType_auth_id_fkey"
            columns: ["auth_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "carType_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brand"
            referencedColumns: ["id"]
          },
        ]
      }
      category: {
        Row: {
          created_at: string
          description: string | null
          garage_id: string | null
          id: string
          order: number | null
          parent_id: string | null
          status: boolean | null
          tag: string | null
          title: string
          type: string | null
          updated_at: string | null
          url: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          garage_id?: string | null
          id?: string
          order?: number | null
          parent_id?: string | null
          status?: boolean | null
          tag?: string | null
          title: string
          type?: string | null
          updated_at?: string | null
          url?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          garage_id?: string | null
          id?: string
          order?: number | null
          parent_id?: string | null
          status?: boolean | null
          tag?: string | null
          title?: string
          type?: string | null
          updated_at?: string | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "category_garage_id_fkey"
            columns: ["garage_id"]
            isOneToOne: false
            referencedRelation: "garage"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "category_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "category"
            referencedColumns: ["id"]
          },
        ]
      }
      category_product: {
        Row: {
          category_id: string
          product_id: string
        }
        Insert: {
          category_id: string
          product_id: string
        }
        Update: {
          category_id?: string
          product_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "category_product_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "category"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "category_product_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["id"]
          },
        ]
      }
      categoryadmin: {
        Row: {
          admin_id: string | null
          category: Database["public"]["Enums"]["TYPE_ACTION"] | null
          created_at: string | null
          description: string | null
          id: string
          key: string
          name: string
          parent_code: string | null
          parent_id: string | null
          status: boolean | null
          type: string | null
          updated_at: string | null
        }
        Insert: {
          admin_id?: string | null
          category?: Database["public"]["Enums"]["TYPE_ACTION"] | null
          created_at?: string | null
          description?: string | null
          id?: string
          key: string
          name: string
          parent_code?: string | null
          parent_id?: string | null
          status?: boolean | null
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          admin_id?: string | null
          category?: Database["public"]["Enums"]["TYPE_ACTION"] | null
          created_at?: string | null
          description?: string | null
          id?: string
          key?: string
          name?: string
          parent_code?: string | null
          parent_id?: string | null
          status?: boolean | null
          type?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "categoryadmin_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "admin"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "categoryadmin_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "categoryadmin"
            referencedColumns: ["id"]
          },
        ]
      }
      cronjob_logs: {
        Row: {
          id: number
          job_name: string | null
          log_time: string | null
          message: string | null
        }
        Insert: {
          id?: number
          job_name?: string | null
          log_time?: string | null
          message?: string | null
        }
        Update: {
          id?: number
          job_name?: string | null
          log_time?: string | null
          message?: string | null
        }
        Relationships: []
      }
      feedback: {
        Row: {
          auth_id: string | null
          content: string | null
          created_at: string
          id: string
          image: string[] | null
          merchant_id: string | null
          object: string | null
          title: string | null
          updated_at: string
          user_id: string | null
          username: string | null
          video: string | null
        }
        Insert: {
          auth_id?: string | null
          content?: string | null
          created_at?: string
          id?: string
          image?: string[] | null
          merchant_id?: string | null
          object?: string | null
          title?: string | null
          updated_at?: string
          user_id?: string | null
          username?: string | null
          video?: string | null
        }
        Update: {
          auth_id?: string | null
          content?: string | null
          created_at?: string
          id?: string
          image?: string[] | null
          merchant_id?: string | null
          object?: string | null
          title?: string | null
          updated_at?: string
          user_id?: string | null
          username?: string | null
          video?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "feedback_auth_id_fkey"
            columns: ["auth_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "feedback_creator_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "feedback_merchant_id_fkey"
            columns: ["merchant_id"]
            isOneToOne: false
            referencedRelation: "merchant"
            referencedColumns: ["id"]
          },
        ]
      }
      garage: {
        Row: {
          auth_id: string | null
          avatar: string | null
          banner_image: string | null
          code: string | null
          cover_image: string | null
          created_at: string | null
          description: Json | null
          hotline: string | null
          id: string
          information: Json | null
          location: unknown | null
          merchant_id: string | null
          name: string | null
          payment: Json | null
          service_english: string | null
          services: string | null
          status: boolean | null
          updated_at: string | null
        }
        Insert: {
          auth_id?: string | null
          avatar?: string | null
          banner_image?: string | null
          code?: string | null
          cover_image?: string | null
          created_at?: string | null
          description?: Json | null
          hotline?: string | null
          id?: string
          information?: Json | null
          location?: unknown | null
          merchant_id?: string | null
          name?: string | null
          payment?: Json | null
          service_english?: string | null
          services?: string | null
          status?: boolean | null
          updated_at?: string | null
        }
        Update: {
          auth_id?: string | null
          avatar?: string | null
          banner_image?: string | null
          code?: string | null
          cover_image?: string | null
          created_at?: string | null
          description?: Json | null
          hotline?: string | null
          id?: string
          information?: Json | null
          location?: unknown | null
          merchant_id?: string | null
          name?: string | null
          payment?: Json | null
          service_english?: string | null
          services?: string | null
          status?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "garage_auth_id_fkey"
            columns: ["auth_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "garage_merchant_id_fkey"
            columns: ["merchant_id"]
            isOneToOne: false
            referencedRelation: "merchant"
            referencedColumns: ["id"]
          },
        ]
      }
      garage_sold: {
        Row: {
          count_rating: number
          count_rating_1: number
          count_rating_2: number
          count_rating_3: number
          count_rating_4: number
          count_rating_5: number
          created_at: string
          garage_id: string
          product_sold: number
          rating: number
          updated_at: string
        }
        Insert: {
          count_rating?: number
          count_rating_1?: number
          count_rating_2?: number
          count_rating_3?: number
          count_rating_4?: number
          count_rating_5?: number
          created_at?: string
          garage_id: string
          product_sold?: number
          rating?: number
          updated_at?: string
        }
        Update: {
          count_rating?: number
          count_rating_1?: number
          count_rating_2?: number
          count_rating_3?: number
          count_rating_4?: number
          count_rating_5?: number
          created_at?: string
          garage_id?: string
          product_sold?: number
          rating?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "garage_sold_garage_id_fkey"
            columns: ["garage_id"]
            isOneToOne: true
            referencedRelation: "garage"
            referencedColumns: ["id"]
          },
        ]
      }
      history: {
        Row: {
          auth_id: string | null
          created_at: string
          id: number
          key: string
        }
        Insert: {
          auth_id?: string | null
          created_at?: string
          id?: number
          key: string
        }
        Update: {
          auth_id?: string | null
          created_at?: string
          id?: number
          key?: string
        }
        Relationships: [
          {
            foreignKeyName: "history_auth_id_fkey"
            columns: ["auth_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      hotdeal: {
        Row: {
          auth_id: string | null
          created_at: string
          description: string
          garage_id: string | null
          id: string
          image: string | null
          index: number
          page: number
          product_id: string | null
          updated_at: string
        }
        Insert: {
          auth_id?: string | null
          created_at?: string
          description: string
          garage_id?: string | null
          id?: string
          image?: string | null
          index: number
          page: number
          product_id?: string | null
          updated_at?: string
        }
        Update: {
          auth_id?: string | null
          created_at?: string
          description?: string
          garage_id?: string | null
          id?: string
          image?: string | null
          index?: number
          page?: number
          product_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "hotdeal_auth_id_fkey"
            columns: ["auth_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hotdeal_garage_id_fkey"
            columns: ["garage_id"]
            isOneToOne: false
            referencedRelation: "garage"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hotdeal_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["id"]
          },
        ]
      }
      lock_log: {
        Row: {
          auth_id: string | null
          created_at: string
          garage_id: string | null
          id: string
          merchant_id: string | null
          reason: string | null
          type: string | null
          updated_at: string
        }
        Insert: {
          auth_id?: string | null
          created_at?: string
          garage_id?: string | null
          id?: string
          merchant_id?: string | null
          reason?: string | null
          type?: string | null
          updated_at?: string
        }
        Update: {
          auth_id?: string | null
          created_at?: string
          garage_id?: string | null
          id?: string
          merchant_id?: string | null
          reason?: string | null
          type?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "lock_log_auth_id_fkey"
            columns: ["auth_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lock_log_garage_id_fkey"
            columns: ["garage_id"]
            isOneToOne: false
            referencedRelation: "garage"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lock_log_merchant_id_fkey"
            columns: ["merchant_id"]
            isOneToOne: false
            referencedRelation: "merchant"
            referencedColumns: ["id"]
          },
        ]
      }
      merchant: {
        Row: {
          address: string | null
          auth_id: string | null
          avatar: string | null
          code: string | null
          created_at: string | null
          deputy: string | null
          email: string
          first_login: boolean
          id: string
          name: string
          password: string | null
          phone: string
          role: Database["public"]["Enums"]["ROLE"] | null
          startDate: string | null
          status: boolean | null
          taxCode: string | null
          type: string | null
          updated_at: string | null
          username: string
          verify: boolean | null
        }
        Insert: {
          address?: string | null
          auth_id?: string | null
          avatar?: string | null
          code?: string | null
          created_at?: string | null
          deputy?: string | null
          email: string
          first_login?: boolean
          id?: string
          name: string
          password?: string | null
          phone: string
          role?: Database["public"]["Enums"]["ROLE"] | null
          startDate?: string | null
          status?: boolean | null
          taxCode?: string | null
          type?: string | null
          updated_at?: string | null
          username: string
          verify?: boolean | null
        }
        Update: {
          address?: string | null
          auth_id?: string | null
          avatar?: string | null
          code?: string | null
          created_at?: string | null
          deputy?: string | null
          email?: string
          first_login?: boolean
          id?: string
          name?: string
          password?: string | null
          phone?: string
          role?: Database["public"]["Enums"]["ROLE"] | null
          startDate?: string | null
          status?: boolean | null
          taxCode?: string | null
          type?: string | null
          updated_at?: string | null
          username?: string
          verify?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "merchant_auth_id_fkey"
            columns: ["auth_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          content: string;
          created_at: string;
          id: string;
          image_url: string | null;
          is_broadcast: boolean;
          order_id: string | null;
          readed_group: string[] | null;
          recipients_group: string[] | null;
          sender_id: string;
          sender_type: Database["public"]["Enums"]["SENDER_NOTIFY"];
          sent_at: string | null;
          status: Database["public"]["Enums"]["STATUS_NOTIFY"] | null;
          title: string;
          updated_at: string | null;
          action: string
        };
        Insert: {
          content?: string
          created_at?: string
          id?: string
          image_url?: string | null
          is_broadcast?: string | null
          order_id?: string | null
          readed_group?: string[] | null
          recipients_group?: string[] | null
          sender_id?: string
          sender_type: Database["public"]["Enums"]["SENDER_NOTIFY"]
          sent_at?: string | null
          status?: Database["public"]["Enums"]["STATUS_NOTIFY"] | null
          title?: string
          updated_at?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          image_url?: string | null
          is_broadcast?: string | null
          order_id?: string | null
          readed_group?: string[] | null
          recipients_group?: string[] | null
          sender_id?: string
          sender_type?: Database["public"]["Enums"]["SENDER_NOTIFY"]
          sent_at?: string | null
          status?: Database["public"]["Enums"]["STATUS_NOTIFY"] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      order: {
        Row: {
          auth_id: string | null
          car_condition: string | null
          car_id: string | null
          carType: string | null
          code: string
          created_at: string | null
          detail: Json | null
          gara_note: string | null
          garage_id: string | null
          id: string
          license_plate: string | null
          logs: Json | null
          name: string | null
          note: string | null
          order_time: string | null
          phone: string
          price: number | null
          review: boolean
          search_name_product_or_service: string | null
          status: string | null
          status_note: string | null
          time: Json | null
          type: string | null
          updated_at: string | null
          user_id: string | null
          voucher: string | null
        }
        Insert: {
          auth_id?: string | null
          car_condition?: string | null
          car_id?: string | null
          carType?: string | null
          code: string
          created_at?: string | null
          detail?: Json | null
          gara_note?: string | null
          garage_id?: string | null
          id?: string
          license_plate?: string | null
          logs?: Json | null
          name?: string | null
          note?: string | null
          order_time?: string | null
          phone: string
          price?: number | null
          review?: boolean
          search_name_product_or_service?: string | null
          status?: string | null
          status_note?: string | null
          time?: Json | null
          type?: string | null
          updated_at?: string | null
          user_id?: string | null
          voucher?: string | null
        }
        Update: {
          auth_id?: string | null
          car_condition?: string | null
          car_id?: string | null
          carType?: string | null
          code?: string
          created_at?: string | null
          detail?: Json | null
          gara_note?: string | null
          garage_id?: string | null
          id?: string
          license_plate?: string | null
          logs?: Json | null
          name?: string | null
          note?: string | null
          order_time?: string | null
          phone?: string
          price?: number | null
          review?: boolean
          search_name_product_or_service?: string | null
          status?: string | null
          status_note?: string | null
          time?: Json | null
          type?: string | null
          updated_at?: string | null
          user_id?: string | null
          voucher?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "order_auth_id_fkey"
            columns: ["auth_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_car_id_fkey"
            columns: ["car_id"]
            isOneToOne: false
            referencedRelation: "car"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_garage_id_fkey"
            columns: ["garage_id"]
            isOneToOne: false
            referencedRelation: "garage"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      orderItem: {
        Row: {
          auth_id: string | null
          count: number | null
          created_at: string | null
          detail: Json | null
          id: string
          note: string | null
          notify: number
          order_id: string
          price: number | null
          product_id: string | null
          review: boolean | null
          type: string | null
          updated_at: string | null
        }
        Insert: {
          auth_id?: string | null
          count?: number | null
          created_at?: string | null
          detail?: Json | null
          id?: string
          note?: string | null
          notify?: number
          order_id: string
          price?: number | null
          product_id?: string | null
          review?: boolean | null
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          auth_id?: string | null
          count?: number | null
          created_at?: string | null
          detail?: Json | null
          id?: string
          note?: string | null
          notify?: number
          order_id?: string
          price?: number | null
          product_id?: string | null
          review?: boolean | null
          type?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orderItem_auth_id_fkey"
            columns: ["auth_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orderItem_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "order"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orderItem_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["id"]
          },
        ]
      }
      otpValue: {
        Row: {
          created_at: string
          id: number
          key: string
          type: string | null
          updated_at: string | null
          value: string
          verify: boolean | null
        }
        Insert: {
          created_at?: string
          id?: number
          key: string
          type?: string | null
          updated_at?: string | null
          value: string
          verify?: boolean | null
        }
        Update: {
          created_at?: string
          id?: number
          key?: string
          type?: string | null
          updated_at?: string | null
          value?: string
          verify?: boolean | null
        }
        Relationships: []
      }
      product: {
        Row: {
          array_fields: string[] | null
          auth_id: string | null
          category_code: string | null
          category_id: string | null
          created_at: string
          description: string | null
          detail_info: Json | null
          display: boolean
          garage_id: string
          id: string
          key_search: string[] | null
          name: string
          price: number
          product_id: string | null
          sell_info: Json | null
          slug: string
          status: boolean | null
          type: string | null
          updated_at: string
          verify: boolean
        }
        Insert: {
          array_fields?: string[] | null
          auth_id?: string | null
          category_code?: string | null
          category_id?: string | null
          created_at?: string
          description?: string | null
          detail_info?: Json | null
          display?: boolean
          garage_id: string
          id?: string
          key_search?: string[] | null
          name: string
          price?: number
          product_id?: string | null
          sell_info?: Json | null
          slug: string
          status?: boolean | null
          type?: string | null
          updated_at?: string
          verify?: boolean
        }
        Update: {
          array_fields?: string[] | null
          auth_id?: string | null
          category_code?: string | null
          category_id?: string | null
          created_at?: string
          description?: string | null
          detail_info?: Json | null
          display?: boolean
          garage_id?: string
          id?: string
          key_search?: string[] | null
          name?: string
          price?: number
          product_id?: string | null
          sell_info?: Json | null
          slug?: string
          status?: boolean | null
          type?: string | null
          updated_at?: string
          verify?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "product_auth_id_fkey"
            columns: ["auth_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categoryadmin"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_garage_id_fkey"
            columns: ["garage_id"]
            isOneToOne: false
            referencedRelation: "garage"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "productadmin"
            referencedColumns: ["id"]
          },
        ]
      }
      product_sold: {
        Row: {
          count_rating: number
          count_rating_1: number | null
          count_rating_2: number | null
          count_rating_3: number | null
          count_rating_4: number | null
          count_rating_5: number | null
          created_at: string
          product_id: string
          productadmin_id: string | null
          rating: number
          sold: number
          updated_at: string
        }
        Insert: {
          count_rating?: number
          count_rating_1?: number | null
          count_rating_2?: number | null
          count_rating_3?: number | null
          count_rating_4?: number | null
          count_rating_5?: number | null
          created_at?: string
          product_id: string
          productadmin_id?: string | null
          rating?: number
          sold?: number
          updated_at?: string
        }
        Update: {
          count_rating?: number
          count_rating_1?: number | null
          count_rating_2?: number | null
          count_rating_3?: number | null
          count_rating_4?: number | null
          count_rating_5?: number | null
          created_at?: string
          product_id?: string
          productadmin_id?: string | null
          rating?: number
          sold?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_sold_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: true
            referencedRelation: "product"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_sold_productadmin_id_fkey"
            columns: ["productadmin_id"]
            isOneToOne: false
            referencedRelation: "productadmin"
            referencedColumns: ["id"]
          },
        ]
      }
      product_tag: {
        Row: {
          product_id: string
          tag_id: string
        }
        Insert: {
          product_id: string
          tag_id: string
        }
        Update: {
          product_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_tag_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_tag_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tag"
            referencedColumns: ["id"]
          },
        ]
      }
      product_voucher: {
        Row: {
          product_id: string
          voucher_id: string
        }
        Insert: {
          product_id: string
          voucher_id: string
        }
        Update: {
          product_id?: string
          voucher_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_voucher_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_voucher_voucher_id_fkey"
            columns: ["voucher_id"]
            isOneToOne: false
            referencedRelation: "voucher"
            referencedColumns: ["id"]
          },
        ]
      }
      productadmin: {
        Row: {
          admin_id: string | null
          array_fields: string[] | null
          category_code: string | null
          category_id: string | null
          created_at: string
          description: string | null
          detail_info: Json | null
          garage_id: string | null
          id: string
          key_search: string[] | null
          name: string
          price: number
          sell_info: Json | null
          slug: string
          status: boolean | null
          type: string | null
          updated_at: string
          verify: boolean | null
        }
        Insert: {
          admin_id?: string | null
          array_fields?: string[] | null
          category_code?: string | null
          category_id?: string | null
          created_at?: string
          description?: string | null
          detail_info?: Json | null
          garage_id?: string | null
          id?: string
          key_search?: string[] | null
          name: string
          price?: number
          sell_info?: Json | null
          slug: string
          status?: boolean | null
          type?: string | null
          updated_at?: string
          verify?: boolean | null
        }
        Update: {
          admin_id?: string | null
          array_fields?: string[] | null
          category_code?: string | null
          category_id?: string | null
          created_at?: string
          description?: string | null
          detail_info?: Json | null
          garage_id?: string | null
          id?: string
          key_search?: string[] | null
          name?: string
          price?: number
          sell_info?: Json | null
          slug?: string
          status?: boolean | null
          type?: string | null
          updated_at?: string
          verify?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "productadmin_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "admin"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "productadmin_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categoryadmin"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "productadmin_garage_id_fkey"
            columns: ["garage_id"]
            isOneToOne: false
            referencedRelation: "garage"
            referencedColumns: ["id"]
          },
        ]
      }
      productadmin_sold: {
        Row: {
          count_rating: number
          count_rating_1: number | null
          count_rating_2: number | null
          count_rating_3: number | null
          count_rating_4: number | null
          count_rating_5: number | null
          created_at: string
          productadmin_id: string
          rating: number
          sold: number
          updated_at: string
        }
        Insert: {
          count_rating?: number
          count_rating_1?: number | null
          count_rating_2?: number | null
          count_rating_3?: number | null
          count_rating_4?: number | null
          count_rating_5?: number | null
          created_at?: string
          productadmin_id: string
          rating?: number
          sold?: number
          updated_at?: string
        }
        Update: {
          count_rating?: number
          count_rating_1?: number | null
          count_rating_2?: number | null
          count_rating_3?: number | null
          count_rating_4?: number | null
          count_rating_5?: number | null
          created_at?: string
          productadmin_id?: string
          rating?: number
          sold?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "productadmin_sold_productadmin_id_fkey"
            columns: ["productadmin_id"]
            isOneToOne: true
            referencedRelation: "productadmin"
            referencedColumns: ["id"]
          },
        ]
      }
      review: {
        Row: {
          auth_id: string | null
          content: string | null
          count_rating_1: number
          count_rating_2: number
          count_rating_3: number
          count_rating_4: number
          count_rating_5: number
          created_at: string
          detail: Json | null
          garage_id: string | null
          id: string
          image: string[] | null
          order_id: string | null
          product_id: string | null
          productadmin_id: string | null
          rating: number
          type: string | null
          updated_at: string
          user_id: string | null
          video: string | null
        }
        Insert: {
          auth_id?: string | null
          content?: string | null
          count_rating_1?: number
          count_rating_2?: number
          count_rating_3?: number
          count_rating_4?: number
          count_rating_5?: number
          created_at?: string
          detail?: Json | null
          garage_id?: string | null
          id?: string
          image?: string[] | null
          order_id?: string | null
          product_id?: string | null
          productadmin_id?: string | null
          rating?: number
          type?: string | null
          updated_at?: string
          user_id?: string | null
          video?: string | null
        }
        Update: {
          auth_id?: string | null
          content?: string | null
          count_rating_1?: number
          count_rating_2?: number
          count_rating_3?: number
          count_rating_4?: number
          count_rating_5?: number
          created_at?: string
          detail?: Json | null
          garage_id?: string | null
          id?: string
          image?: string[] | null
          order_id?: string | null
          product_id?: string | null
          productadmin_id?: string | null
          rating?: number
          type?: string | null
          updated_at?: string
          user_id?: string | null
          video?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "review_auth_id_fkey"
            columns: ["auth_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "review_garage_id_fkey"
            columns: ["garage_id"]
            isOneToOne: false
            referencedRelation: "garage"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "review_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "order"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "review_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "review_productadmin_id_fkey"
            columns: ["productadmin_id"]
            isOneToOne: false
            referencedRelation: "productadmin"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "review_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      tag: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string | null
          type: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string | null
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string | null
          type?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_garage: {
        Row: {
          garage_id: string
          user_id: string
        }
        Insert: {
          garage_id: string
          user_id: string
        }
        Update: {
          garage_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_garage_garage_id_fkey"
            columns: ["garage_id"]
            isOneToOne: false
            referencedRelation: "garage"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_garage_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          auth_id: string | null
          avatar: string | null
          birthday: string | null
          created_at: string | null
          email: string | null
          id: string
          info_booking: Json | null
          name: string | null
          password: string | null
          phone: string | null
          role: Database["public"]["Enums"]["ROLE"] | null
          sex: Database["public"]["Enums"]["SEX"] | null
          status: boolean | null
          updated_at: string | null
          username: string | null
          verify: boolean | null
        }
        Insert: {
          auth_id?: string | null
          avatar?: string | null
          birthday?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          info_booking?: Json | null
          name?: string | null
          password?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["ROLE"] | null
          sex?: Database["public"]["Enums"]["SEX"] | null
          status?: boolean | null
          updated_at?: string | null
          username?: string | null
          verify?: boolean | null
        }
        Update: {
          auth_id?: string | null
          avatar?: string | null
          birthday?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          info_booking?: Json | null
          name?: string | null
          password?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["ROLE"] | null
          sex?: Database["public"]["Enums"]["SEX"] | null
          status?: boolean | null
          updated_at?: string | null
          username?: string | null
          verify?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "users_auth_id_fkey"
            columns: ["auth_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      voucher: {
        Row: {
          created_at: string | null
          creator_id: string | null
          detail_program: Json | null
          end_time: string | null
          id: string
          name: string | null
          start_time: string | null
          status: boolean | null
          type: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          creator_id?: string | null
          detail_program?: Json | null
          end_time?: string | null
          id?: string
          name?: string | null
          start_time?: string | null
          status?: boolean | null
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          creator_id?: string | null
          detail_program?: Json | null
          end_time?: string | null
          id?: string
          name?: string | null
          start_time?: string | null
          status?: boolean | null
          type?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "voucher_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "garage"
            referencedColumns: ["id"]
          },
        ]
      }
      warranty: {
        Row: {
          address: string | null
          auth_id: string | null
          buy_date: string
          car_id: string | null
          code: string | null
          count: number
          created_at: string
          duration: string
          expried_at: string
          garage_id: string | null
          garage_name: string
          id: string
          phone: string | null
          product_id: string | null
          product_name: string
          product_type: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          address?: string | null
          auth_id?: string | null
          buy_date?: string
          car_id?: string | null
          code?: string | null
          count?: number
          created_at?: string
          duration: string
          expried_at: string
          garage_id?: string | null
          garage_name: string
          id?: string
          phone?: string | null
          product_id?: string | null
          product_name: string
          product_type?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          address?: string | null
          auth_id?: string | null
          buy_date?: string
          car_id?: string | null
          code?: string | null
          count?: number
          created_at?: string
          duration?: string
          expried_at?: string
          garage_id?: string | null
          garage_name?: string
          id?: string
          phone?: string | null
          product_id?: string | null
          product_name?: string
          product_type?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "warranty_auth_id_fkey"
            columns: ["auth_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "warranty_car_id_fkey"
            columns: ["car_id"]
            isOneToOne: false
            referencedRelation: "car"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "warranty_garage_id_fkey"
            columns: ["garage_id"]
            isOneToOne: false
            referencedRelation: "garage"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "warranty_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "warranty_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_missing_garage_sales: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      add_missing_product_sales: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      category_tree: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          name: string
          type: string
          parent_id: string
          level: number
        }[]
      }
      count_keys: {
        Args: Record<PropertyKey, never>
        Returns: {
          key: string
          count: number
        }[]
      }
      get_merchant_by_username: {
        Args: {
          key: string
        }
        Returns: {
          address: string | null
          auth_id: string | null
          avatar: string | null
          code: string | null
          created_at: string | null
          deputy: string | null
          email: string
          first_login: boolean
          id: string
          name: string
          password: string | null
          phone: string
          role: Database["public"]["Enums"]["ROLE"] | null
          startDate: string | null
          status: boolean | null
          taxCode: string | null
          type: string | null
          updated_at: string | null
          username: string
          verify: boolean | null
        }[]
      }
      get_userid_by_email: {
        Args: {
          email: string
        }
        Returns: {
          id: string
        }[]
      }
      get_users_with_numeric_suffix: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          username: string
          email: string
        }[]
      }
      incrementnotifyproduct: {
        Args: {
          x: number
        }
        Returns: number
      }
      order_geo_location: {
        Args: {
          lat: number
          long: number
        }
        Returns: {
          id: string
          name: string
          lat: number
          long: number
          dist_meters: number
        }[]
      }
    }
    Enums: {
      RECIPIENT_TYPE: "GARAGE" | "USER" | "BROADCAST"
      ROLE: "ADMIN" | "AGENCY" | "USER" | "SUPER_ADMIN"
      SENDER_NOTIFY: "ADMIN" | "GARAGE" | "USER"
      SEX: "MALE" | "FEMALE" | "OTHER"
      STATUS: "ACTIVE" | "INACTIVE"
      STATUS_NOTIFY: "PENDING" | "SENT"
      STATUS_ORDER:
        | "PENDING"
        | "PROCESSING"
        | "SHIPPING"
        | "COMPLETED"
        | "CANCEL"
        | "RETURN"
        | "LOST"
        | "WAIT_SHIPPING"
      TYPE_ACTION: "FILTER" | "TIRE" | "BATTERY" | "ACCESSARY" | "EXCEPTION"
      TYPE_BUSINESS: "PERSONAL" | "HOUSEHOLD" | "COMPANY"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
