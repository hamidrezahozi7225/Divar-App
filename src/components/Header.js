import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "./Header.module.css";
import { userProvider } from "../context/UsersContext";
import moon from "../image/moon-in-half-phase-svgrepo-com.svg";
import sun from "../image/sun-svgrepo-com.svg";

const Header = (props) => {
  const { errors, setErrors } = useContext(userProvider);
  const { username, setUserName } = useContext(userProvider);
  const { switchTheme, handleTheme } = props;

  return (
    <div className={styled.header}>
      <div>
        <ul className="d-flex">
          <li>
            <Link to="/">صفحه اصلی</Link>
          </li>
          <li>{errors && <Link to="/addProduct">ثبت محصول</Link>}</li>
          <li>
            {errors ? (
              <span style={{ paddingRight: "10px" }}>{username}</span>
            ) : (
              <Link to="/login">ورود/ثبت نام</Link>
            )}
          </li>
        </ul>
      </div>
      <div className="d-flex align-items-center px-4">
        <div className="bg-white  rounded-circle">
          <img
            onClick={handleTheme}
            src={switchTheme ? sun : moon}
            width="30px"
            alt="theme"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
