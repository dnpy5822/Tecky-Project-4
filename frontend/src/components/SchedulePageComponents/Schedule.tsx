import { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer, Event } from "react-big-calendar";
import withDragAndDrop, {
  withDragAndDropProps,
} from "react-big-calendar/lib/addons/dragAndDrop";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import { zhHK } from "date-fns/locale";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import useEvent from "react-use-event";
import { fetchNonGetData } from "../../utilis";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@mantine/core";
import { UnBookmarkActivityEvent } from "../../hooks/useTripEvent";
import { IconNote } from "@tabler/icons";

function Schedule(props: { isEventActive: boolean; showChecklist: boolean }) {
  // Schedule Array:
  const [eventsArr, setEventsArr] = useState<Event[] | undefined>([
    {
      title: undefined,
      start: undefined,
      end: undefined,
      resource: null,
    },
  ]);
  const [searchParams] = useSearchParams();

  let schedule_id = searchParams.get("id");

  let navigate = useNavigate();

  const [trigger, setTrigger] = useState(0);

  async function onDoubleClickEvent(data: any) {
    console.log("data when double clicked", data);
    await fetchNonGetData("/schedule/delete", "POST", {
      data: data,
    });
    await setTrigger((trigger) => trigger + 1);
  }

  const onEventResize: withDragAndDropProps["onEventResize"] = async (data) => {
    // console.log("data when drop", data);
    await fetchNonGetData("/schedule/update", "POST", {
      data: data,
    });
    await setTrigger((trigger) => trigger + 1);
  };
  // data.event.resource refer to content.id
  const onEventDrop: withDragAndDropProps["onEventDrop"] = async (data) => {
    console.log("data when drop", data);
    await fetchNonGetData("/schedule/update", "POST", {
      data: data,
    });
    await setTrigger((trigger) => trigger + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      let result = await fetchNonGetData("/schedule", "POST", {
        schedule_id: schedule_id,
      });
      let value = result.result;
      // console.log("value to frontend", value);
      let reformedArr = [];
      for (let a of value) {
        let startTime = formatTime(a.day, a.start_time);
        let endTime = formatTime(a.day, a.end_time);
        let event = {
          title: a.name,
          start: startTime,
          end: endTime,
          resource: a.id,
        };
        reformedArr.push(event);
      }
      setEventsArr(reformedArr);
    };
    fetchData().catch(console.error);
  }, [trigger]);

  useEvent<UnBookmarkActivityEvent>("un-bookmark-activity", (event) => {
    //Do fetch
    setTrigger((trigger) => trigger + event.id);
  });

  return (
    <>
      {props.showChecklist && (
        <Button
          fullWidth
          variant="outline"
          color="yellow"
          onClick={() => {
            navigate(`/checklistPage?id=${schedule_id}`);
          }}
        >
          <IconNote />
          Checklist
        </Button>
      )}
      <DnDCalendar
        defaultView="month"
        events={eventsArr}
        localizer={localizer}
        draggableAccessor={(event) => props.isEventActive}
        resizableAccessor={(event) => props.isEventActive}
        onEventDrop={onEventDrop}
        onEventResize={onEventResize}
        onDoubleClickEvent={
          props.isEventActive ? onDoubleClickEvent : undefined
        }
        resizable
        style={{ height: "85vh" }}
      />
    </>
  );
}

const locales = {
  "en-US": zhHK,
};

// The types here are `object`. Strongly consider making them better as removing `locales` caused a fatal error
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});
//@ts-ignore
const DnDCalendar = withDragAndDrop(Calendar);

export default Schedule;

function formatTime(day: string, time: string) {
  let formatTime = `${day}:${time}`;
  // console.log(formatTime);
  // console.log("newDate", new Date(formatTime));
  return new Date(formatTime);
}
