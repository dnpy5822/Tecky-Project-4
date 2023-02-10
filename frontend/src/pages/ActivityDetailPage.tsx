import { useSearchParams } from 'react-router-dom';
import { Container, Rating, Space, Text } from '@mantine/core'
import { fetchNonGetData } from '../utilis';
import { useEffect, useState } from 'react';
import Header from '../components/SharedComponents/Header'
import toast from 'react-hot-toast';
import styles from './ActivityDetailPage.module.css'
import SaveButton from '../components/SharedComponents/SaveButton';


type DetailResult = {
    name: string;
    rating: number;
    country: string;
    image: string;
    opening_time: string;
    closing_time: string;
    description: string;
};

export default function ActivityDetailPage() {
    const [detail, setDetail] = useState<DetailResult>();

    const [searchParams] = useSearchParams(); //To get query
    let activityId = searchParams.get("activityId");
    console.log("activityId: ", typeof activityId);

    async function getDetail() {
        let result = await fetchNonGetData('/activityDetailPage', 'POST', { data: activityId });   ////fetch to trip.routes

        if (result.result) {
            setDetail(result.result)
        }
        else {
            toast.error(
                "Sorry, we are not available now. Please try again later"
            );
        }
    }

    console.log("detail: ", detail);

    useEffect(() => {
        getDetail()
    }, [])

    return (
        <div>
            <Container size="xl">
                <Header isShowSearchBar={false} />
                <Space h="md" />
            </Container>

            {detail ?
                <Container size="lg">
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <h1><b><Text>{detail.name}</Text></b></h1>
                        {activityId ?
                            <SaveButton activityId={+activityId} />
                            : null
                        }
                    </div>
                    <Rating value={detail.rating} fractions={2} color="teal" readOnly />
                    <Text>Opening Time: {detail.opening_time} - {detail.closing_time}</Text>
                    <Text>Let's see what others said: {detail.description}</Text>
                    <img src={detail.image} width="100%" height="100%" />
                </Container>
                : <div>"Sorry, we are not available now. Please try again later"</div>
            }
        </div>
    )
}
