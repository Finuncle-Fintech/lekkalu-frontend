import { Link } from "react-router-dom";
import { HeaderButton } from "./styled";
import { useContext, useState } from "react";
import { Context } from "provider/Provider";
import styles from "./Header.module.css";
import iconClose from "../../assets/close-icon.svg";
import iconMenu from "../../assets/menu-icon.svg";
import iconArrow from "../../assets/arrow-icon-.svg";

const Header = () => {
  const { signOut, authToken } = useContext(Context);

  const [dropDownActive, setDropDownActive] = useState(false);
  const [menuStatus, setMenuStatus] = useState(false);

  return (
    <header
      className={`container-fluid shadow bg-primary rounded-bottom z-3 d-flex justify-content-between align-items-center py-3 flex-column flex-md-row ${styles.header}`}
    >
      <div className="container-sm d-flex justify-content-between align-items-center">
        <HeaderButton color="inherit" component={Link} to="/">
          Home
        </HeaderButton>

        <div className="d-md-none d-flex">
          <button
            onClick={() => setMenuStatus(!menuStatus)}
            className="btn  "
            type="button"
          >
            <img width={30} src={menuStatus ? iconClose : iconMenu} alt="" />
          </button>
        </div>
      </div>

      <div
        className={`${
          menuStatus ? "d-flex bg-primary rounded-bottom " : "d-none"
        } d-md-flex justify-content-center align-items-center gap-4 flex-column flex-md-row container-fluid`}
      >
        <div className={styles.containerDropDown}>
          <Link className={styles.linkStyled} to={"/expenses"}>
            Expenses
          </Link>

          <Link className={styles.linkStyled} to={"/income-statement"}>
            Income Statement
          </Link>

          <Link className={styles.linkStyled} to={"/balance"}>
            Balance
          </Link>

          <button
            className={`${styles.dropDownButton} d-flex justify-content-between align-items-center`}
            onClick={() => setDropDownActive(!dropDownActive)}
            data-testid="buttonDropwDown"
          >
            <span>Calculate</span>
            <img
              src={iconArrow}
              width={20}
              style={{
                transform: dropDownActive ? "rotate(0deg)" : "rotate(-90deg)",
                transition: "all .3s",
              }}
              alt=""
            />
          </button>
          {dropDownActive && (
            <div className={styles.dropDown} data-testid="menuDropDown">
              <Link
                className="link-underline link-underline-opacity-0"
                to="/SIPCalculator"
                style={{ color: "inherit" }}
              >
                SIP
              </Link>
              <div className={styles.lineGapper}></div>
              <Link
                className="link-underline link-underline-opacity-0"
                to="/CAGRCalculator"
                style={{ color: "inherit" }}
              >
                CAGR
              </Link>
              <div className={styles.lineGapper}></div>
              <Link
                className="link-underline link-underline-opacity-0"
                to="/loan_emi_calculator"
                style={{ color: "inherit" }}
              >
                EMI
              </Link>
            </div>
          )}
          <Link className={styles.linkStyled}>Contact us</Link>
          <Link className={styles.linkStyled} to="/settings">
            Settings
          </Link>
        </div>

        {!authToken ? (
          <div className="container-fluid d-flex justify-content-around align-items-center">
            <Link to="/signin" className={styles.actionUserButton}>
              Sign in
            </Link>
            <Link to="/signup" className={styles.actionUserButton}>
              Sign up
            </Link>
          </div>
        ) : (
          <Link
            className={styles.actionUserButton}
            color="inherit"
            to={"/"}
            onClick={() => signOut()}
          >
            Sign out
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
