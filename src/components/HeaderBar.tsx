import { useState } from 'react';
import { cn } from '../styles/theme';
import { ImageWithFallback, ImagePaths } from '../utils/imageUtils';
import { useNavigate } from 'react-router-dom';
import type { HeaderBarProps } from '../types/layout';

export default function HeaderBar({
  cartItemCount = 0,
  onSearchSubmit,
  isLoggedIn = false,
  userAvatar,
  userName,

  onLogout,
  onProfileClick,
}: HeaderBarProps) {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit?.(searchQuery);
  };

  const navigationItems = [
    { name: 'Home', href: '/' },
    // { name: 'Categories', href: '/categories' },
  ];

  const onRegister = () => navigate('/register');
  const onLogin = () => navigate('/login');
  const onCartClick = () => navigate('/cart');
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center">
              <ImageWithFallback
                src={ImagePaths.placeholders.product}
                alt="Logo"
                className="h-8 w-auto"
                fallback={ImagePaths.placeholders.product}
              />
              <span className="ml-2 text-xl font-bold text-gray-900">
                Store
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigationItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-4 hidden md:block">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={cn(
                  'w-full py-2 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-500',
                  'border border-gray-300',
                  'focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent'
                )}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </form>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <button
              onClick={onCartClick}
              className="relative p-2 text-gray-600 hover:text-gray-900 hover:cursor-pointer"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 p-2 text-gray-600 hover:text-gray-900  hover:cursor-pointer"
              >
                {isLoggedIn ? (
                  <>
                    <div className="relative w-8 h-8 rounded-full overflow-hidden">
                      <ImageWithFallback
                        src={userAvatar || ImagePaths.placeholders.product}
                        alt={userName || 'User avatar'}
                        className="w-full h-full object-cover"
                        fallback={ImagePaths.placeholders.product}
                      />
                    </div>
                    <span className="hidden md:block text-sm font-medium">
                      {userName}
                    </span>
                  </>
                ) : (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                )}
              </button>

              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 py-2 bg-white shadow-xl z-50">
                  {isLoggedIn ? (
                    <>
                      <button
                        onClick={onProfileClick}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Profile
                      </button>
                      <button
                        onClick={onLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign out
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={onLogin}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign in
                      </button>
                      <button
                        onClick={onRegister}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Register
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearchSubmit} className="mb-4">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={cn(
                  'w-full py-2 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-500',
                  'border border-gray-300',
                  'focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent'
                )}
              />
            </form>

            {/* Mobile Navigation Items */}
            <div className="space-y-1">
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
