import React, { useCallback, useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { Badge, Button, Card, Group, Input, Modal } from "@mantine/core";
import { DatePicker, TimeInput } from "@mantine/dates";
import { IconSearch, IconHeart } from "@tabler/icons";
import toast from "react-hot-toast";
import { fetchData, fetchNonGetData } from "../../utilis";
import { useSearchParams } from "react-router-dom";
import SaveButton from "../SharedComponents/SaveButton";
import { UnBookmarkActivityEvent } from "../../hooks/useTripEvent";
import useEvent from "react-use-event";

const containerStyle = {
  width: "100%",
  height: "85vh",
};

const initialCenter = {
  lat: 22.302711,
  lng: 114.177216,
};

type Location = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
};

// Will have to retrieve from database
const sampleLocationArr = [
  { name: "Hong Kong Disneyland", pol: { lat: 22.312771, lng: 114.041931 } },
  { name: "Tokyo Tower", pol: { lat: 35.658581, lng: 139.745438 } },
  { name: "Blue Lagoon", pol: { lat: 63.880238, lng: -22.450562 } },
];

type ScheduleEvent = {
  type: "schedule";
  activate: number;
};

function Map() {
  const [searchBox, setSearchBox] =
    React.useState<google.maps.places.SearchBox | null>(null);

  const [searchParams] = useSearchParams();
  let schedule_id = searchParams.get("id");

  const [inputValue, setInputValue] = useState<string>("");
  const [initialZoom, setInitialZoom] = useState(2);
  const [isHidden, setIsHidden] = useState(true);
  const [opened, setOpened] = useState(false);
  const [eventDate, setEventDate] = useState<Date | string>(new Date());
  const [eventStartTime, setEventStartTime] = useState<Date | string>(
    new Date()
  );
  const [eventEndTime, setEventEndTime] = useState<Date | string>(new Date());
  const dispatchCounter = useEvent<UnBookmarkActivityEvent>(
    "un-bookmark-activity"
  );

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCTqLKd31pvGzcvmvN6fE3Wmge2NRB_XIk",
  });

  const [map, setMap] = React.useState<google.maps.Map | null>(null);
  const [center, setCenter] = React.useState(initialCenter);

  const onLoad = useCallback((map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    // map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback() {
    setMap(null);
  }, []);

  const [locationArr, setLocationArr] = useState<Location[] | null>(null);

  function pan(inputvalue: string | null) {
    if (!inputvalue) {
      console.log("no input value");
      return;
    }

    if (locationArr) {
      locationArr.filter((v) =>
        v.name == inputvalue
          ? map?.panTo({ lat: +v.latitude, lng: +v.longitude })
          : null
      );

      setInitialZoom(15);
    } else {
      return;
    }
  }

  useEffect(() => {
    const getLocation = async () => {
      let data = await fetchData(`/map?keyword=${inputValue}`);
      console.log("data to frontend", data);
      setLocationArr(data.result);
    };
    getLocation().catch(console.error);
  }, [inputValue]);

  return isLoaded ? (
    <>
      <Input
        icon={<IconSearch />}
        placeholder="Search location"
        value={inputValue}
        onChange={(e: any) => {
          setInputValue(e.target.value);
          dispatchCounter({ id: +1 });
        }}
        onKeyUp={(e: any) => {
          e.keyCode == 13 ? pan(inputValue) : null;
        }}
        onClick={() => {
          setIsHidden(false);
        }}
      />
      {!isHidden && (
        <Card
          style={{
            width: "35%",
            position: "absolute",
            zIndex: "2",
          }}
        >
          <div style={{ marginBottom: "8px" }}>
            {!locationArr
              ? null 
              : locationArr.map((v) => (
                  <div key={v.id}>
                    <Group position="apart">
                      <Badge
                        onClick={() => {
                          setInputValue(v.name);
                        }}
                        variant="outline"
                      >
                        {v.name}
                      </Badge>
                      <SaveButton activityId={v.id} />
                    </Group>
                  </div>
                ))}
          </div>
        </Card>
      )}

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={initialZoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <></>
      </GoogleMap>
      {!isHidden && (
        <div
          style={{
            position: "absolute",
            zIndex: "1",
            inset: "0",
            // backgroundColor: "red",
          }}
          onClick={() => {
            setIsHidden(true);
          }}
        ></div>
      )}
    </>
  ) : (
    <></>
  );
}

export default React.memo(Map);

function timer(t: number) {
  return new Promise((rec) => setTimeout(() => rec(true), t));
}
