/** Small status/label pill. tone: brand | teal | amber | success | error | neutral */
export default function Badge({
  tone = "neutral",
  icon: Icon,
  uppercase = false,
  className = "",
  children,
  ...rest
}) {
  return (
    <span
      className={[
        "badge",
        `badge--${tone}`,
        uppercase ? "badge--uppercase" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {Icon && <Icon size={12} aria-hidden="true" />}
      {children}
    </span>
  );
}
