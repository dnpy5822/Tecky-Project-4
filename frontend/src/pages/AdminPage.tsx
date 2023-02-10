import {
  AppShell,
  Grid,
  Navbar,
  Center,
  Container,
  Text,
  Tabs,
  List,
  ThemeIcon,
  Box,
  Pagination,
  Modal,
  Button,
  Input,
  Textarea,
  Select,
  MultiSelect,
  FileInput,
} from "@mantine/core";
import {
  IconCircleCheck,
  IconCircleDashed,
  IconMessageCircle,
  IconPhoto,
  IconSettings,
  IconUser,
  IconFlag,
} from "@tabler/icons";
import { useEffect, useState } from "react";
import Header from "../components/SharedComponents/Header";
import { isConnected } from "../store/selector";
import { fetchData, fetchNonGetData } from "../utilis";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { TimeInput } from "@mantine/dates";
import Avatar from "boring-avatars";

type UserList = {
  id: number;
  username: string;
  email: string;
  avatar: string;
  isAdmin: boolean;
  warning: number;
  isBanned: boolean | null;
};

type User = {
  id: number;
  username: string;
  avatar: string;
  count: number;
};

function AdminPage() {
  const [userList, setUserList] = useState<UserList[] | null>(null);
  const [trigger, setTrigger] = useState(0);
  const [activeUser, setActiveUser] = useState<User | null>(null);
  const [inactiveUser, setInActiveUser] = useState<User | null>(null);
  const [toggle, setToggle] = useState(true);

  let userRedux = isConnected();
  let navigate = useNavigate();

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      if (!userRedux) {
        toast.error("You have no yet logged in");
        navigate("/");
        return;
      } else if (!userRedux.isAdmin) {
        toast.error("You have no permission to access this page");
        navigate("/");
        return;
      }
    } catch (e) {
      alert(e);
    }
  }

  useEffect(() => {
    const getUserList = async () => {
      let data = await fetchData("/userlist");
      setUserList(data.data);
    };
    getUserList().catch(console.error);
  }, []);

  useEffect(() => {
    const findMostActiveUser = async () => {
      let data = await fetchData("/activeUser");
      let newArr = data.data.reduce(
        (prev: any, curr: any) => {
          if (prev.count > curr.count) {
            return prev;
          } else {
            return curr;
          }
        },
        { id: 1000, username: "test", avatar: "something", count: 0 }
      );
      let newArr2 = data.data.reduce(
        (prev: any, curr: any) => {
          if (prev.count > curr.count) {
            return curr;
          } else {
            return prev;
          }
        },
        { id: 1000, username: "test", avatar: "something", count: 1000 }
      );

      setActiveUser(newArr);
      setInActiveUser(newArr2);
    };
    findMostActiveUser().catch(console.error);
  }, []);

  function triggerfn() {
    setTrigger(trigger + 1);
  }

  return (
    <>
      <Header isShowSearchBar={true} />

      <div style={{ display: "flex" }}>
        <div>
          <Navbar height={600} p="xs" width={{ base: 300 }}>
            <Navbar.Section>
              {/* Header with logo */}
              TRIP PLANNER
            </Navbar.Section>
            <Navbar.Section grow mt="md">
              {/* Links sections */}
              <Button
                fullWidth
                variant="outline"
                style={{ margin: "5px" }}
                onClick={() => {
                  setToggle(true);
                }}
              >
                Manage user
              </Button>
              <Button
                fullWidth
                variant="outline"
                style={{ margin: "5px" }}
                onClick={() => {
                  setToggle(false);
                }}
              >
                Upload New Activity
              </Button>
            </Navbar.Section>
            <Navbar.Section>
              {/* Footer with user */}
              {!userRedux ? null : (
                <div style={{ display: "flex", alignItems: "center" }}>
                  {userRedux?.avatar?.includes("http") ? (
                    <img
                      style={{
                        maxHeight: "2.5rem",
                        maxWidth: "2.5rem",
                        borderRadius: "100%",
                        margin: "5px",
                      }}
                      src={userRedux?.avatar}
                      alt=""
                    />
                  ) : (
                    <div>
                      <Avatar
                        size={40}
                        name={userRedux?.username}
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
                  <div style={{ padding: "10px" }}>{userRedux.username}</div>
                </div>
              )}
            </Navbar.Section>
          </Navbar>
        </div>
        {toggle ? (
          <div style={{ flex: "1" }}>
            <Container>
              <div
                aria-label="header"
                style={{
                  marginTop: "1rem",
                  backgroundColor: "rgb(248,248,248)",
                }}
              >
                <Text fz="xl" style={{ textAlign: "center" }}>
                  User Management
                </Text>
              </div>
              <div style={{ marginTop: "20px" }}>
                <Tabs defaultValue="gallery">
                  <Tabs.List>
                    <Tabs.Tab value="gallery" icon={<IconFlag size={14} />}>
                      Overview
                    </Tabs.Tab>
                    <Tabs.Tab value="messages" icon={<IconUser size={14} />}>
                      User List
                    </Tabs.Tab>
                  </Tabs.List>

                  <Tabs.Panel value="gallery" pt="xs">
                    <div
                      style={{
                        border: "solid black",
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                    >
                      <div style={{ padding: "8px" }}>
                        <p>Total user:</p>
                        {userList && <div>{userList.length}</div>}
                      </div>
                      <div style={{ padding: "8px" }}>
                        <p>MOST active user:</p>
                        <div style={{ display: "flex" }}>
                          {!activeUser ? (
                            <div>No active user</div>
                          ) : activeUser.avatar?.includes("http") ? (
                            <img
                              style={{
                                maxWidth: "3rem",
                                maxHeight: "3rem",
                                borderRadius: "100%",
                              }}
                              src={activeUser?.avatar}
                            />
                          ) : (
                            <Avatar
                              size={40}
                              name={activeUser?.username}
                              variant="beam"
                              colors={[
                                "#92A1C6",
                                "#146A7C",
                                "#F0AB3D",
                                "#C271B4",
                                "#C20D90",
                              ]}
                            />
                          )}
                          <div>
                            <div>{activeUser?.username}</div>
                            <div>Posted scheudle: {activeUser?.count}</div>
                          </div>
                        </div>
                      </div>
                      <div style={{ padding: "8px" }}>
                        <p>MOST inactive user:</p>
                        <div style={{ display: "flex" }}>
                          {!inactiveUser ? (
                            <div>No inactive user</div>
                          ) : inactiveUser.avatar?.includes("http") ? (
                            <img
                              style={{
                                maxWidth: "3rem",
                                maxHeight: "3rem",
                                borderRadius: "100%",
                              }}
                              src={inactiveUser?.avatar}
                            />
                          ) : (
                            <Avatar
                              size={40}
                              name={inactiveUser?.username}
                              variant="beam"
                              colors={[
                                "#92A1C6",
                                "#146A7C",
                                "#F0AB3D",
                                "#C271B4",
                                "#C20D90",
                              ]}
                            />
                          )}
                          <div>
                            <div>{inactiveUser?.username}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Tabs.Panel>

                  <Tabs.Panel value="messages" pt="xs">
                    {!userList
                      ? null
                      : userList.map((v) => (
                          <div key={v.id}>
                            <UserComponent
                              input={v}
                              trigger={() => {
                                triggerfn();
                              }}
                            />
                          </div>
                        ))}
                  </Tabs.Panel>

                  <Tabs.Panel value="settings" pt="xs">
                    Settings tab content
                  </Tabs.Panel>
                </Tabs>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "2rem",
                }}
              ></div>
            </Container>
          </div>
        ) : (
          <div style={{ textAlign: "center", flex: "1" }}>
            {/* <Container> */}
            <div
              aria-label="header"
              style={{
                marginTop: "1rem",
                backgroundColor: "rgb(248,248,248)",
              }}
            >
              <Text fz="xl">Upload New Activity</Text>
            </div>
            <SpotForm />
            {/* </Container> */}
          </div>
        )}
      </div>
    </>
  );
}

export default AdminPage;

function UserComponent(props: { input: UserList; trigger: () => void }) {
  const [opened, setOpened] = useState(false);
  const [warningNum, setWarningNum] = useState(props.input.warning);
  const [banStatus, setBan] = useState(props.input.isBanned);

  async function sendWarning(userID: number) {
    console.log("clicked on warning button");
    await fetchNonGetData("/warning", "POST", { userID: userID });
    setWarningNum((warningNum) => warningNum + 1);
    props.trigger();
  }

  async function banUser(userID: number) {
    console.log("clicked on warning button");
    await fetchNonGetData("/ban", "POST", { userID: userID });
    setBan(true);
    props.trigger();
  }

  async function unbanUser(userID: number) {
    console.log("clicked on warning button");
    await fetchNonGetData("/unban", "POST", { userID: userID });
    setBan(false);
    props.trigger();
  }

  return (
    <div>
      <Box
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
          padding: theme.spacing.xl,
          borderRadius: theme.radius.md,
          cursor: "pointer",

          "&:hover": {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[5]
                : theme.colors.gray[1],
          },
        })}
        style={{
          border: "solid black",
          margin: "5px",
          display: "flex",
          alignItems: "center",
        }}
        onClick={() => {
          setOpened(true);
        }}
      >
        {props.input.avatar?.includes("http") ? (
          <img
            style={{
              maxWidth: "3rem",
              maxHeight: "3rem",
              borderRadius: "100%",
            }}
            src={props.input.avatar}
          />
        ) : (
          <Avatar
            size={40}
            name={props.input?.username}
            variant="beam"
            colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
          />
        )}
        <div style={{ padding: "5px" }}>
          <div>User ID: {props.input.id}</div>
          <div>Username: {props.input.username}</div>
          <div>Email: {props.input.email}</div>
        </div>
      </Box>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="User personal info"
        style={{ textAlign: "center" }}
      >
        {/* Modal content */}
        <img
          style={{
            maxWidth: "5rem",
            maxHeight: "5rem",
          }}
          src={
            props.input.avatar?.includes("http")
              ? props.input.avatar
              : `https://tecky-project-4-tripplanner.s3.ap-southeast-1.amazonaws.com/assets/HongKongDisneyland-95af4f1c.jpeg`
          }
        />
        <div>ID: {props.input.id}</div>
        <div>Username: {props.input.username}</div>
        <div>Email: {props.input.email}</div>
        <div style={{ border: "solid red 3px", borderRadius: "10px" }}>
          <div>Received warning: {warningNum}</div>
          <div>Status: {banStatus ? `Banned` : `Active`}</div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            margin: "5px",
          }}
        >
          <Button
            variant="outline"
            color="dark"
            onClick={() => {
              sendWarning(props.input.id);
            }}
          >
            Warning
          </Button>
          {banStatus ? (
            <Button
              variant="outline"
              color="dark"
              onClick={() => {
                unbanUser(props.input.id);
              }}
            >
              Un-ban
            </Button>
          ) : (
            <Button
              variant="outline"
              color="dark"
              onClick={() => {
                banUser(props.input.id);
              }}
            >
              Ban
            </Button>
          )}
        </div>
      </Modal>
    </div>
  );
}

function SpotForm() {
  const [time, setTime] = useState(new Date());

  async function formSubmit(event: any) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    await fetch(`http://localhost:8080/newactivity`, {
      method: "POST",
      body: formData,
    });

    toast.success("Successfully upload activity");
  }

  return (
    <form
      onSubmit={(event) => {
        formSubmit(event);
      }}
    >
      <p>New Activity Detail</p>
      <div
        style={{ display: "flex", flex: "1", justifyContent: "space-evenly" }}
      >
        <div>
          <Input.Wrapper
            id="activity"
            withAsterisk
            label="Activity name"
            // error="Your credit card expired"
          >
            <Input
              id="activity name"
              placeholder="Activity name"
              name="activity_name"
            />
          </Input.Wrapper>
          <Input.Wrapper
            id="description"
            withAsterisk
            label="Description"
            // error="Your credit card expired"
          >
            <Textarea
              placeholder="Describe the spot"
              withAsterisk
              name="description"
            />{" "}
          </Input.Wrapper>

          <Input.Wrapper id="type" withAsterisk label="Spot or Restaurant">
            <Select
              id="type"
              name="type"
              placeholder="Pick one"
              data={[
                { value: "Spot", label: "Spot" },
                { value: "Restaurant", label: "Restaurant" },
              ]}
            />
          </Input.Wrapper>

          <Input.Wrapper
            id="tag"
            withAsterisk
            label="Tag"
            // error="Your credit card expired"
          >
            <Select
              placeholder="Pick one"
              searchable
              nothingFound="No options"
              data={[
                { value: "theme park", label: "Theme Park" },
                { value: "museum", label: "Museum" },
                { value: "garden", label: "Garden" },
                { value: "historic landmark", label: "Historic Landmark" },
                { value: "religion site", label: "Religion site" },
                { value: "sight-seeing", label: "Sight-Seeing" },
                { value: "food", label: "Food" },
              ]}
              name="tag"
            />
          </Input.Wrapper>

          <Input.Wrapper
            id="country"
            withAsterisk
            label="Country"
            // error="Your credit card expired"
          >
            <Select
              placeholder="Pick one"
              searchable
              nothingFound="No options"
              data={[
                { value: "Japan", label: "Japan" },
                { value: "Vietnam", label: "Vietnam" },
                { value: "London", label: "London" },
                { value: "Taiwan", label: "Taiwan" },
                { value: "Malaysia", label: "Malaysia" },
              ]}
              name="country"
            />
          </Input.Wrapper>
        </div>
        <div>
          <FileInput
            placeholder="Pick file"
            label="Your Picture"
            withAsterisk
            name="image"
          />
          <Input.Wrapper
            id="opening_time"
            withAsterisk
            label="Opening Time"
            // error="Your credit card expired"
          >
            <TimeInput
              defaultValue={time}
              radius="md"
              amLabel="am"
              pmLabel="pm"
              name="opening_time"
              withAsterisk
            />
          </Input.Wrapper>

          <Input.Wrapper
            id="closing_time"
            withAsterisk
            label="Closing Time"
            // error="Your credit card expired"
          >
            <TimeInput
              defaultValue={new Date()}
              radius="md"
              amLabel="am"
              pmLabel="pm"
              name="closing_time"
              withAsterisk
            />
          </Input.Wrapper>

          <Input.Wrapper
            id="latitude"
            withAsterisk
            label="Latitude"
            // error="Your credit card expired"
          >
            <Input
              id="latitude"
              placeholder="Latitude"
              name="latitude"
              type="number"
              step=".00000001"
            />
          </Input.Wrapper>
          <Input.Wrapper
            id="longitude"
            withAsterisk
            label="Longitude"
            // error="Your credit card expired"
          >
            <Input
              id="longitude"
              placeholder="Longitude"
              name="longitude"
              type="number"
              step=".00000001"
            />
          </Input.Wrapper>
          <Input.Wrapper
            id="rating"
            withAsterisk
            label="Rating"
            // error="Your credit card expired"
          >
            <Input
              id="rating"
              placeholder="Rating 1-5"
              name="rating"
              type="number"
              min={1}
              max={5}
            />
          </Input.Wrapper>
        </div>
      </div>
      <br />
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        {/* <Button>Clear</Button> */}
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}
