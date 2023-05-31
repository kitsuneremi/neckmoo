"use client";
import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import axios from "axios";
import style from "../../styles/register.module.scss";
import classNames from "classnames/bind";
import clsx from "clsx";
import MainLayout from "../../layout/mainLayout";
import Context from "@/GlobalVariableProvider/Context";

export default function Register() {
  const cx = classNames.bind(style);
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  const { data: session } = useSession();

  const context = useContext(Context);

  useEffect(() => {
    if (session && session.user) {
      router.push("/");
    }
  }, []);

  const handleSubmit = async () => {
    if (showRegister) {
      if (userName.trim() === "") {
        console.log("empty username");
      } else if (displayName.trim() === "") {
        console.log("empty display name");
      } else if (password.trim() === "") {
        console.log("empty password");
      } else if (confirmPassword.trim() === "") {
        console.log("empty confirm password");
      } else if (password !== confirmPassword) {
        console.log("password mismatch");
      } else if (
        !email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      ) {
        console.log("email not valid");
      } else {
        const register = await axios.post("/api/user/create", {
          username: userName,
          password: password,
          email: email,
          name: displayName,
        });

        const logIn = await signIn("credentials", {
          username: userName,
          password: password,
          redirect: true,
          callbackUrl: "/",
        }).then(() => { context.setSes(session) })
      }
    } else {
      if (userName.trim() !== "" && password.trim() !== "") {
        const result = await signIn("credentials", {
          username: userName,
          password: password,
          redirect: true,
          callbackUrl: "/",
        }).then(() => { context.setSes(session) })
      }
    }
  };

  return (
    <MainLayout>
      <div className={cx("box")}>
        <div>
          <label htmlFor="username">tên đăng nhập</label>
        </div>
        <div>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
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
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
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
