// src/card.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function Card({
  title,
  children,
  href
}) {
  return /* @__PURE__ */ jsxs(
    "a",
    {
      className: "ui-group ui-rounded-lg ui-border ui-border-transparent ui-px-5 ui-py-4 ui-transition-colors hover:ui-border-neutral-700 hover:ui-bg-neutral-800/30",
      href: `${href}?utm_source=create-turbo&utm_medium=with-tailwind&utm_campaign=create-turbo"`,
      rel: "noopener noreferrer",
      target: "_blank",
      children: [
        /* @__PURE__ */ jsxs("h2", { className: "ui-mb-3 ui-text-2xl ui-font-semibold", children: [
          title,
          " ",
          /* @__PURE__ */ jsx("span", { className: "ui-inline-block ui-transition-transform group-hover:ui-translate-x-1 motion-reduce:ui-transform-none", children: "->" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "ui-m-0 ui-max-w-[30ch] ui-text-sm ui-opacity-50", children })
      ]
    }
  );
}
var card_default = Card;
export {
  card_default as Card
};
