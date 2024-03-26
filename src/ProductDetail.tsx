import { useQuery, useSubscription, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { graphql } from 'gql.tada'; 
import { Card, Image, Text, Button, Group, Grid, Divider, Title } from '@mantine/core';

// Without Tada but using a GraphQL LSP
// const GET_PRODUCTS = gql`
//     product(id: $productId) {
//         name
//         images
//         description
//         variants {
//             colorway
//             size
//             price
//             inStock
//         }
//         user {
//             lastName
//         }
//     }
// `;

//  LSP + Tada -> infer Variable and Results on the fly
const GET_PRODUCT = graphql(`
  query GetProduct($productId: ID!) {
    product(id: $productId) {
        name
        images
        description
        variants {
            colorway
            id
            price
            size
        }
    }
  }
`);


const unique = (value, index, array) => array.indexOf(value) === index;

function ProductDetail() {
    const params = useParams();
    const { id = "" } = params;

    const { loading, error, data } = useQuery(GET_PRODUCT, { variables: 
        {
            productId: id
        }
    });

    if (loading) return (<Text size="md" fw={700}>Loading</Text>);
    if (error) return (<Text size="md" fw={700}>{error.message}</Text>);

    const product = data?.product;

    return (
        <div>
            <Text size="md" fw={700}>Product Page - Demo</Text>
            <Grid>
                <Grid.Col span={4}>
                    <Image
                        src={product?.images?.[0]} />
                    <Grid>
                        { product?.images?.map(imageSrc => (
                            <Grid.Col span={3}>
                                <Image
                                    height={100}
                                    fit="contain"
                                    src={imageSrc} />
                            </Grid.Col>
                        ))}
                    </Grid>
                </Grid.Col>
                <Grid.Col span={8}>
                    <Title size='h1'>{product?.name}</Title>
                    <Divider my="md" />

                    <Text>${product?.variants?.[0]?.price}</Text>                    
                    <Group gap="xs" mb="5">
                        { product?.variants?.map(v => v?.size).filter(unique).map(size => (
                            <Button variant='outline'>{size}</Button>
                        ))}
                    </Group>
                   
                    <Group gap="xs">
                        { product?.variants?.map(v => v?.colorway).filter(unique).map(colorway => (
                            <Button>{colorway}</Button>
                        ))}
                    </Group>
      

                    <Divider my="md" />
                    {/* should purify your HTML prior, but for demo purposes */}
                    <Text dangerouslySetInnerHTML={{__html: product?.description || ""}}></Text>
                
                    <Divider my="md"/>
                    <Card>
                    </Card>
                </Grid.Col>
            </Grid>
        </div>
    )
  };
  
export default ProductDetail;
  