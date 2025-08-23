/* ========= CONFIG (local, sin GAS) ========= */
// No hay BLOG_API_URL. Todo se carga desde window.CONTENT (data.js).

/* ========= Utils ========= */
const $  = (sel, el=document) => el.querySelector(sel);
const $$ = (sel, el=document) => Array.from(el.querySelectorAll(sel));
const t  = (path) => path.split(".").reduce((a,k)=>a?.[k], I18N[STATE.lang]) ?? "";

function parseCssTimeToSec(v, defSec){
  if (!v) return defSec;
  v = String(v).trim();
  if (v.endsWith("ms")) return (parseFloat(v)||defSec*1000)/1000;
  if (v.endsWith("s"))  return (parseFloat(v)||defSec);
  const n = parseFloat(v);
  return Number.isFinite(n) ? n : defSec;
}
function parseCssTimeToMs(v, defMs){
  if (!v) return defMs;
  v = String(v).trim();
  if (v.endsWith("ms")) return parseFloat(v)||defMs;
  if (v.endsWith("s"))  return (parseFloat(v)||defMs/1000)*1000;
  const n = parseFloat(v);
  return Number.isFinite(n) ? n : defMs;
}
function norm(s){ return (s||"").toString().normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase(); }

/* Scroll con offset de topbar (para que nada quede debajo del menú) */
function scrollToViewWithOffset(el, behavior="smooth"){
  if (!el) return;
  const topbar = $(".topbar");
  const offset = topbar ? topbar.getBoundingClientRect().height + 12 : 70;
  const y = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top: Math.max(0, y), left: 0, behavior });
}

/* ========= State ========= */
const STATE = {
  lang: localStorage.getItem("lang") || (navigator.language?.startsWith("es") ? "es" : "en"),
  routes: {
    "/": "partials/home.html",
    "/servicios": "partials/servicios.html",
    "/about": "partials/about.html",
    "/blog": "partials/blog.html",
    "/publicaciones": "partials/publicaciones.html",
    "/apps": "partials/apps.html",
    "/ecos": "partials/ecos.html",
    "/proyectos": "partials/proyectos.html",
    "/actualidad": "partials/actualidad.html",
    "/enlaces": "partials/enlaces.html",
    "/buscar": "partials/buscar.html",
    "/contacto": "partials/contacto.html",
    "/redes": "partials/redes.html",
  },
  currentRoute: "/",
  pendingOpenPubId: null,
  pendingBlogKey: null,
  searchIndex: null
};

const SECTION_THEME = {
  "/": "home","/servicios":"servicios","/about":"about","/blog":"blog",
  "/publicaciones":"publicaciones","/apps":"apps","/ecos":"ecos","/proyectos":"proyectos",
  "/actualidad":"actualidad","/enlaces":"enlaces","/buscar":"buscar",
  "/contacto":"contacto","/redes":"redes",
};

/* ========= Router ========= */
async function navigate(path){
  const tpl = STATE.routes[path] || STATE.routes["/"];
  const res = await fetch(tpl);
  const html = await res.text();
  $("#app").innerHTML = html;
  applyI18N();

  setSectionTheme(path);

  if (path === "/publicaciones") setupPublicaciones();
  if (path === "/apps")         renderApps?.();
  if (path === "/ecos") renderEcos();
  if (path === "/proyectos")    renderProjects?.();
  if (path === "/contacto")     setupContactForm();
  if (path === "/about")        setupAbout(true);
  if (path === "/servicios")    renderServicios?.();
  if (path === "/blog")         requestAnimationFrame(setupBlog); // ⬅️ defer 1 frame
  if (path === "/actualidad")   renderNews?.();
  if (path === "/enlaces")      renderLinks?.();
  setupVowelOrbit();

  // reset scroll al cambiar de ruta
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });

  STATE.currentRoute = path;

  if (path === "/publicaciones" && STATE.pendingOpenPubId){
    openPublicationById(STATE.pendingOpenPubId);
    STATE.pendingOpenPubId = null;
  }
  if (path === "/blog" && STATE.pendingBlogKey){
    setTimeout(()=>{
      const ev = new CustomEvent("open-blog-day", { detail: STATE.pendingBlogKey });
      window.dispatchEvent(ev);
      STATE.pendingBlogKey = null;
    }, 0);
  }

  $$(".nav-list a").forEach(a => {
    const r = a.getAttribute("href").replace("#","");
    a.classList.toggle("active", r === path);
  });

  // 🔧 Limpieza de tooltips fantasmas
  killGhostTooltips();
}
function setSectionTheme(path){ document.body.setAttribute("data-section", SECTION_THEME[path] || "home"); }
function setupNav(){
  const navToggle = $("#navToggle");
  const navList = $("#navList");
  if (navToggle) navToggle.addEventListener("click", ()=> navList.classList.toggle("show"));
  document.body.addEventListener("click", (e)=>{
    const link = e.target.closest("a[data-route]");
    if (!link) return;
    e.preventDefault();
    location.hash = link.getAttribute("href");
  });
  window.addEventListener("hashchange", handleHash);
}
function handleHash(){ const path = location.hash.replace("#","") || "/"; navigate(path); }

/* ========= i18n ========= */
function applyI18N(){
  $$("[data-i18n]").forEach(node => {
    const key = node.getAttribute("data-i18n");
    const val = t(key);
    if (val) node.innerHTML = val;
  });
  $$("[data-i18n-placeholder]").forEach(el=>{
    const key = el.getAttribute("data-i18n-placeholder");
    const val = t(key);
    if (val) el.setAttribute("placeholder", val);
  });
  $$("[data-i18n-value]").forEach(el=>{
    const key = el.getAttribute("data-i18n-value");
    const val = t(key);
    if (val) el.setAttribute("value", val);
  });
  const y=$("#year"); if (y) y.textContent = new Date().getFullYear();
}

function setLang(lang){
  STATE.lang = lang;
  localStorage.setItem("lang", lang);
  applyI18N();

  STATE.searchIndex = null;
  buildSearchIndex();

  if (STATE.currentRoute === "/publicaciones") renderPublicationsUIRefresh();
  if (STATE.currentRoute === "/apps") renderApps?.();
  if (STATE.currentRoute === "/proyectos") renderProjects?.();
  if (STATE.currentRoute === "/about") setupAbout(true);
  if (STATE.currentRoute === "/servicios") renderServicios?.();
  if (STATE.currentRoute === "/blog") requestAnimationFrame(setupBlog); // ⬅️ defer 1 frame
  if (STATE.currentRoute === "/actualidad") renderNews?.();
  if (STATE.currentRoute === "/enlaces") renderLinks?.();
  if (STATE.currentRoute) killGhostTooltips(); // limpia en cambio de idioma

  setupVowelOrbit();
}

/* ========= Publicaciones ========= */
function setupPublicaciones(){
  const tabs = $$(".tab-btn");
  tabs.forEach(btn => btn.addEventListener("click", ()=>{
    tabs.forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    renderPublications(btn.dataset.tab);
  }));
  renderPublications("estructuremas");

  const closeEls = [$("#modalClose"), $("#modalBackdrop")].filter(Boolean);
  closeEls.forEach(el=> el.addEventListener("click", closeModal));
  window.addEventListener("keydown", (e)=>{ if (e.key==="Escape") closeModal(); });
}
function renderPublications(cat){
  const grid = $("#pubGrid");
  if (!grid) return;
  grid.innerHTML = "";
  const items = (CONTENT.publications || [])
    .filter(p => p.cat === cat)
    .sort((a,b)=>{
      const da = a.date ? new Date(a.date).getTime() : 0;
      const db = b.date ? new Date(b.date).getTime() : 0;
      return db - da;
    });
  if (!items.length){
    grid.innerHTML = `<p>${t("hero.subtitle")}</p>`;
    return;
  }
  items.forEach(item => {
    const el = document.createElement("article");
    el.className = "card";
    el.innerHTML = `
      <h3>${item.title}</h3>
      <p>${(item.desc?.[STATE.lang]) || ""}</p>
      <div><a href="#" class="btn">${STATE.lang==="es"?"Abrir":"Open"}</a></div>`;
    el.querySelector("a").addEventListener("click", (e)=>{
      e.preventDefault();
      openMedia(item);
    });
    grid.appendChild(el);
  });
}
function renderPublicationsUIRefresh(){
  const active = $(".tab-btn.active")?.dataset.tab || "estructuremas";
  renderPublications(active);
}
function openMedia(item){
  const type = (item.mediaType||"").toLowerCase();
  if (type === "pdf"){
    if (item.src) window.open(item.src, "_blank", "noopener");
    return;
  }
  const modal   = $("#mediaModal");
  const body    = $("#modalBody");
  const titleEl = $("#modalTitle");
  const openNew = $("#modalOpenNew");
  titleEl.textContent = item.title || "Media";
  body.innerHTML = "";
  openNew.href = item.src || "#";
  if (type === "gif" || type === "image"){
    const img = document.createElement("img"); img.src = item.src; img.alt = titleEl.textContent; body.appendChild(img);
  } else if (type === "video"){
    const video = document.createElement("video"); video.controls = true;
    if (item.poster) video.poster = item.poster;
    const src = document.createElement("source"); src.src = item.src; src.type = "video/mp4"; video.appendChild(src);
    body.appendChild(video);
  } else if (type === "youtube"){
    const ytId = extractYouTubeId(item.src);
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${ytId}`;
    iframe.allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.allowFullscreen = true;
    body.appendChild(iframe);
  } else {
    if (item.src) window.open(item.src, "_blank", "noopener");
    return;
  }
  modal.classList.add("show");
  modal.setAttribute("aria-hidden","false");
}
function closeModal(){
  const m = $("#mediaModal"); $("#modalBody").innerHTML="";
  m.classList.remove("show"); m.setAttribute("aria-hidden","true");
}
function extractYouTubeId(url){
  try{
    const u=new URL(url);
    if(u.hostname.includes("youtu.be")) return u.pathname.slice(1);
    if(u.searchParams.get("v")) return u.searchParams.get("v");
    const m=u.pathname.match(/\/embed\/([^\/\?]+)/); if(m) return m[1];
  }catch{}
  return url.split("/").pop();
}
function openPublicationById(id){
  const item = (CONTENT.publications||[]).find(p => p.id === id);
  if (!item) return;
  const btn = $(`.tab-btn[data-tab="${item.cat}"]`);
  if (btn && !btn.classList.contains("active")){
    $$(".tab-btn").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    renderPublications(item.cat);
  }
  setTimeout(()=> openMedia(item), 0);
}

/* ========= Contacto ========= */
function setupContactForm(){
  const form = $("#contactForm");
  const status = $("#formStatus");
  if (!form) return;
  const submitBtn = form.querySelector('button[type="submit"]');
  let submitting=false;

  form.addEventListener("submit", async (e)=>{
    e.preventDefault();
    if (submitting) return;
    submitting=true;

    const btnOriginal = submitBtn.textContent;
    submitBtn.textContent = STATE.lang==="es" ? "Enviando…" : "Sending…";
    submitBtn.disabled = true;
    status.textContent = "";

    const data = new FormData(form);
    try{
      const res = await fetch(form.action || "#", {
        method:"POST", body:data, headers:{ "Accept":"application/json" }
      });
      const likely = res.ok || res.type==="opaque" || res.status===0;
      if (likely){
        status.textContent = STATE.lang==="es" ? "¡Gracias! Mensaje enviado." : "Thanks! Message sent.";
        form.reset();
      } else {
        status.textContent = STATE.lang==="es" ? "No se pudo enviar." : "Couldn’t send.";
      }
    }catch{
      status.textContent = STATE.lang==="es" ? "¡Gracias! Mensaje enviado." : "Thanks! Message sent.";
      form.reset();
    }finally{
      setTimeout(()=> status.textContent="", 4000);
      submitBtn.textContent = btnOriginal;
      submitBtn.disabled=false;
      submitting=false;
    }
  });
}

/* ========= About (vowel-bounce) ========= */
function setupAbout(forceReset=false){
  const root = $(".vowel-bounce");
  if (!root) return;
  if (forceReset){
    root.innerHTML = root.innerHTML.replace(/<span\s+class=["']vowel["']>(.*?)<\/span>/g, "$1");
  }
  const vowelRegex=/[aeiouáéíóúüAEIOUÁÉÍÓÚÜ]/g;
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{
    acceptNode(node){
      if(!node.nodeValue||!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
      if(node.parentElement&&node.parentElement.closest(".fx-vorbit")) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }
  });
  const nodes=[]; let n; while((n=walker.nextNode())) nodes.push(n);
  nodes.forEach(txt=>{
    const frag=document.createDocumentFragment();
    const parts=txt.nodeValue.split(vowelRegex);
    const matches=txt.nodeValue.match(vowelRegex)||[];
    parts.forEach((p,i)=>{
      if(p) frag.appendChild(document.createTextNode(p));
      const v=matches[i];
      if(v){
        const s=document.createElement("span");
        s.className="vowel";
        s.textContent=v;
        frag.appendChild(s);
      }
    });
    txt.parentNode.replaceChild(frag, txt);
  });
  let idx=0;
  const base=parseFloat(getComputedStyle(root).getPropertyValue("--hop-stagger"))||0.08;
  $$(".vowel-bounce .vowel", root).forEach(sp=>{
    const d=(idx%8)*base;
    sp.style.animationDelay=`${d}s`;
    idx++;
  });
}

/* ========= Servicios ========= */
/* Burbujas en flex (alineadas) → click grupo → grid → click servicio → detalle
   + scroll preciso con offset de topbar */
function renderServicios(){
  const wrap = $("#servicesList");
  if (!wrap) return;

  // CSS mínimo para tarjetas de precios + figuras de columna derecha (una vez)
  if (!document.getElementById("pricingCSS")) {
    const st = document.createElement("style");
    st.id = "pricingCSS";
    st.textContent = `
      .pricing-grid{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}
      .pricing-card{flex:0 1 280px;border-radius:14px;padding:14px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.04)}
      .pricing-card h5{margin:0 0 6px 0;font-size:1rem}
      .pricing-card .price{font-weight:700;margin:4px 0 0}
      .exp-side figure.side-figure{margin:12px 0 0}
      .exp-side figure.side-figure img{width:100%;height:auto;border-radius:8px;display:block}
      .exp-side figure.side-figure figcaption{margin-top:6px;text-align:center;font-size:.85rem;opacity:.75;font-style:italic}
    `;
    document.head.appendChild(st);
  }

  // Si el contenedor tiene la clase 'card-grid' (por el HTML original), la quitamos.
  wrap.classList.remove("card-grid");
  wrap.innerHTML = "";

  const groups = CONTENT.serviceGroups || [];
  if (!groups.length){
    (I18N[STATE.lang].servicios.items||[]).forEach(s=>{
      const el=document.createElement("article");
      el.className="card";
      el.innerHTML=`<h3>${s.h}</h3><p>${s.p}</p>`;
      wrap.appendChild(el);
    });
    return;
  }

  // Escenario con 3 burbujas centradas
  const stage = document.createElement("div");
  stage.id = "servicesStage";
  stage.className = "svc-stage card";
  stage.innerHTML = `<div class="svc-stage-inner"></div>`;
  wrap.appendChild(stage);
  const inner = stage.querySelector(".svc-stage-inner");

  groups.slice(0,3).forEach((g,idx)=>{
    const b = document.createElement("button");
    b.className = "svc-bubble";
    b.innerHTML = `<div class="bubble-title">${g.title?.[STATE.lang]||g.title?.es||""}</div>`;
    b.addEventListener("click", ()=> showGroup(idx));
    inner.appendChild(b);
  });

  // Al abrir un grupo, mostramos solo sus servicios
  function showGroup(index){
    stage.remove();

    const group = groups[index];
    const g = document.createElement("div");
    g.className = "service-group";
    g.innerHTML = `
      <div class="svc-group-head">
        <h3>${group.title?.[STATE.lang]||group.title?.es||""}</h3>
        <p class="lead">${group.subtitle?.[STATE.lang]||group.subtitle?.es||""}</p>
        <div class="spacer"></div>
        <button class="btn ghost" id="btnBackGroups">← ${STATE.lang==="es"?"Volver":"Back"}</button>
      </div>
      <div class="svc-grid card-grid"></div>
    `;
    const grid = g.querySelector(".svc-grid");
    wrap.appendChild(g);
    scrollToViewWithOffset(g);

    g.querySelector("#btnBackGroups").addEventListener("click", ()=>{
      g.remove();
      renderServicios();
      scrollToViewWithOffset($("#servicesList"));
    });

    group.items.forEach(item=>{
      let s = null;
      if (item.ref){
        s = (CONTENT.services||[]).find(x=> x.key === item.ref);
        if (!s){
          const list = I18N[STATE.lang].servicios.items || [];
          const found = list.find(i => norm(i.h).includes(norm(item.ref)));
          if (found) s = { key:item.ref, title:{es:found.h,en:found.h}, tagline:{es:found.p,en:found.p} };
        }
      } else {
        s = item;
      }
      if (!s) return;

      const card = document.createElement("article");
      card.className = "card svc-card";
      card.innerHTML = `
        <h3 class="svc-card-title">${s.title?.[STATE.lang]||s.title?.es||""}</h3>
        <p class="svc-card-sub">${s.tagline?.[STATE.lang]||s.tagline?.es||""}</p>
      `;
      grid.appendChild(card);

      if (s.detail){
        card.classList.add("is-expandable");
        card.addEventListener("click", ()=>{
          // quitar detalle previo
          g.querySelector(".service-expanded")?.remove();

          // --- separar bloques: párrafos vs imágenes ---
          const blocks = Array.isArray(s.detail.blocks) ? s.detail.blocks : [];
          const pBlocks   = blocks.filter(b => b.type === "p");
          const imgBlocks = blocks.filter(b => b.type === "img");

          // ---- PRECIOS (si hay) ----
          let pricingHTML = "";
          if (Array.isArray(s.pricing) && s.pricing.length){
            const title = STATE.lang==="es" ? "Precios" : "Pricing";
            const items = s.pricing.map(p=>{
              const tt = (p.title?.[STATE.lang]||p.title?.es||p.title?.en||"");
              const pr = (p.price?.[STATE.lang]||p.price?.es||p.price?.en||"");
              const pe = (p.period?.[STATE.lang]||p.period?.es||p.period?.en||"");
              const feats = (p.features||[]).map(f=> (typeof f==="string") ? f : (f[STATE.lang]||f.es||f.en)).map(f=>`<li>${f}</li>`).join("");
              return `<div class="pricing-card">
                        <h5>${tt}</h5>
                        <div class="price">${pr}${pe?` · <span class="muted">${pe}</span>`:""}</div>
                        ${feats?`<ul class="checklist" style="margin-top:6px">${feats}</ul>`:""}
                      </div>`;
            }).join("");
            pricingHTML = `<section class="svc-pricing" style="margin-top:14px">
                             <h4 style="margin-bottom:8px">${title}</h4>
                             <div class="pricing-grid">${items}</div>
                           </section>`;
          }

          const exp = document.createElement("div");
          exp.className = "card service-expanded grid-span-all";

          // solo texto en la columna izquierda
          const flow = pBlocks.map(b => `<p>${b.html?.[STATE.lang]||b.html?.es||""}</p>`).join("");

          const inc=(s.detail.includes||[]).map(x=>`<li>${x[STATE.lang]||x.es||x}</li>`).join("");
          const ben=(s.detail.benefits||[]).map(x=>`<li>${x[STATE.lang]||x.es||x}</li>`).join("");

          exp.innerHTML = `
            <header class="exp-head">
              <h3>${s.title?.[STATE.lang]||s.title?.es||""}</h3>
              <div class="exp-actions">
                <a href="#/contacto" data-route class="btn primary">${STATE.lang==="es"?"Solicitar información":"Request info"}</a>
                <button class="btn ghost" id="closeSrv">Cerrar</button>
              </div>
            </header>
            <div class="exp-body">
              <div class="exp-main">${flow}</div>
              <aside class="exp-side">
                ${inc?`<section class="side-includes"><h4>Qué obtienes</h4><ul class="checklist">${inc}</ul></section>`:""}
                ${ben?`<section class="side-benefits"><h4>Beneficios</h4><ul class="checklist">${ben}</ul></section>`:""}
              </aside>
            </div>
            ${pricingHTML}
          `;
          grid.appendChild(exp);

          // ---- mover imágenes a la columna derecha ----
          const includesSec = exp.querySelector(".side-includes");
          const benefitsSec = exp.querySelector(".side-benefits");
          const makeFigure = (b) => {
            const fig = document.createElement("figure");
            fig.className = "side-figure";
            const img = document.createElement("img");
            img.src = b.src;
            img.alt = (b.alt && (b.alt[STATE.lang]||b.alt.es||b.alt.en)) || "";
            fig.appendChild(img);
            const capText = (b.caption && (b.caption[STATE.lang]||b.caption.es||b.caption.en)) || "";
            if (capText) {
              const cap = document.createElement("figcaption");
              cap.textContent = capText;
              fig.appendChild(cap);
            }
            return fig;
          };
          if (imgBlocks[0] && includesSec) includesSec.appendChild(makeFigure(imgBlocks[0]));
          if (imgBlocks[1] && benefitsSec) benefitsSec.appendChild(makeFigure(imgBlocks[1]));
          for (let i=2;i<imgBlocks.length;i++){
            (benefitsSec || includesSec || exp.querySelector(".exp-main")).appendChild(makeFigure(imgBlocks[i]));
          }

          exp.querySelector("#closeSrv")?.addEventListener("click", ()=> { exp.remove(); killGhostTooltips(); });
          scrollToViewWithOffset(exp);
          killGhostTooltips();
        });
      }
    });

    scrollToViewWithOffset(g);
  }

  // seguridad adicional
  killGhostTooltips();
}

/* ========= Blog / Diario (solo local) ========= */
function setupBlog(){
  const head = $("#calHead"), grid = $("#calGrid"), read = $("#dayRead");
  const monthSel = $("#monthSel"), yearSel = $("#yearSel");
  if (!head || !grid || !monthSel || !yearSel) return; // guardas por si el partial no está listo

  const months = (I18N[STATE.lang].blog.monthNames || "Enero,Febrero,Marzo,Abril,Mayo,Junio,Julio,Agosto,Septiembre,Octubre,Noviembre,Diciembre").split(",");
  monthSel.innerHTML = months.map((m,i)=>`<option value="${i}">${m}</option>`).join("");

  const current = new Date();
  let viewMonth = current.getMonth(), viewYear = current.getFullYear();
  monthSel.value = viewMonth;
  const years = Array.from({length:7},(_,k)=>viewYear-3+k);
  yearSel.innerHTML = years.map(y=>`<option value="${y}">${y}</option>`).join("");
  yearSel.value = viewYear;

  function hasAnyEntryLocal(dateKey){
    if (CONTENT.blogEntries?.[dateKey]) return true;
    if (CONTENT.publications?.some(p => p.date === dateKey)) return true;
    const e = CONTENT.blogEntries?.[dateKey];
    if (e && (Array.isArray(e.media) || Array.isArray(e.additions) || Array.isArray(e.blocks))) return true;
    return false;
  }

  function formatDateKey(key){
    const [y,m,d] = key.split("-").map(Number);
    if (STATE.lang==="es"){
      return `${String(d).padStart(2,"0")}/${String(m).padStart(2,"0")}/${y}`;
    }
    const dt = new Date(y, m-1, d);
    return dt.toLocaleDateString("en-US",{month:"short",day:"2-digit",year:"numeric"});
  }

  function extractYouTubeId(url){
    try{
      const u=new URL(url);
      if(u.hostname.includes("youtu.be")) return u.pathname.slice(1);
      if(u.searchParams.get("v")) return u.searchParams.get("v");
      const m=u.pathname.match(/\/embed\/([^\/\?]+)/); if(m) return m[1];
    }catch{}
    return (url||"").split("/").pop();
  }

  /* === NUEVO: parser de imágenes inline dentro del texto del día ===
     Soporta:
       1) Markdown:  ![ALT](URL){side=right caption="Pie de foto"}
       2) Shortcode: [img side=left src="URL" alt="ALT" cap="Pie de foto"]
     Consejos:
       - Escribe cada imagen en su propia línea (separada por líneas en blanco).
  */
  function parseInlineBlogMarkup(rawText){
    if (!rawText) return { html: "", used: false };
    let text = String(rawText);

    // Helpers
    const esc = s => s==null ? "" : String(s);
    const fig = (side, src, alt, cap) =>
      `<figure class="blog-img ${side==='left'?'left':'right'}">
        <img src="${esc(src)}" alt="${esc(alt)}">
        ${cap ? `<figcaption>${esc(cap)}</figcaption>` : ""}
      </figure>`;

    // 1) Shortcode [img ...]
    //    Acepta side=left|right, src="", alt="", cap=""
    const scRe = /\[img([^\]]*)\]/gi;
    text = text.replace(scRe, (_, attrs) => {
      const get = (k, def="")=>{
        const m = new RegExp(`${k}\\s*=\\s*"(.*?)"`, "i").exec(attrs) ||
                  new RegExp(`${k}\\s*=\\s*'(.*?)'`, "i").exec(attrs) ||
                  new RegExp(`${k}\\s*=\\s*([^\\s"']+)`, "i").exec(attrs);
        return m ? m[1] : def;
      };
      const side = (get("side","right").toLowerCase()==="left") ? "left" : "right";
      const src  = get("src","");
      const alt  = get("alt","");
      const cap  = get("cap","");
      if (!src) return ""; // si no hay src, no insertamos nada
      return `\n\n${fig(side, src, alt, cap)}\n\n`;
    });

    // 2) Markdown ![ALT](URL){...}
    //    Lee side=left|right y caption="..."/'...'
    const mdImgRe = /!\[(.*?)\]\((.*?)\)(\{([^}]+)\})?/g;
    text = text.replace(mdImgRe, (_m, alt, src, _braced, inside) => {
      let side = "right", cap = "";
      if (inside){
        const sideM = /(^|\s)side\s*=\s*(left|right)(\s|$)/i.exec(inside);
        if (sideM) side = sideM[2].toLowerCase()==="left" ? "left" : "right";
        const capM1 = /caption\s*=\s*"([^"]*)"/i.exec(inside);
        const capM2 = /caption\s*=\s*'([^']*)'/i.exec(inside);
        const capM3 = /caption\s*=\s*([^\s]+)/i.exec(inside);
        cap = (capM1?.[1] || capM2?.[1] || capM3?.[1] || "").trim();
      }
      if (!src) return "";
      return `\n\n${fig(side, src, alt, cap)}\n\n`;
    });

    // Tokenización simple por dobles saltos de línea → párrafos
    const parts = text.split(/\n{2,}/).map(s=>s.trim()).filter(Boolean);
    let used = false;
    const html = parts.map(chunk=>{
      if (/^<figure\b/i.test(chunk) && /<\/figure>$/.test(chunk)){
        used = true;
        return chunk; // ya es una figura, la dejamos tal cual
      }
      // Párrafo normal; permitimos saltos simples dentro
      const safe = chunk.replace(/\n/g, ' ');
      return `<p>${safe}</p>`;
    }).join("\n");

    return { html, used };
  }

  function renderCalendar(){
    const first = new Date(viewYear, viewMonth, 1);
    const startIdx = (first.getDay()+6)%7; // lunes=0
    const daysInMonth = new Date(viewYear, viewMonth+1, 0).getDate();

    head.textContent = `${months[viewMonth]} ${viewYear}`;

    const week = (I18N[STATE.lang].blog.weekNames || "Lun,Mar,Mié,Jue,Vie,Sáb,Dom").split(",");
    grid.innerHTML = `<div class="cal-head">${week.join("</div><div class='cal-head'>")}</div>`;

    for (let i=0;i<startIdx;i++) grid.appendChild(document.createElement("div"));

    for (let d=1; d<=daysInMonth; d++){
      const cell = document.createElement("button");
      cell.className = "cal-cell";
      cell.textContent = d;
      const key = `${viewYear}-${String(viewMonth+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
      if (hasAnyEntryLocal(key)) cell.classList.add("has-entry");
      cell.addEventListener("click", ()=> openDay(key));
      grid.appendChild(cell);
    }
  }

  function openDay(key){
    const entryObj = CONTENT.blogEntries?.[key] || {};
    const entryText = entryObj[STATE.lang] || entryObj.es || "";

    const todaysPubs = (CONTENT.publications||[])
      .filter(p => p.date === key)
      .map(p => ({ from:'local', id:p.id, title:p.title, cat:p.cat, src:p.src }));

    const manualAdds = (entryObj.additions||[])
      .map(a => ({ from:'manual', title:a.title||'Archivo', src:a.src||'#', cat:a.cat||'' }));

    const allAdds = [...todaysPubs, ...manualAdds];

    // ========= NUEVO: flujo por bloques intercalados =========
    const hasBlocks = Array.isArray(entryObj.blocks) && entryObj.blocks.length>0;
    let html = `<h3>${formatDateKey(key)}</h3>`;

    if (allAdds.length){
      const catNames = I18N[STATE.lang].pubCats || {};
      const items = allAdds.map(a=>{
        const cat = catNames[a.cat] || a.cat || '';
        if (a.from === 'local'){
          return `<li><a href="#/publicaciones" data-route data-open-pub="${a.id}">
            ${I18N[STATE.lang].blog.additionsPub.replace("{cat}", cat).replace("{title}", a.title)}
          </a></li>`;
        } else {
          const label = I18N[STATE.lang].blog.additionsPub
            .replace("{cat}", cat || 'Archivo')
            .replace("{title}", a.title || '—');
          return `<li><a href="${a.src}" target="_blank" rel="noopener">${label}</a></li>`;
        }
      }).join("");
      html += `<h4>${I18N[STATE.lang].blog.additionsTitle}</h4><ul>${items}</ul><hr>`;
    }

    if (hasBlocks){
      // Alterna izquierda/derecha y mete un pequeño “stagger” para no coincidir en altura
      let sideToggle = "right";
      let stagger = 0; // 0/1 para clases .stagger-a / .stagger-b
      const flow = entryObj.blocks.map(b=>{
        if (b.type === "p"){
          const txt = (b.html?.[STATE.lang]||b.html?.es||b.text?.[STATE.lang]||b.text?.es||b.html||b.text||"");
          return `<p>${txt}</p>`;
        }
        if (b.type === "img"){
          const side = (b.side||b.float||sideToggle);
          sideToggle = sideToggle==="right" ? "left" : "right";
          const stagClass = stagger===0 ? "stagger-a" : "stagger-b";
          stagger = 1 - stagger;
          const alt = (b.alt && (b.alt[STATE.lang]||b.alt.es||b.alt.en)) || "";
          const cap = (b.caption && (b.caption[STATE.lang]||b.caption.es||b.caption.en)) || "";
          return `
            <figure class="blog-img ${side} ${stagClass}">
              <img src="${b.src}" alt="${alt}">
              ${cap ? `<figcaption>${cap}</figcaption>` : ""}
            </figure>`;
        }
        if (b.type === "youtube"){
          const id = extractYouTubeId(b.src||"");
          const side = (b.side||b.float||sideToggle);
          sideToggle = sideToggle==="right" ? "left" : "right";
          const stagClass = stagger===0 ? "stagger-a" : "stagger-b";
          stagger = 1 - stagger;
          return `
            <figure class="blog-img ${side} ${stagClass}">
              <iframe src="https://www.youtube.com/embed/${id}"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen></iframe>
            </figure>`;
        }
        if (b.type === "video"){
          const side = (b.side||b.float||sideToggle);
          sideToggle = sideToggle==="right" ? "left" : "right";
          const stagClass = stagger===0 ? "stagger-a" : "stagger-b";
          stagger = 1 - stagger;
          return `
            <figure class="blog-img ${side} ${stagClass}">
              <video controls src="${b.src}"></video>
            </figure>`;
        }
        return "";
      }).join("");

      html += `<div class="blog-flow">${flow}<div class="clearfix"></div></div>`;
    } else {
      // ====== NUEVO: parsear imágenes inline dentro del texto ======
      const parsed = parseInlineBlogMarkup(entryText || "");
      if (parsed.used){
        html += `<div class="blog-flow">${parsed.html}<div class="clearfix"></div></div>`;
      } else {
        // ====== fallback: tu diseño anterior ======
        const mediaList = Array.isArray(entryObj.media) ? entryObj.media : [];
        if (mediaList.length){
          const mediaHtml = mediaList.map(m=>{
            const type = (m.type||"").toLowerCase();
            if (type === "image"){
              return `<figure class="media-item"><img src="${m.src}" alt=""></figure>`;
            } else if (type === "video"){
              return `<figure class="media-item"><video controls src="${m.src}"></video></figure>`;
            } else if (type === "youtube"){
              const id = extractYouTubeId(m.src);
              return `<figure class="media-item"><iframe src="https://www.youtube.com/embed/${id}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></figure>`;
            } else {
              return `<figure class="media-item"><a class="btn" href="${m.src}" target="_blank" rel="noopener">Abrir</a></figure>`;
            }
          }).join("");

          html += `<div class="blog-media-grid">
            <div class="media-col">${mediaHtml}</div>
            <div class="entry-col"><p>${entryText || `<span class="muted">${I18N[STATE.lang].blog.empty}</span>`}</p></div>
          </div>`;
        } else {
          html += entryText
            ? `<p>${entryText}</p>`
            : `<p class="muted">${I18N[STATE.lang].blog.empty}</p>`;
        }
      }
    }

    read.innerHTML = html;

    /* === COLOR-CODING de enlaces en "Adiciones del día" === */
    const ul = read.querySelector("h4 + ul");
    if (ul) {
      ul.classList.add("blog-additions");
      ul.querySelectorAll("a").forEach(a=>{
        const href = (a.getAttribute("href")||"").toLowerCase();
        const isRoute = a.hasAttribute("data-route");
        let type = "";

        if (isRoute && a.hasAttribute("data-open-pub")) {
          // publicaciones locales → miramos mediaType
          const id = parseInt(a.getAttribute("data-open-pub"), 10);
          const pub = (CONTENT.publications||[]).find(p=>p.id===id);
          const mt  = (pub?.mediaType||"").toLowerCase();
          if (mt === "pdf") type = "pdf";
          else if (mt === "video") type = "video";
        } else {
          // manuales → detectamos por URL/extension
          if (href.endsWith(".pdf")) type = "pdf";
          else if (/\.(mp4|webm|mov|mkv)(\?|$)/.test(href) || href.includes("youtube.com") || href.includes("youtu.be")) type = "video";
          else if (/\.(mp3|wav|ogg|m4a|flac)(\?|$)/.test(href) || href.includes("spotify.com") || href.includes("soundcloud.com") || href.includes("music.youtube") || href.includes("bandcamp.com")) type = "audio";
          else if (href.includes("/#/apps") || href.includes("/apps")) type = "app";
        }

        if (type) a.classList.add("link-"+type);
      });
    }

    $$('a[data-open-pub]', read).forEach(a=>{
      a.addEventListener('click', (e)=>{
        e.preventDefault();
        STATE.pendingOpenPubId = parseInt(a.getAttribute('data-open-pub'), 10);
        location.hash = "#/publicaciones";
      });
    });
  }

  $("#prevMonth")?.addEventListener("click", ()=>{
    viewMonth--;
    if (viewMonth<0){ viewMonth=11; viewYear--; if (yearSel) yearSel.value=viewYear; }
    if (monthSel) monthSel.value=viewMonth;
    renderCalendar();
  });
  $("#nextMonth")?.addEventListener("click", ()=>{
    viewMonth++;
    if (viewMonth>11){ viewMonth=0; viewYear++; if (yearSel) yearSel.value=viewYear; }
    if (monthSel) monthSel.value=viewMonth;
    renderCalendar();
  });
  monthSel.addEventListener("change", (e)=>{ viewMonth=+e.target.value; renderCalendar(); });
  yearSel.addEventListener("change",  (e)=>{ viewYear=+e.target.value;  renderCalendar(); });

  // pintar calendario (tras montar todo)
  renderCalendar();

  const hint=$("#blogHint"); if (hint) hint.textContent = I18N[STATE.lang].blog.pick;
}


/* ========= Actualidad / Enlaces / Buscador ========= */
function renderNews(){
  const cont = $("#newsList");
  if (!cont) return;
  cont.innerHTML = "";
  const items = (CONTENT.news || []).slice().sort((a,b)=> (b.date||"").localeCompare(a.date||""));
  cont.innerHTML = items.length ? "" : `<p class="muted">${I18N[STATE.lang].news.empty}</p>`;
  items.forEach(n=>{
    const el = document.createElement("article");
    el.className = "card";
    el.innerHTML = `<h3>${n.title[STATE.lang]||""}</h3><p class="muted">${n.date||""}</p><p>${n.body[STATE.lang]||""}</p>`;
    cont.appendChild(el);
  });
}
function renderLinks(){
  const cont = $("#linksList");
  if (!cont) return;
  cont.innerHTML = "";
  (CONTENT.links||[]).forEach(l=>{
    const el=document.createElement("article");
    el.className="card";
    el.innerHTML=`<h3>${l.title[STATE.lang]||l.url}</h3><p>${l.desc[STATE.lang]||""}</p><div><a class="btn" href="${l.url}" target="_blank" rel="noopener">Abrir</a></div>`;
    cont.appendChild(el);
  });
}

/* ========= Buscador ========= */
function buildSearchIndex(){
  if (STATE.searchIndex) return STATE.searchIndex;
  const lang = STATE.lang;
  const idx = [];

  (CONTENT.publications||[]).forEach(p=>{
    idx.push({ type:"publication", id:p.id, route:"/publicaciones", cat:p.cat,
      title:p.title, snippet:(p.desc?.[lang]||"")+" "+(I18N[lang].pubCats?.[p.cat]||""),
      date:p.date||null, _t:norm((p.title||"")+" "+(p.desc?.[lang]||"")+" "+p.cat) });
  });
  (CONTENT.apps||[]).forEach(a=>{
    idx.push({type:"app",route:"/apps",title:a.title?.[lang]||"",snippet:a.desc?.[lang]||"",_t:norm((a.title?.[lang]||"")+" "+(a.desc?.[lang]||""))});
  });
  (CONTENT.projects||[]).forEach(p=>{
    idx.push({type:"project",route:"/proyectos",title:p.title?.[lang]||"",snippet:p.desc?.[lang]||"",_t:norm((p.title?.[lang]||"")+" "+(p.desc?.[lang]||""))});
  });
  Object.entries(CONTENT.blogEntries||{}).forEach(([date,obj])=>{
    const text = obj?.[lang] || obj?.es || "";
    if (text){
      idx.push({type:"blog",route:"/blog",date,title:date,snippet:text.slice(0,180)+"…",_t:norm(date+" "+text)});
    }
  });
  const A=I18N[lang].about||{};
  ["p1","p2","p3","p4","p5","p6","p7","poetic1","poetic2","poetic3"].forEach(k=>{
    const v=A[k]; if(!v)return;
    idx.push({type:"about",route:"/about",title:(k.startsWith("poetic")?"Poético":"Quién soy"),snippet:v.replace(/<[^>]+>/g,"").slice(0,180)+"…",_t:norm(v.replace(/<[^>]+>/g,""))});
  });
  (I18N[lang].servicios?.items||[]).forEach(s=>{
    idx.push({type:"servicios",route:"/servicios",title:s.h,snippet:s.p,_t:norm(s.h+" "+s.p)});
  });
  (CONTENT.news||[]).forEach(n=>{
    const snip = n.body?.[lang] ? n.body[lang].slice(0,180)+"…" : "" ;
    idx.push({type:"news",route:"/actualidad",id:n.id,date:n.date||null,title:n.title?.[lang]||"",snippet:snip,_t:norm((n.title?.[lang]||"")+" "+(n.body?.[lang]||""))});
  });
  (CONTENT.links||[]).forEach(l=>{
    idx.push({type:"link",route:"/enlaces",title:l.title?.[lang]||l.url,snippet:l.desc?.[lang]||l.url,url:l.url,_t:norm((l.title?.[lang]||"")+" "+(l.desc?.[lang]||"")+" "+l.url)});
  });

  STATE.searchIndex = idx;
  return idx;
}
function doSearch(q){
  const terms = norm(q).split(/\s+/).filter(Boolean);
  if(!terms.length) return [];
  const idx = buildSearchIndex();
  const scored = idx
    .map(it=>({it,score:terms.reduce((a,t)=>a+(it._t.includes(t)?1:0),0)}))
    .filter(x=>x.score>0);
  scored.sort((a,b)=> b.score!==a.score ? b.score-a.score :
    ((b.it.date?new Date(b.it.date).getTime():0) - (a.it.date?new Date(a.it.date).getTime():0)));
  return scored.map(s=>s.it);
}
function setupSearch(){
  const input=$("#q"), results=$("#results"), groupNames=I18N[STATE.lang].search.group;
  function renderList(list){
    if(!list.length){
      results.innerHTML=`<p class="muted">${I18N[STATE.lang].search.noresults}</p>`;
      return;
    }
    const groups={}; list.forEach(it=> (groups[it.type]=groups[it.type]||[]).push(it));
    let html="";
    Object.entries(groups).forEach(([type,arr])=>{
      html+=`<h3 class="muted">${groupNames[type]||type}</h3>`;
      arr.forEach(it=>{
        const badge = it.date ? `<span class="badge">${it.date}</span>` : "";
        let action="";
        if(type==="publication"){
          action=`<a href="#/publicaciones" data-route data-open-pub="${it.id}" class="btn btn-small">${STATE.lang==="es"?"Abrir":"Open"}</a>`;
        } else if(type==="blog"){
          action=`<a href="#/blog" data-route data-open-day="${it.date}" class="btn btn-small">${STATE.lang==="es"?"Abrir":"Open"}</a>`;
        } else if(type==="link"){
          action=`<a href="${it.url}" target="_blank" rel="noopener" class="btn btn-small">${STATE.lang==="es"?"Ir":"Open"}</a>`;
        } else {
          action=`<a href="#${it.route}" data-route class="btn btn-small">${STATE.lang==="es"?"Ir":"Go"}</a>`;
        }
        html+=`
          <article class="result">
            <div class="result-head">
              <strong>${it.title||"(sin título)"}</strong>${badge}
            </div>
            <p>${it.snippet||""}</p>
            <div class="result-actions">${action}</div>
          </article>`;
      });
    });
    results.innerHTML=html;

    $$('a[data-open-pub]',results).forEach(a=> a.addEventListener('click',(e)=>{
      e.preventDefault();
      STATE.pendingOpenPubId=parseInt(a.getAttribute('data-open-pub'),10);
      location.hash="#/publicaciones";
    }));
    $$('a[data-open-day]',results).forEach(a=> a.addEventListener('click',(e)=>{
      e.preventDefault();
      STATE.pendingBlogKey=a.getAttribute('data-open-day');
      location.hash="#/blog";
    }));
  }
  input.setAttribute("placeholder", I18N[STATE.lang].search.placeholder);
  input.addEventListener("keydown",(e)=>{
    if(e.key==="Enter"){
      const q=input.value.trim();
      results.innerHTML = q?renderList(doSearch(q)):"";
    }
  });
  const m=location.hash.match(/\/buscar\?q=(.*)$/);
  if(m){
    const q=decodeURIComponent(m[1]);
    input.value=q;
    renderList(doSearch(q));
  }
}

/* ========= fx-vorbit ========= */
let VORBIT_LOOP=null;
function setupVowelOrbit(){
  if (VORBIT_LOOP && VORBIT_LOOP.stop) VORBIT_LOOP.stop();
  const els=$$(".fx-vorbit");
  if(!els.length) return;
  const ctrls=els.map(initVorbit).filter(Boolean);
  if(!ctrls.length) return;
  let rafId=null,lastTs=0;
  function frame(ts){
    if(!lastTs) lastTs=ts;
    const dt=(ts-lastTs)/1000; lastTs=ts;
    ctrls.forEach(c=>{
      c.t+=dt/c.duration;
      if(c.t>=1){
        c.t-=1;
        c.map=c.map.map(idx=>(idx+c.dir+c.vowels.length)%c.vowels.length);
        const ok=c.map.every((v,i)=>v===i);
        if(ok){
          c.el.classList.add("blink");
          setTimeout(()=>c.el.classList.remove("blink"), c.blinkMs);
        }
      }
      const tt=-(Math.cos(Math.PI*c.t)-1)/2;
      for(let i=0;i<c.vowels.length;i++){
        const from=c.slots[c.map[i]];
        const to  =c.slots[(c.map[i]+c.dir+c.vowels.length)%c.vowels.length];
        const x=from.x+(to.x-from.x)*tt;
        const yBase=from.y;
        const yArc=c.amp*Math.sin(Math.PI*tt);
        c.floats[i].style.transform=`translate(${x}px, ${yBase+yArc}px)`;
      }
    });
    rafId=requestAnimationFrame(frame);
  }
  rafId=requestAnimationFrame(frame);
  VORBIT_LOOP={stop(){cancelAnimationFrame(rafId); VORBIT_LOOP=null;}};
}
function initVorbit(el){
  if(el.getAttribute("data-vorbit-ready")) return null;
  el.setAttribute("data-vorbit-ready","1");
  const text=el.textContent;
  el.textContent="";
  const chars=[...text], vowelRe=/[aeiouáéíóúüAEIOUÁÉÍÓÚÜ]/;
  const chSpans=[], vowelIdx=[];
  chars.forEach((ch,i)=>{
    const s=document.createElement("span");
    s.className="ch"+(vowelRe.test(ch)?" vowel":"");
    s.textContent=ch;
    el.appendChild(s);
    chSpans.push(s);
    if(vowelRe.test(ch)) vowelIdx.push(i);
  });
  if(vowelIdx.length<2) return null;
  const slots=vowelIdx.map(i=>{
    const r=chSpans[i];
    return {x:r.offsetLeft,y:r.offsetTop};
  });
  const floats=[];
  vowelIdx.forEach((i,k)=>{
    const orig=chSpans[i];
    orig.style.visibility="hidden";
    const f=document.createElement("span");
    f.className="vorbit-float";
    f.textContent=orig.textContent;
    el.appendChild(f);
    f.style.transform=`translate(${slots[k].x}px, ${slots[k].y}px)`;
    floats.push(f);
  });
  const cs=getComputedStyle(el);
  const duration=parseCssTimeToSec(cs.getPropertyValue("--vorbit-duration"),2.8);
  let dir=parseInt(cs.getPropertyValue("--vorbit-direction"))||1;
  dir=dir>=0?1:-1;
  const amp=parseFloat(cs.getPropertyValue("--vorbit-amplitude"))||6;
  const blinkMs=parseCssTimeToMs(cs.getPropertyValue("--vorbit-blink-duration"),180);
  return { el, vowels:vowelIdx, slots, floats, map:vowelIdx.map((_,i)=>i), dir, amp, duration, blinkMs, t:0 };
}

/* ========= Player ========= */
let audio, currentIndex=0;
function setupPlayer(){
  audio = new Audio();
  audio.preload = "metadata";
  const saved = JSON.parse(localStorage.getItem("player")||"{}");
  currentIndex = saved.index || 0;
  audio.volume = saved.volume ?? 0.6;
  const vol = $("#volRange");
  if (vol) vol.value = audio.volume;

  $("#btnPlay")?.addEventListener("click", togglePlay);
  $("#btnPrev")?.addEventListener("click", ()=> changeTrack(-1));
  $("#btnNext")?.addEventListener("click", ()=> changeTrack(1));
  vol?.addEventListener("input",(e)=>{ audio.volume = +e.target.value; persistPlayer(); });

  // 👇 Cambiado: ahora la X elimina todo el reproductor
  $("#playerClose")?.addEventListener("click", ()=>{ 
    audio.pause();
    const mp = $("#musicPlayer");
    if (mp) mp.remove();   // elimina del DOM
  });



  buildPlaylist();
  loadTrack(currentIndex);
  audio.addEventListener("ended", ()=> changeTrack(1));
}

function buildPlaylist(){
  const list=$("#playlist"); if (!list) return;
  list.innerHTML="";
  (CONTENT.playlist||[]).forEach((trk,i)=>{
    const row=document.createElement("div");
    row.className="playlist-item";
    row.innerHTML=`<span>${trk.title}</span><button>${i===currentIndex?"⏸":"▶️"}</button>`;
    if(i===currentIndex) row.classList.add("playing");
    row.querySelector("button").addEventListener("click", ()=>{
      if(i===currentIndex && !audio.paused){ audio.pause(); }
      else { currentIndex=i; loadTrack(currentIndex,true); }
      updatePlaylistUI();
    });
    list.appendChild(row);
  });
}
function updatePlaylistUI(){
  $$("#playlist .playlist-item").forEach((row,i)=>{
    row.classList.toggle("playing", i===currentIndex && !audio.paused);
    row.querySelector("button").textContent = (i===currentIndex && !audio.paused) ? "⏸" : "▶️";
  });
  const title=$("#trackTitle"); if (title) title.textContent = CONTENT.playlist?.[currentIndex]?.title || "Track";
  const play=$("#btnPlay"); if (play) play.textContent = (document.querySelector("audio")?.paused ?? true) ? "▶️" : "⏸";
}
function loadTrack(i, autoplay=false){
  const trk=CONTENT.playlist?.[i];
  if(!trk) return;
  const audioEl = document.querySelector("audio") || new Audio();
  if (!document.querySelector("audio")) document.body.appendChild(audioEl);
  audioEl.preload="metadata";
  audioEl.src=trk.src;
  if(autoplay) audioEl.play().catch(()=>{});
  updatePlaylistUI();
  persistPlayer();
}
function changeTrack(step){
  currentIndex=(currentIndex+step+CONTENT.playlist.length)%CONTENT.playlist.length;
  loadTrack(currentIndex,true);
}
function togglePlay(){
  const audioEl = document.querySelector("audio"); if (!audioEl) return;
  if(audioEl.paused){ audioEl.play().catch(()=>{}); }
  else { audioEl.pause(); }
  updatePlaylistUI();
}
function persistPlayer(){
  const audioEl = document.querySelector("audio");
  localStorage.setItem("player", JSON.stringify({index:currentIndex,volume:audioEl?.volume??0.6}));
}

/* ========= Tooltip fantasma killer ========= */
function killGhostTooltips(){
  // 1) tooltips comunes por clase
  $$(".tooltip,.tippy-box,.microtip,.ui-tip,.hint,.balloon,.titlebox").forEach(n=> n.remove());
  // 2) por texto exacto (ES/EN) y posición flotante
  const texts = [
    I18N?.[STATE.lang]?.ui?.openNew || "Abrir en pestaña nueva",
    "Open in new tab"
  ];
  document.querySelectorAll("body *").forEach(n=>{
    try{
      const txt=(n.textContent||"").trim();
      if(!txt || !texts.includes(txt)) return;
      const cs=getComputedStyle(n);
      if (["fixed","absolute"].includes(cs.position) && n.offsetWidth<240 && n.offsetHeight<80){
        const host=n.closest("div,section,aside,span")||n;
        host.remove();
      }
    }catch{}
  });
}

/* ========= Boot ========= */
document.addEventListener("DOMContentLoaded", ()=>{
  const year=$("#year"); if (year) year.textContent = new Date().getFullYear();
  const sel=$("#langSelect"); if (sel){ sel.value = STATE.lang; sel.addEventListener("change",(e)=> setLang(e.target.value)); }
  applyI18N();
  setupNav();
  handleHash();
  setupPlayer();
  buildSearchIndex();
  killGhostTooltips();
document.addEventListener("click", (e)=>{
  const closeBtn = e.target.closest("#playerClose");
  if (closeBtn){
    try { (document.querySelector("audio")||{}).pause?.(); } catch{}
    const mp = document.getElementById("musicPlayer");
    if (mp) mp.remove();
    return;
  }

  const minBtn = e.target.closest("#playerMin");
  if (minBtn){
    const mp = document.getElementById("musicPlayer");
    if (mp){
      mp.classList.toggle("minimized");

      // Fallback por si alguna regla extraña pisa el CSS:
      const body = mp.querySelector(".player-body");
      if (body){
        const minimized = mp.classList.contains("minimized");
        body.style.display = minimized ? "none" : "";
      }

      // (Opcional) cambia el símbolo del botón
      try { minBtn.textContent = mp.classList.contains("minimized") ? "＋" : "–"; } catch {}
    }
    return;
  }
});


});
function renderApps(){
  const root   = $("#appsRoot");
  const stage  = $("#appsStage");
  const detail = $("#appsDetail");
  if (!root || !stage || !detail) return;

  const L = STATE.lang;

  // ===== Helpers =====
  const dataByKind = {
    util: () => CONTENT.appsUtil || [],
    game: () => CONTENT.appsGames || [],
    elo:  () => CONTENT.appsElo  || [],
  };
  const titlesByKind = {
    util: { es:"UTILIDADES", en:"UTILITIES" },
    game: { es:"JUEGOS",      en:"GAMES" },
    elo:  { es:"COHERENCIAS", en:"COHERENCES" },
  };

  function clearDetail(){ detail.innerHTML = ""; }

  function buildIndex(items, kind){
    const wrap = document.createElement("nav");
    wrap.className = "app-index";
    const list = document.createElement("div");
    list.className = "app-index-list";
    items.forEach((it, i)=>{
      const a = document.createElement("a");
      a.href = `#${kind}-${i}`;
      a.textContent = it.title?.[L] || it.title?.[STATE.lang==='es'?'es':'en'] || it.title || (kind.toUpperCase()+" "+(i+1));
      a.addEventListener("click", (e)=>{
        e.preventDefault();
        const sec = document.getElementById(`${kind}-${i}`);
        scrollToViewWithOffset(sec, "smooth");
      });
      list.appendChild(a);
    });
    wrap.appendChild(list);
    return wrap;
  }

  // ===== Construye UNA fila de detalle con media a la IZQ y texto a la DCHA =====
  function buildDetailRow(a, kind){
    const row = document.createElement("div");
    row.className = "proj-item"; // grid: 300px 1fr (ya lo tienes en CSS)

    // Columna IZQUIERDA: media stack (imagen + video)
    const left = document.createElement("div");
    left.className = "proj-media";
    if (a.image || a.video){
      const stack = document.createElement("div");
      stack.className = "app-media-stack";
      if (a.image){
        const fig = document.createElement("div");
        fig.className = "app-media";
        fig.innerHTML = `<img src="${a.image}" alt="${(a.alt?.[L]||a.title?.[L]||'image')}">`;
        stack.appendChild(fig);
      }
      if (a.video){
        const vid = document.createElement("div");
        vid.className = "app-media";
        vid.innerHTML = `<video controls ${a.thumb ? `poster="${a.thumb}"` : ""} src="${a.video}"></video>`;
        stack.appendChild(vid);
      }
      left.appendChild(stack);
    }
    row.appendChild(left);

    // Columna DERECHA: texto (título + descripción) + footer + botones
    const right = document.createElement("div");
    right.className = "proj-text";
    const title = a.title?.[L] || a.title?.es || a.title || "—";
    const desc  = a.desc?.[L]  || a.desc?.es  || "";

    // Coherencias: si no hay media, mostramos la cita entrecomillada
    const isElo = (kind === "elo");
    const mainHtml = isElo
      ? `<blockquote>${desc}</blockquote>`
      : `<h4 style="margin:.2rem 0 .4rem">${title}</h4><p>${desc}</p>`;

    right.innerHTML = isElo
      ? mainHtml
      : `<h4 style="margin:.2rem 0 .4rem">${title}</h4><p>${desc}</p>`;

    if (isElo && a.author){
      const author = (typeof a.author === "string")
        ? a.author
        : (a.author?.[L] || a.author?.es || "");
      if (author){
        const cite = document.createElement("div");
        cite.className = "muted";
        cite.style.marginTop = "6px";
        cite.style.textAlign = "right";
        cite.textContent = `— ${author}`;
        right.appendChild(cite);
      }
    }

    if (a.footer?.[L] || a.footer?.es){
      const foot = document.createElement("div");
      foot.className = "app-footer";
      foot.innerHTML = `<p>${a.footer?.[L] || a.footer?.es}</p>`;
      right.appendChild(foot);
    }

    if (a.download || a.repo){
      const btns = document.createElement("div");
      btns.className = "app-buttons";
      if (a.download){
        const d = document.createElement("a");
        d.className = "btn"; d.href = a.download; d.target="_blank"; d.rel="noopener";
        d.textContent = L==="es" ? "Descargar" : "Download";
        btns.appendChild(d);
      }
      if (a.repo){
        const r = document.createElement("a");
        r.className = "btn"; r.href = a.repo; r.target="_blank"; r.rel="noopener";
        r.textContent = L==="es" ? "Enlace al proyecto" : "Project link";
        btns.appendChild(r);
      }
      right.appendChild(btns);
    }

    row.appendChild(right);
    return row;
  }

  function openKind(kind){
    stage.style.display = "none";
    detail.innerHTML = "";

    const items = (dataByKind[kind] && dataByKind[kind]()) || [];
    const title = titlesByKind[kind]?.[L] || titlesByKind[kind]?.es || kind.toUpperCase();

    const card = document.createElement("div");
    card.className = "projects-card";

    // Cabecera + volver
    const head = document.createElement("div");
    head.className = "app-detail-head";
    head.innerHTML = `
      <div class="app-detail-bar">
        <h3 style="margin:0">${title}</h3>
        <button class="btn ghost" id="appsBack">← ${L==='es'?'Volver':'Back'}</button>
      </div>`;
    card.appendChild(head);

    // Índice
    if (items.length){
      card.appendChild(buildIndex(items, kind));
    }else{
      const empty = document.createElement("p");
      empty.className = "muted";
      empty.textContent = L==='es' ? "No hay elementos todavía." : "No items yet.";
      card.appendChild(empty);
    }

    // Detalles
    items.forEach((a, i)=>{
      const section = document.createElement("section");
      section.id = `${kind}-${i}`;
      section.className = "proj";

      const h = document.createElement("h4");
      h.textContent = a.title?.[L] || a.title?.es || a.title || (title+" "+(i+1));
      h.style.margin = "8px 0";
      card.appendChild(h);

      const row = buildDetailRow(a, kind);
      card.appendChild(row);

      const hr = document.createElement("hr");
      hr.className = "proj-sep";
      card.appendChild(hr);
    });

    detail.appendChild(card);

    // volver
    $("#appsBack")?.addEventListener("click", ()=>{
      detail.innerHTML = "";
      stage.style.display = "";
      scrollToViewWithOffset(root);
    });
  }

  // Click esferas
  $$(".sphere-btn", stage).forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const kind = btn.getAttribute("data-kind"); // util | game | elo
      openKind(kind);
    });
  });
}



function renderProjects(){
  const wrap = $("#projectsList");
  if (!wrap) return;
  const L = STATE.lang;

  // Estructura esperada en CONTENT.projects:
  // [{ title:{es,en}, desc:{es,en}, image:"...", link:"https://...", label:{es,en} }, ...]
  const list = CONTENT.projects || [];

  wrap.innerHTML = "";
  list.forEach((p, i) => {
    const item = document.createElement("section");
    item.className = "proj";

    // Cabecera de cada proyecto (título)
    const h = document.createElement("h4");
    h.textContent = p.title?.[L] || p.title?.es || p.title || `Proyecto ${i+1}`;
    h.style.margin = "8px 0";
    h.style.textAlign = "left";
    item.appendChild(h);

    // Bloque principal: imagen + texto (alternando)
    const row = document.createElement("div");
    row.className = "proj-item" + (i % 2 ? " alt" : "");

    row.innerHTML = `
      <div class="proj-media">
        ${p.image ? `<img src="${p.image}" alt="${(p.alt?.[L]||p.alt?.es||h.textContent)}">`
                   : `<div class="muted" style="padding:16px;text-align:center">Sin imagen</div>`}
      </div>
      <div class="proj-text">
        <p>${p.desc?.[L] || p.desc?.es || ""}</p>
      </div>
    `;
    item.appendChild(row);

    // CTA centrado
    if (p.link){
      const cta = document.createElement("div");
      cta.className = "proj-cta";
      const a = document.createElement("a");
      a.className = "btn primary";
      a.target = "_blank";
      a.rel = "noopener";
      a.href = p.link;
      a.textContent = p.label?.[L] || p.label?.es || "Ir a la campaña";
      cta.appendChild(a);
      item.appendChild(cta);
    }

    // Separador entre proyectos
    const hr = document.createElement("hr");
    hr.className = "proj-sep";
    item.appendChild(hr);

    wrap.appendChild(item);
  });
}
function renderEcos(){
  const stage  = $("#creaStage");   // esferas
  const detail = $("#creaDetail");  // donde pintamos el contenido
  if (!stage || !detail) return;

  const L = STATE.lang;

  // === helpers de datos ===
  const dataByKind = {
    song:    () => CONTENT.creaSongs    || [],
    podcast: () => CONTENT.creaPodcasts || [],
    video:   () => CONTENT.creaVideos   || [],
  };
  const titlesByKind = {
    song:    { es:"Canciones", en:"Songs" },
    podcast: { es:"Podcasts",  en:"Podcasts" },
    video:   { es:"Vídeos",     en:"Videos" },
  };

  function clearDetail(){ detail.innerHTML = ""; }

  function makeCard(item, type){
    const card = document.createElement("div");
    card.className = "app-card";

    const h = document.createElement("h4");
    h.textContent = item.title?.[L] || item.title?.es || "—";
    card.appendChild(h);

    const p = document.createElement("p");
    p.textContent = item.desc?.[L] || item.desc?.es || "";
    card.appendChild(p);

    if (type==="song" || type==="podcast"){
      const audio = document.createElement("audio");
      audio.controls = true;
      audio.src = item.audio;
      card.appendChild(audio);
    } else if (type==="video"){
      const video = document.createElement("video");
      video.controls = true;
      if (item.thumb) video.poster = item.thumb;
      video.src = item.video;
      card.appendChild(video);
    }

    if (item.footer?.[L] || item.footer?.es){
      const f = document.createElement("div");
      f.className = "app-footer";
      f.innerHTML = `<p>${item.footer?.[L] || item.footer?.es}</p>`;
      card.appendChild(f);
    }

    return card;
  }

  function openKind(kind){
    // esconder esferas y preparar detalle
    stage.style.display = "none";
    clearDetail();

    const items = (dataByKind[kind] && dataByKind[kind]()) || [];
    const title = titlesByKind[kind]?.[L] || titlesByKind[kind]?.es || kind;

    const card = document.createElement("div");
    card.className = "projects-card";

    // cabecera + volver
    const head = document.createElement("div");
    head.className = "app-detail-bar";
    head.innerHTML = `
      <h3 style="margin:0">${title}</h3>
      <button class="btn ghost" id="ecosBack">← ${L==='es'?'Volver':'Back'}</button>
    `;
    card.appendChild(head);

    // si hay elementos, píntalos
    if (items.length){
      items.forEach((it)=>{
        const wrap = document.createElement("section");
        wrap.className = "proj";
        wrap.appendChild(makeCard(it, kind));
        const hr = document.createElement("hr");
        hr.className = "proj-sep";
        card.appendChild(wrap);
        card.appendChild(hr);
      });
    } else {
      const empty = document.createElement("p");
      empty.className = "muted";
      empty.textContent = L==='es' ? "No hay elementos todavía." : "No items yet.";
      card.appendChild(empty);
    }

    detail.appendChild(card);

    // volver a esferas
    $("#ecosBack")?.addEventListener("click", ()=>{
      clearDetail();
      stage.style.display = "";
      scrollToViewWithOffset(stage, "smooth");
    });
  }

  // === solo manejamos clicks en las esferas; no pintamos nada abajo por defecto
  $$(".sphere-btn", stage).forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const kind = btn.getAttribute("data-kind"); // song | podcast | video
      openKind(kind);
    });
  });

  // aseguramos estado inicial
  stage.style.display = "";
  clearDetail();
}
