(function () {
  const RECOMMENDATIONS = {
    "assessment-roadmap": {
      type: "Service",
      title: "Assessment & Roadmap",
      why: "passt, wenn zuerst Klarheit, Reihenfolge und eine belastbare Entscheidungsvorlage gebraucht werden.",
      result: "Priorisierte Roadmap mit Nutzen, Aufwand, Risiken und sinnvollem Pilot-Scope.",
      next: "Erstgespräch zur Ausgangslage und zu den wichtigsten Entscheidungsfragen."
    },
    "cloud-transformation": {
      type: "Leistung",
      title: "Cloud-Transformation",
      why: "passt, wenn Infrastruktur, Workloads, Kosten, Identitäten oder Betrieb neu geordnet werden müssen.",
      result: "Zielarchitektur und Migrationspfad für hybride oder cloudbasierte IT-Landschaften.",
      next: "Workloads, Betrieb und Sicherheitsanforderungen gemeinsam bewerten."
    },
    "data-analytics": {
      type: "Leistung",
      title: "Data & Analytics",
      why: "passt, wenn Kennzahlen, Datenquellen oder Reporting nicht verlässlich genug für Entscheidungen sind.",
      result: "Datenmodell, Kennzahlenlogik und Dashboard- oder KI-Vorbereitung.",
      next: "Datenquellen, Kennzahlen und Verantwortlichkeiten in einem kurzen Workshop ordnen."
    },
    "process-automation": {
      type: "Leistung",
      title: "Prozessautomatisierung",
      why: "passt, wenn manuelle Arbeit, Medienbrüche oder wiederkehrende Prüfungen Zeit und Qualität kosten.",
      result: "Bewerteter Pilot mit messbaren Erfolgskriterien und Übergabe in den Betrieb.",
      next: "Einen Prozess auswählen und Aufwand, Nutzen und Risiken eines Piloten bewerten."
    },
    "information-security": {
      type: "Leistung",
      title: "Informationssicherheit & Governance",
      why: "passt, wenn Risiken, Zugriffe, Nachweise, Kundenanforderungen oder NIS2-Fragen Druck erzeugen.",
      result: "Priorisierte Sicherheitsmaßnahmen mit Verantwortlichkeiten und Nachweisstruktur.",
      next: "Kritische Systeme, Zugriffe und Nachweispflichten gemeinsam priorisieren."
    },
    "training-enablement": {
      type: "Service",
      title: "Enablement & Schulung",
      why: "passt, wenn Akzeptanz, Rollen, Wissen und Veränderung über den Projekterfolg entscheiden.",
      result: "Enablement-Plan mit Key Usern, Schulungsformaten, Dokumentation und Feedback-Schleifen.",
      next: "Betroffene Rollen, Key User und Schulungsbedarf früh einordnen."
    },
    "operations-support": {
      type: "Service",
      title: "Betrieb & Support",
      why: "passt, wenn eine bestehende Lösung stabilisiert, weiterentwickelt oder nach dem Go-live betreut werden soll.",
      result: "Support- und Optimierungsrhythmus mit klaren Verantwortlichkeiten.",
      next: "Betriebsverantwortung, offene Punkte und Verbesserungsrhythmus klären."
    },
    "roi-vorlage": {
      type: "Checkliste",
      title: "Projekt-ROI-Checkliste",
      why: "hilft, wenn Nutzen, Aufwand und Risiken vor der Entscheidung vergleichbar werden müssen.",
      result: "Entscheidungsraster für Business Case, Aufwand, Risiko und Erfolgskriterien.",
      next: "Als Vorbereitung für Budget- und Priorisierungsgespräche nutzen."
    },
    "datenquellen-kompass": {
      type: "Checkliste",
      title: "Datenquellen-Kompass",
      why: "hilft, wenn viele Datenquellen existieren, aber unklar ist, welche verlässlich und führend sind.",
      result: "Übersicht über Datenquellen, Verantwortliche, Qualität und Kennzahlen.",
      next: "Datenquellen und Kennzahlen vor einem Dashboard- oder KI-Projekt erfassen."
    },
    "akzeptanz-check": {
      type: "Checkliste",
      title: "Mitarbeiter-Akzeptanz-Check",
      why: "hilft, wenn Einführung, Schulung und Rollen früh vorbereitet werden müssen.",
      result: "Akzeptanzbild mit betroffenen Rollen, Schulungsbedarf und Kommunikationspunkten.",
      next: "Vor Pilotstart mit Fachbereich, IT und Key Usern durchgehen."
    },
    "it-risiko-erstcheck": {
      type: "Checkliste",
      title: "IT-Risiko-Erstcheck",
      why: "hilft, wenn Risiken, kritische Systeme oder externe Abhängigkeiten zunächst grob eingeordnet werden müssen.",
      result: "Erste Risikolandkarte mit Handlungsfeldern und offenen Fragen.",
      next: "Kritische Systeme, Zugriffe, Wiederanlauf und Dienstleister erfassen."
    }
  };

  function val(id) {
    return document.getElementById(id)?.value || "";
  }

  function text(id) {
    const el = document.getElementById(id);
    return el?.options?.[el.selectedIndex]?.text || "";
  }

  function add(scores, id, value) {
    scores[id] = (scores[id] || 0) + value;
  }

  function isChecklistMode() {
    return new URLSearchParams(window.location.search).get("modus") === "checklisten";
  }

  function buildScores() {
    const scores = {};
    add(scores, "assessment-roadmap", 2);

    const pain = val("finder-pain");
    const goal = val("finder-goal");
    const systems = val("finder-systems");
    const maturity = val("finder-maturity");
    const pressure = val("finder-pressure");
    const budget = val("finder-budget");
    const adoption = val("finder-adoption");
    const dataQuality = val("finder-data-quality");
    const security = val("finder-security");
    const priority = val("finder-priority");

    if (maturity === "unclear" || pain === "unclear" || goal === "clarity") add(scores, "assessment-roadmap", 4);
    if (budget === "businesscase" || pressure === "board" || priority === "clarity") add(scores, "roi-vorlage", 4);

    if (systems === "legacy" || systems === "hybrid" || pain === "cloud" || goal === "architecture") add(scores, "cloud-transformation", 5);
    if (systems === "shadowit") add(scores, "assessment-roadmap", 2);

    if (pain === "data" || goal === "analytics" || dataQuality === "weak") {
      add(scores, "data-analytics", 5);
      add(scores, "datenquellen-kompass", 4);
    }
    if (dataQuality === "mixed") add(scores, "datenquellen-kompass", 3);

    if (pain === "manual" || goal === "automation" || systems === "manual" || priority === "speed") add(scores, "process-automation", 5);

    if (pain === "security" || goal === "security" || security === "high" || security === "nis2" || priority === "trust") {
      add(scores, "information-security", 5);
      add(scores, "it-risiko-erstcheck", 4);
    }

    if (goal === "enablement" || adoption === "critical" || adoption === "unclear" || priority === "adoption") {
      add(scores, "training-enablement", 5);
      add(scores, "akzeptanz-check", 4);
    }

    if (maturity === "scaled" || pressure === "aftercare") add(scores, "operations-support", 4);

    return scores;
  }

  function scoredRecommendations() {
    return Object.entries(buildScores())
      .filter(([, score]) => score >= 3)
      .sort((a, b) => b[1] - a[1])
      .map(([id, score]) => ({ id, score, ...RECOMMENDATIONS[id] }));
  }

  function checklistRecommendations() {
    const ranked = scoredRecommendations().filter((item) => item.type === "Checkliste");
    const fallback = ["roi-vorlage", "datenquellen-kompass", "akzeptanz-check", "it-risiko-erstcheck"]
      .map((id) => ({ id, score: 0, ...RECOMMENDATIONS[id] }));
    const seen = new Set(ranked.map((item) => item.id));
    const combined = [
      ...ranked,
      ...fallback.filter((item) => !seen.has(item.id))
    ];
    return combined.slice(0, ranked.length >= 3 ? 3 : 2);
  }

  function recommendations() {
    if (isChecklistMode()) return checklistRecommendations();

    const ranked = scoredRecommendations();
    const primary = ranked.filter((item) => item.type !== "Checkliste").slice(0, 2);
    const checklist = ranked.find((item) => item.type === "Checkliste");
    const result = checklist ? [...primary, checklist] : primary;

    if (!result.length) {
      return [{ id: "assessment-roadmap", ...RECOMMENDATIONS["assessment-roadmap"] }];
    }

    return result;
  }

  function finderContext() {
    return [
      `Rolle: ${text("finder-role")}`,
      `Branche: ${text("finder-industry")}`,
      `Größe: ${text("finder-size")}`,
      `Region: ${text("finder-region")}`,
      `Reifegrad: ${text("finder-maturity")}`,
      `Systemlage: ${text("finder-systems")}`,
      `Schmerzpunkt: ${text("finder-pain")}`,
      `Ziel: ${text("finder-goal")}`,
      `Zeitdruck: ${text("finder-pressure")}`,
      `Entscheidungsrahmen: ${text("finder-budget")}`,
      `Akzeptanz: ${text("finder-adoption")}`,
      `Datenqualität: ${text("finder-data-quality")}`,
      `Sicherheitsanforderung: ${text("finder-security")}`,
      `Priorität: ${text("finder-priority")}`
    ].join("; ");
  }

  function renderRecommendations() {
    const result = recommendations();
    const wrap = document.getElementById("finder-recommendations");
    const summary = document.getElementById("finder-summary");
    if (!wrap || !summary) return;

    if (isChecklistMode()) {
      const countLabel = result.length === 2 ? "zwei passende Checklisten" : "drei passende Checklisten";
      summary.textContent = `Wir empfehlen ${countLabel} zur Vorbereitung Ihrer nächsten Entscheidung.`;
    } else {
      const primaryCount = result.filter((item) => item.type !== "Checkliste").length;
      const hasChecklist = result.some((item) => item.type === "Checkliste");
      const primaryLabel = primaryCount === 1 ? "einen zentralen nächsten Schritt" : `${primaryCount} zentrale nächste Schritte`;
      summary.textContent = hasChecklist
        ? `Wir empfehlen ${primaryLabel} und eine passende Checkliste zur Vorbereitung.`
        : `Wir empfehlen ${primaryLabel} für den Einstieg.`;
    }

    wrap.innerHTML = result.map((item, index) => `
      <article class="recommendation">
        <span class="tag">${item.type}</span>
        <h3>${index + 1}. ${item.title}</h3>
        <p><strong>Warum passend:</strong> ${item.why}</p>
        <p><strong>Erwartetes Ergebnis:</strong> ${item.result}</p>
        <p><strong>Nächster Schritt:</strong> ${item.next}</p>
      </article>
    `).join("");
  }

  function recommendationIds() {
    return recommendations().map((item) => item.id);
  }

  function buildContext() {
    const ids = recommendationIds();

    if (window.VentumContact?.bundleContext) {
      const context = window.VentumContact.bundleContext(ids, finderContext());

      if (isChecklistMode()) {
        context.title = `${ids.length} passende Checklisten`;
        context.topic = "Checklisten-Auswahl";
        context.source = "Checklisten-Vergleich";
        context.message = context.message.replace(
          "Ich möchte die folgenden empfohlenen nächsten Schritte besprechen:",
          "Ich möchte die folgenden empfohlenen Checklisten besprechen:"
        );
      }

      return context;
    }

    if (isChecklistMode()) {
      return {
        title: `${ids.length} passende Checklisten`,
        topic: "Checklisten-Auswahl",
        source: "Checklisten-Vergleich",
        message: `Empfohlene Checklisten: ${recommendations().map((item) => item.title).join(", ")}\n\nAusgangslage: ${finderContext()}`
      };
    }

    return {
      title: "Empfehlung aus dem Lösungsfinder",
      topic: "Kombinierte Anfrage aus Analyse",
      source: "Geführte Analyse",
      message: `Empfehlungen: ${recommendations().map((item) => item.title).join(", ")}\n\nAusgangslage: ${finderContext()}`
    };
  }

  function applyModeCopy() {
    if (!isChecklistMode()) return;

    const heroTitle = document.querySelector(".page-hero h1");
    const heroText = document.querySelector(".page-hero p");
    const resultTitle = document.querySelector(".finder-result-step h2");
    const asideTitle = document.querySelector(".finder-aside h2");
    const asideText = document.querySelector(".finder-aside p");

    if (heroTitle) heroTitle.textContent = "Vergleichen Sie passende Checklisten.";
    if (heroText) heroText.textContent = "Die Analyse ordnet Ausgangslage, Ziel, Datenqualität, Sicherheitsdruck und Akzeptanz ein. Am Ende erhalten Sie zwei bis drei passende Checklisten, vorbereitet für das Kontaktformular.";
    if (resultTitle) resultTitle.textContent = "Empfohlene Checklisten";
    if (asideTitle) asideTitle.textContent = "Nach dem Vergleich";
    if (asideText) asideText.textContent = "Am Ende entsteht eine kurze Zusammenfassung mit den passenden Checklisten. Sie können sie direkt ins Kontaktformular übernehmen.";
  }

  document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("[data-finder]");
    if (!form) return;

    applyModeCopy();

    const steps = Array.from(form.querySelectorAll("[data-finder-step]"));
    const progress = form.querySelector("[data-finder-progress]");
    const progressBar = form.querySelector("[data-finder-progress-bar]");
    const prev = document.getElementById("finder-prev");
    const next = document.getElementById("finder-next");
    const reset = document.getElementById("finder-reset");
    const contact = document.getElementById("finder-contact");
    let currentStep = 0;

    function showStep(index) {
      currentStep = Math.max(0, Math.min(index, steps.length - 1));
      steps.forEach((step, stepIndex) => {
        step.classList.toggle("is-active", stepIndex === currentStep);
      });

      const stepNumber = currentStep + 1;
      if (progress) progress.textContent = `Schritt ${stepNumber} von ${steps.length}`;
      if (progressBar) progressBar.style.width = `${(stepNumber / steps.length) * 100}%`;
      if (prev) prev.disabled = currentStep === 0;
      if (next) {
        next.textContent = currentStep === steps.length - 2 ? "Ergebnis anzeigen" : "Weiter";
        next.style.display = currentStep === steps.length - 1 ? "none" : "inline-flex";
      }
      if (reset) reset.style.display = currentStep === 0 ? "none" : "inline-flex";

      if (currentStep === steps.length - 1) renderRecommendations();
    }

    form.querySelectorAll("select").forEach((select) => {
      select.addEventListener("change", () => {
        if (currentStep === steps.length - 1) renderRecommendations();
      });
    });

    prev?.addEventListener("click", () => showStep(currentStep - 1));
    next?.addEventListener("click", () => showStep(currentStep + 1));
    reset?.addEventListener("click", () => {
      form.querySelectorAll("select").forEach((select) => {
        select.selectedIndex = 0;
      });
      document.getElementById("finder-recommendations").innerHTML = "";
      showStep(0);
    });

    contact?.addEventListener("click", (event) => {
      event.preventDefault();

      if (window.VentumContact?.navigateToContact) {
        window.VentumContact.navigateToContact(buildContext(), "kontakt.html");
        return;
      }

      window.location.href = "kontakt.html";
    });

    showStep(0);
  });
})();
