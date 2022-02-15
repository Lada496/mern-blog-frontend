import { useEffect, useState } from "react";
const useTheme = () => {
  const currentTheme =
    localStorage.getItem("color-theme") === "dark" ||
    (!("color-theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  if (currentTheme) {
    localStorage.setItem("color-theme", "dark");
  } else {
    localStorage.setItem("color-theme", "light");
  }

  const [theme, setTheme] = useState(currentTheme);
  useEffect(() => {
    document.documentElement.classList.remove(theme ? "light" : "dark");
    document.documentElement.classList.add(theme ? "dark" : "light");
    localStorage.setItem("color-theme", theme ? "dark" : "light");
  }, [theme]);
  return [theme, setTheme];
};
export default useTheme;
