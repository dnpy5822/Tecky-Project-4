import { Container } from "@mantine/core";
import PersonalDetail from "../components/PersonalPage/PersonalDetail";
import Header from "../components/SharedComponents/Header";

export default function PersonalPage() {
  return (
    <>
      <Container size="xl">
        <Header isShowSearchBar={false} />
        <PersonalDetail />
      </Container>
    </>
  );
}
