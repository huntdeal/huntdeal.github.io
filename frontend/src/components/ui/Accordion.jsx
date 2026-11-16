import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";

/**
 * Accessible accordion.
 * @param {{question: string, answer: string, id?: string}[]} items
 * @param {boolean} [allowMultiple=true]
 * @param {number|null} [defaultOpen] Index open on first render.
 */
export default function Accordion({ items = [], allowMultiple = true, defaultOpen = 0 }) {
  const baseId = useId();
  const [open, setOpen] = useState(() =>
    defaultOpen === null || defaultOpen === undefined ? [] : [defaultOpen],
  );

  function toggle(index) {
    setOpen((current) => {
      const isOpen = current.includes(index);
      if (isOpen) return current.filter((item) => item !== index);
      return allowMultiple ? [...current, index] : [index];
    });
  }

  return (
    <div className="accordion">
      {items.map((item, index) => {
        const isOpen = open.includes(index);
        const triggerId = `${baseId}-trigger-${index}`;
        const panelId = `${baseId}-panel-${index}`;

        return (
          <div
            className="accordion__item"
            key={item.id ?? item.question ?? index}
            data-open={isOpen}
          >
            <h3>
              <button
                type="button"
                id={triggerId}
                className="accordion__trigger"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(index)}
              >
                <span>{item.question}</span>
                <span className="accordion__icon" aria-hidden="true">
                  <ChevronDown size={16} />
                </span>
              </button>
            </h3>
            {isOpen && (
              <div
                id={panelId}
                role="region"
                aria-labelledby={triggerId}
                className="accordion__panel"
              >
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
