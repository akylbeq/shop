import { Outlet } from 'react-router-dom';
import Sidebar from '../../../components/main/Sidebar/Sidebar';

const AdminLayout = () => {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="grow p-2">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
