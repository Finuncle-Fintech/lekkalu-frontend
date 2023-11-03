import unittest

from selenium import webdriver
from selenium.webdriver.chrome.options import Options

from Pages.GetStartedPage import GetStartedPage
from Pages.LoginPage import LoginPage


class TestRegistration(unittest.TestCase):
    """
    Run tests in headless mode.
    Base URL set to 127.0.0.1:3000 because of the github Actions page.
    Make sure to use XPATH where ever you can, because with CSS selectors the script running on github actions did not
    find the elements.
    """

    def setUp(self) -> None:
        options = Options()
        options.add_argument('--headless=new')

        self.driver = webdriver.Chrome(options=options)

    def tearDown(self):
        self.driver.quit()

    def test_url_and_title(self):
        """
        Testing whether the loaded page's url is the same as set in the base url.
        :return:
        """
        self.driver.get("http://127.0.0.1:3000/")
        self.assertEqual('http://127.0.0.1:3000/', self.driver.current_url)
        self.assertEqual('Finuncle', self.driver.title)

    def test_registration(self):
        """
        Test the 'Get Started' page on Finuncle. At the end of the process when all the fields are filled the button is
        disabled at the moment.
        """
        self.get_started_page = GetStartedPage(self.driver)
        signup_button_enabled = self.get_started_page.fill_out_registration_form_to_get_status_of_sign_up_button()
        self.assertEqual(False, signup_button_enabled)

    def test_login_with_unregistered_user(self):
        """
         Test login with an unregistered user.
         """
        self.login_page = LoginPage(self.driver)
        alert_text = self.login_page.fill_out_login_form_to_get_alert_text()
        self.assertEqual(alert_text, "Network Error")


if __name__ == '__main__':
    unittest.main()
