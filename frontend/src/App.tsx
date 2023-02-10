import { Container, MantineProvider, Space } from "@mantine/core";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Homepage from "./pages/Homepage";
import PlanningPage from "./pages/PlanningPage";
import SchedulePage from "./pages/SchedulePage";
import SearchResultPage from "./pages/SearchResultPage";
import DemoPage from "./pages/DemoPage";
import PersonalPage from "./pages/PersonalPage";
import ShareSchedulePage from "./pages/ShareSchedulePage";
import ScheduleDetail from "./pages/ScheduleDetail";
import WeatherPage from "./pages/WeatherPage";
import ExchangeRatePage from "./pages/ExchangeRatePage";
import Footer from "./components/SharedComponents/Footer";
import AffixComponent from "./components/SharedComponents/AffixComponent";
import CheckListPage from "./pages/ChecklistPage";
import AdminPage from "./pages/AdminPage";
import ActivityDetailPage from "./pages/ActivityDetailPage";

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Toaster />
      {/* <Container size="xl"> */}
      <GoogleOAuthProvider clientId="522757089438-ndpm6kko9ju9bssoa8en6pbn2iht4p4d.apps.googleusercontent.com">
        <div id="root">
          <main>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/planningPage" element={<PlanningPage />} />
              {/*咁樣係用緊parma */}
              <Route path="/schedulePage/:id" element={<SchedulePage />} />
              {/*之後整返入依版既時候，要咁樣"/searchResultPage?keyword=abc"*/}
              <Route path="/searchResultPage" element={<SearchResultPage />} />
              <Route path="/demoPage" element={<DemoPage />} />
              <Route path="/PersonalPage" element={<PersonalPage />} />
              <Route path="/ShareSchedulePage" element={<ShareSchedulePage />} />
              <Route path="/ScheduleDetail" element={<ScheduleDetail />} />
              <Route path="/weatherPage" element={<WeatherPage />} />
              <Route path="/exchangeRatePage" element={<ExchangeRatePage />} />
              <Route path="/checklistPage" element={<CheckListPage />} />
              <Route path="/adminPage" element={<AdminPage />} />
              <Route path="/activityDetailPage" element={<ActivityDetailPage />} />
            </Routes>
          </main>
          <Space h="xl" />
          <AffixComponent />
          <footer>
            <Footer />
          </footer>
        </div>
      </GoogleOAuthProvider>
      {/* </Container> */}
    </MantineProvider>
  );
}

export default App;
