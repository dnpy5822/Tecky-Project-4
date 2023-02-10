import Schedule from "../components/SchedulePageComponents/Schedule";
import Header from "../components/SharedComponents/Header";
import style from "../components/ShareSchedulePage/ShareSchedulePage.module.scss";
import { Badge, Button, Popover, Text, Textarea } from "@mantine/core";
import { useEffect, useState } from "react";
import { isConnected, useToken } from "../store/selector";
import { fetchData, fetchNonGetData } from "../utilis";
import { useSearchParams } from "react-router-dom";
import { IconEdit } from "@tabler/icons";
import RequireLogin from "../components/SharedComponents/RequireLogin";
import Avatar from "boring-avatars";

type Message = {
  content: string;
  createdAt: string;
  username: string;
  avatar: string;
  id: number;
};

export default function ScheduleDetail() {
  const [messages, setMessage] = useState<Message[] | null>(null);

  const [searchParams] = useSearchParams();
  let schedule_id = searchParams.get("id");

  const [textAreaValue, setTextAreaValue] = useState("");

  const [triggerPoint, setTrigger] = useState(0);

  let userRedux = isConnected();

  useEffect(() => {
    const fetchGet = async () => {
      let result = await fetchData(`/commentRecord?id=${schedule_id}`);
      console.log("data to frontend", result);
      setMessage(result.data);
    };
    fetchGet().catch(console.error);
  }, [triggerPoint]);

  async function submitTextArea() {
    let data = { textInput: textAreaValue, userInfo: userRedux?.id };
    await fetchNonGetData(`/comment?id=${schedule_id}`, "POST", {
      data: data,
    });

    setTextAreaValue("");
    setTrigger(triggerPoint + 1);
  }

  function trigger() {
    setTrigger(triggerPoint + 1);
  }

  let token = useToken();

  return (
    <>
      <Header isShowSearchBar={false} />
      {!token ? (
        <RequireLogin />
      ) : (
        <>
          <Schedule isEventActive={false} showChecklist={false} />
          <div className={style.commentBoxBg}>
            <Text
              variant="gradient"
              gradient={{ from: "indigo", to: "cyan", deg: 45 }}
              sx={{ fontFamily: "Greycliff CF, sans-serif" }}
              ta="left"
              fz="xl"
              fw={700}
            >
              <div>Recent comment</div>
            </Text>
            <div>latest comments section by users</div>
            <hr />

            {!messages ? (
              <></>
            ) : (
              messages.map((v) => (
                <Comment
                  message={v}
                  userRedux={userRedux}
                  fnTrigger={() => {
                    trigger();
                  }}
                />
              ))
            )}

            <Textarea
              value={textAreaValue}
              placeholder="Your comment"
              label="Your comment"
              withAsterisk
              onChange={(e) => {
                setTextAreaValue(e.currentTarget.value);
              }}
              onKeyUp={(e: any) => {
                e.keyCode == 13 ? submitTextArea() : null;
              }}
            />
          </div>
        </>
      )}
    </>
  );
}

function Comment(props: {
  message: Message;
  userRedux: any;
  fnTrigger: () => void;
}) {
  const [isTextAreaOpen, setIsTextAreaOpen] = useState(false);
  const [smallTextArea, setSmallTextArea] = useState("");
  const [opened, setOpened] = useState(false);

  function openText() {
    setIsTextAreaOpen(true);
  }
  function closeText() {
    setIsTextAreaOpen(false);
  }

  async function submitToUpdate(schedule_comment_id: number) {
    let data = { textInput: smallTextArea, userInfo: props.userRedux?.id };
    await fetchNonGetData(`/updatecomment?id=${schedule_comment_id}`, "POST", {
      data: data,
    });

    setSmallTextArea("");
    closeText();
    props.fnTrigger();
  }

  async function submitToDelete(schedule_comment_id: number) {
    await fetchNonGetData(`/deletecomment?id=${schedule_comment_id}`, "POST", {
      data: props.userRedux?.id,
    });

    closeText();
    props.fnTrigger();
  }
  return (
    <div>
      <div style={{ display: "flex", padding: "10px" }}>
        {props.message ? (
          <div>
            {props.message?.avatar?.includes("http") ? (
              <img
                style={{
                  maxHeight: "2.5rem",
                  maxWidth: "2.5rem",
                  borderRadius: "100%",
                  margin: "5px",
                }}
                src={props.message?.avatar}
                alt=""
              />
            ) : (
              <div>
                <Avatar
                  size={40}
                  name={props.message?.username}
                  variant="beam"
                  colors={[
                    "#92A1C6",
                    "#146A7C",
                    "#F0AB3D",
                    "#C271B4",
                    "#C20D90",
                  ]}
                />
              </div>
            )}
          </div>
        ) : null}

        <div>
          <Badge
            size="lg"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div>{props.message.username}</div>
          </Badge>
          <div style={{ display: "flex" }}>
            <div>
              {`${new Date(props.message.createdAt).getFullYear()}-${
                new Date(props.message.createdAt).getMonth() + 1
              }-${new Date(props.message.createdAt).getDate()} ${new Date(
                props.message.createdAt
              ).getHours()}:${new Date(props.message.createdAt).getMinutes()}`}
            </div>

            {props.message.username == props.userRedux.username ? (
              <>
                <Popover
                  opened={opened}
                  width={200}
                  position="bottom"
                  withArrow
                  shadow="md"
                >
                  <Popover.Target>
                    <div>
                      <IconEdit
                        onClick={() => {
                          setOpened(true);
                        }}
                      />
                    </div>
                  </Popover.Target>
                  <Popover.Dropdown>
                    <Button
                      fullWidth
                      color="gray"
                      variant="outline"
                      onClick={() => {
                        openText();
                        setOpened(false);
                      }}
                    >
                      EDIT
                    </Button>
                    <Button
                      fullWidth
                      color="gray"
                      variant="outline"
                      onClick={() => {
                        setOpened(false);
                        submitToDelete(props.message.id);
                      }}
                    >
                      DELETE
                    </Button>
                  </Popover.Dropdown>
                </Popover>
              </>
            ) : null}
          </div>
          {isTextAreaOpen ? (
            <Textarea
              onChange={(e) => {
                setSmallTextArea(e.currentTarget.value);
              }}
              onKeyUp={(e: any) => {
                e.keyCode == 13 ? submitToUpdate(props.message.id) : null;
              }}
            />
          ) : (
            <div>{props.message.content}</div>
          )}
        </div>
      </div>
      <hr />
    </div>
  );
}
