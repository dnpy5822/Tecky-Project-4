import { Card, Image, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import Header from "../components/SharedComponents/Header";
import image from "../assets/HongKongDisneyland.jpeg";
import { fetchData } from "../utilis";
import style from "../components/ShareSchedulePage/ShareSchedulePage.module.scss";
import { useNavigate } from "react-router-dom";
import RequireLogin from "../components/SharedComponents/RequireLogin";
import { useToken } from "../store/selector";
import Avatar from "boring-avatars";

type Detail = {
  username: string;
  scheduleID: number;
  scheduleName: string;
  tag: string;
  createdAt: string;
  avatar?: string | null;
};

export default function ShareSchedulePage() {
  const [scheduleDetail, setScheduleDetail] = useState<Detail[] | null>(null);

  useEffect(() => {
    const fetchdata = async () => {
      let data = await fetchData("/scheduleDetail");
      console.log("data to frontend", data);
      setScheduleDetail(data.result);
    };
    fetchdata().catch(console.error);
  }, []);

  let navigate = useNavigate();
  let token = useToken();

  return (
    <>
      <Header isShowSearchBar={false} />
      {!token ? (
        <RequireLogin />
      ) : (
        <>
          <Text
            variant="gradient"
            gradient={{ from: "indigo", to: "cyan", deg: 45 }}
            sx={{ fontFamily: "Greycliff CF, sans-serif" }}
            ta="center"
            fz="xl"
            fw={700}
          >
            ALL TRIP PLANS
          </Text>
          {!scheduleDetail
            ? null
            : scheduleDetail.map((v) => (
                <div key={v.scheduleID}>
                  <Card
                    onClick={() =>
                      navigate(`/ScheduleDetail?id=${v.scheduleID}`)
                    }
                    shadow="sm"
                    p="xl"
                    component="a"
                    // href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                    target="_blank"
                  >
                    <Card.Section>
                      <Image src={image} height={150} alt="No way!" />
                    </Card.Section>

                    <Text weight={500} size="lg" mt="md">
                      {v.scheduleName}
                    </Text>

                    <Text mt="xs" color="dimmed" size="sm">
                      {v.tag}
                    </Text>

                    <Text
                      mt="xs"
                      size="sm"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        {v?.avatar?.includes("http") ? (
                          <img
                            className={style.webLogo}
                            src={v?.avatar}
                            alt=""
                          />
                        ) : (
                          <div>
                            <Avatar
                              size={40}
                              name={v?.username}
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

                        <div>{v.username}</div>
                      </div>
                      <div>{`${new Date(v.createdAt).getFullYear()}-${
                        new Date(v.createdAt).getMonth() + 1
                      }-${new Date(v.createdAt).getDate()}`}</div>
                    </Text>
                  </Card>
                </div>
              ))}
          <br />
        </>
      )}
    </>
  );
}
