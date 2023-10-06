from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


from Pages.BasePage import BasePage
from Resources.LoginPageLocators import LoginPageLocators

class LoginPage(BasePage):
    def __init__(self, driver):
        super().__init__(driver)
        self.driver.get('http://127.0.0.1:3000/')

    def fill_out_login_form_to_get_alert_text(self):
        self.click(LoginPageLocators.get_started_link)
        self.find_element_and_click(By.XPATH, LoginPageLocators.login_button)
        self.click(LoginPageLocators.user_name)
        self.enter_text(LoginPageLocators.user_name, "asd")
        self.click(LoginPageLocators.password)
        self.enter_text(LoginPageLocators.password, "123456789")
        self.find_element_and_click(By.XPATH, LoginPageLocators.continue_button)
        alert = WebDriverWait(self.driver, 5).until(EC.alert_is_present())
        alert_text = alert.text

        return alert_text
