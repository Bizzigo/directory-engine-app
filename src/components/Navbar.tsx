
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Menu, X, Home, LogIn, UserPlus, Moon, Sun, User, LogOut } from 'lucide-react';
import { useTheme } from '@/providers/ThemeProvider';
import { useLanguage } from '@/providers/LanguageProvider';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar: React.FC = () => {
  const {
    isLoggedIn,
    user,
    logout
  } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const isDark = theme === 'dark';
  const iconClassName = `${isDark && isLoggedIn ? 'text-foreground/90' : 'text-foreground'} transition-colors`;
  
  return <header className="sticky top-0 z-40 w-full bg-white/80 dark:bg-foreground/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:px-6 md:px-8">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2 text-foreground hover:text-primary/80 transition-colors">
            <Home size={20} strokeWidth={1.5} className={iconClassName} />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <button 
              onClick={toggleTheme} 
              className="text-foreground hover:text-primary transition-colors flex items-center" 
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun size={20} strokeWidth={1.5} className={iconClassName} /> : <Moon size={20} strokeWidth={1.5} className={iconClassName} />}
            </button>
            
            {isLoggedIn ? (
              <>
                <Link to="/profile" className="text-foreground hover:text-primary transition-colors flex items-center gap-1">
                  <User size={20} strokeWidth={1.5} className={iconClassName} />
                  <span>{t("profile")}</span>
                </Link>
                <button onClick={logout} className="text-foreground hover:text-primary transition-colors flex items-center gap-1">
                  <LogOut size={20} strokeWidth={1.5} className={iconClassName} />
                  <span>{t("logout")}</span>
                </button>
              </>
            ) : (
              <Link to="/login" className="text-foreground hover:text-primary transition-colors flex items-center gap-1">
                <LogIn size={20} strokeWidth={1.5} className={iconClassName} />
              </Link>
            )}
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden flex items-center" onClick={toggleMobileMenu} aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}>
          {mobileMenuOpen ? <X size={24} className={iconClassName} /> : <Menu size={24} className={iconClassName} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && <div className="md:hidden">
          <div className="space-y-1 px-4 pb-3 pt-2">
            <div className="flex items-center justify-between py-2">
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 text-base text-foreground"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun size={18} strokeWidth={1.5} className={iconClassName} />
                    <span>{t("lightMode")}</span>
                  </>
                ) : (
                  <>
                    <Moon size={18} strokeWidth={1.5} className={iconClassName} />
                    <span>{t("darkMode")}</span>
                  </>
                )}
              </button>
            </div>
            
            {/* Language options in mobile menu */}
            <div className="flex items-center justify-between py-2 border-t border-border">
              <div className="text-base text-foreground">
                <span>Language / Valoda</span>
              </div>
              <LanguageSwitcher />
            </div>
            
            {isLoggedIn ? (
              <>
                <Link to="/profile" className="flex items-center gap-2 py-2 text-base text-foreground" onClick={() => setMobileMenuOpen(false)}>
                  <User size={18} strokeWidth={1.5} className={iconClassName} />
                  <span>{t("profile")}</span>
                </Link>
                <button onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }} className="flex items-center gap-2 py-2 text-base text-foreground w-full text-left">
                  <LogOut size={18} strokeWidth={1.5} className={iconClassName} />
                  <span>{t("logout")}</span>
                </button>
              </>
            ) : (
              <Link to="/login" className="flex items-center gap-2 py-2 text-base text-foreground" onClick={() => setMobileMenuOpen(false)}>
                <LogIn size={18} strokeWidth={1.5} className={iconClassName} />
                <span>{t("login")}</span>
              </Link>
            )}
          </div>
        </div>}
    </header>;
};

export default Navbar;
