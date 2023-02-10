import { Affix, Button, Container, Space, Transition } from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import { IconArrowUp } from "@tabler/icons";
import Header from "../components/SharedComponents/Header";
import WeatherContent from "../components/WeatherPageComponents/WeatherContent";

export default function WeatherPage() {

    return (
        <div>
            <Container size="xl">
                <Header isShowSearchBar={false} />
                <Space h="md" />
            </Container>

            <Container size="lg">
                <WeatherContent />
            </Container>
        </div>
    )
}
