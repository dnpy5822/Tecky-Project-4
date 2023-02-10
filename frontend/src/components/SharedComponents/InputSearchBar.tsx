import { Button, Group } from "@mantine/core";
import { SpotlightProvider, openSpotlight } from "@mantine/spotlight";
import type { SpotlightAction } from "@mantine/spotlight";
import { IconSearch, IconLocation } from "@tabler/icons";
import { useEffect, useState } from "react";
import { fetchNonGetData } from "../../utilis";
import { useNavigate } from "react-router-dom";
import useEvent from "react-use-event";

type CounterEvent = {
  type: "ActiveResult";
  delta: number;
};

function SpotlightControl(props: {
  size: any;
  color: string;
  variant: any;
  isDisable?: boolean;
}) {
  return (
    <Group position="center">
      <Button
        hidden={props.isDisable || false}
        fullWidth
        variant={props.variant}
        color={props.color}
        radius="xl"
        size={props.size}
        onClick={() => openSpotlight()}
      >
        <IconSearch />
        Search
      </Button>
    </Group>
  );
}

function InputSearchBar(props: {
  color: string;
  size: any;
  variant: any;
  widthSize: string;
  isDisable?: boolean;
}) {
  const [input, setInput] = useState("");
  let navigate = useNavigate();
  const dispatchCounter = useEvent<CounterEvent>("ActiveResult");

  useEffect(() => {
    if (input == "") {
      setActions([
        {
          title: "Japan",
          // description: "Get to home page",
          onTrigger: () => {
            navigate(`/searchResultPage?keyword=Japan`);
          },
          icon: <IconLocation size={18} />,
        },
        {
          title: "United State",
          // description: "Get full information about current system status",

          onTrigger: () => {
            navigate(`/searchResultPage?keyword=United State`);
          },
          icon: <IconLocation size={18} />,
        },
        {
          title: "Malaysia",
          // description: "Visit documentation to lean more about all features",
          onTrigger: () => {
            navigate(`/searchResultPage?keyword=Malaysia`);
          },
          icon: <IconLocation size={18} />,
        },
        {
          title: "Taiwan",
          // description: "Visit documentation to lean more about all features",
          onTrigger: () => {
            navigate(`/searchResultPage?keyword=Taiwan`);
          },
          icon: <IconLocation size={18} />,
        },
        {
          title: "Vietnam",
          // description: "Visit documentation to lean more about all features",
          onTrigger: () => {
            navigate(`/searchResultPage?keyword=Vietnam`);
          },
          icon: <IconLocation size={18} />,
        },
      ]);
    } else {
      const fetchData = async () => {
        let result = await fetchNonGetData("/inputBar", "POST", {
          data: input,
        });
        console.log("result to front-end", result.result);
        let nameArray: any[] = [];
        for (let i of result.result) {
          nameArray.push({
            title: i.name,
            onTrigger: () => navigate(`/searchResultPage?keyword=${i.name}`),
            icon: <IconLocation size={18} />,
          });

          setActions(nameArray);
        }
      };
      fetchData().catch(console.error);
    }
  }, [input]);

  const [actions, setActions] = useState<SpotlightAction[]>([
    {
      title: "Japan",
      // description: "Get to home page",
      onTrigger: () => console.log("Japan"),
      icon: <IconLocation size={18} />,
    },
    {
      title: "United State",
      // description: "Get full information about current system status",
      onTrigger: () => console.log("Thailand"),
      icon: <IconLocation size={18} />,
    },
    {
      title: "Vietnam",
      // description: "Visit documentation to lean more about all features",
      onTrigger: () => console.log("Vietnam"),
      icon: <IconLocation size={18} />,
    },
    {
      title: "Vietnam",
      // description: "Visit documentation to lean more about all features",
      onTrigger: () => console.log("Vietnam"),
      icon: <IconLocation size={18} />,
    },
    {
      title: "Vietnam",
      // description: "Visit documentation to lean more about all features",
      onTrigger: () => console.log("Vietnam"),
      icon: <IconLocation size={18} />,
    },
  ]);

  return (
    <SpotlightProvider
      hidden={false}
      actions={actions}
      searchIcon={<IconSearch size={18} />}
      onQueryChange={(query) => {
        setInput(query);
      }}
      onClick={() => {
        dispatchCounter({ delta: +1 });
      }}
      onKeyUp={() => {}}
      searchPlaceholder="Search..."
      shortcut="mod + shift + 1"
      nothingFoundMessage="Nothing found..."
    >
      <div style={{ width: props.widthSize }}>
        <SpotlightControl
          size={props.size}
          color={props.color}
          variant={props.variant}
          isDisable={props.isDisable}
        />
      </div>
    </SpotlightProvider>
  );
}

export default InputSearchBar;
