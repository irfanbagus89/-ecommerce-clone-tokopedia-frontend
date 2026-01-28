import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCreateProductStore = create(
  persist(
    (set) => ({
      form: {
        name: "",
        description: "",
        price: "0",
        category_id: "",
        active: true,
        variants: [{ name: "", stock: "1", price: "0" }],
        images: [],
      },

      setField: (key, value) =>
        set((state) => ({
          form: { ...state.form, [key]: value },
        })),

      setVariants: (variants) =>
        set((state) => ({
          form: { ...state.form, variants },
        })),

      setImages: (images) =>
        set((state) => ({
          form: { ...state.form, images },
        })),

      resetForm: () =>
        set({
          form: {
            name: "",
            description: "",
            price: "0",
            category_id: "",
            active: true,
            variants: [{ name: "", stock: "1", price: "0" }],
            images: [],
          },
        }),
    }),
    {
      name: "create-product-form",
      partialize: (state) => ({
        form: {
          ...state.form,
          images: [], // ⬅️ sengaja tidak disimpan
        },
      }),
    }
  )
);
