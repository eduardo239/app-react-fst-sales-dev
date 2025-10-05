import { cn } from '../styles/theme';

export default function ButtonSubmit({
  onClick,
  value,
}: {
  onClick: () => void;
  value: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'mt-6 w-full px-6 py-3 text-base font-medium text-white',
        'bg-gray-900 hover:bg-gray-800',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
      )}
    >
      {value || 'Submit'}
    </button>
  );
}
