/* ================================
   I18N — Textos por idioma (igual que ya tenías)
   ================================ */
window.I18N = {
  es: {
    menu: {
      home: "¿Qué es OptimeFlow(s)?",
      servicios: "Servicios",
      about: "¿Quién soy?",
      blog: "Diario",
      publicaciones: "Publicaciones",
      apps: "Apps y desarrollos",
      ecos: "Ecos",
      proyectos: "Proyectos",
      contacto: "Contacto",
      redes: "Redes",
      buscar: "Buscar",
      actualidad: "Actualidad",
      enlaces: "Enlaces"
    },
    hero: { subtitle: "No hay elementos en esta categoría todavía." },
    pubCats: { estructuremas: "Estructuremas", ensayos: "Ensayos", estudios: "Estudios", marco: "Obras" },
    contact: {
      nameLabel: "Nombre",
      emailLabel: "Email",
      messageLabel: "Mensaje",
      send: "Enviar",
      phName: "Tu nombre",
      phEmail: "tu@correo.com",
      phMessage: "Escribe tu mensaje..."
    },
    ui: { openNew: "Abrir en pestaña nueva" },
    blog: {
      monthNames: "Enero,Febrero,Marzo,Abril,Mayo,Junio,Julio,Agosto,Septiembre,Octubre,Noviembre,Diciembre",
      weekNames: "Lun,Mar,Mié,Jue,Vie,Sáb,Dom",
      pick: "Elige un día del calendario para leer lo escrito.",
      additionsTitle: "Adiciones del día:",
      additionsPub: "Añadida publicación en {cat} — {title}",
      empty: "No hay entrada para este día."
    },
    servicios: {
      items: [
        { h: "Consultoría", p: "Diagnóstico y hoja de ruta: procesos, datos, herramientas." },
        { h: "Mentoría", p: "Sesiones 1:1 para foco, método y progreso sostenido." },
        { h: "Coaching", p: "Claridad personal y profesional con acción concreta." },
        { h: "Automatización", p: "Google Apps Script, Python, JavaScript; reportes y workflows." }
      ]
    },
    search: {
      placeholder: "Busca en toda la web…",
      noresults: "Sin resultados.",
      group: {
        publication: "Publicaciones", blog: "Diario", app: "Apps", project: "Proyectos",
        about: "¿Quién soy?", servicios: "Servicios", news: "Actualidad", link: "Enlaces"
      }
    },
    news: { empty: "Aún no hay noticias." }
  },
  en: {
    menu: {
      home: "What is OptimeFlow(s)?",
      servicios: "Services",
      about: "About me",
      blog: "Blog",
      publicaciones: "Publications",
      apps: "Apps & builds",
      ecos: "Echoes",
      proyectos: "Projects",
      contacto: "Contact",
      redes: "Social",
      buscar: "Search",
      actualidad: "News",
      enlaces: "Links"
    },
    hero: { subtitle: "No items in this category yet." },
    pubCats: { estructuremas: "Estructuremas", ensayos: "Essays", estudios: "Studies", marco: "Obras" },
    contact: {
      nameLabel: "Name",
      emailLabel: "Email",
      messageLabel: "Message",
      send: "Send",
      phName: "Your name",
      phEmail: "you@email.com",
      phMessage: "Type your message..."
    },
    ui: { openNew: "Open in new tab" },
    blog: {
      monthNames: "January,February,March,April,May,June,July,August,September,October,November,December",
      weekNames: "Mon,Tue,Wed,Thu,Fri,Sat,Sun",
      pick: "Pick a day in the calendar to read the entry.",
      additionsTitle: "Additions of the day:",
      additionsPub: "Added publication in {cat} — {title}",
      empty: "No entry for this day."
    },
    servicios: {
      items: [
        { h: "Consulting", p: "Diagnosis and roadmap: processes, data, tools." },
        { h: "Mentorship", p: "1:1 sessions for focus, method and sustained progress." },
        { h: "Coaching", p: "Personal/professional clarity with concrete action." },
        { h: "Automation", p: "Apps Script, Python, JavaScript; reports and workflows." }
      ]
    },
    search: {
      placeholder: "Search the whole site…",
      noresults: "No results.",
      group: {
        publication: "Publications", blog: "Blog", app: "Apps", project: "Projects",
        about: "About me", servicios: "Services", news: "News", link: "Links"
      }
    },
    news: { empty: "No news yet." }
  }
};

/* ================================
   CONTENIDO LOCAL
   ================================ */
window.CONTENT = {

  /* ====== Política de tarifas global ====== */
  ratecard: {
    notes: {
      es: "Precios sin IVA. Trabajo remoto (viajes/gastos aparte si aplica). Incluye 7 días de soporte post-entrega.",
      en: "Prices excl. VAT. Remote work (travel/expenses extra if applicable). Includes 7 days post-delivery support."
    },
    segments: [
      { key: "freelancers", title: {es:"Autónomos/Emprendedores", en:"Freelancers/Solo"}, hour:"55 €", day:"420 €" },
      { key: "sme", title: {es:"PYMES", en:"SMEs"}, hour:"65 €", day:"520 €" },
      { key: "enterprise", title: {es:"Grandes empresas", en:"Enterprises"}, hour:"85 €", day:"680 €" }
    ],
    modifiers: [
      { title:{es:"Urgencia (<72 h)", en:"Rush (<72 h)"}, value:"+20%" },
      { title:{es:"Compromiso 3+ meses (retainer)", en:"3+ months commitment (retainer)"}, value:"-10%" },
      { title:{es:"ONG / Educación", en:"NGO / Education"}, value:"-15%" }
    ]
  },

  /* ====== Servicios individuales enriquecidos ====== */
  services: [
    {
      key: "consultoria",
      icon: "⚙️",
        title: { 
                es: '<span class="fx-fluor">Consultoría en Automatización y Optimización de Procesos</span>', 
                en: '<span class="fx-fluor">Automation & Process Optimization Consulting</span>' 
              },
      tagline: { 
                es: '<span class="vowel-bounce">Gana tiempo, reduce errores, escala con método.</span>', 
                en: '<span class="vowel-bounce">Save time, cut errors, scale with method.</span>' 
              },
      detail: {
        blocks: [
          { type:"p", html:{ es:"En un mundo cada vez más competitivo, donde el tiempo se ha convertido en el recurso más valioso para personas y organizaciones, la eficiencia ya no es una opción: es una necesidad. Cada minuto cuenta, y la manera en que se gestionan los procesos internos puede marcar la diferencia entre una empresa que se estanca y otra que avanza con solidez hacia sus objetivos.", en:"In a world where time is the most valuable resource, efficiency makes the difference." }},
          
          { type:"p", html:{ es:'<span class="highlightverd">Mi propuesta de valor consiste en:</span>', en:'<span class="highlight">My value proposition:</span>' } },
          
          { type:"p", html:{ es:'<span class="mas-peqverd">*Identificar con precisión los cuellos de botella operativos.</span>', en:'<span class="mas-peqverd">*Identify bottlenecks with precision.</span>' } },
          { type:"p", html:{ es:'<span class="mas-peqverd">*Analizar cómo fluyen las tareas en el día a día.</span>', en:'<span class="mas-peqverd">*Analyze how tasks flow daily.</span>' } },
          { type:"img", float:"right", src:"assets/img/crm2.jpg", alt:{es:"Todo(s) en un mismo sitio🌍",en:"All-in-one place"}, caption:{es:"Todo(s) en un mismo sitio🌍",en:"All-in-one place"} },
          { type:"p", html:{ es:'<span class="mas-peqverd">*Diseñar soluciones a medida para optimizar cada etapa del proceso.</span>', en:'<span class="mas-peqverd">*Design tailored solutions for each stage.</span>' } },
          { type:"p", html:{ es:'<span class="mas-peqverd">*Automatizar reportes, integrar sistemas y estandarizar rutinas repetitivas.</span>', en:'<span class="mas-peqverd">*Automate reports, integrate systems, and standardize routines.</span>' } },
          { type:"p", html:{ es:'<span class="mas-peqverd">*Integrar tecnologías como Google Apps Script, Python, Power Automate, Zapier o Make para crear flujos de trabajo ágiles, conectados y escalables.</span>', en:'<span class="mas-peqverd">*Integrate tools like Apps Script, Python, Power Automate, Zapier, Make for agile workflows.</span>' } },
          { type:"p", html:{ es:'<span class="mas-peqverd">*Enseñar al equipo a usar la Inteligencia Artificial para lograr resultados que antes parecían imposibles.</span>', en:'<span class="mas-peqverd">*Teach teams to leverage AI for impossible results.</span>' } },
         /*{ type:"img", float:"right", src:"assets/img/kpis.jpg", alt:{es:"Dashboard en tiempo real",en:"Realtime dashboard"}, caption:{es:"KPIs claros para decidir",en:"Clear KPIs for decisions"}},*/
          { type:"p", html:{ es: "Mi objetivo es reducir costes, ganar agilidad y liberar tiempo de los equipos para que puedan participar y enfocarse en tareas estratégicas de mayor impacto.", en:"My goal is to reduce costs, increase agility, and free up teams’ time so they can focus on high-impact strategic tasks."}}
        ],
        includes: [
          { es:"Análisis personalizado de procesos", en:"Personalized process analysis" },
          { es:"Diseño de soluciones a medida", en:"Tailored solution design" },
          { es:"Implementación guiada y acompañamiento", en:"Guided implementation & support" }
        ],
        benefits: [
          { es:"Ahorro de tiempo y recursos", en:"Save time and resources" },
          { es:"Escalabilidad sin costes ocultos", en:"Scalability without hidden costs" }
        ]
      },
      pricing: [
        { title:{es:"Diagnóstico Express (1 semana)", en:"Express Diagnostic (1 week)"}, price:{es:"650 €", en:"€650"}, period:{es:"one-off", en:"one-off"}, features:[{es:"Entrevistas y mapa AS-IS", en:"Interviews & AS-IS map"}, {es:"3 mejoras priorizadas", en:"3 prioritized improvements"}] },
        { title:{es:"Roadmap Operativo (2–3 semanas)", en:"Operational Roadmap (2–3 weeks)"}, price:{es:"1.900 €", en:"€1,900"}, period:{es:"proyecto", en:"project"}, features:[{es:"Blueprint AS-IS → TO-BE", en:"AS-IS → TO-BE blueprint"}, {es:"Plan por sprints e impacto", en:"Sprint plan & impact"}] },
        { title:{es:"Sprint de Implementación (2 semanas)", en:"Implementation Sprint (2 weeks)"}, price:{es:"1.800 €", en:"€1,800"}, period:{es:"proyecto", en:"project"}, features:[{es:"1–2 automatizaciones listas", en:"1–2 automations ready"}, {es:"Dashboard básico + handover", en:"Basic dashboard + handover"}] }
      ]
    },

    /* === Comunicación estructurada === */
    {
      key: "comunicacion",
      icon: "💬",
      title: { 
            es: '<span class="fx-fluor">Comunicación estructurada (Focus group evolutivo)</span>', 
            en: '<span class="fx-fluor">Structured Communication (Evolving Focus Groups)</span>' 
            },
      tagline: { 
              es: '<span class="vowel-bounce">De la queja a la propuesta, de la dispersión al flujo común.</span>', 
              en: '<span class="vowel-bounce">From complaints to proposals, from noise to flow.</span>' 
      },
      detail: {
        blocks: [
          { type:"p", html:{ es:"En muchas organizaciones, la comunicación interna se llena de quejas, malentendidos o comentarios dispersos que rara vez se transforman en mejoras reales. La clave no es callar, sino convertir esas voces en comunicación clara y accionable.", en:"In many organizations, internal communication gets filled with complaints or scattered comments that rarely turn into real improvements. The key is not silencing them, but transforming them into clear and actionable communication." }},
          { type:"img", float:"right", src:"assets/img/teambuild1.jpg", alt:{es:"Personas dialogando",en:"People in dialogue"}, caption:{es:"De la queja a la propuesta",en:"From complaint to proposal"}},
          { type:"p", html:{ es:'<span class="highlightverd">Mi propuesta de valor consiste en:</span>', en:'<span class="highlight">My value proposition:</span>' } },
          { type:"p", html:{ es:'<span class="mas-peqverd">*Crear espacios guiados donde las ideas y tensiones se transforman en propuestas claras.</span>', en:'<span class="mas-peqverd">*Create guided spaces where ideas and tensions turn into clear proposals.</span>' } },
          { type:"p", html:{ es:'<span class="mas-peqverd">*Facilitar dinámicas que convierten la dispersión en información útil.</span>', en:'<span class="mas-peqverd">*Facilitate dynamics that turn noise into useful insights.</span>' } },
          { type:"p", html:{ es:'<span class="mas-peqverd">*Documentar lo que emerge y generar insights para decisiones estratégicas.</span>', en:'<span class="mas-peqverd">*Document what emerges and generate insights for strategic decisions.</span>' } },
          { type:"p", html:{ es:'<span class="mas-peqverd">*Fomentar un clima de confianza donde todos puedan expresar orientados a soluciones.</span>', en:'<span class="mas-peqverd">*Foster a climate of trust focused on solutions.</span>' } }
        ],
        includes: [
          { es:"Insights claros y estructurados", en:"Clear and structured insights" },
          { es:"Propuestas accionables", en:"Actionable proposals" },
          { es:"Dinámicas de confianza y escucha", en:"Trust and listening dynamics" }
        ],
        benefits: [
          { es:"Transformación del ruido en valor organizacional", en:"Turn noise into organizational value" },
          { es:"Mayor alineación interna y menos conflictos", en:"Greater internal alignment and fewer conflicts" }
        ]
      },
      pricing: [
        { title:{es:"Sesión única (3 h + informe)", en:"Single session (3 h + report)"}, price:{es:"650 €", en:"€650"}, period:{es:"one-off", en:"one-off"}, features:[{es:"Facilitación + síntesis", en:"Facilitation + synthesis"}, {es:"Propuestas accionables", en:"Actionable proposals"}] },
        { title:{es:"Ciclo 1 mes (4 sesiones)", en:"1-month cycle (4 sessions)"}, price:{es:"2.200 €", en:"€2,200"}, period:{es:"mensual", en:"monthly"}, features:[{es:"Mapa de tensiones → propuestas", en:"Tensions map → proposals"}, {es:"Plan corto de comunicación", en:"Short comms plan"}] },
        { title:{es:"Programa 3 meses", en:"3-month program"}, price:{es:"5.400 €", en:"€5,400"}, period:{es:"trimestral", en:"quarterly"}, features:[{es:"Sesiones quincenales", en:"Bi-weekly sessions"}, {es:"Prácticas y métricas de comunicación", en:"Practices & comms metrics"}] }
      ]
    },

    /* === Cohesión progresiva de equipos === */
    {
      key: "cohesion",
      icon: "🤝",
      title: { 
            es: '<span class="fx-fluor">Cohesión progresiva de equipos (Team building extendido)</span>', 
            en: '<span class="fx-fluor">Progressive Team Cohesion (Extended Team Building)</span>' 
      },
      tagline: { 
            es: '<span class="vowel-bounce">Construir equipo en cada paso, no en un solo día.</span>', 
            en: '<span class="vowel-bounce">Build teams step by step, not just in one day.</span>' 
      },
      detail: {
        blocks: [
          { type:"p", html:{ es:"Los equipos no se construyen en un solo día de actividades recreativas, sino con prácticas constantes y progresivas. Este modelo de team building extendido acompaña al equipo dentro de su rutina real.", en:"Teams are not built in a single day of recreational activities, but through constant and progressive practices. This extended team building model integrates into real routines." }},
          { type:"img", float:"right", src:"assets/img/teambuild2.jpg", alt:{es:"Equipo colaborando",en:"Team collaborating"}, caption:{es:"Construir equipo en cada paso",en:"Build teams step by step"}},
          { type:"p", html:{ es:'<span class="highlightverd">Mi propuesta de valor consiste en:</span>', en:'<span class="highlight">My value proposition:</span>' } },
          { type:"p", html:{ es:'<span class="mas-peqverd">*Diseñar pequeños ejercicios mensuales que refuercen confianza y colaboración.</span>', en:'<span class="mas-peqverd">*Design small monthly exercises that build trust and collaboration.</span>' } },
          { type:"p", html:{ es:'<span class="mas-peqverd">*Integrar dinámicas prácticas en proyectos y tareas reales.</span>', en:'<span class="mas-peqverd">*Integrate practical dynamics into real projects and tasks.</span>' } },
         /*{ type:"img", float:"right", src:"assets/img/teambuild2.jpg", alt:{es:"Equipo colaborando",en:"Team collaborating"}, caption:{es:"Construir equipo en cada paso",en:"Build teams step by step"}},*/
          { type:"p", html:{ es:'<span class="mas-peqverd">*Acompañar al equipo en paralelo a los objetivos de la empresa.</span>', en:'<span class="mas-peqverd">*Accompany the team alongside company objectives.</span>' } },
          { type:"p", html:{ es:'<span class="mas-peqverd">*Promover que cada persona reconozca su valor en el flujo común.</span>', en:'<span class="mas-peqverd">*Encourage each member to recognize their value in the shared flow.</span>' } }
        ],
        includes: [
          { es:"Ejercicios prácticos y recurrentes", en:"Practical and recurring exercises" },
          { es:"Acompañamiento progresivo", en:"Progressive guidance" },
          { es:"Herramientas para cohesión sostenida", en:"Tools for sustained cohesion" }
        ],
        benefits: [
          { es:"Equipos más unidos y resilientes", en:"Stronger and more resilient teams" },
          { es:"Menos rotación y más motivación", en:"Lower turnover and higher motivation" }
        ]
      },
      pricing: [
        { title:{es:"Kick-off (½ día + follow-up)", en:"Kick-off (½ day + follow-up)"}, price:{es:"1.200 €", en:"€1,200"}, period:{es:"one-off", en:"one-off"}, features:[{es:"Taller base", en:"Base workshop"}, {es:"Revisión a 2 semanas", en:"2-week follow-up"}] },
        { title:{es:"Programa 8 semanas", en:"8-week program"}, price:{es:"3.800 €", en:"€3,800"}, period:{es:"programa", en:"program"}, features:[{es:"Ejercicios semanales", en:"Weekly exercises"}, {es:"Rituales y tablero de equipo", en:"Rituals & team board"}] },
        { title:{es:"Programa 12 semanas", en:"12-week program"}, price:{es:"5.400 €", en:"€5,400"}, period:{es:"programa", en:"program"}, features:[{es:"Todo lo anterior + proyecto transversal", en:"All above + cross-team project"}] }
      ]
    },

    /* === Formación en Automatización con IA (mantengo key 'zapier' por compatibilidad) === */
    {
      key: "zapier",
      icon:"🎓",
      title: { 
              es: '<span class="fx-fluorblue">Formación en Automatización con IA</span>', 
              en: '<span class="fx-fluorblue">Automation Training with AI</span>' 
            },
            tagline: { 
              es: '<span class="vowel-bounce">Aprende a crear tus propios flujos paso a paso.</span>', 
              en: '<span class="vowel-bounce">Learn to build your own flows, step by step.</span>' 
            },
      detail: {
        blocks: [
          { type:"p", html:{
            es:"Te enseño a **automatizar tu trabajo** con las herramientas que ya usas (Workspace, hojas, correo, calendarios, notas/kanban) y con **IA** para que, con tiempo y práctica, puedas lograr por ti mismo lo que suelo construir para clientes.",
            en:"I teach you to **automate your work** using the tools you already use (Workspace, sheets, email, calendars, notes/kanban) plus **AI**, so with time and practice you can build by yourself what I usually deliver for clients."
          }},
          { type:"img", float:"right", src:"assets/img/usaria1.jpg",
            alt:{ es:"Formación práctica en automatización con IA", en:"Hands-on automation training with AI" },
            caption:{ es:"Aprender haciendo, con tus casos reales", en:"Learn by doing, on your real cases" }
          },
          { type:"p", html:{ es:'<span class="highlightblue">Mi propuesta de valor consiste en:</span>', en:'<span class="highlight">My value proposition:</span>' } },
          { type:"p", html:{ es:'<span class="mas-peqblue">*Diagnóstico inicial: mapa de tareas repetitivas y objetivos personales.</span>', en:'<span class="mas-peqverd">*Initial assessment: map repetitive tasks and personal goals.</span>' } },
          { type:"p", html:{ es:'<span class="mas-peqblue">*Itinerario por niveles (cero → básico → intermedio) con hitos claros.</span>', en:'<span class="mas-peqverd">*Level-based path (zero → basic → intermediate) with clear milestones.</span>' } },
          { type:"p", html:{ es:'<span class="mas-peqblue">*Uso práctico de herramientas + IA: prompts efectivos, copilots y agentes.</span>', en:'<span class="mas-peqverd">*Practical tools + AI: effective prompts, copilots and agents.</span>' } },
          { type:"p", html:{ es:'<span class="mas-peqblue">*Tu primer proyecto real: reportes, emails, agenda o gestión de clientes.</span>', en:'<span class="mas-peqverd">*Your first real project: reports, emails, agenda or simple CRM.</span>' } },
          { type:"p", html:{ es:'<span class="mas-peqblue">*Hábitos y sistema: plantillas, checklists y tablero de progreso.</span>', en:'<span class="mas-peqverd">*Habits & system: templates, checklists and a progress board.</span>' } },
          { type:"p", html:{ es:'<span class="mas-peqblue">*Criterio: cuándo automatizar (y cuándo no), privacidad y riesgos.</span>', en:'<span class="mas-peqverd">*Judgement: when to automate (and when not), privacy and risk.</span>' } }
        ],
        includes: [
          { es:"Plan personal de aprendizaje por niveles", en:"Personal level-based learning plan" },
          { es:"Prompts, plantillas y snippets reutilizables", en:"Reusable prompts, templates and snippets" },
          { es:"Proyecto guiado con revisión", en:"Guided project with review" }
        ],
        benefits: [
          { es:"Autonomía real para seguir creando", en:"Real autonomy to keep building" },
          { es:"Ahorro de horas/semana desde el primer mes", en:"Hours saved/week from month one" },
          { es:"Sistema replicable y documentado", en:"Replicable, documented system" }
        ]
      },
      pricing: [
        { title:{es:"1:1 Pack 4 sesiones (60′)", en:"1:1 Pack 4 sessions (60′)"}, price:{es:"380 €", en:"€380"}, period:{es:"pack", en:"pack"}, features:[{es:"Itinerario por niveles", en:"Level-based pathway"}, {es:"Primer flujo real", en:"First real flow"}] },
        { title:{es:"Taller grupo (8–12 pers., 8 h)", en:"Group workshop (8–12 ppl, 8 h)"}, price:{es:"1.600 €", en:"€1,600"}, period:{es:"taller", en:"workshop"}, features:[{es:"Casos de la empresa", en:"Company cases"}, {es:"Materiales y grabaciones", en:"Materials & recordings"}] },
        { title:{es:"In-company 4 semanas", en:"In-company 4 weeks"}, price:{es:"2.400 €", en:"€2,400"}, period:{es:"programa", en:"program"}, features:[{es:"4 módulos + proyecto guiado", en:"4 modules + guided project"}, {es:"Revisión final", en:"Final review"}] }
      ]
    },

    /* === Mentoría === */
    {
      key: "mentoria",
      icon:"🧑‍🏫",
      title: { 
              es: '<span class="fx-fluorblue">Mentoría 1:1 para progreso sostenido</span>', 
              en: '<span class="fx-fluorblue">1:1 Mentorship for sustained progress</span>' 
            },
            tagline: { 
              es: '<span class="vowel-bounce">Foco, método y seguimiento que no te suelta.</span>', 
              en: '<span class="vowel-bounce">Focus, method and steady follow-up.</span>' 
            },
      detail: {
        blocks: [
          { type:"p", html:{
            es:"Sesiones 1:1 para **ordenar ideas, elegir prioridades y avanzar** con un sistema simple. Trabajamos con tus proyectos reales y te acompaño entre sesiones para que el impulso no se pierda.",
            en:"1:1 sessions to **organize ideas, choose priorities and move forward** with a simple system. We work on your real projects and I support you between sessions so the momentum stays."
          }},
          { type:"img", float:"right", src:"assets/img/mentor2.jpg",
            alt:{ es:"Sesión de mentoría 1:1", en:"1:1 mentorship session" },
            caption:{ es:"Del ruido al plan", en:"From noise to plan" }
          },
          { type:"p", html:{ es:'<span class="highlightblue">Mi propuesta de valor consiste en:</span>', en:'<span class="highlight">My value proposition:</span>' } },
          { type:"p", html:{ es:'<span class="mas-peqblue">*Clarificar objetivos y definir resultados medibles.</span>', en:'<span class="mas-peqverd">*Clarify objectives and define measurable outcomes.</span>' } },
          { type:"p", html:{ es:'<span class="mas-peqblue">*Diseñar un sistema semanal: rituales, bloques de trabajo y revisión.</span>', en:'<span class="mas-peqverd">*Design a weekly system: rituals, work blocks and review.</span>' } },
          { type:"p", html:{ es:'<span class="mas-peqblue">*Acompañamiento entre sesiones con tareas concretas y feedback.</span>', en:'<span class="mas-peqverd">*Between-session support with concrete tasks and feedback.</span>' } },
          { type:"p", html:{ es:'<span class="mas-peqblue">*Herramientas ligeras para organizarte (tablero, checklist, agenda).</span>', en:'<span class="mas-peqverd">*Lightweight tools to organize (board, checklist, agenda).</span>' } }
        ],
        includes: [
          { es:"Plan de 4 u 8 semanas", en:"4- or 8-week plan" },
          { es:"Sesiones 1:1 (online)", en:"1:1 sessions (online)" },
          { es:"Materiales y seguimiento asíncrono", en:"Materials and async follow-up" }
        ],
        benefits: [
          { es:"Más foco y avance visible", en:"More focus and visible progress" },
          { es:"Hábitos sostenibles sin fricción", en:"Sustainable, low-friction habits" }
        ]
      },
      pricing: [
        { title:{es:"Plan 4 semanas (4×60′)", en:"4-week plan (4×60′)"}, price:{es:"240 €", en:"€240"}, period:{es:"plan", en:"plan"}, features:[{es:"Sesión semanal", en:"Weekly session"}, {es:"Seguimiento asíncrono", en:"Async follow-up"}] },
        { title:{es:"Plan 8 semanas (8×60′)", en:"8-week plan (8×60′)"}, price:{es:"440 €", en:"€440"}, period:{es:"plan", en:"plan"}, features:[{es:"Sistema y hábitos", en:"System & habits"}] },
        { title:{es:"Sesión suelta (60′)", en:"Single session (60′)"}, price:{es:"75 €", en:"€75"}, period:{es:"sesión", en:"session"}, features:[{es:"Objetivo concreto", en:"Concrete objective"}] }
      ]
    },

    /* === Coaching === */
    {
      key: "coaching",
      icon:"🧭",
      title: { 
              es: '<span class="fx-fluorblue">Coaching de claridad y acción</span>', 
              en: '<span class="fx-fluorblue">Clarity & Action Coaching</span>' 
            },
            tagline: { 
              es: '<span class="vowel-bounce">Coherencia personal-profesional y decisiones con sentido.</span>', 
              en: '<span class="vowel-bounce">Personal–professional coherence and meaningful decisions.</span>' 
            },
      detail: {
        blocks: [
          { type:"p", html:{
            es:"Espacio seguro para **ganar claridad**, alinear lo personal con lo profesional y convertirlo en **acciones pequeñas** que sostengan el cambio. Sin recetas: preguntas, escucha y ejercicios prácticos.",
            en:"A safe space to **gain clarity**, align the personal with the professional, and turn it into **small actions** that sustain change. No recipes: questions, listening, and practical exercises."
          }},
          { type:"img", float:"right", src:"assets/img/coach1.jpg",
            alt:{ es:"Sesión de coaching", en:"Coaching session" },
            caption:{ es:"Claridad que se mueve", en:"Clarity in motion" }
          },
          { type:"p", html:{ es:'<span class="highlightblue">Mi propuesta de valor consiste en:</span>', en:'<span class="highlight">My value proposition:</span>' } },
          { type:"p", html:{ es:'<span class="mas-peqblue">*Explorar bloqueos y necesidades reales (no supuestas).</span>', en:'<span class="mas-peqverd">*Explore real (not assumed) blockers and needs.</span>' } },
          { type:"p", html:{ es:'<span class="mas-peqblue">*Definir micro-decisiones y compromisos alcanzables.</span>', en:'<span class="mas-peqverd">*Define micro-decisions and achievable commitments.</span>' } },
          { type:"p", html:{ es:'<span class="mas-peqblue">*Ejercicios breves de autoconocimiento y comunicación.</span>', en:'<span class="mas-peqverd">*Brief self-knowledge and communication exercises.</span>' } },
          { type:"p", html:{ es:'<span class="mas-peqblue">*Revisión de avances y ajuste continuo.</span>', en:'<span class="mas-peqverd">*Progress review and continuous adjustment.</span>' } }
        ],
        includes: [
          { es:"Sesiones 1:1 (online)", en:"1:1 sessions (online)" },
          { es:"Ejercicios y bitácora personal", en:"Exercises and personal logbook" },
          { es:"Plan de acción simple", en:"Simple action plan" }
        ],
        benefits: [
          { es:"Más claridad y decisiones mejores", en:"More clarity and better decisions" },
          { es:"Energía y confianza renovadas", en:"Renewed energy and confidence" }
        ]
      },
      pricing: [
        { title:{es:"Pack 4 sesiones (60′)", en:"Pack 4 sessions (60′)"}, price:{es:"220 €", en:"€220"}, period:{es:"pack", en:"pack"}, features:[{es:"Objetivo claro", en:"Clear objective"}] },
        { title:{es:"Pack 8 sesiones (60′)", en:"Pack 8 sessions (60′)"}, price:{es:"400 €", en:"€400"}, period:{es:"pack", en:"pack"}, features:[{es:"Cambio sostenido", en:"Sustained change"}] },
        { title:{es:"Sesión suelta (60′)", en:"Single session (60′)"}, price:{es:"65 €", en:"€65"}, period:{es:"sesión", en:"session"}, features:[{es:"Paso inmediato", en:"Immediate step"}] }
      ]
    },

    /* === Automatización (implementación ligera) === */
    {
      key: "automatizacion",
      icon:"⚡",
      title: { 
              es: '<span class="fx-fluorblue">Automatización ligera para tu día a día</span>', 
              en: '<span class="fx-fluorblue">Lightweight automation for your daily work</span>' 
            },
            tagline: { 
              es: '<span class="vowel-bounce">Pequeños robots que ahorran horas y errores.</span>', 
              en: '<span class="vowel-bounce">Small bots that save hours and errors.</span>' 
            },
      detail: {
        blocks: [
          { type:"p", html:{
            es:"Implemento automatizaciones **concretas y útiles** para tu actividad: correos, recordatorios, documentos, plantillas, tableros y reportes que se generan solos. Empezamos por lo esencial: **lo que más te consume tiempo**.",
            en:"I implement **concrete, useful** automations for your work: emails, reminders, documents, templates, boards and reports that run by themselves. We start with the essential: **your biggest time sinks**."
          }},
          { type:"img", float:"right", src:"assets/img/robot1.jpg",
            alt:{ es:"Automatización práctica para autónomos", en:"Practical automation for freelancers" },
            caption:{ es:"De lo manual a lo fluido", en:"From manual to fluid" }
          },
          { type:"p", html:{ es:'<span class="highlightblue">Mi propuesta de valor consiste en:</span>', en:'<span class="highlight">My value proposition:</span>' } },
          { type:"p", html:{ es:'<span class="mas-peqblue">*Detectar tareas repetitivas y priorizar 2–3 automatizaciones de impacto.</span>', en:'<span class="mas-peqverd">*Identify repetitive tasks and prioritize 2–3 high-impact automations.</span>' } },
          { type:"p", html:{ es:'<span class="mas-peqblue">*Crear scripts, conectores o flujos simples (Apps Script, pequeñas integraciones).</span>', en:'<span class="mas-peqverd">*Build simple scripts, connectors or flows (Apps Script, small integrations).</span>' } },
          { type:"p", html:{ es:'<span class="mas-peqblue">*Configurar dashboards, plantillas y avisos automáticos.</span>', en:'<span class="mas-peqverd">*Configure dashboards, templates and automatic alerts.</span>' } },
          { type:"p", html:{ es:'<span class="mas-peqblue">*Documentar y dejarlo listo para que sigas sin depender.</span>', en:'<span class="mas-peqverd">*Document and hand it over so you’re independent.</span>' } }
        ],
        includes: [
          { es:"2–3 automatizaciones listas para usar", en:"2–3 ready-to-use automations" },
          { es:"Onboarding y materiales de uso", en:"Onboarding and how-to materials" },
          { es:"Documentación y soporte inicial", en:"Documentation and initial support" }
        ],
        benefits: [
          { es:"Ahorro de horas/semana y menos errores", en:"Hours saved/week and fewer errors" },
          { es:"Más orden y foco en lo importante", en:"More order and focus on what matters" }
        ]
      },
      pricing: [
        { title:{es:"Mini-auto (1 flujo sencillo)", en:"Mini-auto (1 simple flow)"}, price:{es:"300 €", en:"€300"}, period:{es:"one-off", en:"one-off"}, features:[{es:"Doc+email/recordatorio", en:"Doc+email/reminder"}] },
        { title:{es:"Pack 3 automatizaciones", en:"Pack 3 automations"}, price:{es:"750 €", en:"€750"}, period:{es:"pack", en:"pack"}, features:[{es:"Top 3 tareas repetitivas", en:"Top 3 repetitive tasks"}] },
        { title:{es:"Setup esencial", en:"Essential setup"}, price:{es:"1.200 €", en:"€1,200"}, period:{es:"proyecto", en:"project"}, features:[{es:"3–5 flujos + plantillas + tablero", en:"3–5 flows + templates + board"}] }
      ]
    }
  ],

  /* ====== Grupos de servicios por segmento ====== */
  serviceGroups: [
    {
      key: "corporativos",
      title: { 
              es: '<span class="fx-fluor" style="font-size:1.6rem;">Servicios para grandes empresas</span>', 
              en: '<span class="fx-fluor">Services for large companies</span>' 
            },
            subtitle: { 
              es: '<span class="vowel-bounce">Escalabilidad, integración y eficiencia global.</span>', 
              en: '<span class="vowel-bounce">Scalability, integration and global efficiency.</span>' 
            },
      items: [
        { ref: "consultoria" }, // usa el servicio enriquecido de arriba
        {
          key: "crm",
          icon: "📊",
          title: { 
                  es: '<span class="fx-fluor">Implementación y Optimización de CRM</span>', 
                  en: '<span class="fx-fluor">CRM Implementation & Optimization</span>' 
                },
                tagline: { 
                  es: '<span class="vowel-bounce">Haz de tu CRM la base para escalar ventas y soporte.</span>', 
                  en: '<span class="vowel-bounce">Turn your CRM into the base to scale sales & support.</span>' 
                },

          detail: {
            blocks: [
              { type:"p", html:{ es:"Un CRM no es solo un gestor de contactos: es el núcleo de tu negocio. A la hora de elegir, tienes dos caminos:", en:"A CRM is not just a contact manager: it’s the core of your business." } },
              { type:"img", float:"right", src:"assets/img/crm1.jpg", alt:{es:"Comprender y Razonar Menos (CRM)",en:"Automation in action"}, caption:{es:"(CRM) Comprender=Razonar Menos",en:"Reports automation"} },
              { type:"p", html:{ es:'<span class="highlightverd">1. CRM "estándar" (Salesforce, HubSpot, Zoho, Pipedrive, etc.)</span>', en:'<span class="highlight">Standard CRM (Salesforce, HubSpot, Zoho, Pipedrive, etc.)</span>' } },
              { type:"p", html:{ es:'<span class="mas-peqverd">*Soluciones robustas y con ecosistema propio.</span>', en:'<span class="mas-peqverd">*Robust solutions with their own ecosystem.</span>' } },
              { type:"p", html:{ es:'<span class="mas-peqverd">*Implantación rápida y soporte especializado.</span>', en:'<span class="mas-peqverd">*Fast implementation and specialized support.</span>' } },
              { type:"p", html:{ es:'<span class="mas-peqverd">*Escalables y con integraciones predefinidas.</span>', en:'<span class="mas-peqyel">*Scalable and with predefined integrations.</span>' } },
              { type:"p", html:{ es:'<span class="mas-peqverd">*Curva de aprendizaje más alta. Hay que adaptarse a la herramienta.</span>', en:'<span class="mas-peqroj">*Higher learning curve; the team adapts to the tool.</span>' } },
              { type:"p", html:{ es:'<span class="mas-peqverd">*Coste en licencias y menor flexibilidad de personalización.</span>', en:'<span class="mas-peqroj">*Higher licensing cost and less customization flexibility.</span>' } },
              
              { type:"p", html:{ es:'<span class="highlightverd">2. CRM a medida (sobre Google Workspace o con desarrollo propio)</span>', en:'<span class="highlight">Custom CRM (on Google Workspace or custom dev)</span>' } },
              { type:"p", html:{ es:'<span class="mas-peqverd">*Sin costes de licencias recurrentes.</span>', en:'<span class="mas-peqverd">*No recurring license fees.</span>' } },
              { type:"p", html:{ es:'<span class="mas-peqverd">*Total control y personalización según tus procesos.</span>', en:'<span class="mas-peqverd">*Total control and customization to your processes.</span>' } },
              { type:"p", html:{ es:'<span class="mas-peqverd">*Integración nativa con tus herramientas actuales.</span>', en:'<span class="mas-peqverd">*Native integration with your current tools.</span>' } },
              { type:"p", html:{ es:'<span class="mas-peqverd">*Evoluciona contigo: adaptamos las funciones a medida que tu negocio crece.</span>', en:'<span class="mas-peqverd">*Evolves with you: we adapt features as your business grows.</span>' } },
              { type:"p", html:{ es:'<span class="mas-peqverd">*Curva de aprendizaje mínima, porque se diseña en torno a cómo ya trabaja tu equipo.</span>', en:'<span class="mas-peqverd">*Minimal learning curve, designed around how your team already works.</span>' } },
              { type:"p", html:{ es:"👉 La decisión no es mejor o peor. Es rapidez y estandarización frente a flexibilidad y autonomía.", en:"👉 It’s not “better or worse”: it’s speed & standardization vs flexibility & autonomy." } },
              { type:"p", html:{ es:"🤝Te ayudo a evaluar qué opción encaja mejor con tu negocio y a implementarla con garantías.", en:"🤝 I help you assess the best fit and implement it confidently." } }
            ],
            includes: [
              { es:"Análisis de necesidades", en:"Needs analysis" },
              { es:"Configuración inicial y migración de datos", en:"Setup & data migration" },
              { es:"Automatizaciones clave (leads, tareas, notificaciones)", en:"Key automations (leads, tasks, notifications)" }
            ],
            benefits: [
              { es:"Visión clara del estado de clientes y ventas", en:"Clear view of clients and sales pipeline" },
              { es:"Mayor productividad y menos tareas repetitivas", en:"Higher productivity, fewer repetitive tasks" }
            ]
          },
          pricing: [
            { title:{es:"Setup esencial", en:"Essential setup"}, price:{es:"1.100 €", en:"€1,100"}, period:{es:"proyecto", en:"project"}, features:[{es:"Alta + pipeline básico", en:"Setup + basic pipeline"}, {es:"1 automatización + plantillas", en:"1 automation + templates"}] },
            { title:{es:"Migración + automatizaciones", en:"Migration + automations"}, price:{es:"2.800–4.800 €", en:"€2,800–€4,800"}, period:{es:"proyecto", en:"project"}, features:[{es:"Importación de datos", en:"Data import"}, {es:"3–5 automatizaciones", en:"3–5 automations"}] },
            { title:{es:"Acompañamiento mensual", en:"Monthly retainer"}, price:{es:"900 €/mes", en:"€900/mo"}, period:{es:"mensual", en:"monthly"}, features:[{es:"Mejora continua (hasta 10 h/mes)", en:"Continuous improvement (up to 10 h/mo)"}] }
          ]
        },
        { ref: "comunicacion" },
        { ref: "cohesion" }
      ]
    },

    /* ===== PYMES (inline) ===== */
    {
      key: "pymes",
      title: { 
                es: '<span class="fx-fluorpink" style="font-size:1.5rem;"> Servicios para PYMES en crecimiento</span>', 
                en: '<span class="fx-fluorpink">Services for growing SMEs</span>' 
              },
              subtitle: { 
                es: '<span class="vowel-bounce">Agilidad, control y visibilidad en la operación.</span>', 
                en: '<span class="vowel-bounce">Agility, control and visibility in operations.</span>' 
              },

      items: [
        /* ===== Dashboards de Control y Análisis ===== */
        {
          key: "dashboards",
          icon: "📈",
          title: { 
                    es: '<span class="fx-fluorpink">Dashboards de Control y Análisis</span>', 
                    en: '<span class="fx-fluorpink">Control & Analytics Dashboards</span>' 
                  },
                  tagline: { 
                    es: '<span class="vowel-bounce">Tus KPIs en un solo lugar, en tiempo real.</span>', 
                    en: '<span class="vowel-bounce">Your KPIs in one place, real-time.</span>' 
                  },
          detail: {
            blocks: [
              { type:"p", html:{
                es:"Tomar buenas decisiones requiere ver el negocio sin fricciones. Centralizo tus datos (ventas, soporte, finanzas, operaciones) para que tengas **KPIs claros y actualizados** en un único panel.",
                en:"Good decisions need frictionless visibility. I centralize your data (sales, support, finance, ops) so you get **clear, up-to-date KPIs** in one place."
              }},
              { type:"img", float:"right", src:"assets/img/kpis.jpg",
                alt:{es:"Panel de KPIs en tiempo real", en:"Real-time KPI dashboard"},
                caption:{es:"Indicadores que importan", en:"Indicators that matter"}
              },
              { type:"p", html:{ es:'<span class="highlightpink">Mi propuesta de valor consiste en:</span>', en:'<span class="highlight">My value proposition:</span>' } },
              { type:"p", html:{ es:'<span class="mas-peqpink">*Levantar junto al equipo los KPIs que de verdad mueven la aguja.</span>', en:'<span class="mas-peqverd">*Co-define with your team the KPIs that actually move the needle.</span>' } },
              { type:"p", html:{ es:'<span class="mas-peqpink">*Unificar fuentes: hojas de cálculo, CRM, contabilidad y soporte.</span>', en:'<span class="mas-peqverd">*Unify sources: spreadsheets, CRM, accounting and support.</span>' } },
              { type:"p", html:{ es:'<span class="mas-peqpink">*Modelado y limpieza de datos para métricas consistentes.</span>', en:'<span class="mas-peqverd">*Data modeling & cleaning for consistent metrics.</span>' } },
              { type:"p", html:{ es:'<span class="mas-peqpink">*Diseño de tableros operativos, tácticos y ejecutivos.</span>', en:'<span class="mas-peqverd">*Design of operational, tactical and executive dashboards.</span>' } },
              { type:"p", html:{ es:'<span class="mas-peqpink">*Actualización automática y alertas por umbrales.</span>', en:'<span class="mas-peqverd">*Automatic refresh and threshold alerts.</span>' } }
            ],
            includes: [
              { es:"Conectores y unificación de datos", en:"Connectors & data unification" },
              { es:"Modelo de KPIs y definiciones claras", en:"KPI model and clear definitions" },
              { es:"Dashboards listos para usar y compartir", en:"Ready-to-use, shareable dashboards" }
            ],
            benefits: [
              { es:"Visibilidad real-time y decisiones más rápidas", en:"Real-time visibility & faster decisions" },
              { es:"Menos hojas sueltas, más alineación", en:"Fewer scattered sheets, more alignment" }
            ]
          },
          pricing: [
            { title:{es:"Dashboard Start", en:"Dashboard Start"}, price:{es:"900 €", en:"€900"}, period:{es:"proyecto", en:"project"}, features:[{es:"1 fuente + 10 KPIs", en:"1 source + 10 KPIs"}] },
            { title:{es:"Dashboard Pro", en:"Dashboard Pro"}, price:{es:"1.800 €", en:"€1,800"}, period:{es:"proyecto", en:"project"}, features:[{es:"3 fuentes + 20 KPIs + alertas", en:"3 sources + 20 KPIs + alerts"}] },
            { title:{es:"Mantenimiento mensual", en:"Monthly maintenance"}, price:{es:"450 €/mes", en:"€450/mo"}, period:{es:"mensual", en:"monthly"}, features:[{es:"Ajustes y nuevas vistas", en:"Adjustments & new views"}] }
          ]
        },

        /* ===== Automatización en Workspace ===== */
        {
          key: "workspace-auto",
          icon:"⚡",
          title: { 
                    es: '<span class="fx-fluorpink">Automatización en Workspace</span>', 
                    en: '<span class="fx-fluorpink">Workspace automation</span>' 
                  },
                  tagline: { 
                    es: '<span class="vowel-bounce">Simplifica tareas con Apps Script y Power Automate.</span>', 
                    en: '<span class="vowel-bounce">Simplify tasks with Apps Script & Power Automate.</span>' 
                  },

          detail: {
            blocks: [
              { type:"p", html:{
                es:"Automatizo tareas repetitivas en Google Workspace y herramientas afines para que tu equipo gane horas cada semana: **documentos, correos, hojas, aprobaciones y reportes** que se ejecutan solos.",
                en:"I automate repetitive work across Google Workspace and related tools so your team saves hours weekly: **docs, emails, sheets, approvals and reports** that run by themselves."
              }},
              { type:"img", float:"right", src:"assets/img/autom1.jpg",
                alt:{es:"Automatización en Google Workspace", en:"Automation in Google Workspace"},
                caption:{es:"Flujos que se activan solos", en:"Self-triggered flows"}
              },
              { type:"p", html:{ es:'<span class="highlightpink">Mi propuesta de valor consiste en:</span>', en:'<span class="highlight">My value proposition:</span>' } },
              { type:"p", html:{ es:'<span class="mas-peqpink">*Mapear tareas repetitivas y priorizar automatizaciones de alto impacto.</span>', en:'<span class="mas-peqverd">*Map repetitive tasks and prioritize high-impact automations.</span>' } },
              { type:"p", html:{ es:'<span class="mas-peqpink">*Crear scripts y flujos: generación de docs, envíos de email, asignaciones y recordatorios.</span>', en:'<span class="mas-peqverd">*Build scripts & flows: doc generation, emails, assignments and reminders.</span>' } },
              { type:"p", html:{ es:'<span class="mas-peqpink">*Integrar APIs y conectores (o Zapier/Make) cuando sea necesario.</span>', en:'<span class="mas-peqverd">*Integrate APIs & connectors (or Zapier/Make) when needed.</span>' } },
              { type:"p", html:{ es:'<span class="mas-peqpink">*Estandarizar plantillas y procedimientos para reducir errores.</span>', en:'<span class="mas-peqverd">*Standardize templates and procedures to reduce errors.</span>' } },
              { type:"p", html:{ es:'<span class="mas-peqpink">*Monitoreo y logs para detectar incidencias a tiempo.</span>', en:'<span class="mas-peqverd">*Monitoring & logs to spot issues early.</span>' } }
            ],
            includes: [
              { es:"Bots de correo y calendario", en:"Mail & calendar bots" },
              { es:"Generación automática de documentos", en:"Automatic document generation" },
              { es:"Flujos de aprobación y reportes", en:"Approval flows & reporting" }
            ],
            benefits: [
              { es:"Ahorro de horas/semana y menos errores", en:"Hours saved/week and fewer errors" },
              { es:"Procesos escalables y ordenados", en:"Scalable, orderly processes" }
            ]
          },
          pricing: [
            { title:{es:"1 flujo sencillo", en:"1 simple flow"}, price:{es:"350 €", en:"€350"}, period:{es:"one-off", en:"one-off"}, features:[{es:"Doc/email/recordatorio", en:"Doc/email/reminder"}] },
            { title:{es:"Pack 3 flujos", en:"Pack 3 flows"}, price:{es:"900 €", en:"€900"}, period:{es:"pack", en:"pack"}, features:[{es:"Top 3 repetitivos", en:"Top 3 repetitive"}] },
            { title:{es:"Sprint 2 semanas", en:"2-week sprint"}, price:{es:"1.800 €", en:"€1,800"}, period:{es:"proyecto", en:"project"}, features:[{es:"Automatizaciones + estándar", en:"Automations + standards"}] }
          ]
        },

        /* ===== Optimización de ventas y soporte (team-first) ===== */
        {
          key: "ops-sales",
          icon:"🧭",
          title: { 
                    es: '<span class="fx-fluorpink">Optimización de ventas y soporte</span>', 
                    en: '<span class="fx-fluorpink">Sales & support optimization</span>' 
                  },
                  tagline: { 
                    es: '<span class="vowel-bounce">Flujos co-creados con tu equipo, desde lo esencial.</span>', 
                    en: '<span class="vowel-bounce">Team-created flows from the essentials.</span>' 
                  },
          detail: {
            blocks: [
              { type:"p", html:{
                es:"Antes que ‘parametrizar’ herramientas, ayudamos al equipo a construir **un modo común de trabajar**: un flujo simple y compartido que nace de cómo realmente vendéis y atendéis hoy. Partimos de lo que ya existe (canales, hábitos, fortalezas) y co-creamos **una forma mejor, sin añadir ruido**.",
                en:"Before ‘configuring tools’, we help the team build **a shared way of working**: a simple, common flow born from how you truly sell and support today. We start from what already exists (channels, habits, strengths) and **co-create a better, cleaner way**."
              }},
              { type:"img", float:"right", src:"assets/img/optvent1.jpg",
                alt:{es:"Diseño de flujo con el equipo", en:"Flow design with the team"},
                caption:{es:"Diseñar el flujo con el equipo", en:"Co-design the flow with the team"}
              },
              { type:"p", html:{ es:'<span class="highlightpink">Mi propuesta de valor consiste en:</span>', en:'<span class="highlight">My value proposition:</span>' } },
              { type:"p", html:{ es:'<span class="mas-peqpink">*Observar el trabajo real (shadowing, registros) para detectar fricciones y patrones.</span>', en:'<span class="mas-peqverd">*Observe real work (shadowing, notes) to spot friction and patterns.</span>' } },
              { type:"p", html:{ es:'<span class="mas-peqpink">*Mapear juntos el ciclo completo: de la oportunidad a la relación, y de la consulta a la solución.</span>', en:'<span class="mas-peqverd">*Co-map the full cycle: from opportunity to relationship, and from inquiry to resolution.</span>' } },
              { type:"p", html:{ es:'<span class="mas-peqpink">*Definir un flujo mínimo viable: roles, entregas entre personas (handoffs), estándares de comunicación y criterios de prioridad.</span>', en:'<span class="mas-peqverd">*Define a minimum viable flow: roles, handoffs, communication standards and priority criteria.</span>' } },
              { type:"p", html:{ es:'<span class="mas-peqpink">*Prototipar con herramientas sencillas (tableros, hojas, CRM ligero) y validar rápido antes de complicar.</span>', en:'<span class="mas-peqverd">*Prototype with simple tools (boards, sheets, light CRM) and validate fast before adding complexity.</span>' } },
              { type:"p", html:{ es:'<span class="mas-peqpink">*Establecer rituales de equipo: dailies breves, revisión semanal y retro quincenal; métricas básicas (entradas, compromisos, tiempos de respuesta acordados).</span>', en:'<span class="mas-peqverd">*Set team rituals: short dailies, weekly review and biweekly retro; basic measures (inflow, commitments, agreed response times).</span>' } }
            ],
            includes: [
              { es:"Mapa de flujo co-creado y guía práctica", en:"Co-created flow map & practical guide" },
              { es:"Kit de comunicación (plantillas, checklist de handoff)", en:"Comms kit (templates, handoff checklist)" },
              { es:"Tablero operativo listo + acompañamiento inicial", en:"Ready-to-use ops board + initial guidance" }
            ],
            benefits: [
              { es:"Menos fricción y retrabajo entre áreas", en:"Less friction and rework across teams" },
              { es:"Más claridad, foco y sensación de control", en:"More clarity, focus and sense of control" }
            ]
          },
          pricing: [
            { title:{es:"Programa 6 semanas", en:"6-week program"}, price:{es:"2.800 €", en:"€2,800"}, period:{es:"programa", en:"program"}, features:[{es:"Flujo mínimo viable", en:"Minimum viable flow"}] },
            { title:{es:"Programa 10 semanas", en:"10-week program"}, price:{es:"4.200 €", en:"€4,200"}, period:{es:"programa", en:"program"}, features:[{es:"Rituales y tablero + guías", en:"Rituals & board + guides"}] },
            { title:{es:"Acompañamiento mensual", en:"Monthly retainer"}, price:{es:"900 €/mes", en:"€900/mo"}, period:{es:"mensual", en:"monthly"}, features:[{es:"Mejora continua y soporte", en:"Continuous improvement & support"}] }
          ]
        },

        /* ===== Formación práctica para equipos ===== */
        {
          key: "training",
          icon:"🎯",
          title: { 
                    es: '<span class="fx-fluorpink">Formación práctica para equipos</span>', 
                    en: '<span class="fx-fluorpink">Hands-on team training</span>' 
                  },
                  tagline: { 
                    es: '<span class="vowel-bounce">Procesos, datos y herramientas con casos reales.</span>', 
                    en: '<span class="vowel-bounce">Processes, data and tools with real cases.</span>' 
                  },
          detail: {
            blocks: [
              { type:"p", html:{
                es:"Formación aplicada, corta y medible. Talleres que usan **tus datos y procesos reales** para que el aprendizaje se traduzca en mejoras desde el primer día.",
                en:"Applied, short and measurable training. Workshops using **your real data and processes** so learning turns into improvements from day one."
              }},
              { type:"img", float:"right", src:"assets/img/practicaltrain1.jpg",
                alt:{es:"Taller práctico en equipo", en:"Practical team workshop"},
                caption:{es:"Aprender haciendo", en:"Learn by doing"}
              },
              { type:"p", html:{ es:'<span class="highlightpink">Mi propuesta de valor consiste en:</span>', en:'<span class="highlight">My value proposition:</span>' } },
              { type:"p", html:{ es:'<span class="mas-peqpink">*Diagnóstico inicial de nivel y objetivos del equipo.</span>', en:'<span class="mas-peqverd">*Initial assessment of team level and goals.</span>' } },
              { type:"p", html:{ es:'<span class="mas-peqpink">*Talleres modulares (2–3 h) sobre procesos, datos, IA y automatización.</span>', en:'<span class="mas-peqverd">*Modular workshops (2–3 h) on processes, data, AI and automation.</span>' } },
              { type:"p", html:{ es:'<span class="mas-peqpink">*Ejercicios guiados con material paso a paso y checklists.</span>', en:'<span class="mas-peqverd">*Guided exercises with step-by-step materials and checklists.</span>' } },
              { type:"p", html:{ es:'<span class="mas-peqpink">*Retos semanales y sesiones Q&A para fijar aprendizajes.</span>', en:'<span class="mas-peqverd">*Weekly challenges and Q&A to lock in learning.</span>' } },
              { type:"p", html:{ es:'<span class="mas-peqpink">*Opcional: sesiones 1:1 para roles clave.</span>', en:'<span class="mas-peqverd">*Optional: 1:1 sessions for key roles.</span>' } }
            ],
            includes: [
              { es:"Materiales, plantillas y ejemplos propios", en:"Materials, templates and in-house examples" },
              { es:"Plan de ejercicios y seguimiento", en:"Exercises plan and follow-up" },
              { es:"Soporte entre sesiones (asíncrono)", en:"Between-session async support" }
            ],
            benefits: [
              { es:"Mayor autonomía y adopción real", en:"Greater autonomy and real adoption" },
              { es:"Resultados medibles desde el primer mes", en:"Measurable results from month one" }
            ]
          },
          pricing: [
            { title:{es:"Taller 8 h (8–12 pers.)", en:"Workshop 8 h (8–12 ppl)"}, price:{es:"1.600 €", en:"€1,600"}, period:{es:"taller", en:"workshop"}, features:[{es:"Datos y procesos reales", en:"Real data & processes"}] },
            { title:{es:"Sprint 4 semanas in-company", en:"4-week in-company sprint"}, price:{es:"2.400 €", en:"€2,400"}, period:{es:"programa", en:"program"}, features:[{es:"4 módulos + proyecto", en:"4 modules + project"}] },
            { title:{es:"Pack 2 talleres", en:"2-workshop pack"}, price:{es:"2.800 €", en:"€2,800"}, period:{es:"pack", en:"pack"}, features:[{es:"Secuencia diseñada a medida", en:"Tailored 2-step sequence"}] }
          ]
        }
      ]
    },

    /* ===== Emprendedores (por ref) ===== */
    {
      key: "emprendedores",
      title: { 
                es: '<span class="fx-fluorblue" style="font-size:1.6rem;">Servicios para emprendedores y autónomos</span>', 
                en: '<span class="fx-fluorblue">Services for freelancers & solopreneurs</span>' 
              },
              subtitle: { 
                es: '<span class="vowel-bounce">Haz más con menos, sin complicarte.</span>', 
                en: '<span class="vowel-bounce">Do more with less, without overcomplicating.</span>' 
              },
      items: [
        { ref:"zapier" },         // Formación en Automatización con IA
        { ref:"mentoria" },       // Mentoría 1:1
        { ref:"coaching" },       // Coaching de claridad y acción
        { ref:"automatizacion" }  // Automatización ligera
      ]
    }
  ],

  /* ====== Publicaciones ====== */
  publications: [
    {
      id: 103,
      cat: "estructuremas",
      title: "One Mo(re)nday LOVE in the Owl`s Eye",
      desc: { es: "18 de Agosto 2025 (PDF).", en: "18th August 2025 (PDF)." },
      mediaType: "pdf",
      src: "assets/pdfs/One-Monday-LOVE-in-the-Owls-Eye.pdf",
      date: "2025-08-18"
    },
    {
      id: 101,
      cat: "estructuremas",
      title: "Raso y el mundo de los reflejos",
      desc: { es: "15 de Agosto 2025 (PDF).", en: "August 15th 2025 (PDF)." },
      mediaType: "pdf",
      src: "assets/pdfs/Raso%20y%20el%20mundo%20de%20los%20reflejos.pdf",
      date: "2025-08-15"
    },
    {
      id: 102,
      cat: "estructuremas",
      title: "Feliz \"Miércoles Imaginando\"",
      desc: { es: "30 de Julio 2025 (PDF).", en: "July 30th 2025 (PDF)." },
      mediaType: "pdf",
      src: "assets/pdfs/Feliz%20Miercoles%20Imaginando.pdf",
      date: "2025-07-30"
    },
    {
      id: 104,
      cat: "estructuremas",
      title: "Miércoles día in-Comprendido",
      desc: { es: "13 de Agosto 2025 (PDF).", en: "August 13th 2025 (PDF)." },
      mediaType: "pdf",
      src: "assets/pdfs/Miercoles-dia-in-Comprendido.pdf",
      date: "2025-08-13"
    },
    {
      id: 105,
      cat: "estructuremas",
      title: "Lunes(yendooo)",
      desc: { es: "04 de Agosto 2025 (PDF).", en: "August 04th 2025 (PDF)." },
      mediaType: "pdf",
      src: "assets/pdfs/Lunes-yendooo.pdf",
      date: "2025-08-04"
    },
    {
      id: 106,
      cat: "estructuremas",
      title: "Percepción 🫶 no juicio 🤭",
      desc: { es: "29 de Julio 2025 (PDF).", en: "July 29th 2025 (PDF)." },
      mediaType: "pdf",
      src: "assets/pdfs/Percepcion-no-juicio.pdf",
      date: "2025-07-29"
    },
    {
      id: 107,
      cat: "estructuremas",
      title: "Feliz🌈 Sábado🥳",
      desc: { es: "09 de Agosto 2025 (PDF).", en: "August 09th 2025 (PDF)." },
      mediaType: "pdf",
      src: "assets/pdfs/Feliz-Sabado.pdf",
      date: "2025-08-09"
    },
    {
      id: 108,
      cat: "estructuremas",
      title: "Hello Mond(ieur)🤣🤗",
      desc: { es: "28 de Julio 2025 (PDF).", en: "July 28th 2025 (PDF)." },
      mediaType: "pdf",
      src: "assets/pdfs/Hello-mondieur.pdf",
      date: "2025-07-28"
    },
    {
      id: 109,
      cat: "estructuremas",
      title: "Recuerdo cuando éramos . .    . ",
      desc: { es: "26 de Julio 2025 (PDF).", en: "July 26th 2025 (PDF)." },
      mediaType: "pdf",
      src: "assets/pdfs/recuerdo-cuando-eramos.pdf",
      date: "2025-07-26"
    },
    {
      id: 110,
      cat: "estructuremas",
      title: "E(moción)= ¿Por qué?",
      desc: { es: "24 de Julio 2025 (PDF).", en: "July 24th 2025 (PDF)." },
      mediaType: "pdf",
      src: "assets/pdfs/Emocion-porque.pdf",
      date: "2025-07-24"
    },
    {
      id: 111,
      cat: "estructuremas",
      title: "I Do 🤓, (¿believe?) 🤔",
      desc: { es: "25 de Julio 2025 (PDF).", en: "July 25th 2025 (PDF)." },
      mediaType: "pdf",
      src: "assets/pdfs/I-Do-believe.pdf",
      date: "2025-07-25"
    },
    {
      id: 112,
      cat: "estructuremas",
      title: "Feliz Viernes a “seres” 🤗",
      desc: { es: "25 de Julio 2025 (PDF).", en: "July 25th 2025 (PDF)." },
      mediaType: "pdf",
      src: "assets/pdfs/Feliz-Viernes-a-seres.pdf",
      date: "2025-07-25"
    },
    {
      id: 113,
      cat: "estructuremas",
      title: "Maravilloso Miércoles para Ninguno,(ya sabes, todos )😁",
      desc: { es: "23 de Julio 2025 (PDF).", en: "July 23th 2025 (PDF)." },
      mediaType: "pdf",
      src: "assets/pdfs/maravilloso-miercoles.pdf",
      date: "2025-07-23"
    },
    {
      id: 114,
      cat: "estructuremas",
      title: "Feliz Lunes 🙂",
      desc: { es: "21 de Julio 2025 (PDF).", en: "July 21th 2025 (PDF)." },
      mediaType: "pdf",
      src: "assets/pdfs/Feliz-Lunes.pdf",
      date: "2025-07-21"
    },
    {
      id: 115,
      cat: "ensayos",
      title: "Re-Conociendo la Bestia: una lectura íntima de Apocalipsis 13",
      desc: { es: "22 de Agosto 2025 (PDF).", en: "August 22nd 2025 (PDF)." },
      mediaType: "pdf",
      src: "assets/pdfs/reconociendo-la-bestia.pdf",
      date: "2025-08-22"
    },
    {
      id: 116,
      cat: "obras",
      title: "Elocuencia: La Emoción de Coherencia Universal",
      desc: { es: "18 de Julio 2025 (PDF).", en: "July 18th 2025 (PDF)." },
      mediaType: "pdf",
      src: "assets/pdfs/Elocuencia-la-emocion.pdf",
      date: "2025-07-18"
    }
  ],

  /* ====== Diario / Blog (solo local) ====== */
  blogEntries: {

  "2025-08-18": {
      es: "One Mo(re)nday LOVE in the Owl’s Eye: notas del proceso y sensaciones.",
      en: "One Mo(re)nday LOVE in the Owl’s Eye: process notes and feelings.",
      media: []
    },


    

    "2025-08-15": {
      es: `Hoy terminó otra semana. He conseguido poner orden a la estructura básica de la web y ha emergido algo inesperado que siempre sorprende :D Satisfacción en la sensación de uno mismo. 

     [img side=right src="assets/img/Raso1.png" alt="Raso y reflejos" cap="Raso y el mundo de los reflejos"]
      Asimismo el día da tantas vueltas... que uno nunca sabe como se desarrolla, y por eso siempre se encuentran huecos para albergar sensaciones muy dispares en un lapso de tiempo tan corto. Hoy escribí sobre Raso y el mundo de los reflejos.
      Respiré hondo antes de publicarlo...`,
      en: `Another week finished...

    ![Raso and reflections](assets/img/teambuild1.jpg){side=left caption="Raso and the world of reflections"}

    Took a deep breath before publishing...`
    },
"2025-08-22": {
  es: `
    <p>Hoy al despertar tuve un recuerdo inesperado por una conversación que mantuve en mis sueños. Este es mi intento de plasmar lo vivido:</p>

    

    <p><em>Coincidir en un mismo tiempo.</em></p>

    <p>Siempre se ha dicho (que si Fermi y la mayoría que "entiende") que existe una gran probabilidad de que exista vida (¿inteligente?) más allá de la Tierra.  
    Todos en algún momento, no solo soñamos y pensamos, sino que además compartimos y entre nosotros hablamos que:  
    "¿Te imaginas que existieran alienígenas?  
    ¿Tú crees que es verdad?  
    ¿Cómo serían?  
    ¿Pero tú crees que podríamos verlos?"</p>

<figure class="about-img left" style="max-width:290px;">
      <img src="assets/img/ovni1.png" alt="Coincidir en un mismo tiempo" style="width:100%;border-radius:8px;">
      <figcaption>Coincidir en un mismo tiempo</figcaption>
    </figure>

    <p class="indent40">Francamente, ¿quién de nosotros no ha tenido nunca una conversación de esa índole?</p>  
    <p class="indent40">Yo recuerdo con cariño esas conversaciones y hoy, curiosamente, el curso del fluir de mis sueños mientras converso sobre otras cosas, me ha traído de vuelta a mi pensamiento, un momento, que atesoro siempre... lento.</p>

    <p class="indent40">Volviendo de entrenar una noche, mi hermano y yo nos encontrábamos en el coche.  
    Mi padre conducía: eran aproximadamente unos 20 minutos de travesía.  
    Mi hermano por aquel entonces tenía 13 años, así que calculo que yo unos 11 ;)</p>

    <p class="indent40">Entonces... mi padre, que era muy dado a "pensar sin estar" (pareciera que conducía por "varios lugares" al mismo tiempo) empezó a silbar como solía hacer, imitando a los jilgueros a los que le encantaba oír cantar (en sus momentos más íntimos), aún estando rodeado de personas...  
    Y tan sencillo como eso... un silbido, provocó que, acto seguido de iniciar el canturreo, mi hermano preguntara:  
    <p class="indent80"><em>"Papá, ¿tú crees que existen los OVNIs?"</em></p>

    <p class="indent40">Es gracioso si ahora lo pienso... pues para que volviera a "estar" era necesario decirle "papá" repetidas veces, sino, raramente reaccionaba a la tercera :'D  
    Pero esa pregunta, por alguna razón, ¿debió hacer que fuera rápido respondiendo en aquella ocasión?  
    Él dijo algo como:  </p>
    <p class="indent80"><em>"¿OVNIs? Por supuesto que existen. ¿Qué es un OVNI?"</em>— nos preguntó.</p>

    <p class="indent80"><em>"Un extraterrestre"</em>— respondimos.  </p>
    <p>Entonces nos empezó a preguntar a nosotros qué pensábamos o qué creíamos... ya ni recuerdo qué dijimos...  
    Finalmente, le volvimos a preguntar:  </p>
     <p class="indent80"><em>"¿Pero tú que crees de verdad, papá?"</em>— le volvimos a preguntar.</p>

    <p>Y nos dijo:  </p>
    <p class="indent80"><em>"Lo primero que hay que reconocer es que un OVNI, realmente, es un Objeto Volante No Identificado.  
    Así que, ciertamente, cualquier cosa que veamos volando por el cielo y que no sepamos lo que es, es un OVNI hasta que se demuestre lo contrario.  
    Ahí la 'astucia' del término ;) si no puedes demostrarlo, ya ES un OVNI."</em></p>
    <p class="indent80"><em>"En cambio, un extraterrestre es que su origen es de fuera de la Tierra."</em>— sentenció.</p>

    <p class="indent80"> <em>"Venga papá no te enrolles, tú nos has entendido..."</em>— le insistimos.</p>   
    <p class="indent80"><em>"¿Yo?... ¿si creo que los hay?... mmmm"</em></p>
    <p></p>
    <p class="indent40">Y este es el momento que vino en mi mente antes.  
    Mi padre, sin apartar la vista de la carretera, pareció que ¿elevase la mirada? y entonces dijo:  </p>
    <p class="indent80"><em>"Yo creo  
    que sí que los hubo, los habrá y quizás los haya.  
    Pero en el fondo no creo que esa sea la pregunta.  
    Pensad... ¿cómo de grande es el Universo?</em>— entonces lo imaginé recordando un episodio de Cosmos de Carl Sagan, y se me hizo vastísimo —<em>  
    Hablamos de un lugar en el que las estrellas están a 'años luz de distancia'...  
    Yo lo que creo es que independientemente de que haya o no haya extraterrestres, lo que sí es cierto es que lo verdaderamente difícil es coincidir en el espacio y en el tiempo con ellos."</em></p>

    <p class="indent40">Y esa frase es la que me vino a la mente.  
    Pero yo veo el universo de otra manera, porque ahora lo Siento.  
    Eso es difícil a un nivel, pero se vuelve sencillo si vas al nivel anterior y resuelves la raíz del problema:  
    No se trata de coincidir en el espacio y el tiempo,  
    sino de re-Conocernos en un mismo tiempo.</p>
    <p class="indent40">Papá, disculpa por responderte tan tarde, me distraje "pensando sin estar".</p> 
    
    <p class="indent80">Y ya no estás.</p>
  `,
  en: `
    <p>When I woke up today, a memory surfaced from a conversation I had in my dreams. This is my attempt to put into words what I lived:</p>

    <p><em>To coincide in the same time.</em></p>

    <p>It’s often said (Fermi, and most people who “get it”) that there’s a high probability of life (intelligent?) beyond Earth.  
    At some point we all not only imagine and think about it, but also share and talk among ourselves:  
    “Can you imagine aliens existed?  
    Do you think it’s true?  
    What would they be like?  
    But do you think we could ever see them?”</p>

    <figure class="about-img left" style="max-width:290px;">
      <img src="assets/img/ovni1.png" alt="To coincide in the same time" style="width:100%;border-radius:8px;">
      <figcaption>To coincide in the same time</figcaption>
    </figure>

    <p class="indent40">Frankly, who hasn’t had a conversation like that at least once?</p>
    <p class="indent40">I remember those conversations fondly and today, curiously, as my dreams flowed while I talked about other things, they brought back to mind a moment I always treasure… slowly.</p>

    <p class="indent40">Driving back from training one night, my brother and I were in the car.  
    My father was driving: it was roughly a 20-minute ride.  
    My brother was 13 back then, so I must have been around 11 ;)</p>

    <p class="indent40">Then… my beloved father—who often “thought without being there” (it felt like he was driving through several places at once)—started whistling as he used to, imitating goldfinches he loved to hear sing (in his most intimate moments), even when surrounded by people…  
    And as simple as that… a whistle led, right after he began humming, to my brother asking:  
    <p class="indent80"><em>“Dad, do you think UFOs exist?”</em></p>

    <p class="indent40">It’s funny in hindsight… to get him “back”, we usually had to say “dad” several times; otherwise he’d rarely react before the third :'D  
    But for some reason, that question must’ve made him answer quickly that time.  
    He said something like:  </p>
    <p class="indent80"><em>“UFOs? Of course they exist. What is a UFO?”</em>—he asked us.</p>

    <p class="indent80"><em>“An extraterrestrial,”</em>—we replied.  </p>
    <p>Then he began asking what we thought or believed… I don’t even remember what we said…  
    Finally, we asked him again:  </p>
    <p class="indent80"><em>“But what do you truly believe, dad?”</em>—we insisted.</p>

    <p>And he said:  </p>
    <p class="indent80"><em>“First, we have to recognize that a UFO is, literally, an Unidentified Flying Object.  
    So, certainly, anything we see flying in the sky that we don’t know what it is, is a UFO until proven otherwise.  
    That’s the ‘cunning’ of the term ;) if you can’t prove it, it already IS a UFO.”</em></p>
    <p class="indent80"><em>“Whereas an extraterrestrial means its origin is from outside Earth.”</em>—he concluded.</p>

    <p class="indent80"><em>“Come on dad, don’t go on and on, you understood us…”</em>—we pressed him.  
    <em>“Me?… do I think they exist?… mmmm”</em></p>

    <p class="indent40">And this is the moment that came back to me.  
    Without taking his eyes off the road, my father seemed to… raise his gaze? and then he said:  </p>
    <p class="indent80"><em>“I believe  
    there were, there will be, and perhaps there are.  
    But deep down I don’t think that’s the question.  
    Think… how big is the Universe?”</em>—then I pictured him recalling an episode of Cosmos by Carl Sagan, and it felt vast to me—<em>  
    “We’re talking about a place where stars are ‘light-years apart’…  
    What I believe is that, regardless of whether or not there are extraterrestrials, what is truly difficult is to coincide with them in space and time.”</em></p>

    <p class="indent40">And that’s the phrase that came to my mind.  
But I see the universe in another way now, because now I Feel it.  
That is difficult on one level, but it becomes simple if you go one step earlier and solve the root of the problem:  
It’s not about coinciding in space and time,  
but about re-Knowing each other in the same time.</p>

<p class="indent40">Dad, forgive me for answering you so late, I got distracted “thinking without being”.</p> 

<p class="indent80">And now you are no longer here.</p>
  `
},






    "2025-08-18": {
      es: "One Mo(re)nday LOVE in the Owl’s Eye: notas del proceso y sensaciones.",
      en: "One Mo(re)nday LOVE in the Owl’s Eye: process notes and feelings.",
      media: []
    }
  },

  news: [],
  links: [],

  playlist: [
    { title: "Pista 1", src: "assets/audio/track1.mp3" },
    { title: "Pista 2", src: "assets/audio/track2.mp3" }
  ],

  apps: [
    { id: 1, title: { es: "Calculadora CU", en: "CU Calculator" }, desc: { es: "Cálculo de variables CU.", en: "CU variables calc." }, url: "#" },
    { id: 2, title: { es: "Simulador 16Si", en: "16Si Simulator" }, desc: { es: "Funciones S₁…S₁₆.", en: "S₁…S₁₆ functions." }, url: "#" }
  ],

  projects: [
    { id: 1, title: { es: "Esfera sensible", en: "Sensitive Sphere" }, desc: { es: "Prototipo audiovisual.", en: "Audiovisual prototype." }, url: "https://www.kickstarter.com/" }
  ]
};
window.CONTENT.appsUtil = [

{
    title:{ es:"Calculadora CU", en:"CU Calculator" },
    desc:{ es:"Es una herramienta diseñada para transformar cualquier número o medida en su equivalente dentro de la Escala de Coherencia Universal. Con esta app puedes convertir valores físicos, emocionales, simbólicos o estructurales a un mismo lenguaje matemático común, facilitando comparaciones y lecturas coherentes entre realidades muy distintas.", en:"CU variables calc." },
    image:"assets/img/calculadora-cu.png",
    video:"assets/video/app1.mp4",      // opcional
    thumb:"assets/img/app1-thumb.jpg",  // opcional
    footer:{ es:"Es una forma práctica y visual de explorar cómo todo lo que medimos puede expresarse en términos de coherencia, revelando patrones ocultos y ofreciendo una nueva perspectiva sobre la realidad.", en:"Final notes or changelog." }, // opcional
    download:"assets/builds/app1.zip",  // opcional
    repo:"https://github.com/tuuser/app1", // opcional
    link:"#"
  },


  {
    title:{ es:"Gestor de Plantillas", en:"Template Manager" },
    desc:{ es:"Genera docs desde datos.", en:"Generate docs from data." },
    image:"assets/img/app2.jpg",
    link:"#"
  }
];

window.CONTENT.appsGames = [
  {
    title:{ es:"Puzzle de Ritmos", en:"Rhythm Puzzle" },
    desc:{ es:"Resuelve con patrones.", en:"Solve with patterns." },
    image:"assets/img/game1.jpg",
    video:"assets/video/game1.mp4",
    thumb:"assets/img/game1-thumb.jpg",
    more:{ es:"Demo jugable en camino.", en:"Playable demo coming." },
    link:"#"
  },
  {
    title:{ es:"Orbita Vowel", en:"Vowel Orbit" },
    desc:{ es:"Mini juego de letras.", en:"Tiny letter game." },
    image:"assets/img/game2.jpg",
    link:"#"
  }
];
window.CONTENT.appsElo = [
  {
  title:{ es:"Simulación 16 Si", en:"16 Si Simulation" },
    desc:{ es:"ReConoce con patrones", en:"Re-Know with patterns." },
    image:"assets/img/game1.jpg",
    video:"assets/video/game1.mp4",
    thumb:"assets/img/game1-thumb.jpg",
    more:{ es:"Experimenta tu mismo.", en:"Playable demo coming." },
    link:"#"
}
];
window.CONTENT.projects = [

  {
  title:{ 
    es:"Chip CU — Alternativa al chip cuántico", 
    en:"CU Chip — Alternative to the quantum chip" 
  },
  desc:{ 
    es:"El Chip CU propone una alternativa disruptiva al chip cuántico tradicional, integrando 16 funciones estructurales jerárquicas basadas en la Coherencia Universal. Su diseño se centra en la evolución adaptativa de patrones y la plasticidad algorítmica, más cercana a un cerebro que a un procesador binario clásico. A diferencia de un chip cuántico, que depende de estados físicos de superposición y entrelazamiento, el Chip CU trabaja sobre relaciones dinámicas de patrones, acumulando memoria estructural mínima pero suficiente para aprender, evolucionar y detectar coherencias en tiempo real.", 
    en:"The CU Chip proposes a disruptive alternative to the traditional quantum chip, integrating 16 hierarchical structural functions based on Universal Coherence. Its design focuses on the adaptive evolution of patterns and algorithmic plasticity, closer to a brain than to a binary processor. Unlike a quantum chip, which depends on physical states of superposition and entanglement, the CU Chip works on dynamic pattern relationships, accumulating minimal but sufficient structural memory to learn, evolve, and detect coherence in real time."
  },
  image:"assets/img/chip-cu.png", // pon tu imagen ilustrativa aquí
  footer:{ 
    es:"El prototipo puede implementarse de forma realista en FPGA (Xilinx, Altera) o aprovechando plataformas neuromórficas como Intel Loihi. Esta vía busca validar la plasticidad estructural y el aprendizaje evolutivo sin recurrir a la mecánica cuántica, optimizando consumo energético y coherencia con los principios CU.", 
    en:"The prototype can realistically be implemented on FPGA (Xilinx, Altera) or by leveraging neuromorphic platforms such as Intel Loihi. This path aims to validate structural plasticity and evolutionary learning without relying on quantum mechanics, optimizing energy consumption and coherence with CU principles."
  },
  download:"assets/docs/chip-cu-propuesta.pdf", // puedes poner aquí un PDF divulgativo
  repo:"https://github.com/tuusuario/chip-cu", // enlace a GitHub o repo
  link:"https://www.kickstarter.com/", // enlace a la campaña de crowdfunding
  label:{ es:"Campaña de crowdfunding", en:"Crowdfunding campaign" }
},
  {
    title:{ es:"Esfera sensible", en:"Sensitive Sphere" },
    desc:{ es:"Prototipo audiovisual que reacciona a presencia/emoción y busca financiación para su primera producción.",
          en:"Audiovisual prototype reacting to presence/emotion; seeking funding for first build." },
    image:"assets/img/proj-sphere.jpg",
    link:"https://www.kickstarter.com/",         // crowdfunding
    label:{ es:"Enlace a campaña", en:"Go to campaign" }
  },
  {
    title:{ es:"Orbita Vowel — juego", en:"Vowel Orbit — game" },
    desc:{ es:"Mini juego experimental basado en ritmos de vocales, con niveles generativos.",
          en:"Experimental mini-game based on vowel rhythms, with generative levels." },
    image:"assets/img/proj-vorbit.jpg",
    link:"https://www.indiegogo.com/",
    label:{ es:"Apoyar en Indiegogo", en:"Support on Indiegogo" }
  }
];
window.CONTENT.creaSongs = [
  {
    title:{ es:"Tema 1", en:"Track 1" },
    desc:{ es:"Mi primera canción experimental.", en:"My first experimental song." },
    audio:"assets/audio/song1.mp3",
    footer:{ es:"Compuesta y grabada en 2025", en:"Composed and recorded in 2025" }
  }
];

window.CONTENT.creaPodcasts = [
  {
    title:{ es:"Podcast Piloto", en:"Pilot Podcast" },
    desc:{ es:"Conversaciones sobre creatividad.", en:"Talks about creativity." },
    audio:"assets/audio/podcast1.mp3",
    footer:{ es:"Episodio 1", en:"Episode 1" }
  }
];

window.CONTENT.creaVideos = [
  {
    title:{ es:"Video Demo", en:"Demo Video" },
    desc:{ es:"Un pequeño corto de prueba.", en:"A small test short." },
    video:"assets/video/demo.mp4",
    thumb:"assets/img/demo-thumb.jpg"
  }
];

