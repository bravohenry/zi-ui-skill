// Shared bootstrap for every page.
// Expects: window.__CURRENT (string), window.__BASE (relative prefix to project root, e.g. "" or "../")

(function () {
  const base = window.__BASE || "";
  const current = window.__CURRENT || "";

  const foundations = [
    ["color", "Color", "palette"],
    ["typography", "Typography", "text-aa"],
    ["radius", "Radius", "square"],
    ["spacing", "Spacing", "ruler"],
    ["shadow", "Elevation", "stack"],
    ["motion", "Motion", "wave-sine"],
  ];
  const components = [
    ["button", "Button", "cursor-click"],
    ["input", "Input", "text-t"],
    ["textarea", "Textarea", "article"],
    ["switch", "Switch", "toggle-right"],
    ["checkbox", "Checkbox", "check-square"],
    ["radio", "Radio", "radio-button"],
    ["slider", "Slider", "sliders-horizontal"],
    ["chip", "Chip", "tag"],
    ["badge", "Badge", "number-circle-one"],
    ["alert", "Alert", "warning-circle"],
    ["tooltip", "Tooltip", "chat-circle"],
    ["card", "Card", "square-half"],
    ["tabs", "Tabs", "tabs"],
    ["menu", "Menu", "list"],
    ["progress", "Progress", "chart-bar"],
    ["avatar", "Avatar", "user-circle"],
    ["table", "Table", "table"],
    ["modal", "Modal", "browser"],
  ];

  const linkRow = ([key, label, icon], folder) => {
    const href = `${base}${folder}/${key === "shadow" ? "shadow" : key}.html`;
    const cls = key === current ? "navlink active" : "navlink";
    return `<a class="${cls}" href="${href}"><i class="ph-duotone ph-${icon}"></i>${label}</a>`;
  };

  const nav = document.querySelector("aside.nav");
  if (nav) {
    nav.innerHTML = `
      <a href="${base}index.html" class="brand">
        <div class="mark">Z</div>
        <div class="name">Zi UI</div>
        <div class="ver">v3</div>
      </a>
      <h5>Foundations</h5>
      ${foundations.map(f => linkRow(f, "foundations")).join("")}
      <h5>Components</h5>
      ${components.map(c => linkRow(c, "components")).join("")}
    `;
  }

  // Theme toggle
  const root = document.documentElement;
  const saved = localStorage.getItem("zi-theme") || "light";
  root.setAttribute("data-theme", saved);
  document.querySelectorAll("[data-theme-btn]").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.themeBtn === saved);
    btn.addEventListener("click", () => {
      const t = btn.dataset.themeBtn;
      root.setAttribute("data-theme", t);
      localStorage.setItem("zi-theme", t);
      document.querySelectorAll("[data-theme-btn]").forEach(b => b.classList.toggle("active", b === btn));
    });
  });
})();
