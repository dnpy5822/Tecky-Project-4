import {
  BackgroundImage,
  Box,
  Group,
  Button,
  Modal,
  FileInput,
} from "@mantine/core";
import image from "../../assets/background.jpeg";
import { isConnected } from "../../store/selector";
import userIcon from "../../assets/usericon.jpg";
import style from "./PersonalPage.module.scss";
import { IconSettings, IconUpload } from "@tabler/icons";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { fetchData } from "../../utilis";
import Avatar from "boring-avatars";
import { UserRedux } from "../../store/LoginSlice";

export default function PersonalDetail() {
  let userRedux = isConnected();
  const [opened, setOpened] = useState(false);

  const [searchParams] = useSearchParams();

  let userID = searchParams.get("id");

  async function formSubmit(event: any) {
    event.preventDefault();

    const form = event.target;
    console.log(event.target);

    const formData = new FormData(form);

    await fetch(`${import.meta.env.VITE_SERVER_API}/userIcon?id=${userID}`, {
      method: "POST",
      body: formData,
    });

    setOpened(false);
    toast.success("Succeed to change profile picture");
    toast.success("Please login the account again to update status");
  }

  useEffect(() => {
    const userInfo = async () => {
      let data = await fetchData(`/userinfo?id=${userID}`);
      console.log("data to frontend", data);
    };
    userInfo().catch(console.error);
  }, []);

  return (
    <>
      <Box sx={{ maxWidth: 1200 }} mx="auto">
        <BackgroundImage src={image} radius="sm">
          {/* <Center p="md"> */}
          <Group style={{ padding: "20px" }}>
            {userRedux?.avatar?.includes("html") ? (
              <img className={style.webLogo} src={userRedux?.avatar} alt="" />
            ) : (
              <Avatar
                size={40}
                name={userRedux?.username}
                variant="beam"
                colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
              />
            )}
            <div
              style={{
                display: "flex",
                flex: "1",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div style={{ fontSize: "0.75rem" }}>ID: {userRedux?.id}</div>
                <div>{userRedux?.username}</div>
                <div className={style.labelName}>
                  @{`${userRedux?.username?.split(" ").join("")}`}
                </div>
              </div>
              <div>{userRedux?.email}</div>

              <>
                <Modal
                  opened={opened}
                  onClose={() => setOpened(false)}
                  title="Introduce yourself!"
                >
                  <form onSubmit={(event) => formSubmit(event)}>
                    {/* Modal content */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                    >
                      <div
                        style={{
                          position: "relative",
                        }}
                      >
                        <label htmlFor="file-input">
                          <div
                            style={{
                              backgroundColor: "rgba(123,120,119,0.3)",
                              display: "flex",
                              position: "absolute",
                              inset: "0",
                              maxWidth: "6rem",
                              maxHeight: "6rem",
                              borderRadius: "100%",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            Edit Icon
                          </div>
                        </label>

                        <label htmlFor="file-input">
                          <img
                            style={{
                              maxWidth: "6rem",
                              maxHeight: "6rem",
                              borderRadius: "100%",
                            }}
                            src={
                              userRedux?.avatar
                                ? `${userRedux?.avatar}`
                                : `https://tecky-project-4-tripplanner.s3.ap-southeast-1.amazonaws.com/assets/HongKongDisneyland-95af4f1c.jpeg`
                            }
                          />
                        </label>
                      </div>
                      {/* <input
                        hidden={false}
                        id="file-input"
                        type="file"
                        name="image"
                      /> */}
                      <FileInput
                        placeholder="Pick file"
                        label="Your Picture"
                        withAsterisk
                        name="image"
                        icon={<IconUpload size={14} />}
                      />
                    </div>
                    <div style={{ textAlign: "end" }}>
                      <input type="submit" value="Submit" />
                    </div>
                  </form>
                </Modal>

                <Group position="center">
                  <Button
                    hidden={true}
                    onClick={() => setOpened(true)}
                    leftIcon={<IconSettings size={18} />}
                    variant="white"
                    color="gray"
                    size="xs"
                  >
                    Edit personal info
                  </Button>{" "}
                </Group>
              </>
            </div>
          </Group>
          {/* </Center> */}
        </BackgroundImage>
      </Box>
    </>
  );
}
