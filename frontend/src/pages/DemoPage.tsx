import { Center, Container, Grid, Space, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { useToken } from "../store/selector";
import sakuraPic from '../assets/sakura.jpg';
import ActivityCard from "../components/SharedComponents/ActivityCard";
import Header from "../components/SharedComponents/Header";
import RequireLogin from "../components/SharedComponents/RequireLogin";
import Footer from "../components/SharedComponents/Footer";
import DeleteButton from "../components/PlanningPageComponents/DeleteButton";

export default function Demo() {

    let token = useToken()

    return (
        <div>
            <Container size="xl">
                <Header isShowSearchBar={true} />
            </Container>

            {token ?
                <Container size="lg">

                    <Center>{<Text fz="xl">Demo Page</Text>}</Center>
                    <Center>{<Link to="/">Goto Homepage</Link>}</Center>

                    <Grid>
                        <Grid.Col span={4}>
                            <ActivityCard id={1} name={"Disney"} type={"spot"} rating={2.8} country={"Japan"} image={sakuraPic} />
                        </Grid.Col>

                        <Grid.Col span={4}>
                            <ActivityCard id={2} name={"eating ramen"} type={"restaurant"} rating={4} country={"Japan"} image={sakuraPic} />
                        </Grid.Col>

                        <Grid.Col span={4}>
                            <ActivityCard id={3} name={"eating takotaki"} type={"restaurant"} rating={4.5} country={"Japan"} image={sakuraPic} />
                        </Grid.Col>
                    </Grid>

                </Container>
                : <RequireLogin />}

            <DeleteButton tripId={1}/>
            <Space h="xl" />
            <Space h="xl" />
            <Space h="xl" />
            <Space h="xl" />
            <Space h="xl" />

            <Footer />
        </div>
    );
}
