import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { KeyRound, RotateCcw, Save } from "lucide-react";

import AdminHeader from "../components/AdminHeader.jsx";
import PermissionGate from "../components/PermissionGate.jsx";
import Button from "../../components/ui/Button.jsx";
import Field from "../../components/ui/Field.jsx";
import LoadingState from "../../components/states/LoadingState.jsx";
import { useAdminAuth } from "../../context/AdminAuthContext.jsx";
import { useToast } from "../../context/ToastContext.jsx";
import { useAsync } from "../../hooks/useAsync.js";
import { getSettings, saveSettings } from "../../services/siteService.js";
import { defaultSettings } from "../../data/users.js";
import { initials } from "../../utils/format.js";

function Toggle({ label, hint, checked, onChange }) {
  return (
    <label className="row row--between" style={{ gap: "var(--sp-5)" }}>
      <span className="stack" style={{ gap: 2 }}>
        <span className="field__label">{label}</span>
        {hint && <span className="field__hint">{hint}</span>}
      </span>
      <span className="switch">
        <input
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
        />
        <span className="switch__track" />
      </span>
    </label>
  );
}

export default function AdminSettings() {
  const { openNav } = useOutletContext();
  const { user, roleLabel } = useAdminAuth();
  const toast = useToast();

  const { data, loading } = useAsync(() => getSettings(), []);
  const [saving, setSaving] = useState(false);

  /** Unsaved edits. Until the first edit the loaded settings are shown as-is. */
  const [draft, setDraft] = useState(null);
  const values = draft ?? data;

  function patch(section, field, value) {
    setDraft((current) => {
      const base = current ?? data;
      return { ...base, [section]: { ...base[section], [field]: value } };
    });
  }

  async function onSave(event) {
    event.preventDefault();
    setSaving(true);
    try {
      await saveSettings(values);
      toast.success("Settings saved to this browser");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  }

  function onReset() {
    setDraft(defaultSettings);
    toast.notify("Settings reset to defaults — save to keep them");
  }

  return (
    <>
      <AdminHeader
        title="Settings"
        subtitle="Profile, site information and affiliate disclosure"
        onMenuClick={openNav}
      />

      <div className="admin__content">
        <PermissionGate permission="settings.manage">
          {loading || !values ? (
            <LoadingState label="Loading settings…" />
          ) : (
            <form className="admin-grid admin-grid--2-1" onSubmit={onSave}>
              <div className="panel">
                {/* Profile ---------------------------------------------- */}
                <section className="form-section">
                  <h2 className="form-section__title">Admin profile</h2>

                  <div className="row" style={{ gap: "var(--sp-4)" }}>
                    <span className="avatar avatar--lg" aria-hidden="true">
                      {initials(values.profile.name)}
                    </span>
                    <div className="stack" style={{ gap: 2 }}>
                      <strong>{values.profile.name}</strong>
                      <span className="text-xs text-muted">{user?.email}</span>
                      <span className="badge badge--brand" style={{ marginTop: 6 }}>
                        {roleLabel}
                      </span>
                    </div>
                  </div>

                  <div className="form-grid">
                    <Field
                      label="Display name"
                      value={values.profile.name}
                      onChange={(event) => patch("profile", "name", event.target.value)}
                    />
                    <Field
                      label="Job title"
                      value={values.profile.title}
                      onChange={(event) => patch("profile", "title", event.target.value)}
                    />
                    <Field
                      label="Contact email"
                      type="email"
                      value={values.profile.email}
                      onChange={(event) => patch("profile", "email", event.target.value)}
                    />
                    <Field
                      label="Timezone"
                      value={values.profile.timezone}
                      onChange={(event) => patch("profile", "timezone", event.target.value)}
                    />
                  </div>
                </section>

                {/* Website ---------------------------------------------- */}
                <section className="form-section">
                  <h2 className="form-section__title">Website information</h2>
                  <div className="form-grid">
                    <Field
                      label="Site name"
                      value={values.site.siteName}
                      onChange={(event) => patch("site", "siteName", event.target.value)}
                    />
                    <Field
                      label="Tagline"
                      value={values.site.tagline}
                      onChange={(event) => patch("site", "tagline", event.target.value)}
                    />
                    <Field
                      label="Support email"
                      type="email"
                      value={values.site.supportEmail}
                      onChange={(event) =>
                        patch("site", "supportEmail", event.target.value)
                      }
                    />
                    <Field
                      as="select"
                      label="Marketplace"
                      value={values.site.marketplace}
                      onChange={(event) =>
                        patch("site", "marketplace", event.target.value)
                      }
                      hint="Which Amazon marketplace deals are collected from."
                    >
                      <option value="amazon.in">amazon.in (India)</option>
                      <option value="amazon.com">amazon.com (US)</option>
                      <option value="amazon.co.uk">amazon.co.uk (UK)</option>
                    </Field>
                  </div>
                </section>

                {/* Affiliate -------------------------------------------- */}
                <section className="form-section">
                  <h2 className="form-section__title">Affiliate disclosure</h2>

                  <Field
                    as="textarea"
                    label="Disclosure text"
                    value={values.affiliate.disclosureText}
                    onChange={(event) =>
                      patch("affiliate", "disclosureText", event.target.value)
                    }
                    hint="Shown in the footer and on product pages, as the Associates programme requires."
                    style={{ minHeight: 96 }}
                  />

                  <div className="stack stack-4">
                    <Toggle
                      label="Show disclosure in the footer"
                      checked={values.affiliate.showInFooter}
                      onChange={(value) => patch("affiliate", "showInFooter", value)}
                    />
                    <Toggle
                      label="Show disclosure on product pages"
                      checked={values.affiliate.showOnProductPages}
                      onChange={(value) =>
                        patch("affiliate", "showOnProductPages", value)
                      }
                    />
                    <Toggle
                      label="Open affiliate links in a new tab"
                      hint="Recommended, so visitors do not lose their place on HuntDeal."
                      checked={values.affiliate.openLinksInNewTab}
                      onChange={(value) =>
                        patch("affiliate", "openLinksInNewTab", value)
                      }
                    />
                  </div>

                  <p className="alert alert--warn">
                    <KeyRound size={17} aria-hidden="true" />
                    <span>
                      The Amazon Associates tag and any API credentials belong in
                      backend configuration, never in frontend code. There is no
                      field for them here by design.
                    </span>
                  </p>
                </section>

                {/* Preferences ------------------------------------------ */}
                <section className="form-section">
                  <h2 className="form-section__title">Preferences</h2>
                  <div className="stack stack-4">
                    <Toggle
                      label="Email me when deals expire"
                      checked={values.preferences.emailOnExpiredDeals}
                      onChange={(value) =>
                        patch("preferences", "emailOnExpiredDeals", value)
                      }
                    />
                    <Toggle
                      label="Weekly performance digest"
                      checked={values.preferences.weeklyPerformanceDigest}
                      onChange={(value) =>
                        patch("preferences", "weeklyPerformanceDigest", value)
                      }
                    />
                    <Toggle
                      label="Compact tables"
                      hint="Reduces row height across admin tables."
                      checked={values.preferences.compactTables}
                      onChange={(value) => patch("preferences", "compactTables", value)}
                    />
                    <Toggle
                      label="Publish new products immediately"
                      hint="When off, new products are saved as drafts."
                      checked={values.preferences.autoPublishNewProducts}
                      onChange={(value) =>
                        patch("preferences", "autoPublishNewProducts", value)
                      }
                    />
                  </div>
                </section>

                <div className="form-actions">
                  <Button variant="ghost" icon={RotateCcw} onClick={onReset}>
                    Reset to defaults
                  </Button>
                  <Button type="submit" variant="primary" icon={Save} loading={saving}>
                    Save settings
                  </Button>
                </div>
              </div>

              {/* Side panel --------------------------------------------- */}
              <div className="panel form-preview">
                <h2 className="panel-title">Footer preview</h2>
                <p className="panel__sub">
                  How the disclosure reads on the public site.
                </p>

                <div
                  style={{
                    padding: "var(--sp-5)",
                    borderRadius: "var(--r-md)",
                    background: "var(--surface-inverse)",
                    color: "rgba(255,255,255,.72)",
                    fontSize: "var(--fs-xs)",
                    lineHeight: 1.6,
                  }}
                >
                  <strong style={{ color: "#fff" }}>
                    {values.site.siteName}
                  </strong>{" "}
                  — {values.site.tagline}
                  <p style={{ marginTop: 10 }}>{values.affiliate.disclosureText}</p>
                </div>

                <p className="text-xs text-muted">
                  Settings are stored in this browser for the demo. They move to
                  the backend with the settings endpoint.
                </p>
              </div>
            </form>
          )}
        </PermissionGate>
      </div>
    </>
  );
}
