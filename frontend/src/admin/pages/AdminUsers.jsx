import { useCallback, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Check, Minus, ShieldAlert, Trash2, UserPlus } from "lucide-react";

import AdminHeader from "../components/AdminHeader.jsx";
import PermissionGate from "../components/PermissionGate.jsx";
import Badge from "../../components/ui/Badge.jsx";
import Button from "../../components/ui/Button.jsx";
import ConfirmationModal from "../../components/ui/ConfirmationModal.jsx";
import Field from "../../components/ui/Field.jsx";
import Modal from "../../components/ui/Modal.jsx";
import { ListSkeleton } from "../../components/states/LoadingState.jsx";
import { useToast } from "../../context/ToastContext.jsx";
import { useAsync } from "../../hooks/useAsync.js";
import {
  inviteUser,
  listUsers,
  removeUser,
  updateUserRole,
  updateUserStatus,
} from "../../services/userService.js";
import {
  PERMISSIONS,
  PERMISSION_LABELS,
  ROLES,
  ROLE_LABELS,
} from "../../utils/constants.js";
import { formatDate, initials, timeAgo } from "../../utils/format.js";

const ALL_PERMISSIONS = Object.keys(PERMISSION_LABELS);
const STATUS_TONES = { active: "success", invited: "amber", suspended: "error" };

export default function AdminUsers() {
  const { openNav } = useOutletContext();
  const toast = useToast();

  const [search, setSearch] = useState("");
  const [inviteOpen, setInviteOpen] = useState(false);
  const [pendingRemove, setPendingRemove] = useState(null);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", role: ROLES.PRODUCT_MANAGER });
  const [formError, setFormError] = useState(null);

  const fetcher = useCallback(() => listUsers({ search }), [search]);
  const { data, loading, reload } = useAsync(fetcher, [search]);

  async function onInvite(event) {
    event.preventDefault();
    setBusy(true);
    setFormError(null);
    try {
      await inviteUser(form);
      toast.success(`Invitation created for ${form.email} (demo only)`);
      setForm({ name: "", email: "", role: ROLES.PRODUCT_MANAGER });
      setInviteOpen(false);
      reload();
    } catch (error) {
      setFormError(error.message);
    } finally {
      setBusy(false);
    }
  }

  async function onRoleChange(user, role) {
    await updateUserRole(user.id, role);
    toast.success(`${user.name} is now ${ROLE_LABELS[role]}`);
    reload();
  }

  async function onStatusChange(user, status) {
    await updateUserStatus(user.id, status);
    toast.notify(`${user.name} set to ${status}`);
    reload();
  }

  async function onRemove() {
    setBusy(true);
    try {
      await removeUser(pendingRemove.id);
      toast.success("User removed from the demo list");
      setPendingRemove(null);
      reload();
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <AdminHeader
        title="Users & roles"
        subtitle={`${data?.total ?? 0} accounts`}
        onMenuClick={openNav}
        actions={
          <Button
            variant="primary"
            size="sm"
            icon={UserPlus}
            onClick={() => setInviteOpen(true)}
          >
            Invite user
          </Button>
        }
      />

      <div className="admin__content">
        <PermissionGate permission="users.manage">
          <p className="alert alert--warn">
            <ShieldAlert size={17} aria-hidden="true" />
            <span>
              <strong>Frontend permissions only.</strong> The roles below
              control what this interface shows. Real authorization must be
              enforced by the backend — hiding a button does not protect the
              data behind it.
            </span>
          </p>

          {/* Role matrix ---------------------------------------------------- */}
          <div className="role-grid">
            {[ROLES.ADMIN, ROLES.PRODUCT_MANAGER].map((role) => (
              <article
                className="role-card"
                key={role}
                data-variant={role === ROLES.ADMIN ? "admin" : "manager"}
              >
                <div className="row row--between">
                  <h2 className="panel-title">{ROLE_LABELS[role]}</h2>
                  <Badge tone={role === ROLES.ADMIN ? "brand" : "teal"}>
                    {
                      (data?.items ?? []).filter((user) => user.role === role).length
                    }{" "}
                    users
                  </Badge>
                </div>

                <p className="text-sm text-muted">
                  {role === ROLES.ADMIN
                    ? "Full access: catalogue, analytics, users and settings."
                    : "Catalogue work only: add and edit products, upload images, view listings."}
                </p>

                <div className="perm-list">
                  {ALL_PERMISSIONS.map((permission) => {
                    const allowed = PERMISSIONS[role].includes(permission);
                    return (
                      <span
                        className="perm-list__item"
                        key={permission}
                        data-allowed={allowed}
                      >
                        {allowed ? <Check size={15} /> : <Minus size={15} />}
                        <span style={allowed ? { color: "var(--text)" } : undefined}>
                          {PERMISSION_LABELS[permission]}
                        </span>
                      </span>
                    );
                  })}
                </div>
              </article>
            ))}
          </div>

          {/* User table ------------------------------------------------------ */}
          <section className="panel">
            <div className="admin-toolbar">
              <div className="admin-toolbar__grow">
                <input
                  className="input"
                  type="search"
                  placeholder="Search by name or email"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  aria-label="Search users"
                />
              </div>
            </div>

            {loading ? (
              <ListSkeleton rows={5} />
            ) : (
              <div className="table-wrap">
                <table className="table">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Joined</th>
                      <th>Last active</th>
                      <th aria-label="Actions" />
                    </tr>
                  </thead>
                  <tbody>
                    {(data?.items ?? []).map((user) => (
                      <tr key={user.id}>
                        <td>
                          <span className="cell-product">
                            <span className="avatar avatar--sm" aria-hidden="true">
                              {initials(user.name)}
                            </span>
                            <span>
                              <span className="cell-product__name">{user.name}</span>
                              <span className="cell-product__sub">{user.email}</span>
                            </span>
                          </span>
                        </td>
                        <td>
                          <select
                            className="select"
                            value={user.role}
                            onChange={(event) => onRoleChange(user, event.target.value)}
                            aria-label={`Role for ${user.name}`}
                            style={{ minWidth: 170 }}
                          >
                            {Object.entries(ROLE_LABELS).map(([value, label]) => (
                              <option key={value} value={value}>
                                {label}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <Badge tone={STATUS_TONES[user.status] ?? "neutral"}>
                            {user.status}
                          </Badge>
                        </td>
                        <td className="text-xs text-muted">
                          {formatDate(user.joinedAt)}
                        </td>
                        <td className="text-xs text-muted">
                          {user.lastActive ? timeAgo(user.lastActive) : "—"}
                        </td>
                        <td>
                          <span className="table__actions">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                onStatusChange(
                                  user,
                                  user.status === "suspended" ? "active" : "suspended",
                                )
                              }
                            >
                              {user.status === "suspended" ? "Reactivate" : "Suspend"}
                            </Button>
                            <button
                              type="button"
                              className="icon-btn"
                              onClick={() => setPendingRemove(user)}
                              aria-label={`Remove ${user.name}`}
                            >
                              <Trash2 size={16} />
                            </button>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </PermissionGate>
      </div>

      {/* Invite modal ------------------------------------------------------- */}
      <Modal
        open={inviteOpen}
        onClose={() => setInviteOpen(false)}
        title="Invite a user"
        description="Creates an entry in the demo user list. No email is sent."
      >
        <form className="stack stack-5" onSubmit={onInvite} id="invite-form">
          {formError && <p className="alert alert--error">{formError}</p>}

          <Field
            label="Full name"
            required
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            placeholder="Ritika Shah"
          />
          <Field
            label="Email address"
            type="email"
            required
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
            placeholder="name@huntdeal.example"
          />
          <Field
            as="select"
            label="Role"
            value={form.role}
            onChange={(event) => setForm({ ...form, role: event.target.value })}
            hint="Product Managers cannot see analytics, users or settings."
          >
            {Object.entries(ROLE_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Field>

          <div className="form-actions">
            <Button variant="ghost" onClick={() => setInviteOpen(false)} disabled={busy}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" loading={busy}>
              Send invitation
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmationModal
        open={Boolean(pendingRemove)}
        title="Remove this user?"
        message={`${pendingRemove?.name} will lose access to the admin panel. In this build the change applies to the demo list only.`}
        confirmLabel="Remove user"
        busy={busy}
        onConfirm={onRemove}
        onClose={() => setPendingRemove(null)}
      />
    </>
  );
}
