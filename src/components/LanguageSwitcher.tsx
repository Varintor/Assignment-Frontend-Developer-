import { useTranslation } from "react-i18next";

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const language = i18n.resolvedLanguage?.startsWith("en") ? "en" : "th";

  const changeLanguage = (nextLanguage: "th" | "en") => {
    localStorage.setItem("language", nextLanguage);
    void i18n.changeLanguage(nextLanguage);
  };

  return (
    <div className="language-switcher" aria-label="Language selector">
      {(["en", "th"] as const).map((item) => (
        <button
          key={item}
          type="button"
          className={language === item ? "active" : ""}
          aria-pressed={language === item}
          onClick={() => changeLanguage(item)}
        >
          {item === "th" ? "ไทย" : "EN"}
        </button>
      ))}
    </div>
  );
}
