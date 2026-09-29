"use client";

import { useState } from "react";

export type FaqItemData = {
  question: string;
  answer: string;
};

/** Port of the `FAQ` class (js/main.js) — one open item at a time. */
export default function FaqList({ items }: { items: FaqItemData[] }) {
  const [active, setActive] = useState<number | null>(0);

  return (
    <div className="faq-list">
      {items.map((item, i) => {
        const isActive = active === i;
        return (
          <div className={`faq-item${isActive ? " active" : ""}`} key={item.question}>
            <div
              className="faq-question"
              role="button"
              tabIndex={0}
              aria-expanded={isActive}
              onClick={() => setActive(isActive ? null : i)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActive(isActive ? null : i);
                }
              }}
            >
              <span>{item.question}</span>
              <span className="faq-toggle">+</span>
            </div>
            <div className="faq-answer">
              <div className="faq-answer-inner">{item.answer}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
