import type { TextHeader1Props } from '../types/layout';

export default function TextHeader1({ title, subtitle }: TextHeader1Props) {
  return (
    <div>
      <h1 className="text-2xl font-bold">{title}</h1>
      {subtitle && <p className="mt-2 text-gray-600">{subtitle}</p>}
    </div>
  );
}
