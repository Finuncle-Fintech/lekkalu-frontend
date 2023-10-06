from selenium.webdriver.common.by import By

class LoginPageLocators():
    get_started_link = (By.XPATH, "/html/body/div/div/div[1]/header/button")
    login_button = "/html/body/div/div/div[1]/div[2]/div/a[1]"
    user_name = (By.ID, "username")
    password = (By.ID, "password")
    continue_button = "/html/body/div/div/div[2]/div[2]/div[1]/form/button"