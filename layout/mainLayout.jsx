import style from "@/styles/defaultLayout.module.scss";
import classNames from "classnames/bind";
import Navbar from "@/components/Navbar";
export default ({ children }) => {
  const cx = classNames.bind(style);
  return (
    <>
      <div className={cx("navbar")}>
        <Navbar></Navbar>
      </div>
      {children}
    </>
  );
};
