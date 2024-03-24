import './App.css'

import { Routes, Route, Outlet, Link } from "react-router-dom";

import Listing from './Listing';
import ProductDetail from './ProductDetail';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Listing />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
          <Route path="*" element={<Listing />} />
        </Route>
      </Routes>
    </>
  )
};

function Layout() {
  return (
    <div>
      <nav>
        <Link to="/"></Link>
      </nav>

      <Outlet />
    </div>
  )
}

export default App;
