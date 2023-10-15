const getPreferredTheme = () => {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const setTheme = (theme) => {
  if (theme === "auto" && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.body.setAttribute("data-bs-theme", "light");
  } else {
    document.body.setAttribute("data-bs-theme", theme);
  }
};

setTheme(getPreferredTheme());