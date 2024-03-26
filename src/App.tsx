import './App.css'
import 'react-toastify/dist/ReactToastify.css';

import { useEffect } from 'react';
import { Routes, Route, Outlet, Link } from "react-router-dom";
import { useSubscription } from '@apollo/client';
import { graphql } from 'gql.tada';
import { ToastContainer, toast } from 'react-toastify';
import { Grid, Image, Text, Group} from '@mantine/core';

import Listing from './Listing';
import ProductDetail from './ProductDetail';
import Classes from './Classes';


const REVIEWS_SUBSCRIPTION = graphql(`
subscription Reviews {
  reviewAdded {
    body
    id
    product {
      images
      name
    }
    user {
      firstName
    }
  }
}
`);


function App() {
  // const { data } = useSubscription(REVIEWS_SUBSCRIPTION);

  // useEffect(() => {
  //   if (data) {
  //     toast(
  //       <>
  //         <Image src={data.reviewAdded?.product.images?.[0]} height={75} fit="contain" />
  //         <Text>{data.reviewAdded?.user?.firstName} left a review on {data?.reviewAdded?.product.name}</Text>
  //         <Text>{data.reviewAdded?.body}</Text>
  //       </>
  //     );
  //   }
  // }, [data]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Listing />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/classes" element={<Classes />} />
          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
          <Route path="*" element={<Listing />} />
        </Route>
      </Routes>
      <ToastContainer 
        position='bottom-right'
        autoClose={3000}
      />
    </>
  )
};

function Layout() {
  return (
    <div>
      <nav>
        <Group gap={4}>
          <Link to="/">Home</Link>
          <Link to="/classes">Classes</Link>
        </Group>
      </nav>

      <Outlet />
    </div>
  )
}

export default App;
