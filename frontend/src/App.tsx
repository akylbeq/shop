import { Route, Routes } from 'react-router-dom';
import Layout from './containers/main/Layout/Layout.tsx';
import Home from './containers/main/Home/Home.tsx';
import ClientLayout from './components/client/Layout/ClientLayout.tsx';
import ClientHome from './containers/client/Home/ClientHome.tsx';
import ClientProduct from './containers/client/Product/ClientProduct.tsx';
import ClientCart from './containers/client/Cart/ClientCart.tsx';
import ClientCheckout from './containers/client/Checkout/ClientCheckout.tsx';
import Login from './containers/main/Login/Login.tsx';
import Sign from './containers/main/Sign/Sign.tsx';
import Middleware from './containers/main/Middleware/Middleware.tsx';
import AdminLayout from './containers/main/AdminLayout/AdminLayout.tsx';
import Categories from './containers/main/Categories/Categories.tsx';
import Products from './containers/main/Products/Products.tsx';
import Shops from './containers/main/Shops/Shops.tsx';

const App = () => {
  const isClientPage = location.pathname.startsWith('/kg');
  console.log(window.location.hostname);

  return (
    <>
      {isClientPage ? (
        <Routes>
          <Route path="/kg" element={<ClientLayout />}>
            <Route index element={<ClientHome />} />
            <Route path="product/:id" element={<ClientProduct />} />
            <Route path="cart" element={<ClientCart />} />
            <Route path="/kg/cart/checkout" element={<ClientCheckout />} />
          </Route>
        </Routes>
      ) : (
        <Middleware>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Sign />} />
              <Route path="/shops" element={<Shops />} />
              <Route path="/dashboard" element={<AdminLayout />}>
                <Route path="main" element={<Shops />} />
                <Route path="categories" element={<Categories />} />
                <Route path="products" element={<Products />} />
                <Route path="discount" element={<div>3</div>} />
                <Route path="settings" element={<div>4</div>} />
              </Route>
            </Routes>
          </Layout>
        </Middleware>
      )}
    </>
  );
};

export default App;
