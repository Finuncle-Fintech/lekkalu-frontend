import React, { useLayoutEffect, useState } from "react";
import classNames from "classnames";
import "font-awesome/css/font-awesome.min.css";
import {
  Modal,
  ModalBody,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
} from "reactstrap";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import { useNavigate } from "react-router";

const Login = () => {
  const [modal, setModal] = useState(false);

  // State for current active Tab
  const [currentActiveTab, setCurrentActiveTab] = useState("1");

  // Toggle active state for Tab
  const toggle = (tab: string) => {
    if (currentActiveTab !== tab) setCurrentActiveTab(tab);
  };

  const closeModalHandler = () => {
    setModal(false);
  };

  const openModalHandler = () => {
    setModal(true);
  };

  const userLocalInfo = JSON.parse(localStorage.getItem("user") ?? "{}");
  var navigate = useNavigate();

  const onLogoutClick = () => {
    localStorage.removeItem("user");
    navigate("/");
    setModal(true);
  };

  const userData = localStorage.getItem("user");
  useLayoutEffect(() => {
    if (userData === null) {
      openModalHandler();
    }
  }, [userData]);

  return (
    <>
      <Modal
        size="md"
        isOpen={modal}
        toggle={() => setModal(!modal)}
        style={{
          marginTop: 100,
        }}
      >
        <ModalBody>
          <div
            style={{
              display: "block",
              padding: 30,
            }}
          >
            <Nav tabs>
              <NavItem
                style={{
                  width: 125,
                  textAlign: "center",
                  cursor: "pointer",
                }}
              >
                <NavLink
                  className={classNames({
                    active: currentActiveTab === "1",
                  })}
                  onClick={() => {
                    toggle("1");
                  }}
                >
                  Login
                </NavLink>
              </NavItem>
              <NavItem
                style={{
                  width: 125,
                  textAlign: "center",
                  cursor: "pointer",
                }}
              >
                <NavLink
                  className={classNames({
                    active: currentActiveTab === "2",
                  })}
                  onClick={() => {
                    toggle("2");
                  }}
                >
                  Signup
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={currentActiveTab}>
              <TabPane tabId="1">
                <Row>
                  <Col sm="12">
                    <LoginForm onCloseModal={closeModalHandler} />
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="2">
                <Row>
                  <Col sm="12">
                    <SignupForm />
                  </Col>
                </Row>
              </TabPane>
            </TabContent>
          </div>
        </ModalBody>
      </Modal>

      {userLocalInfo !== null ? (
        <button
          className="btn btn-danger d-flex ms-auto px-5"
          type="button"
          onClick={onLogoutClick}
        >
          Logout
        </button>
      ) : (
        <button
          className="btn btn-light text-primary d-flex ms-auto px-5"
          type="button"
          onClick={() => setModal(true)}
        >
          Login
        </button>
      )}
    </>
  );
};

export default Login;
