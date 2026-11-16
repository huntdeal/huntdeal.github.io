import { useId } from "react";
import { AlertCircle } from "lucide-react";

/**
 * Labelled form control with hint and error slots.
 * `as` picks the control: "input" | "textarea" | "select".
 */
export default function Field({
  label,
  hint,
  error,
  as = "input",
  id,
  required = false,
  children,
  className = "",
  ...rest
}) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const errorId = `${fieldId}-error`;
  const hintId = `${fieldId}-hint`;

  const describedBy = [error ? errorId : null, hint ? hintId : null]
    .filter(Boolean)
    .join(" ");

  const shared = {
    id: fieldId,
    "aria-invalid": error ? "true" : undefined,
    "aria-describedby": describedBy || undefined,
    required,
    ...rest,
  };

  return (
    <div className={`field ${className}`}>
      {label && (
        <label className="field__label" htmlFor={fieldId}>
          {label}
          {required && (
            <span style={{ color: "var(--c-error-500)" }} aria-hidden="true">
              {" "}
              *
            </span>
          )}
        </label>
      )}

      {as === "textarea" && <textarea className="textarea" {...shared} />}
      {as === "select" && (
        <select className="select" {...shared}>
          {children}
        </select>
      )}
      {as === "input" && <input className="input" {...shared} />}
      {as === "custom" && children}

      {hint && !error && (
        <span className="field__hint" id={hintId}>
          {hint}
        </span>
      )}
      {error && (
        <span className="field__error" id={errorId} role="alert">
          <AlertCircle size={13} aria-hidden="true" />
          {error}
        </span>
      )}
    </div>
  );
}
