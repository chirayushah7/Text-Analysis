import { Card, Text, Group } from '@mantine/core';

export default function Product({ user, comment, date }) {

    return (
        <Card shadow="sm" p="lg">
            <Group>
                <Group>
                    <Text fontSize="lg" fontWeight="bold" mb="sm">{user}</Text>
                    <Text>{(new Date(date)).toLocaleString()}</Text>
                </Group>
                <Text size="sm">
                    {comment}
                </Text>
            </Group>
        </Card>
    );
}
