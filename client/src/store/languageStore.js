import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useLanguageStore = create(
  persist(
    (set) => ({
      language: 'en',
      
      setLanguage: (lang) => set({ language: lang }),
      
      toggleLanguage: () => set((state) => ({
        language: state.language === 'en' ? 'ar' : 'en'
      })),
    }),
    {
      name: 'language-storage',
    }
  )
)

