import { useState, useEffect } from "react";
import { useGet } from "../hooks/useGet";
import { Container, Grid } from "@mantine/core";
// import styles from "../components/HomePageComponents/MiddleSearchBar.module.scss";
import Header from "../components/SharedComponents/Header";
import MiddleSearchArea from "../components/HomePageComponents/MiddleSearchBar";
import ActivityCard from "../components/SharedComponents/ActivityCard";
import Footer from "../components/SharedComponents/Footer";

type ActivityDetail = {
  error?: string;
  //activityDetailData should looks look this:
  //[
  //  { id: 1, name: "eating Takoyaki", type: "spot", rating: 4, country: "Japan", image: "123.png"},
  //  { id: 2, name: "eating ramen", type: "spot", rating: 5, country: "Japan", image: "456.png"},
  //]
  activityDetail: {
    id: number;
    name: string;
    type: string;
    rating: number;
    country: string;
    image: string;
  }[];
};

function Homepage() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isShowSearchBar, setIsShowSearchBar] = useState(false);

  const handleScroll = () => {
    const position = window.pageYOffset;
    // console.log("position:", position);
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const { state: activityDetail } = useGet<ActivityDetail>(
    "/activityDetail",
    {} as any
  ); //fetch to trip.routes
  //   console.log("activityDetail.activityDetail: ", activityDetail.activityDetail);

  useEffect(() => {
    if (scrollPosition >= 203) {
      setIsShowSearchBar(true);
    } else if (scrollPosition < 203) {
      setIsShowSearchBar(false);
    }
    return;
  }, [scrollPosition]);

  return (
    <div>
      <Container size="xl">
        <Header isShowSearchBar={!isShowSearchBar} />
        <br />
        <MiddleSearchArea scrollPosition={scrollPosition} />
        <hr />
        <h3>Explore This Wonderful World</h3>
        <Grid>
          {activityDetail &&
            Array.isArray(activityDetail.activityDetail) && //正常DB有data就會show到出黎
            activityDetail.activityDetail.map((v) => (
              <Grid.Col md={4}>
                <ActivityCard
                  id={v.id}
                  name={v.name}
                  type={v.type}
                  rating={v.rating}
                  country={v.country}
                  image={v.image}
                />
              </Grid.Col>
            ))}
        </Grid>
      </Container>
    </div>
  );
}

export default Homepage;
