import { Button, TextInput } from '@mantine/core'
import { DateRangePicker, DateRangePickerValue } from '@mantine/dates';
import { useState } from 'react';
import styles from './WeatherSearchBar.module.css'

export default function WeatherSearchBar() {

    const [location, setLocation] = useState("");
    const [date, setDate] = useState<DateRangePickerValue>([
        new Date(),
        new Date(),
    ]);

    async function checkWeather() {

    }

    return (
        <div className={styles.box}>
            <TextInput
                placeholder="Country or City"
                label="Location"
                withAsterisk
                value={location}
                onChange={(event) => setLocation(event.currentTarget.value)}
            />

            <DateRangePicker
                label="Please select date for your trip"
                placeholder="Pick dates range"
                value={date}
                onChange={setDate}
                required={true}
            />

            <Button
                color="teal"
                radius="xl"
                size="md"
                onClick={() => checkWeather()}
            >
                Check Weather
            </Button>
        </div>
    )
}
