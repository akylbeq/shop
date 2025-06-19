import React from 'react';
import Appbar from '../../../components/main/Appbar/Appbar.tsx';
import Footer from '../../../components/main/Footer/Footer.tsx';
import { Toaster } from '../../../components/ui/sonner.tsx';

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col items-stretch align-baseline min-h-screen">
      <header className="max-w-[1220] mx-auto px-4 sm:px-6 lg:px-8 border-b mb-0 w-full">
        <Appbar />
      </header>
      <main className="max-w-[1220] mx-auto px-4 sm:px-6 lg:px-12 flex-1 w-full">
        {children}
        <Toaster />
      </main>
      <footer className="max-w-[1220] mx-auto px-4 sm:px-6 lg:px-8 border-t py-10 w-full">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
