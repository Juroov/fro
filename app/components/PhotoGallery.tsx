"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, Expand, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export type ProjectPhoto = { src: string; alt: string; caption: string; enhanced?: boolean };

export default function PhotoGallery({ photos, title, cover = false }: {
  photos: ProjectPhoto[]; title: string; cover?: boolean;
}) {
  const [active, setActive] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const isOpen = active !== null;

  useEffect(() => {
    if (!isOpen) return;
    const element = dialog.current;
    element?.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      element?.close();
      document.body.style.overflow = previousOverflow;
      trigger.current?.focus({ preventScroll: true });
    };
    // Keep the dialog open while the selected photograph changes.
  }, [isOpen]);

  const move = (direction: number) => setActive(index => index === null ? null : (index + direction + photos.length) % photos.length);
  const selected = active === null ? null : photos[active];

  return (
    <>
      <div className={cover ? "photo-cover" : "photo-grid"}>
        {(cover ? photos.slice(0, 1) : photos).map((photo, index) => (
          <button className="photo-tile" type="button" key={photo.src}
            aria-label={`View ${title}: ${photo.alt}`}
            onClick={event => { trigger.current = event.currentTarget; setActive(index); }}>
            <Image src={photo.src} alt={photo.alt} fill quality={90} sizes={cover ? "(max-width: 760px) 100vw, 33vw" : "(max-width: 600px) 100vw, 50vw"} />
            <span className="photo-tile__label"><Expand size={15} aria-hidden="true" />{cover ? `${photos.length} photos · View gallery` : photo.caption}</span>
          </button>
        ))}
      </div>
      <dialog ref={dialog} className="photo-dialog" aria-label={`${title} photo viewer`}
        onCancel={event => { event.preventDefault(); setActive(null); }}
        onClick={event => { if (event.target === event.currentTarget) setActive(null); }}
        onKeyDown={event => {
          if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
          if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
        }}>
        {selected && <div className="photo-dialog__inner">
          <div className="photo-dialog__header"><span>{title}</span><button type="button" aria-label="Close photo viewer" onClick={() => setActive(null)} autoFocus><X aria-hidden="true" /></button></div>
          <div className="photo-dialog__image"><Image src={selected.src} alt={selected.alt} fill quality={95} sizes="(max-width: 1132px) 100vw, 1100px" /></div>
          <div className="photo-dialog__footer">
            <div aria-live="polite"><strong>{selected.caption}</strong><span>{active! + 1} / {photos.length}{selected.enhanced ? " · AI-enhanced" : ""}</span><a className="photo-original-link" href={selected.src} target="_blank" rel="noopener noreferrer">Open 4K image <span className="sr-only">(opens in a new tab)</span></a></div>
            {photos.length > 1 && <div className="photo-dialog__arrows"><button type="button" aria-label="Previous photo" onClick={() => move(-1)}><ArrowLeft aria-hidden="true" /></button><button type="button" aria-label="Next photo" onClick={() => move(1)}><ArrowRight aria-hidden="true" /></button></div>}
          </div>
        </div>}
      </dialog>
    </>
  );
}
