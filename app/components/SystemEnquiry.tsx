"use client";

import { ArrowRight, Mail, Phone, X } from "lucide-react";
import { createContext, useContext, useMemo, useRef, useState, type ReactNode } from "react";

type Enquiry = { service: string | null; select: (service: string | null) => void };
const EnquiryContext = createContext<Enquiry | null>(null);

export function EnquiryProvider({ children }: { children: ReactNode }) {
  const [service, select] = useState<string | null>(null);
  const value = useMemo(() => ({ service, select }), [service]);
  return <EnquiryContext.Provider value={value}>{children}</EnquiryContext.Provider>;
}

function useEnquiry() {
  const enquiry = useContext(EnquiryContext);
  if (!enquiry) throw new Error("System enquiry controls need EnquiryProvider.");
  return enquiry;
}

export function SystemEnquiryLink({ system }: { system: string }) {
  const { service, select } = useEnquiry();
  return (
    <a className="system-card__action" href="#contact" aria-label={`Plan this system: ${system}`}
      data-selected={service === system ? "true" : undefined}
      onClick={event => {
        if (!event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) select(system);
      }}>
      <span>{service === system ? "System selected" : "Plan this system"}</span><ArrowRight size={17} aria-hidden="true" />
    </a>
  );
}

export function EnquiryContactActions() {
  const { service, select } = useEnquiry();
  const emailLink = useRef<HTMLAnchorElement>(null);
  const address = "frosolar.energysolutions@gmail.com";
  const subject = service ? `Solar site assessment — ${service}` : "Solar site assessment";
  const body = service
    ? `Hi FRO Solar,\n\nI'm interested in ${service}.\n\nProperty location:\nTypical monthly electric bill:\nBackup power needs:\n\nPlease help me arrange a site assessment.`
    : "";
  const emailHref = service ? `mailto:${address}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}` : `mailto:${address}`;

  return (
    <>
      <div className="enquiry-selection" aria-live="polite" aria-atomic="true">
        {service && <div className="enquiry-selection__content">
          <span>Your selected system<strong>{service}</strong></span>
          <button type="button" aria-label="Clear selected system" onClick={() => { select(null); emailLink.current?.focus({ preventScroll: true }); }}><X size={19} aria-hidden="true" /></button>
        </div>}
      </div>
      <div className="contact__actions">
        <a className="button button--primary button--large" href="tel:+639063665473"><Phone size={18} aria-hidden="true" /> Call 0906 366 5473</a>
        <a ref={emailLink} className="button button--outline-light button--large" href={emailHref}><Mail size={18} aria-hidden="true" />{service ? "Email about this system" : "Send an email"}</a>
      </div>
    </>
  );
}
