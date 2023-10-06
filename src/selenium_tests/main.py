import unittest

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options


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
        self.vars = {}
        self.base_url = 'http://127.0.0.1:3000/'

    def tearDown(self):
        self.driver.quit()

    def test_url(self):
        """
        Testing whether the loaded page's url is the same as set in the base url.
        :return:
        """
        self.driver.get(self.base_url)
        URL = self.driver.current_url
        self.assertEqual(self.base_url, URL)

    def test_registration(self):
        """
        Test the 'Get Started' page on Finuncle. At the end of the process when all the fields are filled the button is
        disabled at the moment.
        """
        self.driver.get(self.base_url)
        self.driver.set_window_size(1616, 876)
        wait = WebDriverWait(self.driver, 20)
        wait.until(EC.presence_of_element_located((By.XPATH, "/html/body/div/div/div[1]/header/button")))
        get_started_link = wait.until(EC.element_to_be_clickable((By.XPATH, "/html/body/div/div/div[1]/header/button")))
        get_started_link.click()
        self.driver.find_element(By.ID, "username").click()
        self.driver.find_element(By.ID, "username").send_keys("asd")
        self.driver.find_element(By.ID, "email").click()
        self.driver.find_element(By.ID, "email").send_keys("asd@asd.com")
        self.driver.find_element(By.ID, "password").click()
        element = self.driver.find_element(By.NAME, "termsAndConditions")
        actions = ActionChains(self.driver)
        actions.move_to_element(element).perform()
        self.driver.find_element(By.ID, "password").send_keys("123456789")
        self.driver.find_element(By.NAME, "termsAndConditions").click()
        self.driver.find_element(By.NAME, "privacyPolicy").click()
        signup_button = self.driver.find_element(By.XPATH, "/html/body/div/div/div[2]/div[2]/div[2]/form/button")
        signup_button.click()
        WebDriverWait(self.driver, 5)
        self.assertEqual(False, signup_button.is_enabled())

    def test_login_with_unregistered_user(self):
        """
         Test login with an unregistered user.
         """
        self.driver.get(self.base_url)
        self.driver.set_window_size(1616, 876)
        wait = WebDriverWait(self.driver, 20)
        wait.until(EC.presence_of_element_located((By.XPATH, "/html/body/div/div/div[1]/header/button")))
        get_started_link = wait.until(EC.element_to_be_clickable((By.XPATH, "/html/body/div/div/div[1]/header/button")))
        get_started_link.click()
        self.driver.find_element(By.XPATH, "/html/body/div/div/div[1]/div[2]/div/a[1]").click()
        self.driver.find_element(By.ID, "username").send_keys("asd")
        self.driver.find_element(By.ID, "password").send_keys("CZS85dH22T9.grv")
        self.driver.find_element(By.XPATH, "/html/body/div/div/div[2]/div[2]/div[1]/form/button").click()
        alert = WebDriverWait(self.driver, 5).until(EC.alert_is_present())
        alert_text = alert.text
        assert alert_text == "Network Error"


if __name__ == '__main__':
    unittest.main()
