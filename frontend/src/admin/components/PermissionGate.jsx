import { Lock } from "lucide-react";

import Button from "../../components/ui/Button.jsx";
import { useAdminAuth } from "../../context/AdminAuthContext.jsx";
import { PERMISSION_LABELS } from "../../utils/constants.js";

/**
 * Hides a section the current role cannot use.
 *
 * This controls visibility only. It is not authorization — the backend must
 * reject the request independently, because anything in the browser can be
 * bypassed.
 */
export default function PermissionGate({ permission, children, fallback }) {
  const { can, roleLabel } = useAdminAuth();

  if (can(permission)) return children;
  if (fallback !== undefined) return fallback;

  return (
    <div className="state">
      <span className="state__icon" aria-hidden="true">
        <Lock size={24} />
      </span>
      <h2 className="state__title">Not available for your role</h2>
      <p className="state__text">
        {roleLabel} accounts do not have the “
        {PERMISSION_LABELS[permission] ?? permission}” permission. Ask an admin
        if you need access to this section.
      </p>
      <div className="state__actions">
        <Button variant="primary" to="/admin/dashboard">
          Back to dashboard
        </Button>
      </div>
    </div>
  );
}
