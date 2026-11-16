import { AlertTriangle } from "lucide-react";

import Button from "./Button.jsx";
import Modal from "./Modal.jsx";

/** Confirm/cancel dialog for destructive admin actions. */
export default function ConfirmationModal({
  open,
  title = "Are you sure?",
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  tone = "danger",
  busy = false,
  onConfirm,
  onClose,
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      footer={
        <>
          <Button variant="ghost" onClick={onClose} disabled={busy}>
            {cancelLabel}
          </Button>
          <Button variant={tone} onClick={onConfirm} loading={busy}>
            {confirmLabel}
          </Button>
        </>
      }
    >
      <div className="row" style={{ alignItems: "flex-start" }}>
        <AlertTriangle
          size={20}
          aria-hidden="true"
          style={{ color: "var(--c-error-500)", flexShrink: 0, marginTop: 2 }}
        />
        <p>{message}</p>
      </div>
    </Modal>
  );
}
