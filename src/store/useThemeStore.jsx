import { create } from "zustand";

const useThemeStore = create((set) => ({
  isDarkMode: localStorage.getItem("theme") === "dark",
  toggleTheme: () =>
    set((state) => {
      const newMode = !state.isDarkMode;
      localStorage.setItem("theme", newMode ? "dark" : "light");
      document.body.className = newMode ? "dark-mode" : "light-mode";
      return { isDarkMode: newMode };
    }),
}));

export default useThemeStore;
