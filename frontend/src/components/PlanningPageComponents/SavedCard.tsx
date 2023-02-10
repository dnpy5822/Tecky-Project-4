import { Card, Image, Text, Group, Button } from '@mantine/core';
import { useNavigate } from "react-router-dom";
import sakuraPic from '../../assets/sakura.jpg';
import SaveButton from '../SharedComponents/SaveButton';


export default function SavedCard({ tripId, activity_id, nameOfTrip, activity, image }: { tripId: number, activity_id: number, nameOfTrip: string, activity: string, image: string }) {

    let navigate = useNavigate();

    return (
        <div>
            <Card shadow="sm" p="lg" radius="md" withBorder>
                <Card.Section>
                    <Group position="right">
                        <SaveButton activityId={activity_id} />      {/*eg. <SaveButton id={3}/> */}
                    </Group>
                    <Image
                        // src={sakuraPic}
                        src={image}  //正常就食image既，但由於DB未有image，暫代住先
                        height={160}
                        alt="image of activity"
                    />
                </Card.Section>

                <Group position="apart" mt="md" mb="xs">
                    <Text weight={500}>{activity}</Text>
                </Group>

                <Button
                    variant="light"
                    color="gray"
                    fullWidth={true}
                    onClick={() => navigate(`/schedulePage/params/?id=${tripId}`)}
                >
                    {nameOfTrip}
                </Button>
            </Card>
        </div>
    )
}