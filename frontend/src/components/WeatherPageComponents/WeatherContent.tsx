import { Button, Table, Space, TextInput, Text, Group } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useState } from 'react';
import styles from './WeatherContent.module.css'
import WeatherInfoTable from './WeatherInfoTable';

export default function WeatherContent() {

    const [location, setLocation] = useState("");
    const [weatherList, setWeatherList] = useState<any>({})


    //////////////////////////////For calling weather API//////////////////////////////
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'cad183fb15msh8c8931d494cae3ap14654ejsna41642290626',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };

    //////////////////////////////Getting weather for future 3 days//////////////////////////////
    async function getWeather() {

        let res = await fetch(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${location}&days=3`, options)
        let weatherResult = await res.json();

        setWeatherList(weatherResult);

        console.log("weather result: ", weatherResult);
    }

    return (
        <div className={styles.box}>
            <Group position='apart' spacing="xl">
                <div>
                    <TextInput
                        placeholder="Country or City"
                        label="Location"
                        description="Get 3 days weather forecast data "
                        withAsterisk
                        value={location}
                        onChange={(event) => setLocation(event.currentTarget.value)}
                    />
                </div>

                <div>
                    <Button
                        color="teal"
                        radius="md"
                        size="sm"
                        onClick={() => getWeather()}
                    >
                        Check Weather
                    </Button>
                </div>
            </Group>

            <Space h="xl" />


            <div>
                {weatherList && weatherList.forecast
                    ? <WeatherInfoTable weatherList={weatherList} />
                    : weatherList.error
                        ? <h3>{weatherList.error.message}</h3>
                        : <Text>Please input location for more information</Text>}
            </div>
        </div>
    )
}