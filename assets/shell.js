// Layout wrapper — call renderLayout({ key, title, depth, content })
// depth: 0 for root (index.html), 1 for foundations/*.html and components/*.html

window.renderLayout = function ({ key, title, depth = 0, section = "Component", label, desc, content, prev, next }) {
  const base = depth === 0 ? "" : "../";
  window.__BASE = base;
  window.__CURRENT = key;
  document.title = title + " — Zi UI v3";

  const crumb = depth === 0
    ? `<span class="here">Design System</span>`
    : `<a href="${base}index.html">Zi UI v3</a>
       <span class="sep">›</span>
       <span class="here">${section === "Foundation" ? "Foundations" : "Components"}</span>
       <span class="sep">›</span>
       <span class="here">${title}</span>`;

  const pager = (prev || next) ? `
    <div class="pager">
      ${prev ? `<a href="${base}${prev.href}"><i class="ph-duotone ph-arrow-left"></i>${prev.title}</a>` : ""}
      ${next ? `<a href="${base}${next.href}">${next.title}<i class="ph-duotone ph-arrow-right"></i></a>` : ""}
    </div>` : "";

  document.body.innerHTML = `
    <div class="shell">
      <aside class="nav"></aside>
      <main>
        <nav class="crumbs">${crumb}</nav>
        <section class="hero">
          <div>
            ${label ? `<div class="label"><i class="ph-duotone ph-sparkle"></i>${label}</div>` : ""}
            <h1 class="title">${title}</h1>
            ${desc ? `<p class="sub">${desc}</p>` : ""}
          </div>
          <div class="hero-meta">
            <div class="toggle" role="tablist" aria-label="Theme">
              <button class="active" data-theme-btn="light"><i class="ph-duotone ph-sun"></i>Light</button>
              <button data-theme-btn="dark"><i class="ph-duotone ph-moon"></i>Dark</button>
            </div>
            <div class="row"><span class="dot"></span>ziui@v3 · synced</div>
          </div>
        </section>
        <div id="content">${content || ""}</div>
        <footer class="foot">
          <div>Zi UI v3 · Rendered from upstream tokens</div>
          ${pager}
        </footer>
      </main>
    </div>
  `;

  // Re-execute any <script> tags injected via innerHTML
  document.querySelectorAll("#content script").forEach(old => {
    const s = document.createElement("script");
    [...old.attributes].forEach(a => s.setAttribute(a.name, a.value));
    s.text = old.textContent;
    old.parentNode.replaceChild(s, old);
  });

  // Load nav + theme bootstrap
  const s = document.createElement("script");
  s.src = base + "assets/nav2.js";
  document.body.appendChild(s);
};
