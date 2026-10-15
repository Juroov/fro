import { FileText, Phone } from "lucide-react";

export default function FloatingCTA() {
  return (
    <aside className="mobile-action-bar" aria-label="Quick contact actions">
      <a href="tel:+639063665473">
        <Phone size={19} aria-hidden="true" />
        <span>Call</span>
      </a>
      <a className="mobile-action-bar__primary" href="#contact">
        <FileText size={19} aria-hidden="true" />
        <span>Get a quote</span>
      </a>
    </aside>
  );
}
