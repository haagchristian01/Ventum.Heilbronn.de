(function () {
  const CONTACT_STAGES = {
    unknown: "Problem unbekannt",
    orientation: "Orientierung: Problem erkannt, Einstieg unklar",
    comparison: "Vergleich: Anbieter und Optionen werden geprüft",
    decision: "Entscheidung: Nutzen, Aufwand und Risiko müssen klar werden",
    implementation: "Umsetzung: Projekt soll gestartet oder begleitet werden",
    aftercare: "Nachbetreuung: Folgeprojekt, Support oder Optimierung"
  };

  const FORMSPREE_ENDPOINT = "https://formspree.io/f/xeewwkew";
  const SUCCESS_MESSAGE = "Vielen Dank, Ihre Anfrage wurde erfolgreich erfasst. Wir melden uns zeitnah mit einer passenden Rückmeldung.";
  const CHECKLIST_DELIVERY = "Vielen Dank, Ihre Checklisten-Anfrage wurde erfolgreich erfasst. Wir melden uns zeitnah mit einer passenden Rückmeldung.";

  const OFFERS = {
    "erstgespraech": {
      title: "Erstgespräch vorbereiten",
      topic: "Erstgespräch / Orientierung",
      stage: CONTACT_STAGES.orientation,
      source: "Startseite",
      message: "Ich möchte ein unverbindliches Erstgespräch vorbereiten. Bitte melden Sie sich, damit wir Ausgangslage, Zielbild, mögliche nächste Schritte und einen passenden Einstieg gemeinsam einordnen können."
    },
    "startklarheit": {
      title: "Digitalisierungs-Startklarheit",
      topic: "Checkliste / Digitalisierungs-Startklarheit",
      stage: CONTACT_STAGES.orientation,
      source: "Checkliste",
      delivery: "checklist",
      message: "Ich möchte die Checkliste Digitalisierungs-Startklarheit anfragen. Bitte senden Sie mir die Unterlage zu und melden Sie sich bei Rückfragen."
    },
    "prozess-inventar": {
      title: "Prozess-Schmerzpunkte-Inventar",
      topic: "Checkliste / Prozess-Schmerzpunkte-Inventar",
      stage: CONTACT_STAGES.orientation,
      source: "Checkliste",
      delivery: "checklist",
      message: "Ich möchte das Prozess-Schmerzpunkte-Inventar anfragen. Bitte senden Sie mir die Checkliste zur strukturierten Prozessaufnahme zu."
    },
    "datenquellen-kompass": {
      title: "Datenquellen-Kompass",
      topic: "Checkliste / Datenquellen-Kompass",
      stage: CONTACT_STAGES.comparison,
      source: "Checkliste",
      delivery: "checklist",
      message: "Ich möchte den Datenquellen-Kompass anfragen. Bitte senden Sie mir die Unterlage zur Erfassung von Datenquellen, Kennzahlen und Verantwortlichkeiten zu."
    },
    "it-risiko-erstcheck": {
      title: "IT-Risiko-Erstcheck",
      topic: "Checkliste / IT-Risiko-Erstcheck",
      stage: CONTACT_STAGES.orientation,
      source: "Checkliste",
      delivery: "checklist",
      message: "Ich möchte den IT-Risiko-Erstcheck anfragen. Bitte senden Sie mir die Checkliste zur ersten Einordnung von Systemen, Zugriffen, Wiederanlauf und Lieferantenrisiken zu."
    },
    "roi-vorlage": {
      title: "Projekt-ROI-Checkliste",
      topic: "Checkliste / Projekt-ROI",
      stage: CONTACT_STAGES.decision,
      source: "Checkliste",
      delivery: "checklist",
      message: "Ich möchte die Projekt-ROI-Checkliste anfragen. Bitte senden Sie mir die Unterlage zur Bewertung von Nutzen, Aufwand, Risiken und Erfolgskriterien zu."
    },
    "akzeptanz-check": {
      title: "Mitarbeiter-Akzeptanz-Check",
      topic: "Checkliste / Mitarbeiter-Akzeptanz",
      stage: CONTACT_STAGES.implementation,
      source: "Checkliste",
      delivery: "checklist",
      message: "Ich möchte den Mitarbeiter-Akzeptanz-Check anfragen. Bitte senden Sie mir die Checkliste für Rollen, Schulungsbedarf und Kommunikation zu."
    },
    "tool-matrix": {
      title: "Tool-Auswahl-Bewertungsmatrix",
      topic: "Checkliste / Tool-Auswahl",
      stage: CONTACT_STAGES.comparison,
      source: "Checkliste",
      delivery: "checklist",
      message: "Ich möchte die Tool-Auswahl-Bewertungsmatrix anfragen. Bitte senden Sie mir die Matrix zum Vergleich von Anbietern, Funktionen, Schnittstellen und Betriebskosten zu."
    },
    "golive-plan": {
      title: "Go-live- & Nachbetreuungsplan",
      topic: "Checkliste / Go-live und Nachbetreuung",
      stage: CONTACT_STAGES.aftercare,
      source: "Checkliste",
      delivery: "checklist",
      message: "Ich möchte den Go-live- & Nachbetreuungsplan anfragen. Bitte senden Sie mir die Checkliste für Übergabe, Support und Optimierung nach dem Start zu."
    },
    "cloud-transformation": {
      title: "Cloud-Transformation",
      topic: "Cloud-Transformation",
      stage: CONTACT_STAGES.implementation,
      source: "Service",
      message: "Ich interessiere mich für Cloud-Transformation. Wir möchten Zielarchitektur, Migrationspfad, Betrieb und Sicherheit für ausgewählte Workloads klären."
    },
    "data-analytics": {
      title: "Data & Analytics",
      topic: "Data & Analytics",
      stage: CONTACT_STAGES.decision,
      source: "Service",
      message: "Ich interessiere mich für Data & Analytics. Wir möchten Datenquellen konsolidieren, Kennzahlen vereinheitlichen und ein belastbares Dashboard oder Datenmodell aufbauen."
    },
    "process-automation": {
      title: "Prozessautomatisierung",
      topic: "Prozessautomatisierung",
      stage: CONTACT_STAGES.decision,
      source: "Service",
      message: "Ich interessiere mich für Prozessautomatisierung. Wir möchten einen wiederkehrenden Ablauf analysieren und als 8-12-Wochen-Pilot messbar verbessern."
    },
    "information-security": {
      title: "Informationssicherheit & Governance",
      topic: "Informationssicherheit & Governance",
      stage: CONTACT_STAGES.orientation,
      source: "Service",
      message: "Ich interessiere mich für Informationssicherheit und Governance. Wir möchten Risiken, Rollen, Zugriffe und Nachweise strukturiert bewerten."
    },
    "assessment-roadmap": {
      title: "Assessment & Roadmap",
      topic: "Assessment / Roadmap",
      stage: CONTACT_STAGES.orientation,
      source: "Service",
      message: "Ich interessiere mich für ein Assessment mit Roadmap. Wir möchten aus einer unsicheren Ausgangslage einen priorisierten Projektfahrplan ableiten."
    },
    "training-enablement": {
      title: "Enablement & Schulung",
      topic: "Enablement / Schulung",
      stage: CONTACT_STAGES.implementation,
      source: "Service",
      message: "Ich interessiere mich für Enablement und Schulung. Wir möchten Mitarbeitende in die Einführung einbinden und Wissen nachhaltig übergeben."
    },
    "operations-support": {
      title: "Betrieb & Support",
      topic: "Betrieb / Support / Optimierung",
      stage: CONTACT_STAGES.aftercare,
      source: "Service",
      message: "Ich interessiere mich für Betrieb und Support. Wir möchten eine bestehende Lösung stabilisieren, optimieren oder nach dem Go-live weiterentwickeln."
    }
  };

  let currentContext = null;

  function showToast(message) {
    const toast = document.querySelector("[data-toast]");
    if (!toast) return;
    toast.textContent = message;
    toast.style.display = "block";
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => {
      toast.style.display = "none";
    }, 4200);
  }

  async function sendContactForm(context) {
    const payload = new URLSearchParams({
      _subject: "Neue Ventum Kontaktanfrage",
      name: context?.name || "",
      company: context?.company || "",
      email: context?.email || "",
      size: context?.size || "",
      topic: context?.topic || "",
      stage: context?.stage || "",
      source: context?.source || "Kontaktformular",
      message: context?.message || ""
    });

    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      },
      body: payload
    });

    if (!response.ok) {
      throw new Error(`Formspree request failed with ${response.status}`);
    }

    return response.json().catch(() => ({}));
  }

  function saveContext(context) {
    sessionStorage.setItem("ventumContactContext", JSON.stringify(context));
  }

  function clearContext() {
    currentContext = null;
    sessionStorage.removeItem("ventumContactContext");
  }

  function readContext() {
    const stored = sessionStorage.getItem("ventumContactContext");
    if (!stored) return null;
    try {
      return JSON.parse(stored);
    } catch (_) {
      return null;
    }
  }

  function setSelectValue(select, value) {
    if (!select || !value) return;
    const existing = Array.from(select.options).find((option) => option.value === value || option.text === value);
    if (!existing) {
      select.add(new Option(value, value));
    }
    select.value = existing ? existing.value : value;
  }

  function applyContext(context) {
    if (!context) return;
    currentContext = context;
    const topic = document.getElementById("contact-topic");
    const stage = document.getElementById("contact-stage");
    const message = document.getElementById("contact-message");
    const note = document.getElementById("contact-context-note");

    setSelectValue(topic, context.topic);
    setSelectValue(stage, context.stage);
    if (message) {
      message.value = context.message || "";
    }
    if (note) {
      note.style.display = "block";
      note.textContent = `Vorauswahl: ${context.source || "Website"} - ${context.title || context.topic || "Anfrage"}`;
    }
  }

  function resetContactForm(form) {
    clearContext();
    form?.reset();

    const note = document.getElementById("contact-context-note");
    const status = document.getElementById("contact-status");

    if (note) {
      note.style.display = "none";
      note.textContent = "";
    }

    if (status) {
      status.textContent = "";
      status.className = "form-status";
    }
  }

  function contextFromQuery() {
    const params = new URLSearchParams(window.location.search);
    const topic = params.get("topic");
    if (!topic) return null;
    return {
      title: topic,
      topic,
      stage: params.get("stage") || CONTACT_STAGES.orientation,
      source: params.get("source") || "Website",
      message: params.get("message") || `Ich interessiere mich für ${topic}. Bitte melden Sie sich für eine kurze Erstabstimmung.`
    };
  }

  function navigateToContact(context, path) {
    saveContext(context);
    const target = path || document.body.getAttribute("data-contact-path") || "kontakt.html";
    window.location.href = target;
  }

  function contactFormContext() {
    const value = (id) => document.getElementById(id)?.value?.trim() || "";
    const topic = value("contact-topic") || "Erstgespräch / Orientierung";
    const stage = value("contact-stage");
    const message = value("contact-message");
    const name = value("contact-name");
    const company = value("contact-company");
    const email = value("contact-email");
    const size = value("contact-size");

    return {
      title: topic,
      topic,
      stage,
      source: currentContext?.source || "Kontaktformular",
      name,
      company,
      email,
      size,
      message: [
        message || "Ich möchte ein Erstgespräch mit Ventum vereinbaren.",
        "",
        "Angaben aus dem Formular:",
        name ? `Name: ${name}` : "Name:",
        company ? `Unternehmen: ${company}` : "Unternehmen:",
        email ? `E-Mail: ${email}` : "E-Mail:",
        size ? `Unternehmensgröße: ${size}` : "",
        stage ? `Phase: ${stage}` : ""
      ].filter(Boolean).join("\n")
    };
  }

  function offerContext(id) {
    return OFFERS[id] || {
      title: id,
      topic: id,
      stage: CONTACT_STAGES.orientation,
      source: "Website",
      message: `Ich interessiere mich für ${id}. Bitte melden Sie sich für eine kurze Erstabstimmung.`
    };
  }

  function bundleContext(items, finderContext) {
    const selected = items.map((id) => offerContext(id));
    const titles = selected.map((item) => item.title);

    return {
      title: titles.length > 1 ? `${titles.length} empfohlene nächste Schritte` : titles[0],
      topic: titles.length > 1 ? "Kombinierte Anfrage aus Analyse" : selected[0]?.topic,
      stage: CONTACT_STAGES.decision,
      source: "Geführte Analyse",
      message: [
        "Ich möchte die folgenden empfohlenen nächsten Schritte besprechen:",
        ...selected.map((item) => `- ${item.title}: ${item.message}`),
        "",
        finderContext ? `Ausgangslage aus der Analyse: ${finderContext}` : ""
      ].filter(Boolean).join("\n")
    };
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-contact-offer]").forEach((el) => {
      el.addEventListener("click", (event) => {
        event.preventDefault();
        const context = offerContext(el.getAttribute("data-contact-offer"));
        navigateToContact(context, el.getAttribute("data-contact-path"));
      });
    });

    if (document.body.getAttribute("data-page") === "kontakt") {
      applyContext(contextFromQuery() || readContext());

      const form = document.querySelector("[data-contact-form]");
      if (form) {
        const status = document.getElementById("contact-status");
        const submit = form.querySelector('button[type="submit"]');
        const cancel = document.getElementById("contact-cancel");
        const submitLabel = submit?.textContent || "Anfrage senden";

        function setStatus(message, type) {
          if (!status) return;
          status.textContent = message;
          status.className = `form-status is-${type}`;
        }

        form.addEventListener("submit", async (event) => {
          event.preventDefault();
          currentContext = contactFormContext();

          if (submit) {
            submit.disabled = true;
            submit.textContent = "Anfrage wird gesendet...";
          }

          try {
            await sendContactForm(currentContext);
            const message = currentContext?.delivery === "checklist" || currentContext?.source === "Checkliste"
              ? CHECKLIST_DELIVERY
              : SUCCESS_MESSAGE;

            setStatus(message, "success");
            showToast(message);
          } catch (error) {
            console.error("Kontaktanfrage konnte nicht gesendet werden.", error);
            setStatus("Die Anfrage konnte nicht gesendet werden. Bitte prüfen Sie Ihre Eingaben und versuchen Sie es erneut.", "error");
            showToast("Die Anfrage konnte nicht gesendet werden.");
          } finally {
            if (submit) {
              submit.disabled = false;
              submit.textContent = submitLabel;
            }
          }
        });

        cancel?.addEventListener("click", () => {
          resetContactForm(form);
          showToast("Die Anfrage wurde abgebrochen.");
        });
      }
    }
  });

  window.VentumContact = {
    stages: CONTACT_STAGES,
    offers: OFFERS,
    saveContext,
    clearContext,
    applyContext,
    resetContactForm,
    navigateToContact,
    offerContext,
    bundleContext,
    sendContactForm,
    showToast
  };
})();
