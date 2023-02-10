import { useState, useEffect } from "react";
import websiteLogo from "../../assets/websitelogo.jpg";
import userIcon from "../../assets/usericon.jpg";
import styles from "./Header.module.scss";
import { AppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";
import { login, logOut } from "../../store/LoginSlice";
import { useForm } from "react-hook-form";
import {
  Modal,
  Button,
  Group,
  Input,
  PasswordInput,
  Text,
  Popover,
} from "@mantine/core";
import {
  IconAt,
  IconLock,
  IconMap,
  IconUser,
  IconStar,
  IconList,
} from "@tabler/icons";
import { fetchNonGetData } from "../../utilis";
import toast from "react-hot-toast";
import { isConnected } from "../../store/selector";
import FacebookLogin from "react-facebook-login";
import { useGoogleLogin } from "@react-oauth/google";
import useEvent from "react-use-event";
import { useNavigate } from "react-router-dom";
import InputSearchBar from "./InputSearchBar";
import Dropdown from "react-bootstrap/esm/Dropdown";
import Avatar from "boring-avatars";

type UserState = {
  username: string;
  password: string;
  password_confirm: string;
  email: string;
};

type LoginEvent = {
  type: "login";
  delta: boolean;
};

//////////////////////////////////////// HEADER /////////////////////////////////////
function Header(props: { isShowSearchBar: boolean }) {
  // To control sign up modal
  const [openedSignup, setOpenedSignup] = useState(false);

  // To control sign in modal
  const [openedSignin, setOpenedSignin] = useState(false);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  // To send an event to header to open sign in modal
  useEvent<LoginEvent>("login", (event) => {
    setOpenedSignin(event.delta);
  });

  function closeModal(input: string) {
    if (input == "signup") {
      setOpenedSignup(false);
    } else {
      setOpenedSignin(false);
    }
  }

  function openModal(input: string) {
    if (input == "signup") {
      setOpenedSignup(true);
    } else {
      setOpenedSignin(true);
    }
  }

  function switchModal(input: string) {
    if (input == "signup") {
      setOpenedSignup(false);
      setOpenedSignin(true);
    } else {
      setOpenedSignup(true);
      setOpenedSignin(false);
    }
  }

  const userRedux = isConnected();
  const dispatch = useDispatch<AppDispatch>();
  let navigate = useNavigate();

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: "5",
        backgroundColor: "white",
      }}
    >
      <div className={`${styles.body} ${styles.format}`}>
        <div className={styles.logo}>
          <div>
            <img
              onClick={() => navigate("/")}
              className={styles.webLogo}
              src={websiteLogo}
              alt=""
            />
          </div>
          <div>TripPlanner</div>
        </div>
        {!props.isShowSearchBar && (
          <InputSearchBar
            color={"gray"}
            size={"sm"}
            variant={"outline"}
            widthSize={"250px"}
          />
        )}
        <div className={styles.flex}>
          <Popover width={140} position="bottom" withArrow shadow="md">
            <Popover.Target>
              <Button variant="outline" color="teal" radius="xl" size="xs">
                <IconList />
                MORE
              </Button>
            </Popover.Target>
            <Popover.Dropdown>
              <Button
                onClick={() => navigate("/planningPage")}
                variant="outline"
                color="teal"
                radius="xl"
                size="xs"
              >
                <IconMap color="#00b341"></IconMap>
                Plans
              </Button>
              <Button
                onClick={() => navigate("/ShareSchedulePage")}
                variant="outline"
                color="teal"
                radius="xl"
                size="xs"
              >
                <IconStar />
                Share
              </Button>

              <Button
                onClick={() => navigate("/weatherPage")}
                variant="outline"
                color="teal"
                radius="xl"
                size="xs"
              >
                <IconMap color="#00b341"></IconMap>
                Weather
              </Button>
              <Button
                onClick={() => navigate("/exchangeRatePage")}
                variant="outline"
                color="teal"
                radius="xl"
                size="xs"
              >
                <IconMap color="#00b341"></IconMap>
                Exchange
              </Button>
            </Popover.Dropdown>
          </Popover>

          {userRedux ? (
            <div style={{ display: "flex", alignItems: "center" }}>
              <Popover width={200} position="bottom" withArrow shadow="md">
                <Popover.Target>
                  {userRedux?.avatar?.includes("http") ? (
                    <img
                      className={styles.webLogo}
                      src={userRedux?.avatar}
                      alt=""
                    />
                  ) : (
                    <div>
                      <Avatar
                        size={40}
                        name={userRedux?.username}
                        variant="beam"
                        colors={[
                          "#92A1C6",
                          "#146A7C",
                          "#F0AB3D",
                          "#C271B4",
                          "#C20D90",
                        ]}
                      />
                    </div>
                  )}
                </Popover.Target>
                <Popover.Dropdown>
                  <Button
                    fullWidth
                    color="gray"
                    variant="outline"
                    onClick={() =>
                      navigate(`/PersonalPage?id=${userRedux!.id}`)
                    }
                  >
                    <IconUser color="#9e9e9e"></IconUser>
                    Profile
                  </Button>
                  {userRedux.isAdmin ? (
                    <Button
                      fullWidth
                      color="gray"
                      variant="outline"
                      onClick={() => navigate(`/adminPage`)}
                      style={{ marginTop: "5px" }}
                    >
                      <IconUser color="#9e9e9e"></IconUser>
                      Admin site
                    </Button>
                  ) : null}
                </Popover.Dropdown>
              </Popover>
              <div>
                <Text c="blue" size="xs">
                  Welcome Back
                </Text>
                <Text c="teal.4" size="xs">
                  {userRedux.username}
                </Text>
              </div>
            </div>
          ) : null}
          {!isConnected() ? (
            <>
              <Login
                opened={openedSignin}
                close={() => {
                  closeModal("signin");
                }}
                open={() => {
                  openModal("signin");
                }}
                switch={() => {
                  switchModal("signin");
                }}
              />
              <Signup
                opened={openedSignup}
                close={() => {
                  closeModal("signup");
                }}
                open={() => {
                  openModal("signup");
                }}
                switch={() => {
                  switchModal("signup");
                }}
              />
            </>
          ) : (
            <Button
              variant="subtle"
              color="teal"
              radius="xl"
              size="md"
              onClick={() => {
                closeModal("signin");
                dispatch(logOut());
                localStorage.removeItem("token");
              }}
            >
              Log Out
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

/////////////////////////////////// SIGN UP //////////////////////////////////////////
export function Signup(props: {
  opened: boolean;
  close: () => void;
  open: () => void;
  switch: () => void;
}) {
  type Valid = {
    checkUsername: boolean;
    checkPassword: boolean;
    checkEmail: boolean;
    checkPassword_confirm: boolean;
  };

  // const [opened, setOpened] = useState(false);
  const [isValid, setIsValid] = useState<Valid>({
    checkUsername: false,
    checkPassword: false,
    checkEmail: false,
    checkPassword_confirm: false,
  });

  const { register, handleSubmit, watch } = useForm<UserState>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      password_confirm: "",
    },
  });

  useEffect(() => {
    let sub = watch((data) => {
      if ((data.username as string).length >= 6) {
        setIsValid({ ...isValid, checkUsername: false });
      }
    });

    return () => sub.unsubscribe();
  }, [watch]);

  async function submit(data: UserState) {
    if (data.username.length < 6) {
      setIsValid({ ...isValid, checkUsername: true });
      return;
    }
    if (!(data.email.includes("@") && data.email.includes(".com"))) {
      setIsValid({ ...isValid, checkEmail: true });
      return;
    }
    if (data.password.length < 8) {
      setIsValid({ ...isValid, checkPassword: true });
      return;
    }
    if (data.password_confirm != data.password) {
      setIsValid({ ...isValid, checkPassword_confirm: true });
      return;
    }
    // To handle fetch
    let res = await fetchNonGetData("/signup", "POST", data);
    if (res.status === false) {
      if (res.type == "username") {
        return toast.error(`Username has been registered`);
      }
      if (res.type == "email") {
        return toast.error(`Email has been registered`);
      }
    } else {
      toast.success("Successfully registered");
      props.switch();
    }
  }

  return (
    <div>
      {/* SIGNUP MODAL */}
      <Modal
        opened={props.opened}
        onClose={() => {
          props.close();
        }}
        title="Sign up to explore your journey!"
      >
        {/* Modal content */}
        {/*  Form  */}
        <form onSubmit={handleSubmit(submit)}>
          {/* Username input bar */}
          <Input.Wrapper
            id="input-username"
            withAsterisk
            label="Username"
            error={isValid.checkUsername && "At least 6 characters"}
          >
            <Input
              id="input-demo"
              placeholder="Your username"
              {...register("username", { required: true })}
            />
          </Input.Wrapper>

          {/* Email input bar */}
          <Input.Wrapper
            id="input-email"
            withAsterisk
            label="Email"
            error={isValid.checkEmail && "Invalid email"}
          >
            <Input
              icon={<IconAt size={16} />}
              id="input-password"
              placeholder="Your email"
              {...register("email", { required: true })}
            />
          </Input.Wrapper>

          {/* Password input bar */}
          <PasswordInput
            icon={<IconLock size={16} />}
            placeholder="Password (must be at least 8 characters)"
            label="Password"
            // description="Password must be at least 8 characters"
            withAsterisk
            error={isValid.checkPassword && "Must be at least 8 characters"}
            {...register("password", { required: true })}
          />

          {/* Confirm password input bar */}
          <PasswordInput
            icon={<IconLock size={16} />}
            placeholder="Confirm Password"
            label="Confirm Password"
            // description=""
            withAsterisk
            error={isValid.checkPassword_confirm && "Password not correct"}
            {...register("password_confirm", { required: true })}
          />

          <hr />
          <div className={styles.modallastrow}>
            <p className={styles.modaltext} onClick={() => props.switch()}>
              Have an account? Login
            </p>
            <div>
              <Button variant="outline" color="dark" radius="xl" type="submit">
                Sign up
              </Button>
            </div>
          </div>
        </form>
      </Modal>
      <Group position="center">
        <Button
          onClick={() => {
            props.open();
          }}
          variant="subtle"
          color="teal"
          radius="xl"
          size="md"
        >
          SIGN UP
        </Button>
      </Group>
    </div>
  );
}

////////////////////////////////// LOGIN ///////////////////////////////////////////
export function Login(props: {
  opened: boolean;
  close: () => void;
  open: () => void;
  switch: () => void;
}) {
  type IsValidLogin = {
    checkUsername: boolean;
    checkPassword: boolean;
  };

  const [isValidLogin, setIsValid] = useState<IsValidLogin>({
    checkUsername: false,
    checkPassword: false,
  });

  const { register, handleSubmit, watch } = useForm<UserState>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    let sub = watch((data) => {});

    return () => sub.unsubscribe();
  }, [watch]);

  async function submit(data: UserState) {
    let res = await fetchNonGetData("/login/password", "POST", data);
    if (res.isBanned == true) {
      toast.error("This account has been banned");
      return;
    }
    if (res.status === false) {
      toast.error(res.message);
      return;
    }
    if (res.status === true) {
      localStorage.setItem("token", res.token);
      dispatch(login({ token: res.token }));
      toast.success("login successfully");
    }
  }

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      let data = await fetchNonGetData("/login/google", "POST", {
        result: tokenResponse,
      });

      if (!data.token) {
        toast.error("This account has been banned");
        return;
      }

      console.log("TOKEN FROM GOOGLE", data.token);

      localStorage.setItem("token", data.token);
      dispatch(login({ token: data.token }));
      const userInfo = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
      );
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  return (
    <>
      <Modal
        opened={props.opened}
        onClose={() => props.close()}
        title="Log in to  the best of our service!"
      >
        <form onSubmit={handleSubmit(submit)}>
          {/* Modal content */}
          <Input.Wrapper
            id="input-login-username"
            withAsterisk
            label="Username"
            error={isValidLogin.checkUsername && "Incorrect username"}
          >
            <Input
              id="input-demo"
              placeholder="Your username"
              {...register("username", { required: true })}
            />
          </Input.Wrapper>
          <PasswordInput
            icon={<IconLock size={16} />}
            placeholder="Password"
            label="Password"
            // description=""
            withAsterisk
            error={isValidLogin.checkPassword && "Incorrect password"}
            {...register("password", { required: true })}
          />
          <hr />
          <div className={styles.modallastrow}>
            <p className={styles.modaltext} onClick={() => props.switch()}>
              Don't have an account? Register
            </p>
            <div>
              <Button variant="outline" color="dark" radius="xl" type="submit">
                Log in
              </Button>
            </div>
          </div>
        </form>
        <br />
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          {/* {Google Login as follow} */}

          <button
            onClick={() => {
              googleLogin();
            }}
          >
            GOOGLE LOGIN
          </button>
          <br />
          {/* {Facebook Login as follow} */}
          <label htmlFor=""></label>
          <div id="asas"></div>
          <FacebookLogin
            appId="871302680808139"
            autoLoad={false}
            fields="name,email,picture"
            onClick={() => {
              console.log("clicked on FB btn");
            }}
            callback={async (result) => {
              if ("accessToken" in result) {
                let data = await fetchNonGetData("/login/facebook", "POST", {
                  result: result,
                });
                if (!data.token) {
                  toast.error("This acccount has been banned");
                  return;
                }
                localStorage.setItem("token", data.token);
                dispatch(login({ token: data.token }));
              } else {
                toast.error("Fail to Facebook login");
              }
            }}
          />
        </div>
      </Modal>

      <Group position="center">
        <Button
          onClick={() => props.open()}
          variant="subtle"
          color="teal"
          radius="xl"
          size="md"
        >
          LOGIN
        </Button>{" "}
      </Group>
    </>
  );
}

export default Header;
