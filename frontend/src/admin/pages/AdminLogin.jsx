import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import {
  AlertCircle,
  ArrowLeft,
  BarChart3,
  CheckCircle2,
  Eye,
  EyeOff,
  LogIn,
  Package,
  ShieldAlert,
  Tag,
  Users,
} from "lucide-react";

import Button from "../../components/ui/Button.jsx";
import Field from "../../components/ui/Field.jsx";
import { useAdminAuth } from "../../context/AdminAuthContext.jsx";
import { demoAccounts } from "../../data/users.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values) {
  const errors = {};
  if (!values.email.trim()) errors.email = "Enter your admin email.";
  else if (!EMAIL_RE.test(values.email.trim()))
    errors.email = "That does not look like an email address.";

  if (!values.password) errors.password = "Enter your password.";
  else if (values.password.length < 6)
    errors.password = "Password must be at least 6 characters.";

  return errors;
}

export default function AdminLogin() {
  const { signIn, isAuthenticated, pending } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [values, setValues] = useState({ email: "", password: "", remember: true });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [formError, setFormError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  if (isAuthenticated) {
    return <Navigate to={location.state?.from ?? "/admin/dashboard"} replace />;
  }

  function setField(field, value) {
    const next = { ...values, [field]: value };
    setValues(next);
    if (touched[field]) setErrors(validate(next));
  }

  async function onSubmit(event) {
    event.preventDefault();
    setFormError(null);
    const found = validate(values);
    setErrors(found);
    setTouched({ email: true, password: true });
    if (Object.keys(found).length) return;

    try {
      await signIn(values);
      setSuccess(true);
      navigate(location.state?.from ?? "/admin/dashboard", { replace: true });
    } catch (error) {
      setFormError(error.message);
    }
  }

  function applyDemoAccount(email) {
    setValues({ email, password: "demo-password", remember: true });
    setErrors({});
    setFormError(null);
  }

  return (
    <div className="auth-page">
      {/* Brand panel ------------------------------------------------------ */}
      <aside className="auth-page__aside">
        <Link to="/" className="brand brand--inverse" style={{ position: "relative" }}>
          <span className="brand__mark" aria-hidden="true">
            <Tag size={18} />
          </span>
          <span className="brand__text">
            <span className="brand__name">
              Hunt<em>Deal</em>
            </span>
            <span className="brand__tag">Admin panel</span>
          </span>
        </Link>

        <div className="auth-page__quote">
          <h2>Run the catalogue from one place</h2>
          <p>
            Add deals, watch what people click, and keep the public site
            accurate — without touching a spreadsheet.
          </p>
        </div>

        <div className="auth-page__points">
          <p className="auth-point">
            <Package size={17} aria-hidden="true" />
            <span>Add, edit and retire products with a live card preview.</span>
          </p>
          <p className="auth-point">
            <BarChart3 size={17} aria-hidden="true" />
            <span>Click analytics by day, product and category.</span>
          </p>
          <p className="auth-point">
            <Users size={17} aria-hidden="true" />
            <span>Separate Admin and Product Manager permissions.</span>
          </p>
        </div>
      </aside>

      {/* Form ------------------------------------------------------------- */}
      <main className="auth-page__form">
        <div className="auth-card">
          <Link to="/" className="btn btn--ghost btn--sm" style={{ alignSelf: "flex-start" }}>
            <ArrowLeft size={15} aria-hidden="true" />
            Back to site
          </Link>

          <div className="auth-card__head">
            <h1>Sign in to the admin panel</h1>
            <p className="text-sm text-muted">
              Use one of the demo accounts below — no real account exists yet.
            </p>
          </div>

          <p className="alert alert--warn">
            <ShieldAlert size={17} aria-hidden="true" />
            <span>
              <strong>Mock sign-in.</strong> This screen does not authenticate
              anyone. It stores a session object in your browser so the panel
              can be demonstrated. Real authentication must be implemented on
              the backend before this goes live.
            </span>
          </p>

          {formError && (
            <p className="alert alert--error" role="alert">
              <AlertCircle size={17} aria-hidden="true" />
              <span>{formError}</span>
            </p>
          )}

          {success && (
            <p className="alert alert--success">
              <CheckCircle2 size={17} aria-hidden="true" />
              <span>Signed in. Taking you to the dashboard…</span>
            </p>
          )}

          <form className="stack stack-5" onSubmit={onSubmit} noValidate>
            <Field
              label="Email or admin ID"
              type="email"
              required
              autoComplete="username"
              value={values.email}
              error={touched.email ? errors.email : undefined}
              onChange={(event) => setField("email", event.target.value)}
              onBlur={() => {
                setTouched((t) => ({ ...t, email: true }));
                setErrors(validate(values));
              }}
              placeholder="admin@huntdeal.example"
            />

            <Field
              as="custom"
              label="Password"
              required
              error={touched.password ? errors.password : undefined}
            >
              <div className="input-group">
                <input
                  className="input"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={values.password}
                  aria-invalid={touched.password && errors.password ? "true" : undefined}
                  onChange={(event) => setField("password", event.target.value)}
                  onBlur={() => {
                    setTouched((t) => ({ ...t, password: true }));
                    setErrors(validate(values));
                  }}
                  placeholder="At least 6 characters"
                />
                <button
                  type="button"
                  className="input-group__action"
                  onClick={() => setShowPassword((shown) => !shown)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </Field>

            <div className="row row--between row--wrap">
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={values.remember}
                  onChange={(event) => setField("remember", event.target.checked)}
                />
                <span>Remember me on this device</span>
              </label>
              <span
                className="text-xs text-subtle"
                title="Password recovery arrives with the backend"
                style={{ color: "var(--text-subtle)" }}
              >
                Password reset: backend pending
              </span>
            </div>

            <Button type="submit" variant="primary" icon={LogIn} block loading={pending}>
              Sign in
            </Button>
          </form>

          <div className="demo-creds">
            <strong>Demo accounts</strong>
            {demoAccounts.map((account) => (
              <span className="demo-creds__row" key={account.email}>
                <code>{account.email}</code>
                <button
                  type="button"
                  className="btn btn--ghost btn--sm"
                  onClick={() => applyDemoAccount(account.email)}
                >
                  Use {account.label}
                </button>
              </span>
            ))}
            <span>
              Any password of six characters or more is accepted in this demo.
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
