import { Link } from "react-router-dom";

/**
 * One button for the whole app. Renders as <button>, <a> or react-router
 * <Link> depending on the props, so styling never diverges between them.
 *
 * Variants: primary | secondary | outline | ghost | amazon | danger
 */
export default function Button({
  variant = "outline",
  size,
  as,
  to,
  href,
  icon: Icon,
  iconRight: IconRight,
  block = false,
  loading = false,
  disabled = false,
  className = "",
  children,
  ...rest
}) {
  const classes = [
    "btn",
    `btn--${variant}`,
    size ? `btn--${size}` : "",
    block ? "btn--block" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {loading ? (
        <span className="spinner" style={{ width: 15, height: 15 }} aria-hidden="true" />
      ) : (
        Icon && <Icon size={16} aria-hidden="true" />
      )}
      {children}
      {IconRight && !loading && <IconRight size={16} aria-hidden="true" />}
    </>
  );

  if (to && !disabled) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  if (href && !disabled) {
    return (
      <a
        href={href}
        className={classes}
        target={rest.target ?? "_blank"}
        rel={rest.target === "_self" ? undefined : "noopener noreferrer sponsored"}
        {...rest}
      >
        {content}
      </a>
    );
  }

  const Tag = as ?? "button";
  return (
    <Tag
      className={classes}
      type={Tag === "button" ? (rest.type ?? "button") : undefined}
      disabled={disabled || loading}
      aria-disabled={disabled || loading ? "true" : undefined}
      {...rest}
    >
      {content}
    </Tag>
  );
}
