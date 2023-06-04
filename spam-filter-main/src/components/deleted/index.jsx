import { Container, Group, Image, Text } from "@mantine/core"
import Review from "../reviews/review"

export function Deleted() {
  return (
    <Container>
      <Group grow>
        <Group direction="column" grow>
          <Image radius='md' src="" width={300} height={200} alt='' />
          <Text fontSize="lg" fontWeight="bold" mb="sm">Product Name</Text>
          <Text size="sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Vestibulum euismod, nisl sit amet consectetur consectetur,
            nisi erat euismod nunc, eget consectetur nunc nisi eget
            consectetur nunc.
          </Text>
        </Group>
        <Group>
          <Group>
            <Review />
            <Review />
          </Group>
          {/* <Group>
            <form onSubmit={form.onSubmit((values) => console.log(values))}>
              <Textarea
                placeholder="Write your review here"
                label="Add your review"
                {...form.getInputProps('review')}
              />

              <Group position="left" mt="md">
                <Button variant="light" color="blue" style={{ marginTop: 14, width: '150px' }}>
                  Add Review
                </Button>
              </Group>
            </form>
          </Group> */}
          {/* <Group>
            <Button variant="light" color="blue" style={{ marginTop: 14, width: '150px' }}>
              Filter Reviews
            </Button>
          </Group> */}
        </Group>
      </Group>
    </Container>
  )
}
