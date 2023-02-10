import { Button, Grid, NumberInput, Select } from '@mantine/core';
import { IconArrowsExchange } from '@tabler/icons';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import styles from './ExchangeRate.module.css';

export default function ExchangeRate() {

    const [from, setFrom] = useState<string[]>([]);
    const [to, setTo] = useState<string[]>([]);
    const [searchValueFrom, onSearchChangeFrom] = useState('');
    const [searchValueTo, onSearchChangeTo] = useState('');
    const [exchangeRate, setExchangeRate] = useState(1);
    const [quality, setQuality] = useState(0);

    //////////////////////////////For calling exchange rate API//////////////////////////////
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'cad183fb15msh8c8931d494cae3ap14654ejsna41642290626',
            'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com'
        }
    };

    //////////////////////////////Getting different currencies//////////////////////////////
    async function getListQuotes() {

        let res = await fetch('https://currency-exchange.p.rapidapi.com/listquotes', options)
        let currencyList = await res.json()

        setFrom(currencyList);
        setTo(currencyList);

        console.log("Currency List: ", currencyList);
    }

    //////////////////////////////Getting exchange rate//////////////////////////////
    async function getExchange() {

        console.log("searchValueFrom: ", searchValueFrom);
        console.log("searchValueTo", searchValueTo);

        if (searchValueFrom == '' || searchValueTo == '') {
            toast.error("Please select both currencies")
            return
        }

        let res = await fetch(`https://currency-exchange.p.rapidapi.com/exchange?from=${searchValueFrom}&to=${searchValueTo}&q=${quality}`, options)
        let result = await res.json()

        console.log("Exchange Rate: ", result);
        setExchangeRate(result)
    }

    useEffect(() => {
        getListQuotes()
    }, [])

    return (
        <div className={styles.box}>
            <div className={styles.selection}>
                <Grid gutter={5} gutterXs="md" gutterMd="xl" gutterXl={50}>
                    <Grid.Col span={7}>
                        <NumberInput
                            defaultValue={18}
                            placeholder="Amount"
                            label="Amount"
                            withAsterisk
                            value={quality}
                            onChange={(val) => setQuality(val as number)}
                        />
                    </Grid.Col>

                    <Grid.Col span={2}>
                        <Select
                            label="From"
                            placeholder="Pick one currency"
                            searchable
                            withAsterisk
                            nothingFound="No options"
                            onSearchChange={onSearchChangeFrom}
                            searchValue={searchValueFrom}
                            data={from.map(v => v)}
                        />
                    </Grid.Col>

                    <Grid.Col span={1}>
                        <IconArrowsExchange style={{ marginTop: "30px" }} />
                    </Grid.Col>

                    <Grid.Col span={2}>
                        <Select
                            label="To"
                            placeholder="Pick one currency"
                            searchable
                            withAsterisk
                            nothingFound="No options"
                            onSearchChange={onSearchChangeTo}
                            searchValue={searchValueTo}
                            data={to.map(j => j)}
                        />
                    </Grid.Col>
                </Grid>
            </div>

            <div className={styles.submitButton}>
                <Button
                    color="teal"
                    size="lg"
                    onClick={() => getExchange()}
                >
                    View Quote
                </Button>
            </div>

            <div className={styles.result}>
                <div style={{ fontSize: "3rem" }}>{searchValueFrom} {quality} = {searchValueTo} {exchangeRate * quality}</div>
                <div style={{ fontSize: "1.5rem" }}>{searchValueFrom} 1 = {searchValueTo} {exchangeRate}</div>
            </div>
        </div>
    )
}
