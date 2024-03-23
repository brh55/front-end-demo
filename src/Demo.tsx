import { useQuery, gql } from '@apollo/client';
import { graphql } from 'gql.tada';
import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';

// const GET_PRODUCTS = gql`
//     query GetProducts($searchInput: ProductSearchInput) {
//         searchProducts(searchInput: $searchInput) {
//             name
//             images
//         }
//     }
// `;

//  Magic with Tada > TS Inference
const GET_PRODUCTS = graphql(`
  query GetProducts($searchInput: ProductSearchInput!) {
    searchProducts(searchInput: $searchInput) {
      name
      images
      price
      shortDescription
    }
  }
`);

function Demo() {
    const { loading, error, data } = useQuery(GET_PRODUCTS, { variables: 
        {
            searchInput: {
              categories: [ "MEN" ]
            }
        }
    });

    if (loading) return (<div>Loading</div>);
    if (error) return (<div>{error.message}</div>)

    return (
        <div>
            { data?.searchProducts.map(product => (
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <Card.Section>
                        <Image
                            src={product?.images?.[0]}
                            height={150}
                            fit="contain"
                        />
                    </Card.Section>
                
                    <Group justify="space-between" mt="md" mb="xs">
                        <Text fw={500}>Norway Fjord Adventures</Text>
                        <Badge color="pink">On Sale</Badge>
                    </Group>
                
                    <Text size="sm" c="dimmed">
                        {product?.shortDescription}
                    </Text>

                    <Text size="md" c="dimmed">
                        ${product?.price}
                    </Text>
                
                    <Button color="blue" fullWidth mt="md" radius="md">
                        Purchase
                    </Button>
                </Card>
            ))}
        </div>
    )
  }
  
export default Demo;
  