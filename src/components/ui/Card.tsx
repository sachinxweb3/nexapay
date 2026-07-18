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
      className={`rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-sm ${className}`}
    >
      {title && (
        <h2 className="mb-4 text-lg font-semibold text-white">
          {title}
        </h2>
      )}

      {children}
    </div>
  );
}