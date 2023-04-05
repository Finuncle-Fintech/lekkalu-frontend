import React, { useState } from 'react';
import classNames from 'classnames';
import 'font-awesome/css/font-awesome.min.css';
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
} from 'reactstrap';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';

const Signin = () => {
   const [modal, setModal] = useState(false);

   // State for current active Tab
   const [currentActiveTab, setCurrentActiveTab] = useState('1');

   // Toggle active state for Tab
   const toggle = (tab) => {
      if (currentActiveTab !== tab) setCurrentActiveTab(tab);
   };

   return (
      <>
         <Modal
            size='md'
            isOpen={modal}
            toggle={() => setModal(!modal)}
            style={{
               marginTop: 100,
            }}
         >
            <ModalBody>
               <div
                  style={{
                     display: 'block',
                     padding: 30,
                  }}
               >
                  <Nav tabs>
                     <NavItem
                        style={{
                           width: 125,
                           textAlign: 'center',
                           cursor: 'pointer',
                        }}
                     >
                        <NavLink
                           className={classNames({
                              active: currentActiveTab === '1',
                           })}
                           onClick={() => {
                              toggle('1');
                           }}
                        >
                           Login
                        </NavLink>
                     </NavItem>
                     <NavItem
                        style={{
                           width: 125,
                           textAlign: 'center',
                           cursor: 'pointer',
                        }}
                     >
                        <NavLink
                           className={classNames({
                              active: currentActiveTab === '2',
                           })}
                           onClick={() => {
                              toggle('2');
                           }}
                        >
                           Signup
                        </NavLink>
                     </NavItem>
                  </Nav>
                  <TabContent activeTab={currentActiveTab}>
                     <TabPane tabId='1'>
                        <Row>
                           <Col sm='12'>
                              <LoginForm />
                           </Col>
                        </Row>
                     </TabPane>
                     <TabPane tabId='2'>
                        <Row>
                           <Col sm='12'>
                              <SignupForm />
                           </Col>
                        </Row>
                     </TabPane>
                  </TabContent>
               </div>
            </ModalBody>
         </Modal>
         <button
            className='btn btn-light text-primary loginbtn'
            type='button'
            onClick={() => setModal(true)}
         >
            Login
         </button>
      </>
   );
};

export default Signin;
