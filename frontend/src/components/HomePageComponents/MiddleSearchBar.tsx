import { Badge, Button, Card, Group } from "@mantine/core";
import React, { useEffect, useState } from "react";
// import { Autocomplete, Container } from "@mantine/core";
// import cover from "../../assets/travelcoverpic.png";
import cover from "../../assets/koala-banner.jpg";
import InputSearchBar from "../SharedComponents/InputSearchBar";

export default function MiddleSearchBar(props: { scrollPosition: number }) {
  const [isHidden, setHidden] = useState(true);
  const [isShowSearchBar, setIsShowSearchBar] = useState(false);

  useEffect(() => {
    if (props.scrollPosition >= 273) {
      setIsShowSearchBar(true);
    } else if (props.scrollPosition < 273) {
      setIsShowSearchBar(false);
    }

    return;
  }, [props.scrollPosition]);

  return (
    <div>
      <div style={{ position: "relative" }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <img src={cover} style={{ maxWidth: "100%" }} />
        </div>

        <div
          style={{
            position: "absolute",
            inset: "0",
            display: "flex",
          }}
        >
          <div style={{ margin: "auto" }}>
            {!isShowSearchBar && (
              <InputSearchBar
                size={"lg"}
                color={"gray"}
                variant={"light"}
                widthSize={"850px"}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
