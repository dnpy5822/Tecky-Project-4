import { Container, Space } from "@mantine/core";
import ExchangeRate from "../components/ExchangeRatePageComponents/ExchangeRate";
import Header from "../components/SharedComponents/Header";

export default function ExchangeRatePage() {

  return (
    <div>
      <Container size="xl">
        <Header isShowSearchBar={false} />
        <Space h="md" />
      </Container>

      <Container size="lg">
        <ExchangeRate />
      </Container>
    </div>
  );
}
