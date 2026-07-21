import { ReactNode } from "react";

interface CardProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export default function Card({
  title,
  children,
  className = "",
}: CardProps) {
  return (
    <div
      className={`
        group
        relative
        overflow-hidden
        rounded-[28px]
        border border-white/10
        bg-gradient-to-br
        from-white/[0.08]
        via-white/[0.04]
        to-white/[0.02]
        backdrop-blur-2xl
        shadow-[0_10px_50px_rgba(0,0,0,0.45)]
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-sky-400/30
        hover:shadow-[0_20px_60px_rgba(56,189,248,0.15)]
        ${className}
      `}
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-500/[0.05] via-transparent to-violet-500/[0.04]" />

      {/* Top Highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-60" />

      {/* Hover Glow */}
      <div className="absolute -top-20 right-0 h-40 w-40 rounded-full bg-sky-500/10 blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative p-6 lg:p-7">
        {title && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold tracking-wide text-white">
              {title}
            </h2>

            <div className="mt-3 h-px w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent" />
          </div>
        )}

        {children}
      </div>
    </div>
  );
}