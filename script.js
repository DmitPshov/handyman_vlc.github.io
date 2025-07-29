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

 // Функция для установки cookie
  /**
     * Установить cookie.
     * @param {string} name - имя cookie
     * @param {string} value - значение
     * @param {number} days - срок жизни в днях
     */
    function setCookie(name, value, days) {
      var expires = '';
      if (typeof days === 'number') {
        var date = new Date();
        date.setTime(date.getTime() + (days * 864e5));
        expires = '; expires=' + date.toUTCString();
      }
      // SameSite=Lax снижает риск утечки; Secure добавляем только на HTTPS
      var secure = location.protocol === 'https:' ? '; Secure' : '';
      document.cookie = name + '=' + encodeURIComponent(value) + expires + '; path=/; SameSite=Lax' + secure;
    }

    /** Получить значение cookie по имени */
    function getCookie(name) {
      var match = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)'));
      return match ? decodeURIComponent(match[1]) : null;
    }

    /* ========= ЛОГИКА БАННЕРА ========= */

    (function () {
      var COOKIE_NAME = 'cookieConsent';   // значение: "accepted" | "rejected"
      var COOKIE_TTL_DAYS = 1;           // срок хранения выбора

      var banner = document.getElementById('cookieBanner');
      var btnAccept = document.getElementById('cookieAccept');
      var btnReject = document.getElementById('cookieReject');

      // Показать баннер только если выбора ещё не было
      function maybeShowBanner() {
        var consent = getCookie(COOKIE_NAME);
        if (!consent) {
          banner.classList.add('show');
          // Перемещаем фокус на первый интерактивный элемент для доступности
          // (не делаем это агрессивно, чтобы не мешать пользователю, поэтому задержка 0)
          setTimeout(function () { btnAccept.focus(); }, 0);
        }
      }

      // Обработчики действий
      btnAccept.addEventListener('click', function () {
        setCookie(COOKIE_NAME, 'accepted', COOKIE_TTL_DAYS);
        banner.classList.remove('show');
        // Здесь вы можете включить нестрого необходимые скрипты аналитики,
        // которые должны стартовать только после согласия.
        // initAnalytics(); // пример
      });
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

      btnReject.addEventListener('click', function () {
        setCookie(COOKIE_NAME, 'rejected', COOKIE_TTL_DAYS);
        banner.classList.remove('show');
        // При отклонении — не подключаем трекинг/аналитику.
      });

      // Дополнительно: клавиша Escape — быстро закрыть баннер с отклонением (удобство UX с клавиатуры)
      banner.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
          setCookie(COOKIE_NAME, 'rejected', COOKIE_TTL_DAYS);
          banner.classList.remove('show');
        }
      });

      // Показ при загрузке
      window.addEventListener('DOMContentLoaded', maybeShowBanner);
    })();
