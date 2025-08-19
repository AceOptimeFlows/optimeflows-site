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
  "/publicaciones":"publicaciones","/apps":"apps","/proyectos":"proyectos",
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
  if (path === "/apps")         renderApps();
  if (path === "/proyectos")    renderProjects();
  if (path === "/contacto")     setupContactForm();
  if (path === "/about")        setupAbout(true);
  if (path === "/servicios")    renderServicios();
  if (path === "/blog")         setupBlog();          // ← solo local
  if (path === "/actualidad")   renderNews();
  if (path === "/enlaces")      renderLinks();
  if (path === "/buscar")       setupSearch();
  setupVowelOrbit();

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
  $("#year").textContent = new Date().getFullYear();
}

function setLang(lang){
  STATE.lang = lang;
  localStorage.setItem("lang", lang);
  applyI18N();

  STATE.searchIndex = null;
  buildSearchIndex();

  if (STATE.currentRoute === "/publicaciones") renderPublicationsUIRefresh();
  if (STATE.currentRoute === "/apps") renderApps();
  if (STATE.currentRoute === "/proyectos") renderProjects();
  if (STATE.currentRoute === "/about") setupAbout(true);
  if (STATE.currentRoute === "/servicios") renderServicios();
  if (STATE.currentRoute === "/blog") setupBlog();
  if (STATE.currentRoute === "/actualidad") renderNews();
  if (STATE.currentRoute === "/enlaces") renderLinks();
  if (STATE.currentRoute === "/buscar") setupSearch();

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
  // por defecto
  renderPublications("estructuremas");

  // modal (para imagen/video/youtube)
  const closeEls = [$("#modalClose"), $("#modalBackdrop")].filter(Boolean);
  closeEls.forEach(el=> el.addEventListener("click", closeModal));
  window.addEventListener("keydown", (e)=>{ if (e.key==="Escape") closeModal(); });
}

function renderPublications(cat){
  const grid = $("#pubGrid");
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
    // Título NO se traduce (es string)
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

  // PDFs: abrir en pestaña nueva directamente
  if (type === "pdf"){
    if (item.src) window.open(item.src, "_blank", "noopener");
    return;
  }

  // Otros tipos: en modal
  const modal   = $("#mediaModal");
  const body    = $("#modalBody");
  const titleEl = $("#modalTitle");
  const openNew = $("#modalOpenNew");

  titleEl.textContent = item.title || "Media";
  body.innerHTML = "";
  openNew.href = item.src || "#";

  if (type === "gif" || type === "image"){
    const img = document.createElement("img");
    img.src = item.src; img.alt = titleEl.textContent;
    body.appendChild(img);
  } else if (type === "video"){
    const video = document.createElement("video");
    video.controls = true;
    if (item.poster) video.poster = item.poster;
    const src = document.createElement("source");
    src.src = item.src; src.type = "video/mp4";
    video.appendChild(src);
    body.appendChild(video);
  } else if (type === "youtube"){
    const ytId = extractYouTubeId(item.src);
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${ytId}`;
    iframe.allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.allowFullscreen = true;
    body.appendChild(iframe);
  } else {
    // Cualquier otra cosa: abre en pestaña nueva
    if (item.src) window.open(item.src, "_blank", "noopener");
    return;
  }

  modal.classList.add("show");
  modal.setAttribute("aria-hidden","false");
}
function closeModal(){
  const m = $("#mediaModal");
  $("#modalBody").innerHTML="";
  m.classList.remove("show");
  m.setAttribute("aria-hidden","true");
}
function extractYouTubeId(url){
  try{
    const u=new URL(url);
    if(u.hostname.includes("youtu.be")) return u.pathname.slice(1);
    if(u.searchParams.get("v")) return u.searchParams.get("v");
    const m=u.pathname.match(/\/embed\/([^\/\?]+)/);
    if(m) return m[1];
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
function renderServicios(){
  const wrap = $("#servicesList");
  if (!wrap) return;
  wrap.innerHTML = "";
  (I18N[STATE.lang].servicios.items||[]).forEach(s=>{
    const el=document.createElement("article");
    el.className="card";
    el.innerHTML=`<h3>${s.h}</h3><p>${s.p}</p>`;
    wrap.appendChild(el);
  });
}

/* ========= Blog / Diario (solo local) ========= */
function formatDateKey(key){
  const [y,m,d] = key.split("-").map(Number);
  if (STATE.lang==="es"){
    return `${String(d).padStart(2,"0")}/${String(m).padStart(2,"0")}/${y}`;
  }
  const dt = new Date(y, m-1, d);
  return dt.toLocaleDateString("en-US",{month:"short",day:"2-digit",year:"numeric"});
}
function hasAnyEntryLocal(dateKey){
  if (CONTENT.blogEntries?.[dateKey]) return true;
  if (CONTENT.publications?.some(p => p.date === dateKey)) return true;
  // también si el entry trae media/adiciones sin texto
  const e = CONTENT.blogEntries?.[dateKey];
  if (e && (Array.isArray(e.media) || Array.isArray(e.additions))) return true;
  return false;
}
function setupBlog(){
  const head = $("#calHead"), grid = $("#calGrid"), read = $("#dayRead");
  const monthSel = $("#monthSel"), yearSel = $("#yearSel");

  const months = I18N[STATE.lang].blog.monthNames.split(",");
  monthSel.innerHTML = months.map((m,i)=>`<option value="${i}">${m}</option>`).join("");

  const current = new Date();
  let viewMonth = current.getMonth(), viewYear = current.getFullYear();
  monthSel.value = viewMonth;
  const years = Array.from({length:7},(_,k)=>viewYear-3+k);
  yearSel.innerHTML = years.map(y=>`<option value="${y}">${y}</option>`).join("");
  yearSel.value = viewYear;

  function renderCalendar(){
    const first = new Date(viewYear, viewMonth, 1);
    const startIdx = (first.getDay()+6)%7; // lunes=0
    const daysInMonth = new Date(viewYear, viewMonth+1, 0).getDate();
    head.textContent = `${months[viewMonth]} ${viewYear}`;

    const week = I18N[STATE.lang].blog.weekNames.split(",");
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

    // Adiciones:
    // 1) Auto desde publicaciones locales del mismo día
    const todaysPubs = (CONTENT.publications||[])
      .filter(p => p.date === key)
      .map(p => ({ from:'local', id:p.id, title:p.title, cat:p.cat, src:p.src }));

    // 2) Adiciones extra definidas a mano en data.js (opcional)
    const manualAdds = (entryObj.additions||[])
      .map(a => ({ from:'manual', title:a.title||'Archivo', src:a.src||'#', cat:a.cat||'' }));

    const allAdds = [...todaysPubs, ...manualAdds];

    // Media (imágenes/videos) opcional en data.js
    const mediaList = Array.isArray(entryObj.media) ? entryObj.media : [];

    let html = `<h3>${formatDateKey(key)}</h3>`;

    // Bloque de adiciones (al principio)
    if (allAdds.length){
      const catNames = I18N[STATE.lang].pubCats || {};
      const items = allAdds.map(a=>{
        const cat = catNames[a.cat] || a.cat || '';
        if (a.from === 'local'){
          // enlaza a Publicaciones y abre el item
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

    // Galería/media alrededor del texto (si hay)
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
      // solo texto
      html += entryText
        ? `<p>${entryText}</p>`
        : `<p class="muted">${I18N[STATE.lang].blog.empty}</p>`;
    }

    read.innerHTML = html;

    // Enlaces que abren publicaciones del día
    $$('a[data-open-pub]', read).forEach(a=>{
      a.addEventListener('click', (e)=>{
        e.preventDefault();
        STATE.pendingOpenPubId = parseInt(a.getAttribute('data-open-pub'), 10);
        location.hash = "#/publicaciones";
      });
    });
  }

  $("#prevMonth").addEventListener("click", ()=>{
    viewMonth--;
    if (viewMonth<0){ viewMonth=11; viewYear--; yearSel.value=viewYear; }
    monthSel.value=viewMonth;
    renderCalendar();
  });
  $("#nextMonth").addEventListener("click", ()=>{
    viewMonth++;
    if (viewMonth>11){ viewMonth=0; viewYear++; yearSel.value=viewYear; }
    monthSel.value=viewMonth;
    renderCalendar();
  });
  monthSel.addEventListener("change", (e)=>{ viewMonth=+e.target.value; renderCalendar(); });
  yearSel.addEventListener("change",  (e)=>{ viewYear=+e.target.value;  renderCalendar(); });

  renderCalendar();
  $("#blogHint").textContent = I18N[STATE.lang].blog.pick;

  // abrir día desde búsqueda
  window.addEventListener("open-blog-day", (ev)=> openDay(ev.detail), { once:true });
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

  // publicaciones (título string)
  (CONTENT.publications||[]).forEach(p=>{
    idx.push({
      type:"publication",
      id:p.id, route:"/publicaciones", cat:p.cat,
      title:p.title, snippet:(p.desc?.[lang]||"")+" "+(I18N[lang].pubCats?.[p.cat]||""),
      date:p.date||null,
      _t:norm((p.title||"")+" "+(p.desc?.[lang]||"")+" "+p.cat)
    });
  });

  // apps / proyectos
  (CONTENT.apps||[]).forEach(a=>{
    idx.push({type:"app",route:"/apps",title:a.title?.[lang]||"",snippet:a.desc?.[lang]||"",_t:norm((a.title?.[lang]||"")+" "+(a.desc?.[lang]||""))});
  });
  (CONTENT.projects||[]).forEach(p=>{
    idx.push({type:"project",route:"/proyectos",title:p.title?.[lang]||"",snippet:p.desc?.[lang]||"",_t:norm((p.title?.[lang]||"")+" "+(p.desc?.[lang]||""))});
  });

  // blog local (texto)
  Object.entries(CONTENT.blogEntries||{}).forEach(([date,obj])=>{
    const text = obj?.[lang] || obj?.es || "";
    if (text){
      idx.push({type:"blog",route:"/blog",date,title:date,snippet:text.slice(0,180)+"…",_t:norm(date+" "+text)});
    }
  });

  // about + servicios + news + links
  const A=I18N[lang].about||{};
  ["p1","p2","p3","p4","p5","p6","p7","poetic1","poetic2","poetic3"].forEach(k=>{
    const v=A[k]; if(!v)return;
    idx.push({type:"about",route:"/about",title:(k.startsWith("poetic")?"Poético":"Quién soy"),snippet:v.replace(/<[^>]+>/g,"").slice(0,180)+"…",_t:norm(v.replace(/<[^>]+>/g,""))});
  });
  (I18N[lang].servicios?.items||[]).forEach(s=>{
    idx.push({type:"servicios",route:"/servicios",title:s.h,snippet:s.p,_t:norm(s.h+" "+s.p)});
  });
  (CONTENT.news||[]).forEach(n=>{
    const snip = n.body?.[lang] ? n.body[lang].slice(0,180)+"…" : "";
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
        const yBase=from.y+(to.y-from.y?0:0)*tt;
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
  audio=new Audio(); audio.preload="metadata";
  const saved=JSON.parse(localStorage.getItem("player")||"{}");
  currentIndex=saved.index||0;
  audio.volume=saved.volume??0.6;
  $("#volRange").value=audio.volume;
  $("#btnPlay").addEventListener("click", togglePlay);
  $("#btnPrev").addEventListener("click", ()=> changeTrack(-1));
  $("#btnNext").addEventListener("click", ()=> changeTrack(1));
  $("#volRange").addEventListener("input",(e)=>{ audio.volume=+e.target.value; persistPlayer(); });
  $("#playerClose").addEventListener("click", ()=>{ audio.pause(); $("#musicPlayer").style.display="none"; });
  $("#playerMin").addEventListener("click", ()=> $("#musicPlayer").classList.toggle("minimized"));
  buildPlaylist();
  loadTrack(currentIndex);
  audio.addEventListener("ended", ()=> changeTrack(1));
}
function buildPlaylist(){
  const list=$("#playlist"); list.innerHTML="";
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
  $("#trackTitle").textContent = CONTENT.playlist?.[currentIndex]?.title || "Track";
  $("#btnPlay").textContent = audio.paused ? "▶️" : "⏸";
}
function loadTrack(i, autoplay=false){
  const trk=CONTENT.playlist?.[i];
  if(!trk) return;
  audio.src=trk.src;
  $("#trackTitle").textContent=trk.title;
  if(autoplay) audio.play().catch(()=>{});
  updatePlaylistUI();
  persistPlayer();
}
function changeTrack(step){
  currentIndex=(currentIndex+step+CONTENT.playlist.length)%CONTENT.playlist.length;
  loadTrack(currentIndex,true);
}
function togglePlay(){
  if(audio.paused){ audio.play().catch(()=>{}); }
  else { audio.pause(); }
  updatePlaylistUI();
}
function persistPlayer(){
  localStorage.setItem("player", JSON.stringify({index:currentIndex,volume:audio.volume}));
}

/* ========= Boot ========= */
document.addEventListener("DOMContentLoaded", ()=>{
  $("#year").textContent = new Date().getFullYear();
  $("#langSelect").value = STATE.lang;
  $("#langSelect").addEventListener("change",(e)=> setLang(e.target.value));
  applyI18N();
  setupNav();
  handleHash();
  setupPlayer();
  buildSearchIndex();
});
