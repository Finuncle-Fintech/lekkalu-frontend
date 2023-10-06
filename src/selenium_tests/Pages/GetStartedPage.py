from selenium.webdriver.common.by import By

from Pages.BasePage import BasePage
from Resources.GetStartedPageLocators import GetStartedPageLocators

class GetStartedPage(BasePage):
    def __init__(self, driver):
        super().__init__(driver)
        self.driver.get('http://127.0.0.1:3000/')

    def fill_out_registration_form_to_get_status_of_sign_up_button(self):
        self.click(GetStartedPageLocators.get_started_link)
        self.click(GetStartedPageLocators.user_name)
        self.enter_text(GetStartedPageLocators.user_name, "asd")
        self.click(GetStartedPageLocators.email)
        self.enter_text(GetStartedPageLocators.email, "asd@asd.com")
        self.click(GetStartedPageLocators.password)
        self.enter_text(GetStartedPageLocators.password, "123456789")
        self.find_element_and_click(By.NAME, GetStartedPageLocators.terms_and_conditions)
        self.find_element_and_click(By.NAME, GetStartedPageLocators.privacy_policy)
        sign_up_button = self.find_element(By.XPATH,GetStartedPageLocators.signup_button)
        self.find_element_and_click(By.XPATH, GetStartedPageLocators.signup_button)

        return sign_up_button.is_enabled()
