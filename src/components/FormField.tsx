import type { InputHTMLAttributes, ReactNode } from "react";

type FormFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  icon?: "mail" | "lock" | "user" | "phone" | "at";
  action?: ReactNode;
};

export function FormField({
  label,
  error,
  id,
  icon = "user",
  action,
  ...inputProps
}: FormFieldProps) {
  const errorId = `${id}-error`;
  const iconPath =
    icon === "mail" ? (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m4 7 8 6 8-6" />
      </>
    ) : icon === "lock" ? (
      <>
        <rect x="5" y="10" width="14" height="11" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </>
    ) : icon === "phone" ? (
      <path d="M7.4 3.5H4.8A1.8 1.8 0 0 0 3 5.3C3 14 10 21 18.7 21a1.8 1.8 0 0 0 1.8-1.8v-2.6l-4.2-1-1.1 2.2a14.7 14.7 0 0 1-9-9l2.2-1.1-1-4.2Z" />
    ) : icon === "at" ? (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M16 12v1.5a2.5 2.5 0 0 0 5 0V12a9 9 0 1 0-3 6.7" />
      </>
    ) : (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </>
    );
  return (
    <label className="login-field" htmlFor={id}>
      <span>{label}</span>
      <span className={`login-input${error ? " has-error" : ""}`}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <g
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {iconPath}
          </g>
        </svg>
        <input
          id={id}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          {...inputProps}
        />
        {action}
      </span>
      {error && (
        <small className="login-error" id={errorId}>
          {error}
        </small>
      )}
    </label>
  );
}
