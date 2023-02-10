import { Container } from "@mantine/core";
import { useToken } from "../store/selector";
import styles from "./SchedulePage.module.css";
import Header from "../components/SharedComponents/Header";
import Schedule from "../components/SchedulePageComponents/Schedule";
import Map from "../components/SchedulePageComponents/Map";
import RequireLogin from "../components/SharedComponents/RequireLogin";
import Footer from "../components/SharedComponents/Footer";
import { useNavigate } from "react-router-dom";

type Time = {
  hour: number;
  minute: number;
};

export default function SchedulePage() {
  let token = useToken();

  return (
    <div>
      <Container size="xl">
        <Header isShowSearchBar={true} />
      </Container>
      {token ? (
        <div className={styles.display}>
          <div className={styles.schedule}>
            <Schedule isEventActive={true} showChecklist={true} />
          </div>
          <div className={styles.map}>
            <Map />
          </div>
        </div>
      ) : (
        <RequireLogin />
      )}
    </div>
  );
}
