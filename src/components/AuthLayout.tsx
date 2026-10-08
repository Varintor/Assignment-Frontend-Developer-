import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import creatorImage from "../assets/influ.jpg";
import { LanguageSwitcher } from "./LanguageSwitcher";

type AuthLayoutProps = {
  children: ReactNode;
  mode?: "login" | "register";
  panelClassName?: string;
};

export function AuthLayout({
  children,
  mode = "login",
  panelClassName = "",
}: AuthLayoutProps) {
  const { t } = useTranslation();
  return (
    <main className="login-page">
      <section className="login-brand-panel">
        <div className="auth-visual" aria-hidden="true">
          <div className="auth-photo-wrap">
            <img
              src={creatorImage}
              alt=""
              width="720"
              height="720"
              decoding="async"
              fetchPriority="high"
            />
            <span className="auth-live-chip">
              <i /> {t("brand.live")}
            </span>
          </div>
          <span className="auth-float auth-float-smile">😍</span>
          <span className="auth-float auth-float-heart">💜</span>
          <span className="auth-float auth-float-fire">🔥</span>
          <span className="auth-float auth-float-spark">✨</span>
          <span className="auth-stat-chip">
            <b>4.8M</b>
            <small>{t("brand.reach")}</small>
          </span>
        </div>
        <div className="login-brand-content">
          <span className="auth-kicker">{t("brand.kicker")}</span>
          <h1>
            {t("brand.title")}
            <br />
            <em>{t("brand.emphasis")}</em>
          </h1>
          <p>{t("brand.description")}</p>
        </div>
        <div className="login-brand-foot">
          <span>{t("brand.copyright")}</span>
        </div>
        <a className="auth-scroll-cue" href="#signin">
          <span>{t("brand.scroll")}</span>
          <b>{t("brand.join")}</b>
        </a>
      </section>
      <section
        className={`login-form-panel is-${mode} ${panelClassName}`.trim()}
        id="signin"
      >
        {mode === "login" && (
          <div className="language-position">
            <LanguageSwitcher />
          </div>
        )}
        {children}
      </section>
    </main>
  );
}
