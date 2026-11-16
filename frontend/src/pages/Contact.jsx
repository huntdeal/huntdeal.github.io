import { useState } from "react";
import {
  CheckCircle2,
  Clock3,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
} from "lucide-react";

import PageHeader from "../components/PageHeader.jsx";
import Button from "../components/ui/Button.jsx";
import Field from "../components/ui/Field.jsx";
import { useToast } from "../context/ToastContext.jsx";
import { submitContactMessage } from "../services/siteService.js";
import { SITE, SOCIAL_LINKS } from "../utils/constants.js";

const SUBJECTS = [
  "General question",
  "Report a wrong price",
  "Suggest a product",
  "Partnership",
  "Something is broken",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Client-side validation. The backend must validate again when wired up. */
function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Tell us what to call you.";
  else if (values.name.trim().length < 2) errors.name = "That looks too short.";

  if (!values.email.trim()) errors.email = "An email address is required.";
  else if (!EMAIL_RE.test(values.email.trim()))
    errors.email = "Enter a valid email address.";

  if (!values.subject) errors.subject = "Pick a subject.";

  if (!values.message.trim()) errors.message = "Please write a message.";
  else if (values.message.trim().length < 20)
    errors.message = "A little more detail helps — at least 20 characters.";

  return errors;
}

const EMPTY = { name: "", email: "", subject: "", message: "" };

export default function Contact() {
  const toast = useToast();
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle");
  const [reference, setReference] = useState(null);

  function setField(field, value) {
    const next = { ...values, [field]: value };
    setValues(next);
    if (touched[field]) setErrors(validate(next));
  }

  function onBlur(field) {
    setTouched((current) => ({ ...current, [field]: true }));
    setErrors(validate(values));
  }

  async function onSubmit(event) {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    setTouched({ name: true, email: true, subject: true, message: true });
    if (Object.keys(found).length) return;

    setStatus("loading");
    try {
      const result = await submitContactMessage(values);
      setReference(result.reference);
      setStatus("done");
      setValues(EMPTY);
      setTouched({});
      toast.success("Message validated — demo build, nothing was sent.");
    } catch (error) {
      setStatus("error");
      toast.error(error.message);
    }
  }

  return (
    <>
      <PageHeader
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Contact" }]}
        eyebrow={
          <>
            <MessageSquare size={14} aria-hidden="true" />
            Contact
          </>
        }
        title="Tell us what we got wrong"
        description="Pricing corrections, product suggestions, partnership enquiries or a broken page — all of it is useful."
      />

      <section className="section">
        <div className="shell contact-layout">
          {/* Form -------------------------------------------------------- */}
          <div className="card card--pad">
            {status === "done" ? (
              <div className="stack stack-4">
                <span className="state__icon" aria-hidden="true">
                  <CheckCircle2 size={26} />
                </span>
                <h2>Message received</h2>
                <p className="text-sm text-muted">
                  Your reference is <strong>{reference}</strong>. This is a demo
                  build, so the message was validated but not actually
                  delivered — email delivery is connected with the backend.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setStatus("idle");
                    setReference(null);
                  }}
                  style={{ alignSelf: "flex-start" }}
                >
                  Send another message
                </Button>
              </div>
            ) : (
              <form className="stack stack-6" onSubmit={onSubmit} noValidate>
                <div className="stack stack-2">
                  <h2 className="panel-title">Send a message</h2>
                  <p className="text-sm text-muted">
                    Fields marked with an asterisk are required.
                  </p>
                </div>

                <div className="form-grid">
                  <Field
                    label="Your name"
                    required
                    value={values.name}
                    error={touched.name ? errors.name : undefined}
                    onChange={(event) => setField("name", event.target.value)}
                    onBlur={() => onBlur("name")}
                    placeholder="Divya Chouhan"
                    autoComplete="name"
                  />

                  <Field
                    label="Email address"
                    type="email"
                    required
                    value={values.email}
                    error={touched.email ? errors.email : undefined}
                    onChange={(event) => setField("email", event.target.value)}
                    onBlur={() => onBlur("email")}
                    placeholder="you@example.com"
                    autoComplete="email"
                  />

                  <Field
                    as="select"
                    label="Subject"
                    required
                    className="form-grid__span"
                    value={values.subject}
                    error={touched.subject ? errors.subject : undefined}
                    onChange={(event) => setField("subject", event.target.value)}
                    onBlur={() => onBlur("subject")}
                  >
                    <option value="">Choose a subject…</option>
                    {SUBJECTS.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </Field>

                  <Field
                    as="textarea"
                    label="Message"
                    required
                    className="form-grid__span"
                    value={values.message}
                    error={touched.message ? errors.message : undefined}
                    hint="Include a product link if you are reporting a price."
                    onChange={(event) => setField("message", event.target.value)}
                    onBlur={() => onBlur("message")}
                    placeholder="What would you like to tell us?"
                  />
                </div>

                <div className="row row--between row--wrap">
                  <p className="text-xs text-muted" style={{ maxWidth: "38ch" }}>
                    Demo build: messages are validated here but not delivered
                    anywhere yet.
                  </p>
                  <Button
                    type="submit"
                    variant="primary"
                    loading={status === "loading"}
                  >
                    Send message
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* Details ----------------------------------------------------- */}
          <div className="stack stack-4">
            <div className="contact-card">
              <span className="contact-card__icon" aria-hidden="true">
                <Mail size={19} />
              </span>
              <div>
                <div className="contact-card__label">Email</div>
                <div className="contact-card__value">{SITE.email}</div>
                <div className="contact-card__value">{SITE.supportEmail}</div>
              </div>
            </div>

            <div className="contact-card">
              <span className="contact-card__icon" aria-hidden="true">
                <Phone size={19} />
              </span>
              <div>
                <div className="contact-card__label">Phone</div>
                <div className="contact-card__value">{SITE.phone}</div>
              </div>
            </div>

            <div className="contact-card">
              <span className="contact-card__icon" aria-hidden="true">
                <MapPin size={19} />
              </span>
              <div>
                <div className="contact-card__label">Office</div>
                <div className="contact-card__value">{SITE.address}</div>
              </div>
            </div>

            <div className="contact-card">
              <span className="contact-card__icon" aria-hidden="true">
                <Clock3 size={19} />
              </span>
              <div>
                <div className="contact-card__label">Response time</div>
                <div className="contact-card__value">
                  Most messages are answered within two working days.
                </div>
              </div>
            </div>

            <div className="card card--pad stack stack-3">
              <h3 className="panel-title">Find us elsewhere</h3>
              <div className="chip-row">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.id}
                    href={social.href}
                    className="chip"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
              <p className="text-xs text-muted">
                Order problems are handled by Amazon customer service — we
                cannot see or change an order placed there.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
