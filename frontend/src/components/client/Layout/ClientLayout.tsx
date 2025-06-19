import ClientAppbar from '../Appbar/ClientAppbar.tsx';
import ClientFooter from '../Footer/ClientFooter.tsx';
import { Outlet } from 'react-router-dom';

const ClientLayout = () => {
  return (
    <div className="flex flex-col items-stretch align-baseline min-h-screen">
      <header className="max-w-[1220] mx-auto px-4 sm:px-6 lg:px-8 border-b mb-0 sm:mb-16 w-full">
        <ClientAppbar />
      </header>
      <main className="max-w-[1220] mx-auto px-4 sm:px-6 lg:px-8 flex-1 w-full">
        <Outlet />
      </main>
      <footer className="max-w-[1220] mx-auto px-4 sm:px-6 lg:px-8 border-t mt-20 py-10 w-full">
        <ClientFooter />
      </footer>
    </div>
  );
};

export default ClientLayout;
