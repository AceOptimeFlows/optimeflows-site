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
      proyectos: "Proyectos",
      contacto: "Contacto",
      redes: "Redes",
      buscar: "Buscar",
      actualidad: "Actualidad",
      enlaces: "Enlaces"
    },
    hero: { subtitle: "No hay elementos en esta categoría todavía." },
    pubCats: { estructuremas: "Estructuremas", ensayos: "Ensayos", estudios: "Estudios", marco: "Marco CU" },
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
      proyectos: "Projects",
      contacto: "Contact",
      redes: "Social",
      buscar: "Search",
      actualidad: "News",
      enlaces: "Links"
    },
    hero: { subtitle: "No items in this category yet." },
    pubCats: { estructuremas: "Estructuremas", ensayos: "Essays", estudios: "Studies", marco: "Marco CU" },
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
  /* Publicaciones
     - title: string (no se traduce)
     - desc: { es, en } (opcional)
     - cat: "estructuremas" | "ensayos" | "estudios" | "marco"
     - mediaType: "pdf" | "image" | "video" | "youtube" | "other"
     - src: URL del recurso
     - date: "YYYY-MM-DD" (fecha del documento, no la de publicación)
  */
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
    }
  ],

  /* Diario / Blog (solo local)
     - clave: "YYYY-MM-DD"
     - idiomas: { es, en } (puedes añadir más si quieres y referenciarlos desde I18N si haces multilengua)
     - media: [{ src, type }]  (type: image | video | youtube | other)
     - additions: [{ title, src, cat }]  (opcionales, además de las publicaciones auto-del mismo día)
  */
  blogEntries: {
    "2025-08-15": {
      es: "Día de Raso y el mundo de los reflejos. Respiré hondo antes de publicarlo...",
      en: "‘Raso and the World of Reflections’ day. Took a deep breath before publishing it…",
      media: [
        // Ejemplos:
        // { src: "assets/img/foto1.jpg", type: "image" },
        // { src: "https://youtu.be/dQw4w9WgXcQ", type: "youtube" }
      ],
      additions: [
        // Si quieres links extra (no-catalogados en publications)
        // { title: "Apunte técnico", src: "https://example.com/apunte.pdf", cat: "estudios" }
      ]
    },
    "2025-08-18": {
      es: "One Mo(re)nday LOVE in the Owl’s Eye: notas del proceso y sensaciones.",
      en: "One Mo(re)nday LOVE in the Owl’s Eye: process notes and feelings.",
      media: [
        // { src: "assets/img/teaser-owl.jpg", type: "image" }
      ]
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
