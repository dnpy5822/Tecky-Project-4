import { useEffect, useState } from 'react'
import { useForm } from '@mantine/form';
import { TextInput, Card, Text, Modal, Radio, Button } from '@mantine/core';
import { IconCirclePlus, IconHeart, IconLock, IconLockOpen } from "@tabler/icons";
import { fetchNonGetData } from "../../utilis"
import styles from './CreateCard.module.css'
import toast from 'react-hot-toast';

type FormData = {
    nameOfTrip: string,
    privacy: string
}

export default function CreateCard({ refreshServer, privacyMode }: { refreshServer: Function, privacyMode: "public" | "private" }) {
    const [openModal, setOpenModal] = useState(false);

    // console.log("privacyMode: ", privacyMode);

    const form = useForm({
        initialValues: {
            nameOfTrip: '',
            privacy: privacyMode,
        },
    });

    useEffect(() => {
        form.setFieldValue('privacy', privacyMode)
    }, [privacyMode])

    ////////////////////////This function is for creating trip cards///////////////////////////
    async function createTrip(values: FormData) {

        console.log(values);
        const result = await fetchNonGetData("/createTrip", "POST", values);

        if (result.status) {
            form.reset();
            refreshServer()
            setOpenModal(false)
            toast.success(result.message)
        }
        else {
            toast.error(result.message)
        }
    }

    return (
        <>
            <Card onClick={() => setOpenModal(true)} shadow="sm" p="lg" radius="md" withBorder>
                <div className={`${styles.cardSize} ${styles.flex}`}>
                    <Text> <IconCirclePlus /> Create a Trip</Text>
                </div>
            </Card>


            {/*  popup a Modal if user clicked 'create trip' */}
            <Modal centered
                opened={openModal}
                onClose={() => setOpenModal(false)}
                title={<Text> <IconHeart /> Create a Trip</Text>}
            >
                <form onSubmit={form.onSubmit((values) => createTrip(values))}>
                    <TextInput
                        label="Trip name"
                        description="Input within 50 characters"
                        placeholder="Give a name to your trip"
                        {...form.getInputProps('nameOfTrip')}
                    />

                    <br />

                    <Radio.Group
                        name="favoriteFramework"
                        orientation="vertical"
                        label="Choose who can see your Trip"
                        spacing="sm"
                        {...form.getInputProps('privacy')}
                    >
                        <Radio description="Not visible to other TripPlanner users and members, except for you and any friends with whom you share your Trip."
                            value="private"
                            label={<text>Private <IconLock /></text>}
                            color="dark"
                        />
                        <Radio description="Visible to all travelers on TripPlanner, including any friends you share your Trip with"
                            value="public"
                            label={<text>Public <IconLockOpen /></text>}
                            color="dark"
                        />
                    </Radio.Group>

                    <br />

                    <Button
                        type="submit"
                        className={styles.button}
                        color="dark"
                        radius="xl"
                    >
                        Create
                    </Button>
                </form>
            </Modal>

        </>
    )
}
