import styles from './Footer.module.css';
import websiteLogo from "../../assets/websitelogo.jpg";
import { Grid, Select } from '@mantine/core';


export default function Footer() {
    return (
        <div className={styles.footer}>
            <div className={styles.boxSize}>
                <Grid>
                    <Grid.Col span={8}>
                        <div className={styles.flex}>
                            <img src={websiteLogo} className={styles.webLogo} />
                            <div>
                                <Grid className={styles.tag}>
                                    <Grid.Col span={2}>
                                        <a href='#'><b>Term of Use</b></a>
                                    </Grid.Col>
                                    <Grid.Col span={4}>
                                        <a href='#'><b>Privacy and Cookies Statement</b></a>
                                    </Grid.Col>  <Grid.Col span={2}>
                                        <a href='#'><b>Cookie consent</b></a>
                                    </Grid.Col>  <Grid.Col span={2}>
                                        <a href='#'><b>Site Map</b></a>
                                    </Grid.Col>  <Grid.Col span={3}>
                                        <a href='#'><b>How the site work</b></a>
                                    </Grid.Col>  <Grid.Col span={3}>
                                        <a href='#'><b>Contact us</b></a>
                                    </Grid.Col>
                                </Grid>
                            </div>
                        </div>
                        <div className={styles.sentence}>This is the version of our website addressed to speakers of English in the United States. If you are a resident of another country or region, please select the appropriate version of Tripadvisor for your country or region in the drop-down menu. <a href='#'>more</a></div>
                    </Grid.Col>

                    <Grid.Col span={2}>
                        <Select
                            dropdownPosition="top"
                            searchable={true}
                            radius={20}
                            placeholder="Please choose your country"
                            label=""
                            defaultValue="$ USD"
                            data={['$ USD', '¥ Japanese Yen', 'HK$ Hong Kong Dollars', '₩ South Korean Won']}
                            styles={(theme) => ({
                                item: {
                                    // applies styles to selected item
                                    '&[data-selected]': {
                                        '&, &:hover': {
                                            backgroundColor:
                                                theme.colorScheme === 'dark' ? theme.colors.teal[9] : theme.colors.teal[1],
                                            color: theme.colorScheme === 'dark' ? theme.white : theme.colors.teal[9],
                                        },
                                    },

                                    // applies styles to hovered item (with mouse or keyboard)
                                    '&[data-hovered]': {},
                                },
                            })}
                        />
                    </Grid.Col>

                    <Grid.Col span={2}>
                        <Select
                            dropdownPosition="top"
                            searchable={true}
                            radius={20}
                            placeholder="Please choose your country"
                            label=""
                            defaultValue="United States"
                            data={['United States', '日本', '香港', '대한민국']}
                            styles={(theme) => ({
                                item: {
                                    // applies styles to selected item
                                    '&[data-selected]': {
                                        '&, &:hover': {
                                            backgroundColor:
                                                theme.colorScheme === 'dark' ? theme.colors.teal[9] : theme.colors.teal[1],
                                            color: theme.colorScheme === 'dark' ? theme.white : theme.colors.teal[9],
                                        },
                                    },

                                    // applies styles to hovered item (with mouse or keyboard)
                                    '&[data-hovered]': {},
                                },
                            })}
                        />
                    </Grid.Col>
                </Grid>
            </div>
        </div>
    )
}
