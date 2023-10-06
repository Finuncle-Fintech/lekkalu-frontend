from selenium.webdriver import ActionChains
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

class BasePage():
    """The BasePage class holds all common functionality across the website.
    Also provides a nice wrapper when dealing with selenium functions that may
    not be easy to understand.
    """

    def __init__(self, driver):
        """ This function is called every time a new object of the base class is created"""
        self.driver = driver

    def click(self, by_locator):
        """ Performs click on web element whose locator is passed to it"""
        WebDriverWait(self.driver, 20).until(EC.element_to_be_clickable(by_locator)).click()

    def find_element_and_click(self, by_what, by_locator):
        #WebDriverWait(self.driver, 20).until(EC.element_to_be_clickable(by_locator))
        element = self.driver.find_element(by_what,by_locator)
        actions = ActionChains(self.driver)
        actions.move_to_element(element).click().perform()

    def find_element(self,by_what, by_locator):
        return self.driver.find_element(by_what,by_locator)

    def enter_text(self, by_locator, text):
        """ Performs text entry of the passed in text, in a web element whose locator is passed to it"""
        return WebDriverWait(self.driver, 20).until(EC.element_to_be_clickable(by_locator)).send_keys(text)

    def get_title(self, title) -> str:
        """Returns the title of the page"""
        WebDriverWait(self.driver, 10).until(EC.title_is(title))
        return self.driver.title
