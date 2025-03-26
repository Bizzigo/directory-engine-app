
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';
import Breadcrumbs from './Breadcrumbs';
import BackgroundAnimation from './BackgroundAnimation';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col w-full bg-background text-foreground overflow-x-hidden">
      <BackgroundAnimation />
      <Navbar />
      <main className="flex-1 w-full">
        {!isHomePage && (
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Breadcrumbs />
          </div>
        )}
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
