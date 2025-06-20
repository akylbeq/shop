import { Outlet, useParams } from 'react-router-dom';
import Sidebar from '../../../components/main/Sidebar/Sidebar';
import { useAppSelector } from '../../../app/hook.ts';
import { selectShops } from '../../../slices/shopsSlice.ts';

const AdminLayout = () => {
  const { id } = useParams();
  const shops = useAppSelector(selectShops);

  if (!shops.find((s) => s.slug === id)) {
    return <div>404</div>;
  }

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
