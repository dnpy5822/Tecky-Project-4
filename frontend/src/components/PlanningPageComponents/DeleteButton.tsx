import { Button, HoverCard, Modal, Text, NavLink } from '@mantine/core';
import { IconDots, IconTrash } from '@tabler/icons';
import { useState } from 'react'
import { fetchNonGetData } from '../../utilis';
import { dispatch, useEvent } from 'react-use-event'
import toast from 'react-hot-toast';
import { DeleteScheduleEvent } from '../../hooks/useTripEvent';

export default function DeleteButton({ tripId }: { tripId: number }) {

    const [opened, setOpened] = useState(false);

    const dispatchDeleteTrip = useEvent<DeleteScheduleEvent>("delete-schedule",);

    async function deleteTrip() {
        let result = await fetchNonGetData("/deleteTrip", "DELETE", { data: tripId })

        if (result.status) {
            setOpened(false)
            toast.success(result.message);
            dispatchDeleteTrip({ id: tripId })
        }
        else {
            toast.error(result.message);
        }
    }

    return (
        <>
            {/*Delete Button */}
            <HoverCard radius={25} width={180} shadow="md">
                <HoverCard.Target>
                    <Button
                        color="dark"
                        variant="subtle"
                        radius="xl"
                        size="xs"
                    >
                        <IconDots />
                    </Button>
                </HoverCard.Target>
                <HoverCard.Dropdown>
                    <NavLink
                        label="Delete this Trip"
                        icon={<IconTrash size={16} stroke={1.5} />}
                        onClick={() => {
                            setOpened(true)
                            console.log("tripId: ", tripId);
                        }}
                    />
                </HoverCard.Dropdown>
            </HoverCard>

            {/*Modal*/}
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title={<Text> Delete this Trip?</Text>}
            >
                <Button
                    color="teal"
                    onClick={() => {
                        setOpened(false);
                    }}
                >
                    No. I want to keep it.
                </Button>

                <Button
                    color="dark"
                    onClick={() => deleteTrip()}
                >
                    Yes. I know this cannot be retrieved.
                </Button>
            </Modal>
        </>
    )
}

