"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "@/lib/analytics";
import type { InvestmentBand } from "@/lib/config";
import { leadForm } from "@/lib/content";
import {
  FIELD_LIMITS,
  type FieldErrors,
  type LeadFieldName,
  type LeadInput,
  coerceLeadInput,
  errorFieldList,
  validateLead,
} from "@/lib/validation";
import styles from "./LeadForm.module.css";

type Props = {
  /** true solo se webhook CRM e informativa privacy sono configurati lato server. */
  isLive: boolean;
  privacyUrl: string | null;
  bands: ReadonlyArray<InvestmentBand>;
  marketing: { label: string } | null;
};

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "demo" }
  | { kind: "error"; message: string };

const EMPTY: LeadInput = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  area: "",
  investmentMode: "text",
  investment: "",
  experience: "",
  message: "",
  privacyAck: false,
  marketingConsent: false,
  website: "",
};

const DEMO_MESSAGE = "Modulo dimostrativo: nessun dato è stato inviato.";

export function LeadForm({ isLive, privacyUrl, bands, marketing }: Props) {
  const investmentMode = bands.length > 0 ? "band" : "text";
  const [values, setValues] = useState<LeadInput>({ ...EMPTY, investmentMode });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [summary, setSummary] = useState("");
  const started = useRef(false);
  const busy = useRef(false);
  const focusPending = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);

  const set = <K extends keyof LeadInput>(key: K, value: LeadInput[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key as LeadFieldName]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onFirstInteraction = () => {
    if (started.current) return;
    started.current = true;
    track("form_start", { section: "candidatura", investment_mode: investmentMode });
  };

  const focusFirstError = (errs: FieldErrors) => {
    const first = errorFieldList(errs)[0];
    if (!first) return;
    formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  };

  const showErrors = (errs: FieldErrors) => {
    setErrors(errs);
    const fields = errorFieldList(errs);
    setSummary(
      fields.length === 1 ? "Controlla il campo evidenziato." : `Controlla i ${fields.length} campi evidenziati.`,
    );
    track("form_validation_error", { fields: fields.join(","), error_count: fields.length });
    // Il focus va spostato dopo il render degli errori (vedi useEffect sotto).
    focusPending.current = true;
  };

  useEffect(() => {
    if (!focusPending.current) return;
    focusPending.current = false;
    focusFirstError(errors);
  }, [errors]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy.current) return;

    const input = coerceLeadInput(values);
    const check = validateLead(input, bands.map((b) => b.value), marketing !== null);
    if (!check.ok && !check.spam) {
      showErrors(check.errors);
      return;
    }

    setErrors({});
    setSummary("");
    track("form_submit_attempt", { section: "candidatura" });

    if (!isLive) {
      // Demo: i dati non lasciano il browser.
      setStatus({ kind: "demo" });
      track("lead_submit_error", { reason: "not_configured" });
      return;
    }

    busy.current = true;
    setStatus({ kind: "submitting" });
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const data = (await res.json().catch(() => null)) as
        | { ok: boolean; code?: string; message?: string; errors?: FieldErrors }
        | null;

      if (res.ok && data?.ok) {
        setStatus({ kind: "success" });
        setValues({ ...EMPTY, investmentMode });
        started.current = false;
        track("lead_submit_success", { section: "candidatura" });
        return;
      }

      if (data?.code === "not_configured") {
        setStatus({ kind: "demo" });
        track("lead_submit_error", { reason: "not_configured" });
        return;
      }

      if (data?.code === "invalid" && data.errors) {
        setStatus({ kind: "idle" });
        showErrors(data.errors);
        track("lead_submit_error", { reason: "invalid" });
        return;
      }

      setStatus({
        kind: "error",
        message: data?.message ?? "Non è stato possibile inviare la richiesta. Riprova più tardi.",
      });
      track("lead_submit_error", { reason: data?.code ?? `http_${res.status}` });
    } catch {
      setStatus({
        kind: "error",
        message: "Connessione non riuscita. Controlla la rete e riprova.",
      });
      track("lead_submit_error", { reason: "network" });
    } finally {
      busy.current = false;
    }
  }

  const fieldProps = (name: LeadFieldName) => ({
    id: `f-${name}`,
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `e-${name}` : undefined,
  });

  const errorText = (name: LeadFieldName) =>
    errors[name] ? (
      <p id={`e-${name}`} className={styles.error}>
        {errors[name]}
      </p>
    ) : null;

  const submitting = status.kind === "submitting";

  return (
    <section id="candidatura" className={`section ${styles.section}`} aria-labelledby="candidatura-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.intro}>
          <h2 id="candidatura-title">{leadForm.title}</h2>
          <p className="lead">{leadForm.intro}</p>

        </div>

        <form ref={formRef} className={styles.form} noValidate onSubmit={onSubmit} onFocus={onFirstInteraction}>
          {!isLive && (
            <p className={styles.demoBanner} role="note">
              <strong>Modulo dimostrativo.</strong> L’invio non è ancora collegato: i dati inseriti non vengono
              trasmessi né salvati.
            </p>
          )}

          <p className={styles.requiredNote}>
            I campi contrassegnati con <span aria-hidden="true">*</span>
            <span className="visually-hidden">asterisco</span> sono obbligatori.
          </p>


          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="f-firstName">
                Nome <span aria-hidden="true">*</span>
              </label>
              <input
                {...fieldProps("firstName")}
                type="text"
                autoComplete="given-name"
                aria-required="true"
                maxLength={FIELD_LIMITS.firstName}
                value={values.firstName}
                onChange={(e) => set("firstName", e.target.value)}
              />
              {errorText("firstName")}
            </div>
            <div className={styles.field}>
              <label htmlFor="f-lastName">
                Cognome <span aria-hidden="true">*</span>
              </label>
              <input
                {...fieldProps("lastName")}
                type="text"
                autoComplete="family-name"
                aria-required="true"
                maxLength={FIELD_LIMITS.lastName}
                value={values.lastName}
                onChange={(e) => set("lastName", e.target.value)}
              />
              {errorText("lastName")}
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="f-email">
                Email <span aria-hidden="true">*</span>
              </label>
              <input
                {...fieldProps("email")}
                type="email"
                inputMode="email"
                autoComplete="email"
                aria-required="true"
                maxLength={FIELD_LIMITS.email}
                value={values.email}
                onChange={(e) => set("email", e.target.value)}
              />
              {errorText("email")}
            </div>
            <div className={styles.field}>
              <label htmlFor="f-phone">
                Telefono <span aria-hidden="true">*</span>
              </label>
              <input
                {...fieldProps("phone")}
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                aria-required="true"
                maxLength={FIELD_LIMITS.phone}
                value={values.phone}
                onChange={(e) => set("phone", e.target.value)}
              />
              {errorText("phone")}
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="f-area">
              Città/provincia di interesse <span aria-hidden="true">*</span>
            </label>
            <input
              {...fieldProps("area")}
              type="text"
              autoComplete="address-level2"
              aria-required="true"
              maxLength={FIELD_LIMITS.area}
              value={values.area}
              onChange={(e) => set("area", e.target.value)}
            />
            {errorText("area")}
          </div>

          <div className={styles.field}>
            <label htmlFor="f-investment">
              Disponibilità indicativa di investimento <span className={styles.optional}>(facoltativo)</span>
            </label>
            {bands.length > 0 ? (
              <select
                {...fieldProps("investment")}
                value={values.investment}
                onChange={(e) => set("investment", e.target.value)}
              >
                <option value="">Seleziona una fascia</option>
                {bands.map((b) => (
                  <option key={b.value} value={b.value}>
                    {b.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                {...fieldProps("investment")}
                type="text"
                autoComplete="off"
                maxLength={FIELD_LIMITS.investment}
                value={values.investment}
                onChange={(e) => set("investment", e.target.value)}
              />
            )}
            {errorText("investment")}
          </div>

          <div className={styles.field}>
            <label htmlFor="f-experience">
              Esperienza nel settore <span className={styles.optional}>(facoltativo)</span>
            </label>
            <input
              {...fieldProps("experience")}
              type="text"
              autoComplete="off"
              maxLength={FIELD_LIMITS.experience}
              value={values.experience}
              onChange={(e) => set("experience", e.target.value)}
            />
            {errorText("experience")}
          </div>

          <div className={styles.field}>
            <label htmlFor="f-message">
              Messaggio <span className={styles.optional}>(facoltativo)</span>
            </label>
            <textarea
              {...fieldProps("message")}
              rows={4}
              maxLength={FIELD_LIMITS.message}
              value={values.message}
              onChange={(e) => set("message", e.target.value)}
            />
            {errorText("message")}
          </div>

          {/* Honeypot anti-spam: invisibile alle persone, ignorato dagli screen reader. */}
          <div className={styles.hp} aria-hidden="true">
            <label htmlFor="f-website">Sito web</label>
            <input
              id="f-website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={values.website}
              onChange={(e) => set("website", e.target.value)}
            />
          </div>

          <div className={styles.consents}>
            <div className={styles.check}>
              <input
                {...fieldProps("privacyAck")}
                type="checkbox"
                aria-required="true"
                checked={values.privacyAck}
                onChange={(e) => set("privacyAck", e.target.checked)}
              />
              <label htmlFor="f-privacyAck">
                Ho preso visione dell’
                {privacyUrl ? (
                  <a href={privacyUrl} target="_blank" rel="noopener noreferrer">
                    informativa privacy
                    <span className="visually-hidden"> (si apre in una nuova scheda)</span>
                  </a>
                ) : (
                  <>
                    informativa privacy <span className={styles.pending}>(in fase di pubblicazione)</span>
                  </>
                )}{" "}
                <span aria-hidden="true">*</span>
              </label>
            </div>
            {errorText("privacyAck")}

            {marketing && (
              <div className={styles.check}>
                <input
                  id="f-marketingConsent"
                  name="marketingConsent"
                  type="checkbox"
                  checked={values.marketingConsent}
                  onChange={(e) => set("marketingConsent", e.target.checked)}
                />
                <label htmlFor="f-marketingConsent">
                  {marketing.label} <span className={styles.optional}>(facoltativo)</span>
                </label>
              </div>
            )}
          </div>

          <p className="visually-hidden" aria-live="polite">
            {summary}
          </p>

          <button type="submit" className={`btn btn-primary ${styles.submit}`} disabled={submitting} aria-disabled={submitting}>
            {submitting ? "Invio in corso…" : leadForm.submit}
          </button>
          <p className={styles.microcopy}>{leadForm.microcopy}</p>

          <div className={styles.status} role="status" aria-live="polite">
            {status.kind === "success" && (
              <p className={styles.success}>Richiesta inviata. Grazie: ti ricontatteremo per un primo confronto.</p>
            )}
            {status.kind === "demo" && <p className={styles.demo}>{DEMO_MESSAGE}</p>}
            {status.kind === "error" && <p className={styles.failure}>{status.message}</p>}
          </div>
        </form>
      </div>
    </section>
  );
}
