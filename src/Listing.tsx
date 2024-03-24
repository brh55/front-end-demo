import { useQuery, gql } from '@apollo/client';
import { graphql } from 'gql.tada';
import { Card, Image, Text, Button, Group, Grid } from '@mantine/core';
import { Link } from 'react-router-dom';

// Without Tada but using a GraphQL LSP
// const GET_PRODUCTS = gql`
//     query GetProducts($searchInput: ProductSearchInput) {
//         searchProducts(searchInput: $searchInput) {
//             id
//             name
//             images
//             price
//             shortDescription  
//         }
//     }
// `;

//  LSP + Tada -> infer Variable and Results on the fly
const GET_PRODUCTS = graphql(`
  query GetProducts($searchInput: ProductSearchInput!) {
    searchProducts(searchInput: $searchInput) {
        id
        name
        images
        price
        shortDescription
    }
  }
`);

function Listing() {
    const { loading, error, data } = useQuery(GET_PRODUCTS, { variables: 
        {
            searchInput: {
              categories: [ "MEN" ],
              limit: 6
            }
        }
    });

    if (loading) return (<Text size="md" fw={700}>Loading</Text>);
    if (error) return (<Text size="md" fw={700}>{error.message}</Text>);

    return (
        <div>
            <Text size="md" fw={700}>Product Listing</Text>
            <Grid>
            { data?.searchProducts.map(product => (
                <Grid.Col span={4}>
                    <Link to={`/product/${product?.id}`}>
                        <Card shadow="sm" padding="lg" radius="md" withBorder>
                            <Card.Section>
                                <Image
                                    src={product?.images?.[0]}
                                    height={150}
                                    fit="contain"
                                />
                            </Card.Section>
                        
                            <Group justify="space-between" mt="md" mb="xs">
                                <Text fw={500}>{product?.name}</Text>
                            </Group>
                        
                            <Text size="sm" c="dimmed">
                                {product?.shortDescription}
                            </Text>

                            <Text size="md" c="dimmed">
                                ${product?.price}
                            </Text>
                        </Card>
                    </Link>
                </Grid.Col>
            ))}
            </Grid>
        </div>
    )
  };
  
export default Listing;
  