import { Table } from "@mantine/core";
import styles from './WeatherContent.module.css'

type WeatherInfoTableProps = {
    weatherList: any;
}

function WeatherInfoTable({ weatherList }: WeatherInfoTableProps) {
    const date = (
        <tr>
            <th>Date</th>
            <th>{weatherList?.forecast.forecastday[0].date}</th>
            <th>{weatherList?.forecast.forecastday[1].date}</th>
            <th>{weatherList?.forecast.forecastday[2].date}</th>
        </tr>
    );

    const row1 = (
        <tr>
            <td>Min Temperature</td>
            <td>{weatherList?.forecast.forecastday[0].day.mintemp_c} °C</td>
            <td>{weatherList?.forecast.forecastday[1].day.mintemp_c} °C</td>
            <td>{weatherList?.forecast.forecastday[2].day.mintemp_c} °C</td>
        </tr>
    );

    const row2 = (
        <tr>
            <td>Max Temperature</td>
            <td>{weatherList?.forecast.forecastday[0].day.maxtemp_c} °C</td>
            <td>{weatherList?.forecast.forecastday[1].day.maxtemp_c} °C</td>
            <td>{weatherList?.forecast.forecastday[2].day.maxtemp_c} °C</td>
        </tr>
    );

    const row3 = (
        <tr>
            <td>Chance of Rain</td>
            <td>{weatherList?.forecast.forecastday[0].day.daily_chance_of_rain}</td>
            <td>{weatherList?.forecast.forecastday[1].day.daily_chance_of_rain}</td>
            <td>{weatherList?.forecast.forecastday[2].day.daily_chance_of_rain}</td>
        </tr>
    );

    const row4 = (
        <tr>
            <td>Chance of Snow</td>
            <td>{weatherList?.forecast.forecastday[0].day.daily_chance_of_snow}</td>
            <td>{weatherList?.forecast.forecastday[1].day.daily_chance_of_snow}</td>
            <td>{weatherList?.forecast.forecastday[2].day.daily_chance_of_snow}</td>
        </tr>
    );

    const row5 = (
        <tr>
            <td>Average Humidity</td>
            <td>{weatherList?.forecast.forecastday[0].day.avghumidity} %</td>
            <td>{weatherList?.forecast.forecastday[1].day.avghumidity} %</td>
            <td>{weatherList?.forecast.forecastday[2].day.avghumidity} %</td>
        </tr>
    );

    const row6 = (
        <tr>
            <td>Average Temperature</td>
            <td>{weatherList?.forecast.forecastday[0].day.avgtemp_c} °C</td>
            <td>{weatherList?.forecast.forecastday[1].day.avgtemp_c} °C</td>
            <td>{weatherList?.forecast.forecastday[2].day.avgtemp_c} °C</td>
        </tr>
    );

    const row7 = (
        <tr>
            <td>Sunrise Time</td>
            <td>{weatherList?.forecast.forecastday[0].astro.sunrise}</td>
            <td>{weatherList?.forecast.forecastday[1].astro.sunrise}</td>
            <td>{weatherList?.forecast.forecastday[2].astro.sunrise}</td>
        </tr>
    );

    const row8 = (
        <tr>
            <td>Sunset Time</td>
            <td>{weatherList?.forecast.forecastday[0].astro.sunset}</td>
            <td>{weatherList?.forecast.forecastday[1].astro.sunset}</td>
            <td>{weatherList?.forecast.forecastday[2].astro.sunset}</td>
        </tr>
    );

    return (
        <>
            <div className={styles.weatherResult}>
                <span style={{ color: "#ff5d5d" }}>
                    {weatherList.location ? weatherList.location.name : ""}
                </span> 3 Days Weather
            </div>

            <Table horizontalSpacing="xl" verticalSpacing="sm" fontSize="md" captionSide="bottom">
                <caption style={{ textAlign: "center" }}>3 DAYS WEATHER FORECAST</caption>
                <thead>{date}</thead>
                <tbody>{row1}</tbody>
                <tbody>{row2}</tbody>
                <tbody>{row3}</tbody>
                <tbody>{row4}</tbody>
                <tbody>{row5}</tbody>
                <tbody>{row6}</tbody>
                <tbody>{row7}</tbody>
                <tbody>{row8}</tbody>
            </Table>
        </>
    )
}

export default WeatherInfoTable
