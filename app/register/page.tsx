"use client";
import { useEffect, useState, useContext, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import axios from "axios";
import style from "../../styles/register.module.scss";
import classNames from "classnames/bind";
import clsx from "clsx";
import MainLayout from "../../layout/mainLayout";
import Context from "@/GlobalVariableProvider/Context";
import NotiBoard from "@/components/NotificationBoard";




export default function Register() {
  const cx = classNames.bind(style);
  const router = useRouter();
  const userNameRef = useRef(null)
  const passwordRef = useRef(null)
  const confirmPasswordRef = useRef(null)
  const displayNameRef = useRef(null)
  const emailRef = useRef(null)

  const [showRegister, setShowRegister] = useState<boolean>(false);
  const [anyNoti, setAnyNoti] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const { data: session } = useSession();

  const context: any = useContext(Context);

  const getNotification = (title) => {
    setAnyNoti(true);
    setTitle(title)
    setTimeout(() => {
      setAnyNoti(false)
    }, 3000)
  }

  useEffect(() => {
    if (session && session.user) {
      router.push("/");
    }
  }, []);

  const handleSubmit = async () => {
    if (showRegister) {
      if (userNameRef.current.value.trim() === "") {

      } else if (displayNameRef.current.value.trim() === "") {
        getNotification('empty display name')
      } else if (passwordRef.current.value.trim() === "") {
        getNotification('empty password')
      } else if (confirmPasswordRef.current.value.trim() === "") {
        getNotification('empty confirm password')
      } else if (passwordRef.current.value !== confirmPasswordRef.current.value) {
        getNotification('password mismatch')
      } else if (!emailRef.current.value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
        getNotification('email not valid')
      } else {
        getNotification('processing...')
        axios.post("/api/user/create", {
          username: userNameRef.current.value,
          password: passwordRef.current.value,
          email: emailRef.current.value,
          name: displayNameRef.current.value,
        }).then(res => {
          if (res.status == 200) {
            signIn("credentials", {
              username: userNameRef.current.value,
              password: passwordRef.current.value,
              redirect: true,
              callbackUrl: "/",
            }).then(() => { context.setSes(session) })
          } else {

          }
        })
      }
    } else {
      if (userNameRef.current.value.trim() === "") {
        getNotification('empty username')
      } else if (passwordRef.current.value.trim() === "") {
        getNotification('empty password')
      } else {
        getNotification('processing...')
        signIn("credentials", {
          username: userNameRef.current.value,
          password: passwordRef.current.value,
          redirect: true,
          callbackUrl: "/",
        }).then(() => { context.setSes(session) })
      }
    }
  };

  return (
    <MainLayout>
      <div className={cx("box")}>
        {anyNoti && <NotiBoard title={title} />}
        <div>
          <label htmlFor="username">tên đăng nhập</label>
        </div>
        <div>
          <input
            type="text"
            ref={userNameRef}
            className={cx("input")}
            id="username"
          ></input>
        </div>
        {showRegister ? (
          <div>
            <label htmlFor="name">tên</label>
          </div>
        ) : (
          <></>
        )}
        {showRegister ? (
          <div>
            <input
              type="text"
              ref={displayNameRef}
              className={cx("input")}
              id="name"
            ></input>
          </div>
        ) : (
          <></>
        )}
        {showRegister ? (
          <div>
            <label htmlFor="email">email</label>
          </div>
        ) : (
          <></>
        )}
        {showRegister ? (
          <div>
            <input
              type="text"
              ref={emailRef}
              className={cx("input")}
              id="email"
            ></input>
          </div>
        ) : (
          <></>
        )}
        <div>
          <label htmlFor="password">mật khẩu</label>
        </div>
        <div>
          <input
            type="password"
            ref={passwordRef}
            onKeyDown={(e) => {
              if (e.code === "Enter" && !showRegister) {
                handleSubmit();
              }
            }}
            className={cx("input")}
            id="pasword"
          ></input>
        </div>
        {showRegister ? (
          <div>
            <label htmlFor="confirmPassword">xác nhận mật khẩu</label>
          </div>
        ) : (
          <></>
        )}
        {showRegister ? (
          <div>
            <input
              type="password"
              ref={confirmPasswordRef}
              className={cx("input")}
              id="confirmPass"
            ></input>
          </div>
        ) : (
          <></>
        )}

        <div>
          <button
            onClick={() => {
              handleSubmit();
            }}
            className={clsx(
              { [cx("register-button")]: showRegister },
              { [cx("login-button")]: !showRegister }
            )}
          >
            {showRegister ? "đăng ký" : "đăng nhập"}
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              setShowRegister(!showRegister);
            }}
          >
            {showRegister
              ? "đã có tài khoản?"
              : "chưa có tài khoản? đăng ký ngay"}
          </button>
        </div>
      </div>
    </MainLayout>
  );
};
