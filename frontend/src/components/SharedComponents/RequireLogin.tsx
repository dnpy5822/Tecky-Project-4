import { Text, Container, Grid, Space, Button } from '@mantine/core'
import { useEvent } from 'react-use-event'
import RequireLoginPic from '../../assets/RequireLoginPic.jpg'
import styles from './RequireLogin.module.css';

type LoginEvent = {
    type: 'login'
    delta: boolean
  }

export default function RequireLogin() {

    const dispatchLoginEvent = useEvent<LoginEvent>('login');

    return (
        <Container size="xs">

            <Grid mt={70}>
                <Grid.Col md={6}>
                    <div>
                        <h5><b>Traveling soon? Save your amazing ideas all in one place with Trips.</b></h5>
                        <Text color="gray.6">Save traveler-recommended places for your trip</Text>
                        <Space h="md" />
                        <Text color="gray.6">View the things to do, restaurants and spots you saved on a map</Text>
                        <Space h="md" />
                        <Text color="gray.6">Easily access all your saves while traveling, wherever you go</Text>
                        <Button onClick ={() => dispatchLoginEvent({delta: true})} color="dark" mt={30}>
                            Get Started
                        </Button>
                    </div>
                </Grid.Col>

                <Grid.Col md={6}>
                    <img className={styles.picSize} src={RequireLoginPic} alt="RoadTripPic" />
                </Grid.Col>
            </Grid>

        </Container>
    )
}
