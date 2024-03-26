import { useMutation, useQuery, gql } from "@apollo/client";
import { graphql } from "gql.tada";
import { Card, Text, Button, Grid, TextInput, Title, Textarea, NumberInput, MultiSelect, Divider, Loader } from "@mantine/core";
import { useForm } from "@mantine/form";

const CLASS_PAGE_QUERY = graphql(`
    query ClassPage {
        users {
            id
            firstName
            lastName
        }
        classes {
            id
            name
            description
            attendees {
                id
                lastName
                firstName
            }
        }
    }
`);

const ADD_CLASS = graphql(`
    mutation CreateClass($input: ClassDetails!) {
        createClass(class: $input) {
            id
            name
            description
            attendees {
                id
            }
        }
    }
`);

function Classes() {
    const form = useForm({
        initialValues: {
            name: "",
            description: "",
            price: 0,
            attendees: []
        },
    });
    
    const { loading, error, data } = useQuery(CLASS_PAGE_QUERY);

    const [
        addClass,
        { loading: mutationLoading, error: mutationError }
    ] = useMutation(
        ADD_CLASS,
        {
            update(cache, { data: { createClass } }) {
                cache.modify({
                    fields: {
                        classes(existingClasses = []) {
                            const newClassRef = cache.writeFragment({
                                data: createClass,
                                fragment: gql`
                                  fragment NewClass on Class {
                                    id
                                    description
                                    name
                                    attendees {
                                        id
                                    }
                                  }
                                `
                            });

                            return [...existingClasses, newClassRef];
                        }
                    }
                })
            }
        });

    if (error) {
        return <div>Error: {error?.message}</div>;
    }

    const handleSubmit = (values: any) => {
        addClass({ 
            variables: {
                input: {
                    name: values.name,
                    description: values.description,
                    price: values.price,
                    attendees: values.attendees
                }
            },
            // optimisticResponse: {
            //     __typename: 'Mutation',
            //     createClass: {
            //         __typename: "Class",
            //         id: `temp-class-1`,
            //         description: values.description,
            //         name: values.name,
            //         attendees: values.attendees.map((attendee: string) => ({
            //             id: attendee,
            //             __typename: "User",
            //         }))
            //     }
            // }
        });

        form.reset();
    };
    
    return (
        <div>
            <Title size="h2" fw={700}>Classes - Optimistic Mutation</Title>
            <Title size="h3">Create a new class</Title>

            <form onSubmit={form.onSubmit((values: any) => handleSubmit(values))}>
                { mutationLoading && <Loader /> }
                { mutationError && <Text color="red">{mutationError?.message}</Text> }
                    <TextInput label="Name" placeholder="Name" {...form.getInputProps("name")} />
                    <Textarea label="Description" minRows={2} placeholder="Class details" {...form.getInputProps("description")} />
                    <NumberInput label="Price" {...form.getInputProps("price", { type: "input" })} />
                    <MultiSelect
                        label="Attendees"
                        placeholder="Select attendees"
                        data={data?.users?.map(user => ({ value: user?.id, label: `${user?.firstName} ${user?.lastName}`})) || []}
                        searchable
                        {...form.getInputProps("attendees")}
                    />
                    <Button mt={5} type="submit">Submit</Button>
            </form>
            
            <Divider my={10} />

            <Title size="h3">Classes</Title>
            <Grid>
                { loading && <Loader />}

                { data?.classes?.map((classItem: any) => (
                    <Grid.Col key={classItem?.id} span={4}>
                        <Card shadow="sm" p="lg" radius="md" withBorder>
                            <Card.Section>
                                <Text size="xl" fw={700}>{classItem?.name}</Text>
                                <Text size="sm">{classItem?.description}</Text>
                                
                                <Text size="sm" fw={700}>Attendees: {classItem?.attendees?.length}</Text>
                                { 
                                    classItem?.attendees?.map((attendee: any) => (
                                        <Text key={attendee?.id} size="xs">{attendee?.firstName} {attendee?.lastName}</Text>)
                                    ) 
                                }
                            </Card.Section>
                        </Card>
                    </Grid.Col>
                ))}
            </Grid>
        </div>
    )
  };
  
export default Classes;
  