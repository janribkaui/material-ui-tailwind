"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  Card: () => card_default
});
module.exports = __toCommonJS(src_exports);

// src/card.tsx
var import_jsx_runtime = require("react/jsx-runtime");
function Card({
  title,
  children,
  href
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "a",
    {
      className: "ui-group ui-rounded-lg ui-border ui-border-transparent ui-px-5 ui-py-4 ui-transition-colors hover:ui-border-neutral-700 hover:ui-bg-neutral-800/30",
      href: `${href}?utm_source=create-turbo&utm_medium=with-tailwind&utm_campaign=create-turbo"`,
      rel: "noopener noreferrer",
      target: "_blank",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { className: "ui-mb-3 ui-text-2xl ui-font-semibold", children: [
          title,
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "ui-inline-block ui-transition-transform group-hover:ui-translate-x-1 motion-reduce:ui-transform-none", children: "->" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "ui-m-0 ui-max-w-[30ch] ui-text-sm ui-opacity-50", children })
      ]
    }
  );
}
var card_default = Card;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Card
});
