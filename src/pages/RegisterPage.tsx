import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { AuthLayout } from "../components/AuthLayout";
import { FormField } from "../components/FormField";
import { PlatformLogo } from "../components/registration/PlatformLogo";
import {
  bankOptions,
  expertiseOptions,
  platformOptions,
  type PlatformId,
  type PlatformOption,
} from "../data/registrationOptions";
import {
  kolPersonalDataSchema,
  type KolPersonalDataValues,
} from "../schemas/authSchemas";

export function RegisterPage() {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [expertise, setExpertise] = useState<string[]>([]);
  const [platforms, setPlatforms] = useState<PlatformId[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<KolPersonalDataValues>({
    resolver: zodResolver(kolPersonalDataSchema),
    defaultValues: { firstName: "", lastName: "", phone: "", lineId: "" },
  });

  const toggleExpertise = (value: string) => {
    setExpertise((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    );
  };
  const togglePlatform = (id: PlatformId) => {
    setPlatforms((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  };

  const subtitle =
    step === 1
      ? t("register.personalData")
      : step === 2
        ? t("register.workPreferences")
        : step === 3
          ? t("register.socialProfile")
          : step === 4
            ? t("register.address")
            : t("register.paymentInformation");

  return (
    <AuthLayout mode="register" panelClassName={`register-step-${step}`}>
      <div className={`kol-step-shell step-${step}`}>
        <header className="kol-step-heading">
          <h1>{t("register.pageTitle")}</h1>
          <p>
            {t("register.stepLabel", { current: step, total: 6 })} · {subtitle}
          </p>
          <div
            className="kol-step-progress"
            aria-label={t("register.stepLabel", { current: step, total: 6 })}
          >
            {Array.from({ length: 6 }, (_, index) => (
              <span key={index} className={index < step ? "active" : ""} />
            ))}
          </div>
          {step > 1 && <small>{t("register.optionalHint")}</small>}
        </header>

        {step === 1 && (
          <div className="kol-step-card">
            <form
              className="kol-step-form"
              onSubmit={handleSubmit(() => setStep(2))}
              noValidate
            >
              <div className="kol-step-row">
                <FormField
                  id="firstName"
                  label={t("common.firstName")}
                  autoComplete="given-name"
                  placeholder={t("common.firstName")}
                  error={errors.firstName?.message}
                  {...register("firstName")}
                />
                <FormField
                  id="lastName"
                  label={t("common.lastName")}
                  autoComplete="family-name"
                  placeholder={t("common.lastName")}
                  error={errors.lastName?.message}
                  {...register("lastName")}
                />
              </div>
              <FormField
                id="phone"
                type="tel"
                icon="phone"
                label={t("common.phone")}
                autoComplete="tel"
                inputMode="tel"
                placeholder="08x-xxx-xxxx"
                error={errors.phone?.message}
                {...register("phone")}
              />
              <FormField
                id="lineId"
                icon="at"
                label={t("register.lineId")}
                placeholder="LINE ID"
                autoComplete="off"
                error={errors.lineId?.message}
                {...register("lineId")}
              />
              <button
                className="kol-step-submit"
                type="submit"
                disabled={isSubmitting}
              >
                {t("register.continue")} <span aria-hidden="true">→</span>
              </button>
            </form>
            <SignInFooter />
          </div>
        )}

        {step === 2 && (
          <div className="kol-step-card kol-preference-card">
            <section className="kol-option-section">
              <h2>{t("register.expertise")}</h2>
              <div className="kol-expertise-options">
                {expertiseOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={expertise.includes(option) ? "selected" : ""}
                    onClick={() => toggleExpertise(option)}
                  >
                    <span aria-hidden="true">✓</span>
                    {option}
                  </button>
                ))}
              </div>
              <small>{t("register.selectAll")}</small>
            </section>
            <StepActions
              onBack={() => setStep(1)}
              onSkip={() => setStep(3)}
              onContinue={() => setStep(3)}
            />
            <SignInFooter />
          </div>
        )}

        {step === 3 && (
          <div className="kol-step-card kol-social-step-card">
            <section className="kol-option-section">
              <h2>{t("register.addPlatform")}</h2>
              <div className="kol-platform-options">
                {platformOptions.map((platform) => (
                  <button
                    key={platform.id}
                    type="button"
                    className={
                      platforms.includes(platform.id) ? "selected" : ""
                    }
                    onClick={() => togglePlatform(platform.id)}
                  >
                    <PlatformLogo platform={platform} />
                    <span>{platform.name}</span>
                  </button>
                ))}
              </div>
              <small>{t("register.socialHint")}</small>
            </section>

            <div className="kol-selected-socials">
              {platforms.map((id) => {
                const platform = platformOptions.find(
                  (item) => item.id === id,
                )!;
                return (
                  <SocialCard
                    key={id}
                    platform={platform}
                    onRemove={() => togglePlatform(id)}
                  />
                );
              })}
            </div>

            <StepActions
              onBack={() => setStep(2)}
              onSkip={() => setStep(4)}
              onContinue={() => setStep(4)}
            />
            <SignInFooter />
          </div>
        )}

        {step === 4 && (
          <div className="kol-step-card kol-address-step-card">
            <div className="kol-address-form">
              <label className="kol-address-wide">
                <span>{t("register.streetAddress")}</span>
                <textarea placeholder={t("register.streetPlaceholder")} />
              </label>

              <label>
                <span>{t("register.province")}</span>
                <span className="kol-address-control">
                  <AddressIcon type="building" />
                  <select defaultValue="">
                    <option value="" disabled>
                      {t("register.selectProvince")}
                    </option>
                    <option>Bangkok</option>
                    <option>Chiang Mai</option>
                    <option>Chon Buri</option>
                    <option>Khon Kaen</option>
                    <option>Phuket</option>
                  </select>
                </span>
              </label>

              <label>
                <span>{t("register.postalCode")}</span>
                <span className="kol-address-control">
                  <AddressIcon type="pin" />
                  <input
                    inputMode="numeric"
                    maxLength={5}
                    placeholder="10110"
                  />
                </span>
              </label>

              <label>
                <span>{t("register.district")}</span>
                <span className="kol-address-control">
                  <AddressIcon type="search" />
                  <select defaultValue="">
                    <option value="" disabled>
                      {t("register.selectDistrict")}
                    </option>
                  </select>
                </span>
              </label>

              <label>
                <span>{t("register.subdistrict")}</span>
                <span className="kol-address-control">
                  <AddressIcon type="search" />
                  <select defaultValue="">
                    <option value="" disabled>
                      {t("register.selectSubdistrict")}
                    </option>
                  </select>
                </span>
              </label>
            </div>
            <StepActions
              onBack={() => setStep(3)}
              onSkip={() => setStep(5)}
              onContinue={() => setStep(5)}
            />
            <SignInFooter />
          </div>
        )}

        {step === 5 && (
          <div className="kol-step-card kol-payment-step-card">
            <div className="kol-payment-form">
              <label>
                <span>{t("register.bank")}</span>
                <span className="kol-payment-control">
                  <PaymentIcon type="wallet" />
                  <select defaultValue="">
                    <option value="" disabled>
                      {t("register.selectBank")}
                    </option>
                    {bankOptions.map((bank) => (
                      <option key={bank} value={bank}>
                        {bank}
                      </option>
                    ))}
                  </select>
                </span>
              </label>
              <label>
                <span>{t("register.accountName")}</span>
                <span className="kol-payment-control">
                  <PaymentIcon type="person" />
                  <input
                    autoComplete="name"
                    placeholder={t("register.accountNamePlaceholder")}
                  />
                </span>
              </label>
              <label>
                <span>{t("register.accountNumber")}</span>
                <span className="kol-payment-control">
                  <PaymentIcon type="card" />
                  <input
                    inputMode="numeric"
                    autoComplete="off"
                    placeholder={t("register.accountNumber")}
                  />
                </span>
              </label>
            </div>
            <StepActions
              onBack={() => setStep(4)}
              onSkip={() => undefined}
              onContinue={() => undefined}
              showSkipRest={false}
            />
            <SignInFooter />
          </div>
        )}
      </div>
    </AuthLayout>
  );
}

function AddressIcon({ type }: { type: "building" | "pin" | "search" }) {
  if (type === "building") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 21h16M6 21V7l6-3v17m6 0V10l-6-3M9 9h.01M9 13h.01M9 17h.01M15 12h.01M15 16h.01" />
      </svg>
    );
  }
  if (type === "pin") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </svg>
  );
}

function PaymentIcon({ type }: { type: "wallet" | "person" | "card" }) {
  if (type === "wallet") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 7.5h14.5A1.5 1.5 0 0 1 20 9v9a2 2 0 0 1-2 2H5a3 3 0 0 1-3-3V6a2 2 0 0 1 2-2h12v3.5" />
        <path d="M15 12h5v4h-5a2 2 0 0 1 0-4Z" />
      </svg>
    );
  }
  if (type === "person") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5.5 21v-2.5a6.5 6.5 0 0 1 13 0V21" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="6" width="18" height="13" rx="2" />
      <path d="M3 10h18M7 15h4" />
    </svg>
  );
}

function SocialCard({
  platform,
  onRemove,
}: {
  platform: PlatformOption;
  onRemove: () => void;
}) {
  return (
    <article className="kol-social-form-card">
      <header>
        <PlatformLogo platform={platform} />
        <strong>{platform.name}</strong>
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${platform.name}`}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 7h16M9 7V4h6v3m3 0-1 13H7L6 7m4 4v5m4-5v5" />
          </svg>
        </button>
      </header>
      <div className="kol-social-main-fields">
        <label>
          <span>Profile URL / username</span>
          <span className="kol-social-input">
            <b>@</b>
            <input placeholder="URL or username" />
          </span>
        </label>
        <label>
          <span>Followers</span>
          <span className="kol-social-input">
            <b>♙</b>
            <input type="number" min="0" placeholder="0" />
          </span>
        </label>
      </div>
      <div className="kol-social-rate-card">
        <div>
          <strong>Rate card</strong>
          <small>per deliverable · optional</small>
        </div>
        <div className="kol-social-rates">
          {platform.rates.map((type) => (
            <label key={type}>
              <span>{type}</span>
              <span className="kol-rate-input-new">
                <b>฿</b>
                <input type="number" min="0" placeholder="0" />
              </span>
            </label>
          ))}
        </div>
      </div>
    </article>
  );
}

function StepActions({
  onBack,
  onSkip,
  onContinue,
  showSkipRest = true,
}: {
  onBack: () => void;
  onSkip: () => void;
  onContinue: () => void;
  showSkipRest?: boolean;
}) {
  const { t } = useTranslation();
  return (
    <div className="kol-step-actions">
      <button type="button" onClick={onBack}>
        {t("register.back")}
      </button>
      <button type="button" onClick={onSkip}>
        {t("register.skip")}
      </button>
      {showSkipRest && (
        <button type="button" className="skip-rest" onClick={onSkip}>
          {t("register.skipRest")}
        </button>
      )}
      <button type="button" className="continue" onClick={onContinue}>
        {t("register.continue")} <span>→</span>
      </button>
    </div>
  );
}

function SignInFooter() {
  const { t } = useTranslation();
  return (
    <p className="kol-step-signin">
      {t("register.hasAccount")} <Link to="/login">{t("register.login")}</Link>
    </p>
  );
}
