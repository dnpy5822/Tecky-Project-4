import { Affix, Button, Transition } from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import { IconArrowUp } from "@tabler/icons";


export default function AffixComponent() {
    const [scroll, scrollTo] = useWindowScroll();

    return (

        <Affix position={{ bottom: 20, right: 20 }}>
            <Transition transition="slide-up" mounted={scroll.y > 0}>
                {(transitionStyles) => (
                    <Button
                        color="teal"
                        leftIcon={<IconArrowUp size={16} />}
                        style={transitionStyles}
                        onClick={() => scrollTo({ y: 0 })}
                    >
                        Scroll to top
                    </Button>
                )}
            </Transition>
        </Affix>
    )
}
