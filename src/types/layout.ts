export interface ContentWrapperProps {
  children: React.ReactNode;
  variant?: 'default' | 'narrow' | 'wide' | 'full';
  spacing?: 'none' | 'tight' | 'default' | 'relaxed' | 'loose';
  backgroundColor?: 'none' | 'white' | 'gray' | 'primary';
  centered?: boolean;
  className?: string;
  containerClassName?: string;
}

export interface FilterOption {
  id: string;
  label: string;
}

export interface PriceOption {
  id: string;
  label: string;
  range: { min: number; max: number };
}

export interface FilterBarProps {
  categories: FilterOption[];
  selectedCategory?: string;
  onCategoryChange: (category: string) => void;

  priceOptions: PriceOption[];
  selectedPrice?: string;
  onPriceChange: (priceId: string) => void;

  sortOptions: FilterOption[];
  selectedSort?: string;
  onSortChange: (sort: string) => void;

  className?: string;
}

export type DropdownProps = {
  label: string;
  options: FilterOption[] | PriceOption[];
  selected?: string;
  onChange: (value: string) => void;
};

export interface FormWrapperProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  className?: string;
  variant?: 'default' | 'card' | 'minimal';
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  loading?: boolean;
  error?: string;
  success?: string;
}

export interface HeaderBarProps {
  cartItemCount?: number;
  onSearchSubmit?: (query: string) => void;
  isLoggedIn?: boolean;
  userAvatar?: string;
  userName?: string;

  onLogout?: () => void;
  onProfileClick?: () => void;
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  variant?: 'default' | 'outline';
}

export interface SeparatorProps {
  label?: string;
  className?: string;
  variant?: 'default' | 'light' | 'dark';
  orientation?: 'horizontal' | 'vertical';
}

export type SocialProvider =
  | 'google'
  | 'facebook'
  | 'x'
  | 'github'
  | 'apple'
  | 'linkedin';

export interface SocialButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  provider: SocialProvider;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline' | 'minimal';
  showText?: boolean;
  loading?: boolean;
}

export interface TextHeader1Props {
  title: string;
  subtitle?: string;
}
