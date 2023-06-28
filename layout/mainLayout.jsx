import style from "@/styles/layout/defaultLayout.module.scss";
import classNames from "classnames/bind";
import Navbar from "@/components/layout/Navbar";
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
