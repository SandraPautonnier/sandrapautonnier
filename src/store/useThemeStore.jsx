import { create } from "zustand";

const useThemeStore = create((set) => {
  
  const savedTheme = localStorage.getItem("theme");
  const isDarkMode = savedTheme ? savedTheme === "dark" : true; 

  document.body.className = isDarkMode ? "dark-mode" : "light-mode";

  return {
    isDarkMode,
    toggleTheme: () =>
      set((state) => {
        const newMode = !state.isDarkMode;
        localStorage.setItem("theme", newMode ? "dark" : "light");
        document.body.className = newMode ? "dark-mode" : "light-mode";
        return { isDarkMode: newMode };
      }),
  };
});

export default useThemeStore;

