import Header from "../components/SharedComponents/Header";
import ActivityCard from "../components/SharedComponents/ActivityCard";
import styles from "./SearchResultPage.module.css";
import sakuraPic from "../assets/sakura.jpg";
import toast from "react-hot-toast";
import { Container, Grid, Space } from "@mantine/core";
import { fetchNonGetData } from "../utilis";
import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useEvent from "react-use-event";

type SearchResult = {
    id: number;
    name: string;
    type: string;
    rating: number;
    country: string;
    image: string;
}[];

type CounterEvent = {
    type: "ActiveResult";
    delta: number;
};

export default function SearchResultPage() {
    const [searchResult, setSearchResult] = useState<SearchResult>([]);
    const [count, setCount] = useState(0);

    useEvent<CounterEvent>("ActiveResult", (event) => {
        setCount(count + event.delta);
    });

    const [searchParams] = useSearchParams(); //To get query
    let keyword = searchParams.get("keyword");

    async function searchByKeyword() {
        console.log("query keyword: ", keyword);
        let searchResult = await fetchNonGetData(
            "/searchedActivityDetail",
            "POST",
            { data: keyword }
        ); //fetch to trip.routes

        console.log("searchResult: ", searchResult);

        if (searchResult.searchResult.length >= 1) {
            setSearchResult(searchResult.searchResult);
        } else {
            toast.error(
                "Sorry, there is no result in such keyword. Please try again with another keyword."
            );
        }
    }

    useEffect(() => {
        searchByKeyword();
    }, [count]);

    return (
        <div>
            <Container size="xl">
                <Header isShowSearchBar={false} />
                <Space h="md" />
            </Container>

            <Container size="lg">
                <h1 className={styles.title}>
                    <b>
                        <span>Explore</span> {keyword}
                    </b>
                </h1>

                <h1 className={styles.pictures}>
                    {/* <img style={{ width: "100%", height: "100%" }} src={sakuraPic} /> */}
                    <img
                        style={{ width: "100%", height: "100%" }}
                        src={searchResult[0] ? searchResult[0].image : sakuraPic}
                    />
                </h1>

                <Space h="md" />
                {/*正常DB有資料就會有野show出黎 */}
                {/*以下為Search完之後既內容 */}
                <Grid>
                    <Grid.Col span={3} className={styles.position}>
                        <div>
                            <div className={styles.subtitle}>Eat</div>
                            <div className={styles.description}>
                                Can't-miss spots to dine, drink, and feast.
                            </div>
                        </div>
                    </Grid.Col>

                    {searchResult &&
                        Array.isArray(searchResult) &&
                        searchResult
                            .filter((v) => v.type === "restaurant")
                            .filter((_, i) => i <= 2)
                            .map((v) => (
                                <Grid.Col md={3}>
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

                <Grid>
                    <Grid.Col span={3} className={styles.position}>
                        <div>
                            <div className={styles.subtitle}>Do</div>
                            <div className={styles.description}>
                                Places to see, ways to wander, and signature experiences.
                            </div>
                        </div>
                    </Grid.Col>

                    {searchResult &&
                        Array.isArray(searchResult) && //正常DB有data就會show到出黎
                        searchResult
                            .filter((v) => v.type === "spot")
                            .filter((_, i) => i <= 2)
                            .map((v) => (
                                <Grid.Col md={3}>
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
                {/*以上為Search完之後既內容 */}
            </Container>
        </div>
    );
}
