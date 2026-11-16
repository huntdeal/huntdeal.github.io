import { useState } from "react";
import { CheckCircle2, Mail } from "lucide-react";

import Button from "./ui/Button.jsx";
import { subscribeToNewsletter } from "../services/siteService.js";

/** Newsletter sign-up. Validated client-side; nothing is sent in this build. */
export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      await subscribeToNewsletter(email);
      setStatus("done");
      setMessage(
        "You are on the list. (Demo build — nothing is actually sent yet.)",
      );
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage(error.message);
    }
  }

  return (
    <section className="shell section">
      <div className="newsletter">
        <div className="newsletter__text">
          <span
            className="eyebrow"
            style={{ color: "var(--highlight)" }}
          >
            <Mail size={14} aria-hidden="true" />
            Deal digest
          </span>
          <h2 className="newsletter__title">
            One email a week. Only the deals worth opening.
          </h2>
          <p style={{ fontSize: "var(--fs-sm)" }}>
            A short round-up of the steepest genuine discounts we tracked, with
            the original price next to the new one. No daily spam, no
            sponsored placements.
          </p>
        </div>

        <form className="newsletter__form" onSubmit={onSubmit} noValidate>
          <div className="newsletter__row">
            <input
              type="email"
              className="newsletter__input"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              aria-label="Email address"
              aria-invalid={status === "error"}
              required
            />
            <Button
              type="submit"
              variant="primary"
              loading={status === "loading"}
              style={{ background: "var(--highlight)", borderColor: "var(--highlight)", color: "var(--c-ink-900)", boxShadow: "none" }}
            >
              Subscribe
            </Button>
          </div>

          {message ? (
            <p
              className="newsletter__status"
              role={status === "error" ? "alert" : "status"}
              style={status === "error" ? { color: "#ffc9cb" } : undefined}
            >
              {status === "done" && <CheckCircle2 size={15} aria-hidden="true" />}
              {message}
            </p>
          ) : (
            <p className="newsletter__note">
              Unsubscribe in one click. We never share your address.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
