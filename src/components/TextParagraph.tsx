import type { TextParagraphProps } from '../types/layout';

export default function TextParagraph({ value, fontSize }: TextParagraphProps) {
  return (
    <div>
      <p className={`text-${fontSize} font-normal`}>{value}</p>
    </div>
  );
}
