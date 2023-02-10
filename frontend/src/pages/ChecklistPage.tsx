import { Button, Checkbox, Container, Input } from "@mantine/core";
import { useEffect, useState } from "react";
import FlipMove from "react-flip-move";
import Header from "../components/SharedComponents/Header";
import { IconCirclePlus, IconCircleMinus, IconX } from "@tabler/icons";
import { Text } from "@mantine/core";
import { isConnected } from "../store/selector";
import { fetchData, fetchNonGetData } from "../utilis";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

type Checklist = {
  id: number;
  content: string;
  isChecked: boolean;
  createdAt: Date;
  userID: number;
  username: string;
};

export default function CheckListPage() {
  const [checklistArr, setchecklistArr] = useState<Checklist[] | null>(null);

  const [input, setInput] = useState("");
  const [trigger, setTrigger] = useState(0);

  let userRedux = isConnected();

  const [searchParams] = useSearchParams();
  let schedule_id = searchParams.get("id");

  const deleteInputValue = async (id: number): Promise<void> => {
    await fetchNonGetData("/checklistPage", "DELETE", { checklist_id: id });
    setTrigger((trigger) => trigger + 1);
  };
  useEffect(() => {
    const getChecklist = async () => {
      let result = await fetchData(`/checklistPage?id=${schedule_id}`);
      console.log("data to frontend checklist", result);
      setchecklistArr(result.data);
    };
    getChecklist().catch(console.error);
  }, [trigger]);

  const addInputValue = async (): Promise<void> => {
    if (input == "") {
      toast.error("Please type in content");
      return;
    }
    let data = {
      userID: userRedux?.id,
      inputValue: input,
      scheduleID: schedule_id,
    };
    await fetchNonGetData(`/checklistPage`, "POST", {
      data: data,
    });
    setInput("");
    setTrigger((trigger) => trigger + 1);
  };

  function triggerfn() {
    setTrigger((trigger) => trigger + 1);
  }

  return (
    <>
      <Header isShowSearchBar={false} />
      <h1 style={{ textAlign: "center" }}>CheckList</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <FlipMove
          enterAnimation="elevator"
          leaveAnimation="elevator"
          style={{ width: "70%" }}
        >
          {!checklistArr
            ? null
            : checklistArr.map((v) => (
                <div key={v.id}>
                  <CheckItem
                    input={v}
                    delete={() => {
                      deleteInputValue(v.id);
                    }}
                    trigger={() => {
                      triggerfn();
                    }}
                  />
                </div>
              ))}
        </FlipMove>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Input
          value={input}
          onChange={(e: any) => {
            setInput(e.target.value);
          }}
          onKeyUp={(e: any) => {
            e.keyCode == 13 ? addInputValue() : null;
          }}
        />
        <Button
          variant="light"
          color="orange"
          onClick={() => {
            addInputValue();
          }}
        >
          <IconCirclePlus style={{ margin: "0 5px 0 0" }} />
          Add Item
        </Button>
      </div>
      <br />
    </>
  );
}

function CheckItem(props: {
  input: any;
  delete: () => void;
  trigger: () => void;
}) {
  const [showDel, setShowDel] = useState(true);
  const [checkBox, setCheckBox] = useState(false);

  useEffect(() => {
    setCheckBox(props.input.isChecked);
  }, []);

  const updateChecked = async (checklistID: number) => {
    let data = { status: !checkBox, checklistID: checklistID };
    await fetchNonGetData("/checklistPage/check", "POST", {
      data: data,
    });
    props.trigger();
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        border: "solid black",
        margin: "5px",
        borderRadius: "5px",
        color: "black",
        height: "50px",
      }}
      onMouseEnter={() => {
        setShowDel(false);
      }}
      onMouseLeave={() => {
        setShowDel(true);
      }}
    >
      <div style={{ display: "flex" }}>
        <Checkbox
          onChange={(event) => {
            setCheckBox(event.currentTarget.checked);
            updateChecked(props.input.id);
          }}
          checked={checkBox}
          style={{ padding: "5px" }}
        />
        <div>
          <div style={{ padding: "2px" }}>{props.input.content}</div>
          <Text c="dimmed" style={{ padding: "5px", fontSize: "10px" }}>
            from. {props.input.username}
          </Text>
        </div>
      </div>
      <Button
        variant="outline"
        color="gray"
        hidden={showDel}
        style={{ padding: "5px", margin: "5px" }}
        onClick={() => {
          props.delete();
        }}
      >
        <IconX />
      </Button>
    </div>
  );
}
