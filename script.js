const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-button");
const cursorGlow = document.querySelector(".cursor-glow");
const introLoader = document.querySelector(".intro-loader");
const introRedirect = document.body.dataset.introRedirect;
const shouldEnterIntro = document.body.dataset.introEntry === "true";
const revealItems = document.querySelectorAll(".reveal");
const languageButtons = document.querySelectorAll("[data-lang]");
const introSeenKey = "validplan-intro-seen";
const contentOverrideKey = "validplan-content-overrides";
const settingsOverrideKey = "validplan-site-settings";
const languageStorageKey = "validplan-language";
const referenceStorageKey = "validplan-local-references";
const remoteContentPath = "content-overrides.json";
let siteSettings = { defaultLanguage: "hu" };

function finishIntro() {
  document.body.classList.remove("is-intro-running");
  introLoader?.remove();
}

if (shouldEnterIntro && !introLoader && sessionStorage.getItem(introSeenKey) !== "true") {
  sessionStorage.setItem(introSeenKey, "true");
  window.location.replace("intro.html");
}

if (introLoader) {
  document.body.classList.add("is-intro-running");
  const introDuration = Number(document.body.dataset.introDuration || 4700);
  const introExitDelay = Math.max(introDuration - 300, 0);

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    finishIntro();
    if (introRedirect) {
      sessionStorage.setItem(introSeenKey, "true");
      window.setTimeout(() => window.location.replace(introRedirect), 120);
    }
  } else {
    window.setTimeout(finishIntro, introRedirect ? introDuration : introExitDelay);
    if (introRedirect) {
      sessionStorage.setItem(introSeenKey, "true");
      window.setTimeout(() => window.location.replace(introRedirect), introDuration);
    }
  }
}

const translations = {
  hu: {
    meta: {
      title: "ValidPlan | Hídtervezés és építőipari mérnöki tervezés",
      description: "ValidPlan - modern építőipari tervezés, hídtervezés, statikai koncepciók és műszaki dokumentáció."
    },
    brand: { aria: "ValidPlan főoldal" },
    nav: {
      aria: "Fő navigáció",
      expertise: "Szakértelem",
      about: "Rólunk",
      building: "Magasépítés",
      bridges: "Hidak",
      references: "Referenciák",
      process: "Folyamat",
      contact: "Kapcsolat",
      cta: "Ajánlatkérés"
    },
    lang: { aria: "Nyelvválasztó" },
    menu: { open: "Menü megnyitása" },
    hero: {
      eyebrow: "Építőipari és hídtervezési mérnökiroda",
      copy: "Precíz, átlátható és kivitelezhető tervek hidakhoz, műtárgyakhoz és összetett építőipari projektekhez.",
      primary: "Projekt indítása",
      secondary: "Tervezési területek",
      proofAria: "Tervezési alapelvek",
      proof1: "Eurocode szemlélet",
      proof2: "Kivitelezhető részletek",
      proof3: "Átlátható dokumentáció"
    },
    intro: {
      caption: "hídtervező mérnökiroda"
    },
    bridge: {
      aria: "Kirajzolódó blueprint tervrajz",
      header: "TERVRAJZ",
      axis: "tervezési tengely",
      note: "ív + pályalemez csomópont"
    },
    reference: {
      latestKicker: "Legutóbbi referencia",
      latestStatus: "Aktuális referencia",
      latestTitle: "2B117 hídépítési tervlap",
      latestMeta: "Általános terv és metszeti részletek",
      latestSpec1: "hossz- és keresztmetszet",
      latestSpec2: "PDF tervlap"
    },
    stats: {
      one: "Koncepció és előtervezés",
      two: "Statikai és kiviteli terv",
      three: "Műszaki támogatás a kivitelezésig"
    },
    page: {
      expertiseLead: "A ValidPlan a szerkezeti logikát, a részletek kivitelezhetőségét és a tiszta dokumentációt egyetlen tervezési rendszerként kezeli.",
      aboutLead: "A ValidPlan Kft. a közúti hidak, mérnöki műtárgyak és építési szerkezetek tervdokumentációját készíti átlátható, kivitelezhető mérnöki logikával.",
      buildingLead: "A magasépítési oldal a tartószerkezeti gondolkodást, a dokumentált döntéseket és a kivitelezhető részleteket helyezi középpontba.",
      bridgesLead: "A hídoldal külön mutatja meg, milyen szerkezeti helyzetekre készülhet koncepció, statika és kivitelezhető részletterv.",
      processLead: "A folyamatoldal a projekt döntési pontjait választja szét, hogy az igényfelméréstől a részlettervig követhető legyen a mérnöki út.",
      contactLead: "Írj röviden a helyszínről, a szerkezetről vagy a tervezési fázisról, és a ValidPlan innen építi tovább a műszaki irányt."
    },
    about: {
      eyebrow: "Rólunk",
      title: "ValidPlan Kft. - mérnöki létesítmények tervezése",
      profileAlt: "Bodor Dániel, a ValidPlan Kft. tulajdonosa és ügyvezetője",
      profileEyebrow: "Céges profil",
      profileTitle: "ValidPlan Kft. - mérnöki létesítmények tervezése",
      profileCopy: "A ValidPlan Kft. 2022 júliusában jött létre. Tulajdonosa és ügyvezetője Bodor Dániel okleveles építőmérnök. A cég közúti hidak komplett tervdokumentációjának elkészítésével foglalkozik tanulmánytervi, engedélyezési, kiviteli és megvalósulási tervfázisokban.",
      fact1: {
        label: "Profil",
        value: "Hidak, támfalak, mérnöki és magasépítési szerkezetek"
      },
      fact2: {
        label: "Módszer",
        value: "BIM-szemléletű munkafolyamatok és korszerű tervezőszoftverek"
      },
      fact3: {
        label: "Elérhetőség",
        value: "validplankft@gmail.com · +36 30 594 1881"
      },
      scopeEyebrow: "Céges profil",
      scopeTitle: "Tervfázistól a kivitelezhető dokumentációig",
      scope1: {
        title: "Közúti és kerékpáros hidak",
        copy: "Komplett tervdokumentáció tanulmánytervi, engedélyezési, kiviteli és megvalósulási tervfázisokban."
      },
      scope2: {
        title: "Mérnöki szerkezetek",
        copy: "Támfalak, meglévő hidak felújítása, magasépítési szerkezetek és kapcsolódó műtárgyak tervezése."
      },
      scope3: {
        title: "Közlekedési környezet",
        copy: "Kerékpárutak, alsóbbrendű közutak felújítási munkái és forgalomtechnikai tervezési feladatok."
      },
      referencesEyebrow: "Releváns referenciák",
      referencesTitle: "Kiemelt munkák a cégismertető alapján",
      reference1: "27. sz. főút, Szendrőládi Bódva-híd átépítése - kiviteli tervezés, 2022.",
      reference2: "Petőháza-Fertőd kerékpárút, 2 db kerékpáros műtárgy engedélyezési és kiviteli tervezése, 2022.",
      reference3: "Bokod-Oroszlány kerékpárút, 1 db kerékpáros műtárgy engedélyezési tervezése, 2022.",
      reference4: "Baja, Sportuszoda és élményfürdő gyalogos műtárgy kiviteli tervei, 2023.",
      reference5: "Miskolc, 3. sz. főút feletti híd átépítése - kiviteli tervezés, 2024."
    },
    building: {
      eyebrow: "Magasépítés",
      title: "Átlátható tartószerkezeti tervezés épületekhez",
      card1: {
        title: "Tartószerkezeti koncepció",
        copy: "Épületek szerkezeti rendszerének, raszterének, anyaghasználatának és megvalósíthatóságának összehangolása."
      },
      card2: {
        title: "Vasbeton és acél részletek",
        copy: "Csomópontok, vasalási elvek, acél kapcsolatok és kivitelezői döntések tiszta tervlapokra fordítva."
      },
      card3: {
        title: "Dokumentált ellenőrzés",
        copy: "Statikai logika, tervi követhetőség és egyeztethető dokumentáció engedélyezési vagy kiviteli szintig."
      }
    },
    expertise: {
      eyebrow: "Tervezési fókusz",
      title: "Hidakra hangolt mérnöki gondolkodás",
      card1: {
        title: "Hídtervezés",
        copy: "Gyalogos-, közúti és kisebb műtárgyhidak koncepciója, statikai rendszere és részlettervei."
      },
      card2: {
        title: "Szerkezeti tervezés",
        copy: "Vasbeton, acél és kompozit szerkezetek átgondolt, ellenőrizhető műszaki megoldásokkal."
      },
      card3: {
        title: "Dokumentáció",
        copy: "Engedélyezési és kiviteli tervcsomagok, részletrajzok, mennyiségi és műszaki egyeztetések."
      }
    },
    bridges: {
      eyebrow: "Hídstruktúrák",
      title: "A forma a teherúttal kezdődik",
      diagram: {
        kicker: "Terhelés -> szerkezet -> részlet",
        title: "A híd logikája láthatóvá válik"
      },
      type1: {
        meta: "Gyalogos hidak",
        title: "Könnyű, elegáns szerkezetek",
        copy: "Karcsú acél vagy vasbeton megoldások, ahol az arány, a rezgés és a részletképzés együtt számít."
      },
      type2: {
        meta: "Közúti műtárgyak",
        title: "Üzembiztos pályaszerkezetek",
        copy: "Tartós pályalemezek, alépítmények, saruk és dilatációk a kivitelezési realitásokhoz igazítva."
      },
      type3: {
        meta: "Felújítás és ellenőrzés",
        title: "Meglévő szerkezetek újragondolása",
        copy: "Állapotfelméréshez illesztett megerősítési koncepciók, javítási részletek és tervszintű döntéstámogatás."
      }
    },
    references: {
      eyebrow: "Referencia munkák",
      title: "Valódi tervlapok, mérnöki részletekkel",
      lead: "Válogatás olyan tervrajzokból, ahol a szerkezeti gondolkodás, a részletezés és a kivitelezhetőség együtt jelenik meg.",
      openPdf: "PDF megnyitása",
      card1: {
        meta: "Legutóbbi referencia",
        title: "2B117 hídépítési tervlap",
        copy: "Általános terv, hossz- és keresztmetszeti részletek, műszaki megjegyzésekkel."
      },
      card2: {
        meta: "Rámpa szerkezet",
        title: "B06/B713 rámpa vasalási terv",
        copy: "Részletes vasalási elrendezések, nézetek, metszetek és tételes táblázatok."
      },
      card3: {
        meta: "Támasz részletek",
        title: "B18/B777 támasz vasalási terv",
        copy: "Támasz, fejgerenda, keresztmetszetek és átmérő-tömeg összesítések."
      }
    },
    process: {
      eyebrow: "Módszer",
      title: "Tiszta tervút a felméréstől a megvalósításig",
      flow: {
        kicker: "Tervezési pálya",
        title: "A döntések egymásra épülnek"
      },
      step1: {
        title: "Felmérés",
        copy: "Igények, helyszíni adottságok, terhelési feltételek és szabványos keretek pontosítása."
      },
      step2: {
        title: "Koncepció",
        copy: "Alternatív szerkezeti rendszerek, anyagválasztás és megvalósíthatósági szempontok összevetése."
      },
      step3: {
        title: "Részletterv",
        copy: "Számítások, csomópontok, rajzok és kivitelezői egyeztetések összehangolása."
      }
    },
    landingProcess: {
      eyebrow: "Folyamatábra",
      title: "A projekt lépései már az első egyeztetésnél láthatók",
      step1: "Kiindulási adatok",
      step2: "Szerkezeti koncepció",
      step3: "Számítás és modell",
      step4: "Kiviteli tervcsomag"
    },
    software: {
      eyebrow: "Szoftver háttér",
      title: "Mérnöki eszközök, amelyekben a tervek készülnek",
      bridgeTitle: "Hídépítő szoftverek",
      buildingTitle: "Magasépítő szoftverek",
      bridge1: "AxisVM és végeselemes modellezés",
      bridge2: "AutoCAD / Civil 3D tervlapok",
      bridge3: "IDEA StatiCa csomóponti ellenőrzések",
      bridge4: "Sofistik / hídstatikai munkafolyamatok",
      building1: "Revit és BIM-koordináció",
      building2: "Tekla Structures acél- és vasbeton részletek",
      building3: "FEM-Design tartószerkezeti modellek",
      building4: "Allplan / részletrajzi dokumentáció"
    },
    partners: {
      eyebrow: "Partnereink",
      title: "Együttműködések és projektkörnyezet",
      country: "Magyarország",
      placeholder1: "Generáltervező partner",
      placeholder2: "Kivitelezői egyeztetés",
      placeholder3: "Önkormányzati / beruházói kapcsolat"
    },
    showcase: {
      eyebrow: "Blueprint szemlélet",
      title: "Minden vonalnak oka van.",
      copy: "A ValidPlan látványos, de fegyelmezett tervezési folyamatot képvisel: a forma, a statika és a kivitelezhetőség ugyanabban a tervben találkozik."
    },
    panel: {
      row1: { label: "fesztáv" },
      row2: { label: "anyag", value: "acél / vasbeton" },
      row3: { label: "kimenet", value: "engedélyezési + kiviteli terv" },
      row4: { label: "ellenőrzés", value: "teherút + részlet + ütemezés" }
    },
    contact: {
      eyebrow: "Kapcsolat",
      title: "Lépj kapcsolatba a ValidPlannel.",
      briefEyebrow: "Projektindítás",
      briefTitle: "Küldj rövid műszaki kiindulást.",
      briefCopy: "A legjobb első üzenet tartalmazza a helyszínt, a szerkezet típusát, a tervezési fázist és a rendelkezésre álló alapadatokat.",
      mailLabel: "Közvetlen email",
      formTitle: "Kapcsolati űrlap",
      name: "Név",
      reason: "Ok / projekt rövid leírása",
      phone: "Telefon",
      email: "E-mail",
      pdf: "PDF opcionális",
      pdfHelp: "Tervekhez PDF-et is kiválaszthatsz; az email kliensben csatold majd a fájlt.",
      submit: "Email előkészítése",
      status: "Az üzenet előkészítve. Ha PDF-et választottál, csatold az emailhez küldés előtt.",
      card1: {
        title: "Helyszín és cél",
        copy: "Hol készül a szerkezet, milyen funkciót szolgál, és milyen döntés előtt áll a projekt?"
      },
      card2: {
        title: "Meglévő alapadatok",
        copy: "Geodézia, fotók, korábbi rajzok, geotechnika vagy hatósági elvárások segítik a pontos indulást."
      },
      card3: {
        title: "Tervezési fázis",
        copy: "Koncepció, engedélyezés, kiviteli terv vagy meglévő szerkezet felülvizsgálata."
      },
      output1: "válasz műszaki iránnyal",
      output2: "következő egyeztetési lépés"
    }
  },
  en: {
    meta: {
      title: "ValidPlan | Bridge and structural design",
      description: "ValidPlan - modern structural engineering, bridge design, structural concepts and technical documentation."
    },
    brand: { aria: "ValidPlan home" },
    nav: {
      aria: "Primary navigation",
      expertise: "Expertise",
      about: "About",
      building: "Building design",
      bridges: "Bridges",
      references: "References",
      process: "Process",
      contact: "Contact",
      cta: "Request proposal"
    },
    lang: { aria: "Language selector" },
    menu: { open: "Open menu" },
    hero: {
      eyebrow: "Civil engineering and bridge design studio",
      copy: "Precise, transparent and buildable plans for bridges, civil structures and complex construction projects.",
      primary: "Start a project",
      secondary: "Design fields",
      proofAria: "Design principles",
      proof1: "Eurocode mindset",
      proof2: "Buildable details",
      proof3: "Clear documentation"
    },
    intro: {
      caption: "bridge design studio"
    },
    bridge: {
      aria: "Animated blueprint plan illustration",
      header: "BLUEPRINT PLAN",
      axis: "design axis",
      note: "arch + deck node"
    },
    reference: {
      latestKicker: "Latest reference",
      latestStatus: "Current reference",
      latestTitle: "2B117 bridge construction drawing",
      latestMeta: "General plan and sectional details",
      latestSpec1: "longitudinal and cross section",
      latestSpec2: "PDF drawing sheet"
    },
    stats: {
      one: "Concept and preliminary design",
      two: "Structural and construction drawings",
      three: "Technical support through delivery"
    },
    page: {
      expertiseLead: "ValidPlan treats structural logic, buildable details and clear documentation as one connected design system.",
      aboutLead: "ValidPlan Kft. prepares bridge, civil-structure and building documentation with transparent, buildable engineering logic.",
      buildingLead: "The building design page focuses on structural thinking, documented decisions and details that remain buildable on site.",
      bridgesLead: "The bridge page separates the structural situations where concept design, calculations and buildable details can be developed.",
      processLead: "The process page clarifies the project decision points, making the engineering route traceable from survey to detailed design.",
      contactLead: "Send a short note about the site, the structure or the design stage, and ValidPlan will build the technical direction from there."
    },
    about: {
      eyebrow: "About",
      title: "ValidPlan Kft. - engineering structures and building design",
      profileAlt: "Bodor Daniel, owner and managing director of ValidPlan Kft.",
      profileEyebrow: "Company profile",
      profileTitle: "ValidPlan Kft. - engineering structures and building design",
      profileCopy: "ValidPlan Kft. was founded in July 2022. Its owner and managing director is Bodor Daniel, a certified civil engineer. The company prepares complete design documentation for road bridges across study, permit, construction and as-built design phases.",
      fact1: {
        label: "Profile",
        value: "Bridges, retaining walls, civil structures and building structures"
      },
      fact2: {
        label: "Method",
        value: "BIM-oriented workflows and modern design software"
      },
      fact3: {
        label: "Contact",
        value: "validplankft@gmail.com · +36 30 594 1881"
      },
      scopeEyebrow: "Company profile",
      scopeTitle: "From design phase to buildable documentation",
      scope1: {
        title: "Road and cycle bridges",
        copy: "Complete design documentation across study, permit, construction and as-built design phases."
      },
      scope2: {
        title: "Engineering structures",
        copy: "Design of retaining walls, existing bridge renovations, building structures and related civil works."
      },
      scope3: {
        title: "Transport environment",
        copy: "Cycle routes, lower-order road renovation works and traffic engineering design tasks."
      },
      referencesEyebrow: "Relevant references",
      referencesTitle: "Selected work based on the company profile",
      reference1: "Road 27, reconstruction of the Bódva bridge at Szendrőlád - construction design, 2022.",
      reference2: "Petőháza-Fertőd cycle route, permit and construction design of two cycling structures, 2022.",
      reference3: "Bokod-Oroszlány cycle route, permit design of one cycling structure, 2022.",
      reference4: "Baja, pedestrian structure designs for the sports pool and adventure bath, 2023.",
      reference5: "Miskolc, reconstruction of the bridge over Road 3 - construction design, 2024."
    },
    building: {
      eyebrow: "Building design",
      title: "Clear structural design for building projects",
      card1: {
        title: "Structural concept",
        copy: "Coordinating the structural system, grid, material strategy and buildability of building projects."
      },
      card2: {
        title: "Concrete and steel details",
        copy: "Nodes, reinforcement principles, steel connections and construction decisions translated into clear drawings."
      },
      card3: {
        title: "Documented review",
        copy: "Structural logic, traceable drawings and coordinated documentation up to permit or construction design level."
      }
    },
    expertise: {
      eyebrow: "Design focus",
      title: "Engineering thinking shaped around bridges",
      card1: {
        title: "Bridge design",
        copy: "Concepts, structural systems and details for pedestrian, road and smaller civil-structure bridges."
      },
      card2: {
        title: "Structural design",
        copy: "Reinforced concrete, steel and composite structures with thoughtful, verifiable technical solutions."
      },
      card3: {
        title: "Documentation",
        copy: "Permit and construction design packages, detail drawings, quantity coordination and technical alignment."
      }
    },
    bridges: {
      eyebrow: "Bridge structures",
      title: "Form begins with the load path",
      diagram: {
        kicker: "Load -> structure -> detail",
        title: "The bridge logic becomes visible"
      },
      type1: {
        meta: "Pedestrian bridges",
        title: "Lightweight, elegant structures",
        copy: "Slender steel or reinforced-concrete solutions where proportion, vibration and detailing matter together."
      },
      type2: {
        meta: "Road structures",
        title: "Reliable deck systems",
        copy: "Durable decks, substructures, bearings and expansion details aligned with real construction conditions."
      },
      type3: {
        meta: "Renovation and review",
        title: "Rethinking existing structures",
        copy: "Strengthening concepts, repair details and design-level decision support based on condition assessment."
      }
    },
    references: {
      eyebrow: "Reference work",
      title: "Real drawings with engineering detail",
      lead: "A selection of drawings where structural thinking, detailing and buildability appear together.",
      openPdf: "Open PDF",
      card1: {
        meta: "Latest reference",
        title: "2B117 bridge construction drawing",
        copy: "General plan, longitudinal and cross-sectional details with technical notes."
      },
      card2: {
        meta: "Ramp structure",
        title: "B06/B713 ramp reinforcement drawing",
        copy: "Detailed reinforcement layouts, views, sections and itemized schedules."
      },
      card3: {
        meta: "Support details",
        title: "B18/B777 support reinforcement drawing",
        copy: "Support, head beam, cross-sections and diameter-to-weight summaries."
      }
    },
    process: {
      eyebrow: "Method",
      title: "A clear design route from survey to delivery",
      flow: {
        kicker: "Design route",
        title: "Each decision builds on the previous one"
      },
      step1: {
        title: "Survey",
        copy: "Clarifying needs, site constraints, loading conditions and the applicable standards framework."
      },
      step2: {
        title: "Concept",
        copy: "Comparing alternative structural systems, material choices and buildability considerations."
      },
      step3: {
        title: "Detailed design",
        copy: "Coordinating calculations, nodes, drawings and contractor-facing technical decisions."
      }
    },
    landingProcess: {
      eyebrow: "Process diagram",
      title: "The project route is visible from the first coordination",
      step1: "Base information",
      step2: "Structural concept",
      step3: "Calculation and model",
      step4: "Construction package"
    },
    software: {
      eyebrow: "Software background",
      title: "Engineering tools behind the drawings",
      bridgeTitle: "Bridge design software",
      buildingTitle: "Building design software",
      bridge1: "AxisVM and finite element modelling",
      bridge2: "AutoCAD / Civil 3D drawing sheets",
      bridge3: "IDEA StatiCa connection checks",
      bridge4: "Sofistik / bridge analysis workflows",
      building1: "Revit and BIM coordination",
      building2: "Tekla Structures steel and concrete details",
      building3: "FEM-Design structural models",
      building4: "Allplan / detail drawing documentation"
    },
    partners: {
      eyebrow: "Partners",
      title: "Cooperation and project environment",
      country: "Hungary",
      placeholder1: "Lead design partner",
      placeholder2: "Contractor coordination",
      placeholder3: "Municipal / client relationship"
    },
    showcase: {
      eyebrow: "Blueprint mindset",
      title: "Every line has a reason.",
      copy: "ValidPlan represents a visual but disciplined design process: form, structural logic and buildability meet in the same plan."
    },
    panel: {
      row1: { label: "span" },
      row2: { label: "material", value: "steel / reinforced concrete" },
      row3: { label: "output", value: "permit + construction design" },
      row4: { label: "review", value: "load path + detail + phasing" }
    },
    contact: {
      eyebrow: "Contact",
      title: "Get in touch with ValidPlan.",
      briefEyebrow: "Project start",
      briefTitle: "Send a short technical starting point.",
      briefCopy: "The best first message includes the location, structure type, design stage and available base information.",
      mailLabel: "Direct email",
      formTitle: "Contact form",
      name: "Name",
      reason: "Reason / short project description",
      phone: "Phone",
      email: "Email",
      pdf: "Optional PDF",
      pdfHelp: "You can select a PDF for plans; attach it in your email client before sending.",
      submit: "Prepare email",
      status: "The email has been prepared. If you selected a PDF, attach it before sending.",
      card1: {
        title: "Site and purpose",
        copy: "Where will the structure be built, what function will it serve, and what decision is the project facing?"
      },
      card2: {
        title: "Available inputs",
        copy: "Survey data, photos, previous drawings, geotechnics or authority requirements help start accurately."
      },
      card3: {
        title: "Design stage",
        copy: "Concept, permit design, construction drawings or review of an existing structure."
      },
      output1: "response with technical direction",
      output2: "next coordination step"
    }
  },
  de: {
    meta: {
      title: "ValidPlan | Brückenplanung und Tragwerksplanung",
      description: "ValidPlan - moderne Tragwerksplanung, Brückenplanung, statische Konzepte und technische Dokumentation."
    },
    brand: { aria: "ValidPlan Startseite" },
    nav: {
      aria: "Hauptnavigation",
      expertise: "Expertise",
      about: "Über uns",
      building: "Hochbau",
      bridges: "Brücken",
      references: "Referenzen",
      process: "Ablauf",
      contact: "Kontakt",
      cta: "Anfrage"
    },
    lang: { aria: "Sprachauswahl" },
    menu: { open: "Menü öffnen" },
    hero: {
      eyebrow: "Ingenieurbüro für Bauwesen und Brückenplanung",
      copy: "Präzise, transparente und ausführbare Pläne für Brücken, Ingenieurbauwerke und komplexe Bauprojekte.",
      primary: "Projekt starten",
      secondary: "Planungsbereiche",
      proofAria: "Planungsprinzipien",
      proof1: "Eurocode-orientiert",
      proof2: "Ausführbare Details",
      proof3: "Klare Dokumentation"
    },
    intro: {
      caption: "Ingenieurbüro für Brückenplanung"
    },
    bridge: {
      aria: "Animierter Blueprint-Bauplan",
      header: "BAUPLAN",
      axis: "Planungsachse",
      note: "Bogen + Fahrbahnplatte Knoten"
    },
    reference: {
      latestKicker: "Neueste Referenz",
      latestStatus: "Aktuelle Referenz",
      latestTitle: "2B117 Brückenbau-Planblatt",
      latestMeta: "Übersichtsplan und Schnittdetails",
      latestSpec1: "Längs- und Querschnitt",
      latestSpec2: "PDF-Planblatt"
    },
    stats: {
      one: "Konzept und Vorplanung",
      two: "Statik und Ausführungsplanung",
      three: "Technische Unterstützung bis zur Umsetzung"
    },
    page: {
      expertiseLead: "ValidPlan behandelt Tragwerkslogik, ausführbare Details und klare Dokumentation als ein zusammenhängendes Planungssystem.",
      aboutLead: "ValidPlan Kft. erstellt Planunterlagen für Brücken, Ingenieurbauwerke und Hochbaukonstruktionen mit nachvollziehbarer, ausführbarer Ingenieurlogik.",
      buildingLead: "Die Hochbau-Seite stellt Tragwerksdenken, dokumentierte Entscheidungen und ausführbare Details in den Mittelpunkt.",
      bridgesLead: "Die Brückenseite zeigt getrennt, für welche Tragwerkssituationen Konzept, Statik und ausführbare Details entstehen können.",
      processLead: "Die Ablaufseite trennt die Entscheidungspunkte des Projekts, damit der Planungsweg von der Aufnahme bis zur Detailplanung nachvollziehbar bleibt.",
      contactLead: "Schreiben Sie kurz zu Standort, Bauwerk oder Planungsphase, und ValidPlan entwickelt daraus die technische Richtung weiter."
    },
    about: {
      eyebrow: "Über uns",
      title: "ValidPlan Kft. - Planung von Ingenieurbauwerken",
      profileAlt: "Bodor Daniel, Eigentümer und Geschäftsführer der ValidPlan Kft.",
      profileEyebrow: "Unternehmensprofil",
      profileTitle: "ValidPlan Kft. - Planung von Ingenieurbauwerken",
      profileCopy: "Die ValidPlan Kft. wurde im Juli 2022 gegründet. Eigentümer und Geschäftsführer ist Bodor Daniel, Diplom-Bauingenieur. Das Unternehmen erstellt komplette Planunterlagen für Straßenbrücken in Studien-, Genehmigungs-, Ausführungs- und Bestandsplanungsphasen.",
      fact1: {
        label: "Profil",
        value: "Brücken, Stützwände, Ingenieur- und Hochbaukonstruktionen"
      },
      fact2: {
        label: "Methode",
        value: "BIM-orientierte Arbeitsprozesse und moderne Planungssoftware"
      },
      fact3: {
        label: "Kontakt",
        value: "validplankft@gmail.com · +36 30 594 1881"
      },
      scopeEyebrow: "Unternehmensprofil",
      scopeTitle: "Von der Planungsphase bis zur ausführbaren Dokumentation",
      scope1: {
        title: "Straßen- und Radwegbrücken",
        copy: "Komplette Planunterlagen in Studien-, Genehmigungs-, Ausführungs- und Bestandsplanungsphasen."
      },
      scope2: {
        title: "Ingenieurbauwerke",
        copy: "Planung von Stützwänden, Sanierung bestehender Brücken, Hochbaukonstruktionen und zugehörigen Bauwerken."
      },
      scope3: {
        title: "Verkehrsumfeld",
        copy: "Radwege, Sanierungen von Nebenstraßen und verkehrstechnische Planungsaufgaben."
      },
      referencesEyebrow: "Relevante Referenzen",
      referencesTitle: "Ausgewählte Arbeiten auf Basis des Unternehmensprofils",
      reference1: "Straße 27, Umbau der Bódva-Brücke bei Szendrőlád - Ausführungsplanung, 2022.",
      reference2: "Radweg Petőháza-Fertőd, Genehmigungs- und Ausführungsplanung von zwei Radwegbauwerken, 2022.",
      reference3: "Radweg Bokod-Oroszlány, Genehmigungsplanung eines Radwegbauwerks, 2022.",
      reference4: "Baja, Fußgängerbauwerk für Sportbad und Erlebnisbad - Ausführungspläne, 2023.",
      reference5: "Miskolc, Umbau der Brücke über die Straße 3 - Ausführungsplanung, 2024."
    },
    building: {
      eyebrow: "Hochbau",
      title: "Klare Tragwerksplanung für Gebäude",
      card1: {
        title: "Tragwerkskonzept",
        copy: "Abstimmung von Tragsystem, Raster, Materialstrategie und Ausführbarkeit für Gebäudeprojekte."
      },
      card2: {
        title: "Stahlbeton- und Stahldetails",
        copy: "Knoten, Bewehrungsprinzipien, Stahlanschlüsse und Ausführungsentscheidungen als klare Planunterlagen."
      },
      card3: {
        title: "Dokumentierte Prüfung",
        copy: "Tragwerkslogik, nachvollziehbare Pläne und abgestimmte Dokumentation bis zur Genehmigungs- oder Ausführungsplanung."
      }
    },
    expertise: {
      eyebrow: "Planungsschwerpunkt",
      title: "Ingenieurdenken mit Fokus auf Brücken",
      card1: {
        title: "Brückenplanung",
        copy: "Konzepte, Tragsysteme und Details für Fußgänger-, Straßen- und kleinere Ingenieurbauwerke."
      },
      card2: {
        title: "Tragwerksplanung",
        copy: "Stahlbeton-, Stahl- und Verbundkonstruktionen mit durchdachten, prüfbaren technischen Lösungen."
      },
      card3: {
        title: "Dokumentation",
        copy: "Genehmigungs- und Ausführungsunterlagen, Detailzeichnungen, Mengenabstimmung und technische Koordination."
      }
    },
    bridges: {
      eyebrow: "Brückentragwerke",
      title: "Die Form beginnt mit dem Lastpfad",
      diagram: {
        kicker: "Last -> Tragwerk -> Detail",
        title: "Die Brückenlogik wird sichtbar"
      },
      type1: {
        meta: "Fußgängerbrücken",
        title: "Leichte, elegante Konstruktionen",
        copy: "Schlanke Stahl- oder Stahlbetonlösungen, bei denen Proportion, Schwingung und Detailausbildung zusammenwirken."
      },
      type2: {
        meta: "Straßenbauwerke",
        title: "Zuverlässige Fahrbahnsysteme",
        copy: "Dauerhafte Fahrbahnplatten, Unterbauten, Lager und Dehnfugen im Einklang mit realen Bauabläufen."
      },
      type3: {
        meta: "Sanierung und Prüfung",
        title: "Bestehende Tragwerke neu denken",
        copy: "Verstärkungskonzepte, Instandsetzungsdetails und planerische Entscheidungshilfen auf Basis der Zustandserfassung."
      }
    },
    references: {
      eyebrow: "Referenzarbeiten",
      title: "Echte Planblätter mit technischen Details",
      lead: "Eine Auswahl von Zeichnungen, in denen Tragwerksdenken, Detailplanung und Ausführbarkeit zusammen erscheinen.",
      openPdf: "PDF öffnen",
      card1: {
        meta: "Neueste Referenz",
        title: "2B117 Brückenbau-Planblatt",
        copy: "Übersichtsplan, Längs- und Querschnittsdetails mit technischen Hinweisen."
      },
      card2: {
        meta: "Rampenbauwerk",
        title: "B06/B713 Bewehrungsplan Rampe",
        copy: "Detaillierte Bewehrungsanordnungen, Ansichten, Schnitte und Stücklisten."
      },
      card3: {
        meta: "Auflagerdetails",
        title: "B18/B777 Bewehrungsplan Auflager",
        copy: "Auflager, Kopfbalken, Querschnitte und Durchmesser-Gewicht-Zusammenstellungen."
      }
    },
    process: {
      eyebrow: "Methode",
      title: "Ein klarer Planungsweg von der Aufnahme bis zur Umsetzung",
      flow: {
        kicker: "Planungsweg",
        title: "Jede Entscheidung baut auf der vorherigen auf"
      },
      step1: {
        title: "Aufnahme",
        copy: "Klärung von Anforderungen, Standortbedingungen, Lastannahmen und normativen Rahmenbedingungen."
      },
      step2: {
        title: "Konzept",
        copy: "Vergleich alternativer Tragsysteme, Materialentscheidungen und Aspekte der Ausführbarkeit."
      },
      step3: {
        title: "Detailplanung",
        copy: "Abstimmung von Berechnungen, Knotenpunkten, Zeichnungen und ausführungsrelevanten Entscheidungen."
      }
    },
    landingProcess: {
      eyebrow: "Ablaufdiagramm",
      title: "Der Projektweg ist ab der ersten Abstimmung sichtbar",
      step1: "Grundlagen",
      step2: "Tragwerkskonzept",
      step3: "Berechnung und Modell",
      step4: "Ausführungsunterlagen"
    },
    software: {
      eyebrow: "Software-Basis",
      title: "Ingenieurwerkzeuge hinter den Plänen",
      bridgeTitle: "Brückenbau-Software",
      buildingTitle: "Hochbau-Software",
      bridge1: "AxisVM und FEM-Modellierung",
      bridge2: "AutoCAD / Civil 3D Planblätter",
      bridge3: "IDEA StatiCa Anschlussprüfungen",
      bridge4: "Sofistik / Brückenstatik-Workflows",
      building1: "Revit und BIM-Koordination",
      building2: "Tekla Structures Stahl- und Betondetails",
      building3: "FEM-Design Tragwerksmodelle",
      building4: "Allplan / Detailplandokumentation"
    },
    partners: {
      eyebrow: "Partner",
      title: "Zusammenarbeit und Projektumfeld",
      country: "Ungarn",
      placeholder1: "Generalplaner-Partner",
      placeholder2: "Ausführungskoordination",
      placeholder3: "Kommunale / Bauherren-Abstimmung"
    },
    showcase: {
      eyebrow: "Blueprint-Denkweise",
      title: "Jede Linie hat einen Grund.",
      copy: "ValidPlan steht für einen visuellen, aber disziplinierten Planungsprozess: Form, Tragwerkslogik und Ausführbarkeit treffen sich im selben Plan."
    },
    panel: {
      row1: { label: "Spannweite" },
      row2: { label: "Material", value: "Stahl / Stahlbeton" },
      row3: { label: "Leistung", value: "Genehmigungs- + Ausführungsplanung" },
      row4: { label: "Prüfung", value: "Lastpfad + Detail + Bauphase" }
    },
    contact: {
      eyebrow: "Kontakt",
      title: "Kontaktieren Sie ValidPlan.",
      briefEyebrow: "Projektstart",
      briefTitle: "Senden Sie einen kurzen technischen Ausgangspunkt.",
      briefCopy: "Die beste erste Nachricht enthält Standort, Bauwerkstyp, Planungsphase und verfügbare Grundlagendaten.",
      mailLabel: "Direkte E-Mail",
      formTitle: "Kontaktformular",
      name: "Name",
      reason: "Grund / kurze Projektbeschreibung",
      phone: "Telefon",
      email: "E-Mail",
      pdf: "PDF optional",
      pdfHelp: "Sie können ein PDF auswählen; bitte vor dem Senden im E-Mail-Programm anhängen.",
      submit: "E-Mail vorbereiten",
      status: "Die E-Mail wurde vorbereitet. Wenn Sie ein PDF gewählt haben, hängen Sie es vor dem Senden an.",
      card1: {
        title: "Standort und Ziel",
        copy: "Wo entsteht das Bauwerk, welche Funktion erfüllt es, und vor welcher Entscheidung steht das Projekt?"
      },
      card2: {
        title: "Vorhandene Grundlagen",
        copy: "Vermessung, Fotos, frühere Pläne, Geotechnik oder behördliche Anforderungen helfen beim präzisen Start."
      },
      card3: {
        title: "Planungsphase",
        copy: "Konzept, Genehmigungsplanung, Ausführungsplanung oder Prüfung eines bestehenden Bauwerks."
      },
      output1: "Antwort mit technischer Richtung",
      output2: "nächster Abstimmungsschritt"
    }
  }
};

function mergeContent(target, source) {
  Object.keys(source || {}).forEach((key) => {
    if (source[key] && typeof source[key] === "object" && !Array.isArray(source[key])) {
      if (!target[key] || typeof target[key] !== "object") target[key] = {};
      mergeContent(target[key], source[key]);
      return;
    }
    target[key] = source[key];
  });
  return target;
}

function applySettings(settings) {
  const defaultLanguage = settings?.defaultLanguage;
  if (translations[defaultLanguage]) siteSettings.defaultLanguage = defaultLanguage;
}

function getLocalSettings() {
  try {
    return JSON.parse(localStorage.getItem(settingsOverrideKey) || "{}");
  } catch {
    localStorage.removeItem(settingsOverrideKey);
    return {};
  }
}

try {
  const savedContent = JSON.parse(localStorage.getItem(contentOverrideKey) || "{}");
  mergeContent(translations, savedContent.content || savedContent);
  applySettings(savedContent.settings);
} catch {
  localStorage.removeItem(contentOverrideKey);
}
applySettings(getLocalSettings());

async function loadRemoteContentOverrides() {
  if (window.location.protocol === "file:") return;

  try {
    const response = await fetch(`${remoteContentPath}?v=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) return;
    const remoteContent = await response.json();
    mergeContent(translations, remoteContent.content || remoteContent);
    applySettings(remoteContent.settings);
    applySettings(getLocalSettings());
  } catch {
    // A missing or invalid remote override file should never block the site.
  }
}

window.ValidPlanTranslations = translations;
window.ValidPlanContentOverrideKey = contentOverrideKey;
window.ValidPlanSettingsOverrideKey = settingsOverrideKey;
window.ValidPlanReferenceStorageKey = referenceStorageKey;
window.ValidPlanContentReady = loadRemoteContentOverrides();

const getTranslation = (path, lang) =>
  path.split(".").reduce((value, key) => (value ? value[key] : undefined), translations[lang]);

function setLanguage(lang) {
  const dictionary = translations[lang] ? lang : "hu";

  document.documentElement.lang = dictionary;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const value = getTranslation(element.dataset.i18n, dictionary);
    if (value) element.textContent = value;
  });

  document.querySelectorAll("[data-i18n-attr]").forEach((element) => {
    element.dataset.i18nAttr.split(",").forEach((entry) => {
      const [attribute, key] = entry.split(":");
      const value = getTranslation(key, dictionary);
      if (attribute && value) element.setAttribute(attribute, value);
    });
  });

  document.title = translations[dictionary].meta.title;
  languageButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.lang === dictionary);
  });
  localStorage.setItem(languageStorageKey, dictionary);
}

function getRequestedLanguage() {
  const params = new URLSearchParams(window.location.search);
  const requested = params.get("lang") || params.get("language");
  return translations[requested] ? requested : "";
}

function getCurrentLanguage() {
  return document.documentElement.lang || localStorage.getItem(languageStorageKey) || siteSettings.defaultLanguage || "hu";
}

function renderLocalReferences() {
  const container = document.querySelector("[data-dynamic-references]");
  if (!container) return;

  let references = [];
  try {
    references = JSON.parse(localStorage.getItem(referenceStorageKey) || "[]");
  } catch {
    localStorage.removeItem(referenceStorageKey);
  }

  container.innerHTML = "";
  references.forEach((reference) => {
    if (!reference?.pdfDataUrl) return;
    const article = document.createElement("article");
    article.className = "reference-card reveal is-visible";
    article.innerHTML = `
      <a class="reference-preview reference-preview-empty" href="${reference.pdfDataUrl}" target="_blank" rel="noopener">
        <span>PDF</span>
        <strong></strong>
      </a>
      <div class="reference-copy">
        <span></span>
        <h3></h3>
        <p></p>
        <a href="${reference.pdfDataUrl}" target="_blank" rel="noopener"></a>
      </div>
    `;
    article.querySelector(".reference-preview strong").textContent = reference.fileName || "Feltöltött referencia";
    article.querySelector(".reference-copy span").textContent = reference.meta || "Admin referencia";
    article.querySelector(".reference-copy h3").textContent = reference.title || reference.fileName || "Új referencia";
    article.querySelector(".reference-copy p").textContent = reference.copy || "Helyben feltöltött PDF referencia.";
    article.querySelector(".reference-copy a").textContent = getTranslation("references.openPdf", getCurrentLanguage()) || "PDF";
    container.append(article);
  });
}

function initializeContactForms() {
  document.querySelectorAll("[data-contact-form]").forEach((form) => {
    const status = form.querySelector("[data-contact-status]");
    const fileInput = form.querySelector("[data-contact-pdf]");
    const fileName = form.querySelector("[data-contact-file-name]");

    fileInput?.addEventListener("change", () => {
      const [file] = fileInput.files || [];
      if (fileName) fileName.textContent = file ? file.name : "";
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const pdf = fileInput?.files?.[0];
      const subject = encodeURIComponent(`ValidPlan kapcsolat - ${data.get("name") || ""}`);
      const body = encodeURIComponent(
        [
          `Név: ${data.get("name") || ""}`,
          `Ok / projekt: ${data.get("reason") || ""}`,
          `Telefon: ${data.get("phone") || ""}`,
          `E-mail: ${data.get("email") || ""}`,
          `PDF: ${pdf ? `${pdf.name} (csatolandó)` : "nincs"}`,
        ].join("\n")
      );
      window.location.href = `mailto:info@validplan.hu?subject=${subject}&body=${body}`;
      if (status) status.textContent = getTranslation("contact.status", getCurrentLanguage()) || "";
    });
  });
}

function colorFromMtl(values) {
  const channels = values
    .slice(0, 3)
    .map((value) => Math.max(0, Math.min(255, Math.round(Number(value) * 255))));
  return `rgb(${channels.join(", ")})`;
}

function parseMtlMaterials(source) {
  const materials = [];
  let current = null;

  source.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return;
    const [keyword, ...values] = trimmed.split(/\s+/);

    if (keyword === "newmtl") {
      const rawName = values.join(" ");
      current = { rawName, name: rawName.replace(/,_/g, ", ").replace(/_/g, " "), color: "#7a7a7a" };
      materials.push(current);
    }

    if (keyword === "Kd" && current) {
      current.color = colorFromMtl(values);
    }
  });

  return materials;
}

function initializeBridgeViewer() {
  const viewer = document.querySelector("[data-bridge-viewer]");
  const scene = document.querySelector("[data-bridge-scene]");
  if (!viewer || !scene) return;

  const canvas = document.querySelector("[data-bridge-canvas]");
  const gl = canvas?.getContext("webgl", { alpha: true, antialias: true, preserveDrawingBuffer: true });
  const context = gl ? null : canvas?.getContext("2d");
  const materialList = document.querySelector("[data-bridge-materials]");
  const zoomSlider = viewer.querySelector("[data-bridge-zoom-slider]");
  const zoomButtons = viewer.querySelectorAll("[data-bridge-zoom]");
  let rotationX = -10;
  let rotationY = -18;
  let zoom = 1.28;
  let isDragging = false;
  const activePointers = new Map();
  let previousPinchDistance = 0;
  let previousX = 0;
  let previousY = 0;
  let model = null;
  let webglModel = null;
  let webglProgram = null;
  let materialMap = new Map();
  let renderRequested = false;

  const applyRotation = () => {
    scene.style.setProperty("--bridge-rot-x", `${rotationX}deg`);
    scene.style.setProperty("--bridge-rot-y", `${rotationY}deg`);
    scene.style.setProperty("--bridge-zoom", zoom.toFixed(3));
    requestModelRender();
  };

  const setZoom = (value) => {
    zoom = Math.max(0.6, Math.min(2.9, value));
    if (zoomSlider) zoomSlider.value = zoom.toFixed(2);
    applyRotation();
  };

  const setMaterials = (materials) => {
    const concrete = materials.find((item) => item.name.toLowerCase().includes("concrete"));
    const asphalt = materials.find((item) => item.name.toLowerCase().includes("asphalt"));
    const darkSteel = materials.find((item) => item.name.toLowerCase().includes("dark gray"));

    if (concrete) scene.style.setProperty("--bridge-concrete", concrete.color);
    if (asphalt) scene.style.setProperty("--bridge-asphalt", asphalt.color);
    if (darkSteel) scene.style.setProperty("--bridge-steel-dark", darkSteel.color);
    materialMap = new Map(materials.map((material) => [material.rawName || material.name, material]));

    if (materialList) {
      materialList.innerHTML = "";
      materials.forEach((material) => {
        const chip = document.createElement("span");
        chip.style.setProperty("--material-color", material.color);
        chip.textContent = material.name;
        materialList.append(chip);
      });
    }
  };

  const resizeCanvas = () => {
    if (!canvas) return;
    const rect = viewer.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, 2.5);
    const width = Math.max(1, Math.round(rect.width * ratio));
    const height = Math.max(1, Math.round(rect.height * ratio));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      if (context) context.setTransform(ratio, 0, 0, ratio, 0, 0);
    }
    if (gl) gl.viewport(0, 0, canvas.width, canvas.height);
  };

  const shadeColor = (color, factor) => {
    const match = color.match(/\d+/g);
    if (!match) return color;
    const [r, g, b] = match.slice(0, 3).map(Number);
    const adjust = (channel) => Math.max(0, Math.min(255, Math.round(channel * factor)));
    return `rgb(${adjust(r)}, ${adjust(g)}, ${adjust(b)})`;
  };

  const colorToArray = (color) => {
    const match = color.match(/\d+/g);
    if (!match) return [0.56, 0.64, 0.72];
    return match.slice(0, 3).map((value) => Math.max(0, Math.min(1, Number(value) / 255)));
  };

  const displayMaterialColor = (materialName, materialInfo) => {
    const name = materialName.toLowerCase();
    if (name.includes("asphalt")) return "rgb(102, 107, 104)";
    if (name.includes("dark gray")) return "rgb(80, 86, 84)";
    if (name.includes("steel")) return "rgb(205, 211, 209)";
    if (name.includes("concrete")) return "rgb(158, 164, 160)";
    if (name.includes("material_not_defined")) return "rgb(128, 134, 132)";
    return materialInfo?.color || "rgb(150, 156, 154)";
  };

  const multiplyMatrix = (a, b) => {
    const out = new Float32Array(16);
    for (let row = 0; row < 4; row += 1) {
      for (let col = 0; col < 4; col += 1) {
        out[col * 4 + row] =
          a[0 * 4 + row] * b[col * 4 + 0] +
          a[1 * 4 + row] * b[col * 4 + 1] +
          a[2 * 4 + row] * b[col * 4 + 2] +
          a[3 * 4 + row] * b[col * 4 + 3];
      }
    }
    return out;
  };

  const perspectiveMatrix = (fieldOfView, aspect, near, far) => {
    const f = 1 / Math.tan(fieldOfView / 2);
    const rangeInv = 1 / (near - far);
    return new Float32Array([
      f / aspect, 0, 0, 0,
      0, f, 0, 0,
      0, 0, (near + far) * rangeInv, -1,
      0, 0, near * far * rangeInv * 2, 0
    ]);
  };

  const translationMatrix = (x, y, z) => new Float32Array([
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    x, y, z, 1
  ]);

  const rotationXMatrix = (angle) => {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    return new Float32Array([
      1, 0, 0, 0,
      0, c, s, 0,
      0, -s, c, 0,
      0, 0, 0, 1
    ]);
  };

  const rotationYMatrix = (angle) => {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    return new Float32Array([
      c, 0, -s, 0,
      0, 1, 0, 0,
      s, 0, c, 0,
      0, 0, 0, 1
    ]);
  };

  const compileShader = (type, source) => {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      throw new Error(gl.getShaderInfoLog(shader) || "Shader compile failed");
    }
    return shader;
  };

  const createWebglProgram = () => {
    if (!gl) return null;
    const vertexShader = compileShader(gl.VERTEX_SHADER, `
      attribute vec3 aPosition;
      attribute vec3 aNormal;
      attribute vec3 aColor;
      uniform mat4 uMatrix;
      uniform mat4 uNormalMatrix;
      varying vec3 vColor;
      varying float vLight;
      varying float vFacing;
      void main() {
        vec3 normal = normalize((uNormalMatrix * vec4(aNormal, 0.0)).xyz);
        vec3 lightDir = normalize(vec3(-0.34, 0.88, 0.44));
        float light = max(dot(normal, lightDir), 0.0);
        vLight = 0.62 + light * 0.58;
        vFacing = abs(normal.z);
        vColor = aColor;
        gl_Position = uMatrix * vec4(aPosition, 1.0);
      }
    `);
    const fragmentShader = compileShader(gl.FRAGMENT_SHADER, `
      precision mediump float;
      varying vec3 vColor;
      varying float vLight;
      varying float vFacing;
      void main() {
        vec3 rim = vec3(0.18, 0.20, 0.19) * (1.0 - vFacing) * 0.18;
        vec3 color = vColor * vLight + rim;
        gl_FragColor = vec4(color, 1.0);
      }
    `);
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(program) || "Program link failed");
    }
    return {
      program,
      position: gl.getAttribLocation(program, "aPosition"),
      normal: gl.getAttribLocation(program, "aNormal"),
      color: gl.getAttribLocation(program, "aColor"),
      matrix: gl.getUniformLocation(program, "uMatrix"),
      normalMatrix: gl.getUniformLocation(program, "uNormalMatrix")
    };
  };

  const createBuffer = (data) => {
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
    return buffer;
  };

  const buildWebglModel = () => {
    if (!gl || !model) return null;
    const positions = [];
    const normals = [];
    const colors = [];

    model.materials.forEach((material) => {
      const materialInfo = materialMap.get(material.name);
      const base = colorToArray(displayMaterialColor(material.name, materialInfo));
      material.faces.forEach(([a, b, c]) => {
        const pa = model.vertices[a];
        const pb = model.vertices[b];
        const pc = model.vertices[c];
        if (!pa || !pb || !pc) return;

        const ux = pb[0] - pa[0];
        const uy = pb[1] - pa[1];
        const uz = pb[2] - pa[2];
        const vx = pc[0] - pa[0];
        const vy = pc[1] - pa[1];
        const vz = pc[2] - pa[2];
        let nx = uy * vz - uz * vy;
        let ny = uz * vx - ux * vz;
        let nz = ux * vy - uy * vx;
        const length = Math.hypot(nx, ny, nz) || 1;
        nx /= length;
        ny /= length;
        nz /= length;

        [pa, pb, pc].forEach((point) => {
          positions.push(point[0], point[1], point[2]);
          normals.push(nx, ny, nz);
          colors.push(base[0], base[1], base[2]);
        });
      });
    });

    return {
      positionBuffer: createBuffer(positions),
      normalBuffer: createBuffer(normals),
      colorBuffer: createBuffer(colors),
      vertexCount: positions.length / 3
    };
  };

  const renderWebglModel = () => {
    if (!gl || !webglProgram || !webglModel || !canvas) return false;
    resizeCanvas();
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.disable(gl.CULL_FACE);
    gl.clearColor(0.94, 0.96, 0.95, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.useProgram(webglProgram.program);

    const aspect = canvas.width / Math.max(1, canvas.height);
    const projection = perspectiveMatrix((32 * Math.PI) / 180, aspect, 0.08, 100);
    const translate = translationMatrix(0, -0.06, -5.65 / zoom);
    const rotateX = rotationXMatrix((rotationX * Math.PI) / 180);
    const rotateY = rotationYMatrix((rotationY * Math.PI) / 180);
    const view = multiplyMatrix(translate, multiplyMatrix(rotateX, rotateY));
    const matrix = multiplyMatrix(projection, view);
    const normalMatrix = multiplyMatrix(rotateX, rotateY);

    gl.uniformMatrix4fv(webglProgram.matrix, false, matrix);
    gl.uniformMatrix4fv(webglProgram.normalMatrix, false, normalMatrix);

    gl.bindBuffer(gl.ARRAY_BUFFER, webglModel.positionBuffer);
    gl.enableVertexAttribArray(webglProgram.position);
    gl.vertexAttribPointer(webglProgram.position, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, webglModel.normalBuffer);
    gl.enableVertexAttribArray(webglProgram.normal);
    gl.vertexAttribPointer(webglProgram.normal, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, webglModel.colorBuffer);
    gl.enableVertexAttribArray(webglProgram.color);
    gl.vertexAttribPointer(webglProgram.color, 3, gl.FLOAT, false, 0, 0);

    gl.drawArrays(gl.TRIANGLES, 0, webglModel.vertexCount);
    return true;
  };

  const renderModel = () => {
    renderRequested = false;
    if (renderWebglModel()) return;
    if (!model || !canvas || !context) return;
    resizeCanvas();

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    context.clearRect(0, 0, width, height);
    context.fillStyle = "rgba(1, 17, 44, 0.34)";
    context.fillRect(0, 0, width, height);

    const rx = (rotationX * Math.PI) / 180;
    const ry = (rotationY * Math.PI) / 180;
    const cosX = Math.cos(rx);
    const sinX = Math.sin(rx);
    const cosY = Math.cos(ry);
    const sinY = Math.sin(ry);
    const scale = Math.min(width, height) * 0.33 * zoom;
    const projected = model.vertices.map(([x, y, z]) => {
      const x1 = x * cosY - z * sinY;
      const z1 = x * sinY + z * cosY;
      const y1 = y * cosX - z1 * sinX;
      const z2 = y * sinX + z1 * cosX;
      const perspective = 1 / (1 + (z2 + 4.2) * 0.12);
      return {
        x: width / 2 + x1 * scale * perspective,
        y: height / 2 - y1 * scale * perspective,
        z: z2
      };
    });

    const triangles = [];
    model.materials.forEach((material) => {
      const materialInfo = materialMap.get(material.name);
      const baseColor = displayMaterialColor(material.name, materialInfo);
      material.faces.forEach(([a, b, c]) => {
        const pa = projected[a];
        const pb = projected[b];
        const pc = projected[c];
        if (!pa || !pb || !pc) return;
        const area = (pb.x - pa.x) * (pc.y - pa.y) - (pb.y - pa.y) * (pc.x - pa.x);
        if (area < 0.05) return;
        const depth = (pa.z + pb.z + pc.z) / 3;
        const shade = Math.max(0.58, Math.min(1.18, 0.82 + depth * 0.05));
        triangles.push({ pa, pb, pc, depth, color: shadeColor(baseColor, shade) });
      });
    });

    triangles.sort((a, b) => a.depth - b.depth);
    triangles.forEach(({ pa, pb, pc, color }) => {
      context.beginPath();
      context.moveTo(pa.x, pa.y);
      context.lineTo(pb.x, pb.y);
      context.lineTo(pc.x, pc.y);
      context.closePath();
      context.fillStyle = color;
      context.fill();
    });

    context.strokeStyle = "rgba(216, 246, 255, 0.18)";
    context.lineWidth = 1;
    context.strokeRect(14, 14, width - 28, height - 28);
  };

  function requestModelRender() {
    if (!model || renderRequested) return;
    renderRequested = true;
    window.requestAnimationFrame(renderModel);
  }

  viewer.classList.add("is-model-loading");

  const materialRequest = fetch("references/contents/hid%203d.mtl")
    .then((response) => (response.ok ? response.text() : Promise.reject(new Error("MTL not found"))))
    .then((source) => setMaterials(parseMtlMaterials(source)))
    .catch(() => {
      if (materialList) materialList.innerHTML = "<span>Anyagfájl nem tölthető be</span>";
    });

  const loadBridgeModel = () =>
    fetch("references/contents/hid-3d-ultra.json")
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error("Ultra OBJ not found"))))
      .then((payload) => {
        viewer.classList.add("is-ultra-model");
        return payload;
      })
      .catch(() =>
        fetch("references/contents/hid-3d-quality.json")
          .then((response) => (response.ok ? response.json() : Promise.reject(new Error("Quality OBJ not found"))))
      )
      .then((payload) => {
        viewer.classList.add("is-quality-model");
        return payload;
      })
      .catch(() =>
        fetch("references/contents/hid-3d-optimized.json")
          .then((response) => (response.ok ? response.json() : Promise.reject(new Error("Optimized OBJ not found"))))
      );

  const modelRequest = canvas && (gl || context)
    ? loadBridgeModel()
        .then((payload) => {
          model = payload;
          viewer.classList.add("is-model-loaded");
          requestModelRender();
        })
        .catch(() => {
          viewer.classList.remove("is-model-loaded");
        })
    : Promise.resolve();

  Promise.allSettled([materialRequest, modelRequest]).finally(() => {
    if (gl && model && !webglModel) {
      try {
        webglProgram = createWebglProgram();
        webglModel = buildWebglModel();
        viewer.classList.add("is-webgl-model");
      } catch {
        webglProgram = null;
        webglModel = null;
        viewer.classList.remove("is-webgl-model");
      }
    }
    viewer.classList.remove("is-model-loading");
    requestModelRender();
  });

  viewer.addEventListener("pointerdown", (event) => {
    activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    isDragging = true;
    previousX = event.clientX;
    previousY = event.clientY;
    previousPinchDistance = 0;
    viewer.setPointerCapture?.(event.pointerId);
  });

  viewer.addEventListener("pointermove", (event) => {
    if (!activePointers.has(event.pointerId)) return;
    activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });

    if (activePointers.size >= 2) {
      const points = [...activePointers.values()];
      const distance = Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y);
      if (previousPinchDistance) {
        setZoom(zoom + (distance - previousPinchDistance) * 0.0045);
      }
      previousPinchDistance = distance;
      return;
    }

    if (!isDragging) return;
    const deltaX = event.clientX - previousX;
    const deltaY = event.clientY - previousY;
    previousX = event.clientX;
    previousY = event.clientY;
    rotationY += deltaX * 0.35;
    rotationX = Math.max(-82, Math.min(72, rotationX - deltaY * 0.34));
    applyRotation();
  });

  ["pointerup", "pointercancel", "pointerleave"].forEach((eventName) => {
    viewer.addEventListener(eventName, (event) => {
      activePointers.delete(event.pointerId);
      isDragging = activePointers.size > 0;
      previousPinchDistance = 0;
    });
  });

  viewer.addEventListener("wheel", (event) => {
    event.preventDefault();
    setZoom(zoom - event.deltaY * 0.0014);
  }, { passive: false });

  zoomButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setZoom(zoom + (button.dataset.bridgeZoom === "in" ? 0.16 : -0.16));
    });
  });

  zoomSlider?.addEventListener("input", () => {
    setZoom(Number(zoomSlider.value));
  });

  window.addEventListener("resize", requestModelRender);
  applyRotation();
}

menuButton?.addEventListener("click", () => {
  const isOpen = header.classList.toggle("menu-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

const navGroups = document.querySelectorAll(".nav-group");

navGroups.forEach((group) => {
  const parent = group.querySelector(".nav-parent");
  const submenu = group.querySelector(".nav-submenu");
  if (!parent || !submenu) return;

  parent.setAttribute("role", "button");
  parent.setAttribute("aria-haspopup", "true");
  parent.setAttribute("aria-expanded", "false");

  parent.addEventListener("click", (event) => {
    event.preventDefault();
    const willOpen = !group.classList.contains("is-submenu-open");

    navGroups.forEach((item) => {
      item.classList.remove("is-submenu-open");
      item.querySelector(".nav-parent")?.setAttribute("aria-expanded", "false");
    });

    group.classList.toggle("is-submenu-open", willOpen);
    parent.setAttribute("aria-expanded", String(willOpen));
  });
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", (event) => {
    if (event.currentTarget.classList.contains("nav-parent")) return;
    header.classList.remove("menu-open");
    navGroups.forEach((group) => {
      group.classList.remove("is-submenu-open");
      group.querySelector(".nav-parent")?.setAttribute("aria-expanded", "false");
    });
    menuButton?.setAttribute("aria-expanded", "false");
  });
});

document.addEventListener("click", (event) => {
  if (event.target.closest(".nav-group")) return;
  navGroups.forEach((group) => {
    group.classList.remove("is-submenu-open");
    group.querySelector(".nav-parent")?.setAttribute("aria-expanded", "false");
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  navGroups.forEach((group) => {
    group.classList.remove("is-submenu-open");
    group.querySelector(".nav-parent")?.setAttribute("aria-expanded", "false");
  });
});

languageButtons.forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.lang));
});

window.addEventListener("mousemove", (event) => {
  if (!cursorGlow) return;
  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index * 70, 280)}ms`;
  observer.observe(item);
});

window.ValidPlanContentReady.finally(() => {
  window.ValidPlanTranslations = translations;
  setLanguage(getRequestedLanguage() || localStorage.getItem(languageStorageKey) || siteSettings.defaultLanguage || "hu");
  renderLocalReferences();
  initializeContactForms();
  initializeBridgeViewer();
});
