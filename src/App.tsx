import './App.css'
import 'react-toastify/dist/ReactToastify.css';

import { Routes, Route, Outlet, Link } from "react-router-dom";
import { useSubscription } from '@apollo/client';
import { graphql } from 'gql.tada';
import { ToastContainer, toast } from 'react-toastify';
import { Grid, Image, Text } from '@mantine/core';

import Listing from './Listing';
import ProductDetail from './ProductDetail';
import { useEffect } from 'react';

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

// {
//   onData: ({ data }) => {
//     const review = data.data?.reviewAdded;

//     toast(
//       <>
//         <Image src={review?.product.images?.[0]} height={75} fit="contain" />
//         <Text>{review?.user?.firstName} left a review on {review?.product.name}</Text>
//       </>
//     );
//   }
// });

function App() {
  const { data } = useSubscription(REVIEWS_SUBSCRIPTION);

  useEffect(() => {
    if (data) {
      toast(
        <>
          <Image src={data.reviewAdded?.product.images?.[0]} height={75} fit="contain" />
          <Text>{data.reviewAdded?.user?.firstName} left a review on {data?.reviewAdded?.product.name}</Text>
          <Text>{data.reviewAdded?.body}</Text>
        </>
      );
    }
  }, [data]);

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
        <Link to="/">Home</Link>
      </nav>

      <Outlet />
    </div>
  )
}

export default App;
