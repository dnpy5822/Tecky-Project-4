import { useNavigate } from "react-router-dom";
import { Card, Image, Text, Rating, Group } from "@mantine/core";
import sakuraPic from "../../assets/sakura.jpg";
import SaveButton from "./SaveButton";

export default function ActivityCard({
    id,
    name,
    type,
    rating,
    country,
    image,
}: {
    id: number;
    name: string;
    type: string;
    rating: number;
    country: string;
    image: string;
}) {

    let navigate = useNavigate();

    return (
        <Card shadow="sm" p="lg" radius="md" withBorder>
            <Card.Section>
                <Group position="right">
                    <SaveButton activityId={id} /> {/*eg. <SaveButton id={3}/> */}
                </Group>

                <Image
                    // src={sakuraPic}
                    src={image}
                    height={160}
                    alt="Sakura"
                    onClick={() => navigate(`/activityDetailPage/?activityId=${id}`)}
                />
            </Card.Section>

            <Group position="apart" mt="md" mb="xs">
                <Text weight={500}>{name}</Text>
            </Group>

            <Rating value={rating} fractions={2} color="teal" readOnly />

            <Text size="sm" color="dimmed">
                {country}
            </Text>
        </Card>
    );
}
