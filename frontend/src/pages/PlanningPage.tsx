import { Container } from "@mantine/core";
import { useToken } from "../store/selector";
import Header from "../components/SharedComponents/Header";
import Plans from "../components/PlanningPageComponents/Plans";
import RequireLogin from "../components/SharedComponents/RequireLogin";

function PlanningPage() {
  let token = useToken();

  return (
    <div>
      <Container size="xl">
        <Header isShowSearchBar={false} />
      </Container>
      {token ? <Plans /> : <RequireLogin />}
    </div>
  );
}

export default PlanningPage;
