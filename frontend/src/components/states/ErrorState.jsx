import { AlertCircle, RotateCw } from "lucide-react";

import Button from "../ui/Button.jsx";

/** Shown when a service call fails. `onRetry` re-runs the same request. */
export default function ErrorState({
  title = "Something went wrong",
  message,
  error,
  onRetry,
}) {
  const detail =
    message ?? error?.message ?? "The request could not be completed.";

  return (
    <div className="state state--error" role="alert">
      <span className="state__icon" aria-hidden="true">
        <AlertCircle size={26} />
      </span>
      <h3 className="state__title">{title}</h3>
      <p className="state__text">{detail}</p>
      {onRetry && (
        <div className="state__actions">
          <Button variant="primary" icon={RotateCw} onClick={onRetry}>
            Try again
          </Button>
        </div>
      )}
    </div>
  );
}
