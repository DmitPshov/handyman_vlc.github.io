// Объект для хранения переводов
const translations = {
    "es": null,
    "en": null,
    "ru": null
  };
  
  // Функция для загрузки переводов
  const loadTranslations = async (lang) => {
    if (translations[lang] === null) {
      const response = await fetch(`${lang}.json`);
      translations[lang] = await response.json();
    }
  };
  
  // Функция для обновления переводов на странице
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
  
  // Функция для установки языка
  const setLanguage = async (lang) => {
    await loadTranslations(lang);
    updateTranslations(lang);
    localStorage.setItem("lang", lang);
    window.location.hash = `#${lang}`;
    modal.style.display = "none"; // Закрыть модальное окно после выбора языка
  };
  
  // Инициализация модального окна и обработчиков событий
  const modal = document.getElementById("myModal");
  const img = document.getElementById("myImg");
  const span = document.getElementsByClassName("close")[0];
  
  img.onclick = () => {
    modal.style.display = "block";
  };
  
  span.onclick = () => {
    modal.style.display = "none";
  };
  
  window.onclick = (event) => {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
  
  // Функция для изменения языка
  function changeLanguage(languageCode) {
    console.log("Language changed to: " + languageCode);
    setLanguage(languageCode);
  }
  
  // Инициализация языка при загрузке страницы
  document.addEventListener("DOMContentLoaded", () => {
    const storedLang = localStorage.getItem("lang") || navigator.language.split('-')[0].toLowerCase();
    const defaultLang = ['es', 'en', 'ru'].includes(storedLang) ? storedLang : 'es';
    setLanguage(defaultLang);
    // Remove .html from URL
    const path = window.location.pathname.replace(/\.html$/, '');
    if (window.location.pathname !== path) {
        window.history.replaceState({}, '', path);
    }

  });
  