import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { AuthLayout } from "../components/AuthLayout";
import { FormField } from "../components/FormField";
import { loginSchema, type LoginValues } from "../schemas/authSchemas";

export function LoginPage() {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <AuthLayout mode="login">
      <div className="login-page-heading">
        <div className="login-welcome-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <rect x="5" y="10" width="14" height="11" rx="2" />
            <path d="M8 10V7a4 4 0 0 1 8 0v3" />
          </svg>
        </div>
        <h1>{t("login.pageTitle")}</h1>
      </div>
      <div className="login-card login-glass-card">
        <p className="login-intro">{t("login.subtitle")}</p>
        <form
          className="login-form"
          onSubmit={handleSubmit(() => setSubmitted(true))}
          noValidate
        >
          <FormField
            id="usernameOrEmail"
            type="text"
            icon="mail"
            label={t("common.usernameOrEmail")}
            autoComplete="username"
            placeholder="name@company.com"
            error={errors.usernameOrEmail?.message}
            {...register("usernameOrEmail")}
          />
          <FormField
            id="password"
            type={showPassword ? "text" : "password"}
            icon="lock"
            label={t("common.password")}
            autoComplete="current-password"
            placeholder="Enter your password"
            error={errors.password?.message}
            {...register("password")}
            action={
              <button
                className="login-input-action"
                type="button"
                aria-label={t("login.showPassword")}
                onClick={() => setShowPassword((value) => !value)}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M2.5 12s3.5-5 9.5-5 9.5 5 9.5 5-3.5 5-9.5 5-9.5-5-9.5-5Z" />
                  <circle cx="12" cy="12" r="2.5" />
                </svg>
              </button>
            }
          />
          <a className="forgot-link" href="#forgot-password">
            {t("login.forgot")}
          </a>
          {submitted && (
            <p className="login-success" role="status">
              {t("login.success")}
            </p>
          )}
          <button
            className="login-submit"
            type="submit"
            disabled={isSubmitting}
          >
            {t("login.submit")} <span>→</span>
          </button>
        </form>
        <div className="login-staff-note">{t("login.noAccount")}</div>
        <Link className="login-help-kol" to="/register">
          <span>
            <small>{t("register.subtitle")}</small>
            <strong>{t("login.register")}</strong>
          </span>
          <b className="login-help-kol-go">→</b>
        </Link>
      </div>
      <a className="login-back-public" href="/">
        ← <span>{t("login.back")}</span>
      </a>
      <footer className="login-form-foot">
        <a href="#privacy">{t("login.privacy")}</a>
        <a href="#terms">{t("login.terms")}</a>
        <a href="#help">{t("login.help")}</a>
      </footer>
    </AuthLayout>
  );
}
