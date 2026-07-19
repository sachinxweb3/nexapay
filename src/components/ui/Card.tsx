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
        relative overflow-hidden
        rounded-3xl
        border border-white/10
        bg-white/[0.04]
        backdrop-blur-xl
        shadow-[0_0_40px_rgba(0,0,0,0.35)]
        transition-all
        duration-300
        hover:border-emerald-500/30
        hover:shadow-[0_0_50px_rgba(16,185,129,0.15)]
        ${className}
      `}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-emerald-500/[0.03]" />

      <div className="relative p-6">
        {title && (
          <h2 className="mb-5 text-lg font-bold tracking-wide text-white">
            {title}
          </h2>
        )}

        {children}
      </div>
    </div>
  );
}