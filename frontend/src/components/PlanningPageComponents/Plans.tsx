import { useEffect, useState } from "react";
import { useGet } from "../../hooks/useGet";
import { useEvent } from "react-use-event";
import { Container, Grid, Button } from "@mantine/core";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Plans.module.css";
import PlanningCard from "./PlanningCard";
import CreateCard from "./CreateCard";
import SavedCard from "./SavedCard";
import {
  DeleteScheduleEvent,
  UnBookmarkActivityEvent,
} from "../../hooks/useTripEvent";

type PlansFromServer = {
  error?: string;
  //scheduleData should looks like this:
  // [
  //     { name: "Japan", username: "Leo", privacy: "private", numberOfItems: 2 },
  //     { name: "Uk", user: "Leo", privacy: "private", numberOfItems: 2 },
  // ]
  scheduleData?: {
    id: number;
    name: string;
    username: string;
    privacy: string;
    count: number | string;
    image: string;
  }[];
};

type ActivityFromServer = {
  error?: string;
  // activityData should looks look this:
  // [
  //     {name: "Japan", activity: "Tokyo Tower", image: "123.png"},
  //     {name: "UK", activity: "Eat fish and chips", image: "456.png"},
  // ]
  savedActivityData?: {
    id: number;
    activity_id: number;
    name: string;
    activity: string;
    image: string;
  }[];
};

type Tab = "All Trips" | "Private Trips" | "Public Trips" | "My Saves";
const tabs: Tab[] = ["All Trips", "Private Trips", "Public Trips", "My Saves"];

export default function Plans() {
  const [tab, setTab] = useState<Tab>("All Trips");

  ///////////////////////////This is for "My Saves"///////////////////////////
  const savedActivityResult = useGet<ActivityFromServer>(
    "/savedActivityFromServer",
    {}
  ); //fetch to trip.routes
  const savedActivityList = savedActivityResult.state.savedActivityData;

  ///////////////////////////This is for "All Trips", "Private Trips", "Public Trips"///////////////////////////
  const planResult = useGet<PlansFromServer>("/plansFromServer", {}); //fetch to trip.routes
  const cardArray = planResult.state.scheduleData;
  // console.log("cardArray in 'Plans.tsx': ", cardArray);

  const displayCardArray =
    tab === "All Trips"
      ? cardArray
      : tab === "Private Trips"
      ? cardArray?.filter((trip) => trip.privacy === "private")
      : tab === "Public Trips"
      ? cardArray?.filter((trip) => trip.privacy === "public")
      : undefined;

  ///////////////////////////To receive event from delete button///////////////////////////
  useEvent<DeleteScheduleEvent>("delete-schedule", (event) => {
    planResult.setState((state) => {
      return {
        ...state,
        scheduleData: state.scheduleData?.filter(
          (item) => item.id !== event.id
        ),
      };
    });
  });

  ///////////////////////////To receive event from save button///////////////////////////
  useEvent<UnBookmarkActivityEvent>("un-bookmark-activity", (event) => {
    savedActivityResult.setState((state) => {
      console.log("unbookmark", { event, state: state.savedActivityData });
      return {
        ...state,
        savedActivityData: state.savedActivityData?.filter(
          (item) => item.activity_id !== event.id
        ),
      };
    });
  });

  useEffect(() => {
    console.log(displayCardArray);
  }, [displayCardArray]);

  return (
    <Container size="lg">
      <div>
        <h1 className={styles.header}>Trips</h1>

        {/* Buttons */}
        <div>
          {tabs.map((currentTab) => (
            <Button
              color="dark"
              className="m-1"
              onClick={() => setTab(currentTab)}
              variant={tab === currentTab ? "filled" : "outline"}
            >
              {currentTab}
            </Button>
          ))}
        </div>

        {/* Cards */}
        <Grid>
          {tab != "My Saves" && (
            <Grid.Col span={4}>
              <CreateCard
                refreshServer={planResult.refresh}
                privacyMode={tab === "Public Trips" ? "public" : "private"}
              />
            </Grid.Col>
          )}

          {tab === "My Saves"
            ? savedActivityList?.map((v) => (
                <Grid.Col span={4}>
                  <SavedCard
                    tripId={v.id}
                    activity_id={v.activity_id}
                    nameOfTrip={v.name}
                    activity={v.activity}
                    image={v.image}
                  />
                </Grid.Col>
              ))
            : displayCardArray?.map((v) => (
                <Grid.Col span={4}>
                  <PlanningCard
                    id={v.id}
                    nameOfTrip={v.name}
                    user={v.username}
                    numberOfItems={v.count}
                    image={v.image}
                  />
                </Grid.Col>
              ))}
        </Grid>
      </div>
    </Container>
  );
}
