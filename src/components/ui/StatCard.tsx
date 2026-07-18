import Card from "./Card";

interface StatCardProps {
  label: string;
  value: string;
  description?: string;
}

export default function StatCard({
  label,
  value,
  description,
}: StatCardProps) {
  return (
    <Card>
      <div className="space-y-2">
        <p className="text-sm font-medium text-zinc-400">
          {label}
        </p>

        <h3 className="text-3xl font-bold text-white">
          {value}
        </h3>

        {description && (
          <p className="text-sm text-zinc-500">
            {description}
          </p>
        )}
      </div>
    </Card>
  );
}