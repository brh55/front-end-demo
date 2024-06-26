import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { graphql } from 'gql.tada'; 
import { Image, Text, Button, Group, Grid, Divider, Title } from '@mantine/core';

const unique = (value, index, array) => array.indexOf(value) === index;

// Query
const PDP_QUERY = gql`
  query ProductDetailPage($productId: ID!) {
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
`;

// Tada Query
// const PDP_QUERY = graphql(`
//   query ProductDetailPage($productId: ID!) {
//     product(id: $productId) {
//         name
//         images
//         description
//         variants {
//             colorway
//             id
//             price
//             size
//         }
//     }
//   }
// `);


function ProductDetail() {
    const params = useParams();
    const { id = "" } = params;

    const { loading, error, data } = useQuery(PDP_QUERY, { variables: 
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
                </Grid.Col>
            </Grid>
        </div>
    )
  };
  
export default ProductDetail;
  