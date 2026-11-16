import { useState } from "react";
import { Search, X } from "lucide-react";

/**
 * Search input.
 *
 * Two modes:
 *  - controlled (`value` + `onChange`): filters as you type, used on listings.
 *  - form (`onSubmit`): submits on Enter, used by the hero and navbar.
 */
export default function SearchBar({
  value,
  onChange,
  onSubmit,
  defaultValue = "",
  placeholder = "Search deals, brands or categories",
  variant = "default",
  autoFocus = false,
  submitLabel = "Search deals",
  id,
  className = "",
}) {
  const controlled = value !== undefined;
  const [internal, setInternal] = useState(defaultValue);
  const [lastDefault, setLastDefault] = useState(defaultValue);

  // Uncontrolled mode follows a changed defaultValue. Adjusting state during
  // render (rather than in an effect) avoids rendering the stale value first.
  if (!controlled && defaultValue !== lastDefault) {
    setLastDefault(defaultValue);
    setInternal(defaultValue);
  }

  const current = controlled ? value : internal;

  function setValue(next) {
    if (controlled) onChange?.(next);
    else setInternal(next);
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit?.(current.trim());
  }

  return (
    <form
      className={`searchbar ${variant === "hero" ? "searchbar--hero" : ""} ${className}`}
      role="search"
      onSubmit={handleSubmit}
    >
      <span className="searchbar__icon" aria-hidden="true">
        <Search size={17} />
      </span>

      <input
        id={id}
        type="search"
        className="searchbar__input"
        placeholder={placeholder}
        value={current}
        autoFocus={autoFocus}
        aria-label={placeholder}
        onChange={(event) => setValue(event.target.value)}
      />

      {current && variant !== "hero" && (
        <button
          type="button"
          className="searchbar__clear"
          onClick={() => {
            setValue("");
            onSubmit?.("");
          }}
          aria-label="Clear search"
        >
          <X size={15} />
        </button>
      )}

      {variant === "hero" && (
        <button type="submit" className="btn btn--primary searchbar__submit">
          {submitLabel}
        </button>
      )}
    </form>
  );
}
