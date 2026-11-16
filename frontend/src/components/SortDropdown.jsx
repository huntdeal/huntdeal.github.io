import { useId } from "react";

import { SORT_OPTIONS } from "../utils/constants.js";

/** Native select — accessible, keyboard-friendly and correct on mobile. */
export default function SortDropdown({ value = "popular", onChange, options = SORT_OPTIONS }) {
  const id = useId();

  return (
    <div className="sort">
      <label className="sort__label" htmlFor={id}>
        Sort by
      </label>
      <select
        id={id}
        className="select sort__select"
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
