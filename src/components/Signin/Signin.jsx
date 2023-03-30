import React, { useState } from 'react';
import classNames from 'classnames';
import 'font-awesome/css/font-awesome.min.css';
import {
    Modal, ModalBody, TabContent, TabPane, Nav,
    NavItem, NavLink, Row, Col
} from 'reactstrap';



function Signin() {
    const [modal, setModal] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [name, setName] = useState();
    const register = () => {
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        setName("");
        setEmail("");
        setPassword("")

    }
    const login = () => {
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        setEmail("");
        setPassword("");

    }
    // State for current active Tab
    const [currentActiveTab, setCurrentActiveTab] = useState('1');

    // Toggle active state for Tab
    const toggle = tab => {
        if (currentActiveTab !== tab) setCurrentActiveTab(tab);
    }


    return (
        <>

            <Modal
                size='md'
                isOpen={modal}
                toggle={() => setModal(!modal)}
                style={{
                    marginTop: 100
                }}
            >
                <ModalBody>
                    <div style={{
                        display: 'block', padding: 30
                    }}>
                        <Nav tabs >
                            <NavItem style={{
                                width: 125, textAlign: 'center', cursor: 'pointer'
                            }}>
                                <NavLink
                                    className={classNames({
                                        active:
                                            currentActiveTab === '1'
                                    })}
                                    onClick={() => { toggle('1'); }}
                                >
                                    Login
                                </NavLink>
                            </NavItem>
                            <NavItem
                                style={{
                                    width: 125, textAlign: 'center', cursor: 'pointer'
                                }}
                            >
                                <NavLink
                                    className={classNames({
                                        active:
                                            currentActiveTab === '2'
                                    })}
                                    onClick={() => { toggle('2'); }}
                                >
                                    Signup
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={currentActiveTab}>
                            <TabPane tabId="1">
                                <Row>
                                    <Col sm="12">
                                        <form>
                                            {/* <!-- Email input --> */}
                                            <div class="form-outline mb-2 mt-5">
                                                <input type="email" id="email" class="form-control" name="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
                                                <label class="form-label" for="email"></label>
                                            </div>

                                            {/* <!-- Password input --> */}
                                            <div class="form-outline mb-4">
                                                <input type="password" id="Password" class="form-control " name="Password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                            </div>

                                            {/* <!-- 2 column grid layout for inline styling --> */}
                                            <div class="row mb-4">
                                                <div class="col d-flex">
                                                    {/* <!-- Checkbox --> */}
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="checkbox" value="" id="form2Example31" />Remember me
                                                    </div>
                                                </div>

                                                <div class="col d-flex justify-content-end">
                                                    {/* <!-- Simple link --> */}
                                                    <a href="#!">Forgot password?</a>
                                                </div>
                                            </div>

                                            {/* <!-- Submit button --> */}
                                            <button type="button" class="btn btn-primary btn-block mb-4 w-100" onClick={login}>Sign in</button>
                                        </form>
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tabId="2">
                                <Row>
                                    <Col sm="12">
                                        <form>
                                            {/* <!-- Name input --> */}
                                            <div class="form-outline mb-2 mt-5">
                                                <input type="text" id="name" class="form-control" name="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                                                <label class="form-label" for="name"></label>
                                            </div>
                                            {/* <!-- Email input --> */}
                                            <div class="form-outline mb-2">
                                                <input type="email" id="email" class="form-control" name="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
                                                <label class="form-label" for="email"></label>
                                            </div>

                                            {/* <!-- Password input --> */}
                                            <div class="form-outline mb-4">
                                                <input type="password" id="Password" class="form-control " name="Password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                            </div>

                                            {/* <!-- 2 column grid layout for inline styling --> */}
                                            <div class="row mb-4">
                                                <div class="col d-flex">
                                                    {/* <!-- Checkbox --> */}
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="checkbox" value="" id="form2Example31" />I agree to the <a href="#!">Terms and Conditions</a>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* <!-- Submit button --> */}
                                            <button type="button" class="btn btn-primary btn-block mb-4 w-100" onClick={register}>Register</button>
                                        </form>
                                    </Col>
                                </Row>
                            </TabPane>
                        </TabContent>
                    </div >
                </ModalBody>
            </Modal>
            <button className="btn btn-light text-primary loginbtn" type="button" onClick={() => setModal(true)}>Login</button>
        </>
    )
}

export default Signin