import { useNavigate } from "react-router-dom";
import { Card, Image, Text, Badge, Group } from "@mantine/core";
import styles from "./PlanningCard.module.css";
import DeleteButton from "./DeleteButton";

export default function PlanningCard({
    id,
    nameOfTrip,
    user,
    numberOfItems,
    image,
}: {
    id: number;
    nameOfTrip: string;
    user: string;
    numberOfItems: number | string;
    image?: string;
}) {
    let navigate = useNavigate();

    return (
        <div className={styles.cardSize}>
            <Card shadow="sm" p="lg" radius="md" withBorder>
                <Card.Section>
                    <Group position="right">
                        <DeleteButton tripId={id} />
                    </Group>
                    <Image
                        onClick={() => navigate(`/schedulePage/params/?id=${id}`)}
                        src={
                            image ? image
                                : "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                        }
                        // src={image}     正常就食image既，但由於DB未有image，暫代住先。
                        height={160}
                        alt="Schedule Cover Picture"
                    />
                </Card.Section>

                <Group position="apart" mt="md" mb="xs">
                    <Text weight={500}>{nameOfTrip}</Text>
                    <Badge color="teal" variant="light">
                        BY {user}
                    </Badge>
                </Group>

                <Text size="sm" color="dimmed">
                    Featuring: {numberOfItems} items
                </Text>
            </Card>
        </div>
    );
}
