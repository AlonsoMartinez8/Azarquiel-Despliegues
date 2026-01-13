"use client";

import { useEffect, useMemo, useState } from "react";
import { QrCode, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function QrShare() {
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [pageUrl, setPageUrl] = useState("");

  useEffect(() => {
    setPageUrl(window.location.href);
  }, []);

  useEffect(() => {
    if (!isQrOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsQrOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isQrOpen]);

  useEffect(() => {
    if (!isQrOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isQrOpen]);

  const qrUrl = useMemo(() => {
    if (!pageUrl) return "";

    const encodedUrl = encodeURIComponent(pageUrl);
    return `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodedUrl}`;
  }, [pageUrl]);

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="rounded-full cursor-pointer"
        aria-haspopup="dialog"
        aria-expanded={isQrOpen}
        onClick={() => setIsQrOpen(true)}
      >
        <QrCode />
      </Button>
      {isQrOpen ? (
        <div className="absolute h-screen w-full inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setIsQrOpen(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="qr-modal-title"
            className="relative z-10 flex flex-col gap-2 w-full max-w-lg rounded-md border border-border bg-card p-4 shadow-xl animate-in fade-in zoom-in-95 duration-200"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-2">
                <h2 id="qr-modal-title" className="text-lg font-semibold">
                  QR de esta página
                </h2>
                <p className="text-xs text-muted-foreground break-all">
                  {pageUrl || "Cargando URL..."}
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="icon-sm"
                className="rounded-full cursor-pointer"
                onClick={() => setIsQrOpen(false)}
              >
                <X />
                <span className="sr-only">Cerrar</span>
              </Button>
            </div>
            <div className="flex items-center justify-center rounded-xl border border-border bg-background p-4">
              {qrUrl ? (
                <img
                  src={qrUrl}
                  alt="Código QR de la página"
                  className="size-80"
                  loading="eager"
                />
              ) : (
                <p className="text-sm text-muted-foreground">Generando QR...</p>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Generado con QRServer.
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}
