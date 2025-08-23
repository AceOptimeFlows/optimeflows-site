<!-- servicios-page.js (reemplaza tu renderer de Servicios por este archivo) -->
<script>
(function () {
  const LANG = (localStorage.getItem("lang") || document.documentElement.lang || "es").slice(0,2);
  const I18N = (window.I18N && window.I18N[LANG]) || {};
  const CT   = window.CONTENT || { serviceGroups: [], services: [] };

  /* ========== CSS para precios (inserción dinámica) ========== */
  const pricingCSS = `
  .pricing-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:12px;margin-top:12px}
  .pricing-card{border-radius:14px;padding:14px;border:1px solid rgba(255,255,255,.08);background:linear-gradient(180deg,rgba(255,255,255,.04),rgba(255,255,255,.02));box-shadow:0 4px 20px rgba(0,0,0,.2)}
  .pricing-card h5{margin:0 0 6px 0;font-size:1rem}
  .pricing-card .price{font-weight:700;font-size:1.1rem}
  .pricing-card ul{margin:8px 0 0 18px;padding:0}
  .pricing-card li{margin:2px 0}
  .svc-card{border-radius:16px;border:1px solid rgba(255,255,255,.08);padding:16px;background:rgba(255,255,255,.03);cursor:pointer}
  .svc-card h4{margin:0 0 6px 0}
  .svc-detail{border-radius:16px;border:1px solid rgba(255,255,255,.12);padding:16px;margin-top:14px;background:linear-gradient(180deg,rgba(255,255,255,.04),rgba(255,255,255,.02))}
  .svc-detail .cols{display:grid;grid-template-columns:1.2fr .8fr;gap:18px}
  .svc-detail .klist{margin:6px 0 0 18px}
  .svc-badges{display:flex;gap:8px;flex-wrap:wrap;margin:10px 0}
  .btn{display:inline-flex;align-items:center;gap:6px;border-radius:10px;border:1px solid rgba(255,255,255,.16);padding:8px 12px;background:rgba(255,255,255,.06)}
  .btn.primary{background:#16a085;border-color:#16a085;color:#fff}
  .btn.small{padding:6px 10px;font-size:.9rem}
  @media (max-width:920px){ .svc-detail .cols{grid-template-columns:1fr} }
  `;
  const styleTag = document.createElement("style");
  styleTag.textContent = pricingCSS;
  document.head.appendChild(styleTag);

  /* ========== Utilidades ========== */
  const SVC_MAP = new Map(CT.services.map(s => [s.key, s]));
  const $ = sel => document.querySelector(sel);
  const $el = (tag, cls, html) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  };

  function killGhostTooltips() {
    // Quita tooltips fantasma (incluido "Abrir en pestaña nueva")
    const texts = [
      (I18N.ui && I18N.ui.openNew) || "Abrir en pestaña nueva",
      "Open in new tab"
    ];
    // Eliminamos overlay típicos
    document.querySelectorAll('.tooltip,.tippy-box,.microtip,.ui-tip,.hint,.balloon,.titlebox').forEach(e => e.remove());
    // Por si quedó uno con el texto exacto
    const all = Array.from(document.querySelectorAll('body *')).slice(-200); // últimos nodos
    all.forEach(n => {
      try {
        const t = (n.textContent || "").trim();
        if (texts.includes(t)) {
          const p = n.closest("div,section,aside,span");
          (p || n).remove();
        }
      } catch {}
    });
  }

  /* ========== Render de tarjetas de precio ========== */
  function renderPricing(pricingArr) {
    if (!pricingArr || !pricingArr.length) return null;
    const grid = $el("div", "pricing-grid");
    pricingArr.forEach(p => {
      const card = $el("div", "pricing-card");
      const title = (p.title && (p.title[LANG] || p.title.es || p.title.en)) || "";
      const price = (p.price && (p.price[LANG] || p.price.es || p.price.en)) || "";
      const period = (p.period && (p.period[LANG] || p.period.es || p.period.en)) || "";
      const feats = (p.features || []).map(f => (typeof f === "string") ? f : (f[LANG] || f.es || f.en));
      card.innerHTML = `
        <h5>${title}</h5>
        <div class="price">${price}${period ? ` · <span class="period">${period}</span>` : ""}</div>
        ${feats.length ? `<ul>${feats.map(f=>`<li>${f}</li>`).join("")}</ul>` : ""}
      `;
      grid.appendChild(card);
    });
    return grid;
  }

  /* ========== Render detalle servicio (incluye precios si existen) ========== */
  function renderDetail(svc) {
    const d = $el("div", "svc-detail");
    const header = $el("div", "svc-badges");
    const btnAsk = $el("button", "btn primary small", (LANG==="es"?"Solicitar información":"Request info"));
    const btnClose = $el("button", "btn small", (LANG==="es"?"Cerrar":"Close"));
    header.append(btnAsk, btnClose);
    d.appendChild(header);

    const cols = $el("div", "cols");
    const left = $el("div");
    const right = $el("div");

    // Bloques (texto + imágenes)
    (svc.detail?.blocks || []).forEach(b => {
      if (b.type === "p") {
        const p = $el("p", "", (b.html && (b.html[LANG] || b.html.es || b.html.en)) || "");
        left.appendChild(p);
      } else if (b.type === "img") {
        const fig = $el("figure");
        const img = $el("img");
        img.src = b.src;
        img.alt = (b.alt && (b.alt[LANG] || b.alt.es || b.alt.en)) || "";
        img.style.maxWidth = "100%";
        fig.appendChild(img);
        const capText = (b.caption && (b.caption[LANG] || b.caption.es || b.caption.en)) || "";
        if (capText) fig.appendChild($el("figcaption","mas-peqnorm",capText));
        if (b.float === "right") right.appendChild(fig); else left.appendChild(fig);
      }
    });

    // Qué obtienes / Beneficios
    const rightBox = $el("div");
    rightBox.innerHTML = `
      <h4>${LANG==="es"?"Qué obtienes":"What you get"}</h4>
      <ul class="klist">${
        (svc.detail?.includes||[]).map(x=>`<li>✓ ${(x[LANG]||x.es||x.en)}</li>`).join("")
      }</ul>
      <h4 style="margin-top:12px">${LANG==="es"?"Beneficios":"Benefits"}</h4>
      <ul class="klist">${
        (svc.detail?.benefits||[]).map(x=>`<li>✓ ${(x[LANG]||x.es||x.en)}</li>`).join("")
      }</ul>
    `;
    right.appendChild(rightBox);

    cols.append(left,right);
    d.appendChild(cols);

    // ---- PRECIOS ----
    if (svc.pricing && svc.pricing.length) {
      d.appendChild($el("h4", "", LANG==="es"?"Precios":"Pricing"));
      const grid = renderPricing(svc.pricing);
      if (grid) d.appendChild(grid);
    }

    // Cerrar
    btnClose.addEventListener("click", () => d.remove());
    btnAsk.addEventListener("click", () => {
      const mail = "mailto:optimeflow@gmail.com?subject="+encodeURIComponent("Info · "+((svc.title&& (svc.title[LANG]||svc.title.es||svc.title.en))||"Servicio"));
      window.location.href = mail;
    });

    return d;
  }

  /* ========== Render grupo de servicios ========== */
  function renderGroup(group) {
    const root = $el("div");
    root.appendChild($el("h2","", (group.title && (group.title[LANG]||group.title.es||group.title.en)) || "Servicios"));
    if (group.subtitle) root.appendChild($el("div","mas-peqnorm", group.subtitle[LANG]||group.subtitle.es||group.subtitle.en));

    const grid = $el("div");
    grid.style.display = "grid";
    grid.style.gridTemplateColumns = "repeat(auto-fill, minmax(280px, 1fr))";
    grid.style.gap = "14px";
    root.appendChild(grid);

    (group.items||[]).forEach(it => {
      const svc = it.ref ? SVC_MAP.get(it.ref) : it; // inline o por ref
      if (!svc) return;
      const card = $el("div","svc-card");
      const title = (svc.title && (svc.title[LANG]||svc.title.es||svc.title.en)) || "";
      const tagline = (svc.tagline && (svc.tagline[LANG]||svc.tagline.es||svc.tagline.en)) || "";
      card.innerHTML = `<h4>${title}</h4><div class="mas-peqnorm">${tagline}</div>`;
      grid.appendChild(card);

      card.addEventListener("click", () => {
        // eliminar otros detalles abiertos inmediatamente debajo de este grid
        const open = root.querySelectorAll(".svc-detail");
        open.forEach(n => n.remove());
        root.appendChild(renderDetail(svc));
        setTimeout(killGhostTooltips, 0);
      });
    });

    return root;
  }

  /* ========== Render página completa Servicios ========== */
  function renderServiciosPage(mount) {
    if (!mount) return;
    mount.innerHTML = ""; // limpia
    const backBtn = $el("button","btn small", "← "+(LANG==="es"?"Volver":"Back"));
    backBtn.addEventListener("click", () => history.back());
    mount.appendChild($el("h1","", (I18N.menu?.servicios)||"Servicios"));
    // Por defecto: corporativos
    CT.serviceGroups.forEach(group => {
      mount.appendChild(renderGroup(group));
      mount.appendChild($el("hr"));
    });
    setTimeout(killGhostTooltips, 0);
  }

  // Auto-mount si la ruta contiene /#/servicios
  function autoMount() {
    const hash = (location.hash||"").toLowerCase();
    if (hash.includes("/servicios")) {
      const mount = document.getElementById("services-root") || document.querySelector("#page-services") || document.querySelector("main") || document.body;
      renderServiciosPage(mount);
    }
  }

  // Exponer para llamarlo desde tu router si prefieres
  window.renderServiciosPage = renderServiciosPage;

  window.addEventListener("hashchange", autoMount);
  document.addEventListener("DOMContentLoaded", autoMount);
})();
</script>
