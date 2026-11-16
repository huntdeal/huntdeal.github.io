import { PackageSearch } from "lucide-react";

import Button from "../ui/Button.jsx";

/** Shown when a query legitimately returns nothing. */
export default function EmptyState({
  icon: Icon = PackageSearch,
  title = "Nothing here yet",
  message,
  action,
  secondaryAction,
}) {
  return (
    <div className="state">
      <span className="state__icon" aria-hidden="true">
        <Icon size={26} />
      </span>
      <h3 className="state__title">{title}</h3>
      {message && <p className="state__text">{message}</p>}
      {(action || secondaryAction) && (
        <div className="state__actions">
          {action && (
            <Button variant="primary" to={action.to} onClick={action.onClick}>
              {action.label}
            </Button>
          )}
          {secondaryAction && (
            <Button
              variant="outline"
              to={secondaryAction.to}
              onClick={secondaryAction.onClick}
            >
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
