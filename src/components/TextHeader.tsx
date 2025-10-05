import type { TextHeader1Props } from '../types/layout';

export default function TextHeader({
  value,
  subtitle,
  fontSize,
}: TextHeader1Props) {
  return (
    <div>
      <h1 className={`text-${fontSize} font-bold`}>{value}</h1>
      {subtitle && <p className="mt-2 text-gray-600">{subtitle}</p>}
    </div>
  );
}
