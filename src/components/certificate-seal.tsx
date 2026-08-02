import { Award } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * CertificateSeal — the embossed wax seal on the certificate.
 * A radial-gradient disc with a dashed inner ring, an award mark and a
 * "Verified" caption. Sizes are passed in because the hero preview and the
 * full certificate sheet render it at different scales.
 */
export function CertificateSeal({
  className,
  sizeClassName,
  size,
  iconSize,
  labelSize,
  insetClassName = "inset-[6px]",
}: {
  className?: string;
  /** Tailwind class for the outer square, when the size is fluid. */
  sizeClassName?: string;
  /** Fixed pixel size for the outer square. */
  size?: number;
  iconSize?: number;
  labelSize?: number;
  insetClassName?: string;
}) {
  return (
    <span
      className={cn(
        "cert-seal relative flex shrink-0 items-center justify-center",
        sizeClassName,
        className,
      )}
      style={size ? { width: size, height: size } : undefined}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full shadow-[0_3px_10px_rgba(20,20,15,.22)] [background:radial-gradient(circle_at_34%_30%,#D9603F_0%,#B4321A_52%,#7E2211_100%)]"
      />
      <span
        aria-hidden="true"
        className={cn(
          "absolute rounded-full border-[1.5px] border-dashed border-[rgba(251,250,246,.55)]",
          insetClassName,
        )}
      />
      <span className="relative flex flex-col items-center justify-center gap-[2px] text-[#FBFAF6]">
        <Award
          size={iconSize}
          style={
            iconSize
              ? undefined
              : { width: "clamp(24px,3vw,32px)", height: "clamp(24px,3vw,32px)" }
          }
        />
        <span
          className="font-mono font-medium uppercase tracking-[0.14em]"
          style={{ fontSize: labelSize ? `${labelSize}px` : "clamp(7px,.85vw,9px)" }}
        >
          Verified
        </span>
      </span>
    </span>
  );
}
