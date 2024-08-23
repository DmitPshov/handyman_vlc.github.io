// 
const translations = {
  "es": null,
  "ru": null
};

const loadTranslations = async (lang) => {
  if (translations[lang] === null) {
    const response = await fetch(`${lang}.json`);
    translations[lang] = await response.json();
  }
};

const updateTranslations = (lang) => {
  document.querySelectorAll("[translate]").forEach(element => {
    const key = element.getAttribute("translate");
    if (translations[lang][key]) {
      element.innerHTML = translations[lang][key];
    }
  });
  document.querySelectorAll("[placeholder]").forEach(element => {
    const key = element.getAttribute("translate");
    if (translations[lang][key]) {
      element.setAttribute("placeholder", translations[lang][key]);
    }
  });
};

const setLanguage = async (lang) => {
  await loadTranslations(lang);
  updateTranslations(lang);
  localStorage.setItem("lang", lang);
  window.location.hash = `#${lang}`;
  document.querySelector(".change-lang").value = lang; // Set the select dropdown value to the current language
};

document.addEventListener("DOMContentLoaded", () => {
  const storedLang = localStorage.getItem("lang") || navigator.language.split('-')[0].toLowerCase();
  const defaultLang = ['es', 'ru'].includes(storedLang) ? storedLang : 'es';
  setLanguage(defaultLang);

  // Event listener for the select dropdown
  document.querySelector(".change-lang").addEventListener("change", (event) => {
    setLanguage(event.target.value);
  });

  const path = window.location.pathname.replace(/\.html$/, '');
  if (window.location.pathname !== path) {
    window.history.replaceState({}, '', path);
  }
});
