const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-button");
const cursorGlow = document.querySelector(".cursor-glow");
const introLoader = document.querySelector(".intro-loader");
const introRedirect = document.body.dataset.introRedirect;
const shouldEnterIntro = document.body.dataset.introEntry === "true";
const revealItems = document.querySelectorAll(".reveal");
const languageButtons = document.querySelectorAll("[data-lang]");
const introSeenKey = "validplan-intro-seen";

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

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    finishIntro();
    if (introRedirect) {
      sessionStorage.setItem(introSeenKey, "true");
      window.setTimeout(() => window.location.replace(introRedirect), 120);
    }
  } else {
    window.setTimeout(finishIntro, 5000);
    if (introRedirect) {
      sessionStorage.setItem(introSeenKey, "true");
      window.setTimeout(() => window.location.replace(introRedirect), 5050);
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
      bridges: "Hidak",
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
    bridge: {
      aria: "Kirajzolódó blueprint tervrajz",
      header: "TERVRAJZ",
      axis: "tervezési tengely",
      note: "ív + pályalemez csomópont"
    },
    stats: {
      one: "Koncepció és előtervezés",
      two: "Statikai és kiviteli terv",
      three: "Műszaki támogatás a kivitelezésig"
    },
    page: {
      expertiseLead: "A ValidPlan a szerkezeti logikát, a részletek kivitelezhetőségét és a tiszta dokumentációt egyetlen tervezési rendszerként kezeli.",
      bridgesLead: "A hídoldal külön mutatja meg, milyen szerkezeti helyzetekre készülhet koncepció, statika és kivitelezhető részletterv.",
      processLead: "A folyamatoldal a projekt döntési pontjait választja szét, hogy az igényfelméréstől a részlettervig követhető legyen a mérnöki út.",
      contactLead: "Írj röviden a helyszínről, a szerkezetről vagy a tervezési fázisról, és a ValidPlan innen építi tovább a műszaki irányt."
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
    process: {
      eyebrow: "Módszer",
      title: "Tiszta tervút a felméréstől a megvalósításig",
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
      title: "Kezdjük el a következő híd tervét."
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
      bridges: "Bridges",
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
    bridge: {
      aria: "Animated blueprint plan illustration",
      header: "BLUEPRINT PLAN",
      axis: "design axis",
      note: "arch + deck node"
    },
    stats: {
      one: "Concept and preliminary design",
      two: "Structural and construction drawings",
      three: "Technical support through delivery"
    },
    page: {
      expertiseLead: "ValidPlan treats structural logic, buildable details and clear documentation as one connected design system.",
      bridgesLead: "The bridge page separates the structural situations where concept design, calculations and buildable details can be developed.",
      processLead: "The process page clarifies the project decision points, making the engineering route traceable from survey to detailed design.",
      contactLead: "Send a short note about the site, the structure or the design stage, and ValidPlan will build the technical direction from there."
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
    process: {
      eyebrow: "Method",
      title: "A clear design route from survey to delivery",
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
      title: "Let us start the next bridge plan."
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
      bridges: "Brücken",
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
    bridge: {
      aria: "Animierter Blueprint-Bauplan",
      header: "BAUPLAN",
      axis: "Planungsachse",
      note: "Bogen + Fahrbahnplatte Knoten"
    },
    stats: {
      one: "Konzept und Vorplanung",
      two: "Statik und Ausführungsplanung",
      three: "Technische Unterstützung bis zur Umsetzung"
    },
    page: {
      expertiseLead: "ValidPlan behandelt Tragwerkslogik, ausführbare Details und klare Dokumentation als ein zusammenhängendes Planungssystem.",
      bridgesLead: "Die Brückenseite zeigt getrennt, für welche Tragwerkssituationen Konzept, Statik und ausführbare Details entstehen können.",
      processLead: "Die Ablaufseite trennt die Entscheidungspunkte des Projekts, damit der Planungsweg von der Aufnahme bis zur Detailplanung nachvollziehbar bleibt.",
      contactLead: "Schreiben Sie kurz zu Standort, Bauwerk oder Planungsphase, und ValidPlan entwickelt daraus die technische Richtung weiter."
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
    process: {
      eyebrow: "Methode",
      title: "Ein klarer Planungsweg von der Aufnahme bis zur Umsetzung",
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
      title: "Beginnen wir mit dem nächsten Brückenplan."
    }
  }
};

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
  localStorage.setItem("validplan-language", dictionary);
}

menuButton?.addEventListener("click", () => {
  const isOpen = header.classList.toggle("menu-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    header.classList.remove("menu-open");
    menuButton?.setAttribute("aria-expanded", "false");
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

setLanguage(localStorage.getItem("validplan-language") || "hu");
