import { ChevronLeft, ChevronRight } from "lucide-react";

/** Builds [1, "…", 4, 5, 6, "…", 12] for a windowed pager. */
function pageItems(current, total, window = 1) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages = new Set([1, total, current]);
  for (let offset = 1; offset <= window; offset += 1) {
    if (current - offset > 1) pages.add(current - offset);
    if (current + offset < total) pages.add(current + offset);
  }

  const sorted = [...pages].sort((a, b) => a - b);
  const result = [];
  sorted.forEach((page, index) => {
    if (index && page - sorted[index - 1] > 1) result.push("gap");
    result.push(page);
  });
  return result;
}

export default function Pagination({ page = 1, pageCount = 1, onChange }) {
  if (pageCount <= 1) return null;

  function go(next) {
    const target = Math.min(Math.max(1, next), pageCount);
    if (target === page) return;
    onChange?.(target);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <nav className="pagination" aria-label="Pagination">
      <button
        type="button"
        className="pagination__btn"
        onClick={() => go(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
      >
        <ChevronLeft size={16} />
      </button>

      {pageItems(page, pageCount).map((item, index) =>
        item === "gap" ? (
          <span className="pagination__gap" key={`gap-${index}`} aria-hidden="true">
            …
          </span>
        ) : (
          <button
            type="button"
            key={item}
            className="pagination__btn"
            aria-current={item === page ? "page" : undefined}
            aria-label={`Page ${item}`}
            onClick={() => go(item)}
          >
            {item}
          </button>
        ),
      )}

      <button
        type="button"
        className="pagination__btn"
        onClick={() => go(page + 1)}
        disabled={page === pageCount}
        aria-label="Next page"
      >
        <ChevronRight size={16} />
      </button>
    </nav>
  );
}
