from selenium.webdriver.common.by import By


class GetStartedPageLocators():
    get_started_link = (By.XPATH, "/html/body/div/div/div[1]/header/button")
    user_name = (By.ID, "username")
    email = (By.ID, "email")
    password = (By.ID, "password")
    terms_and_conditions = "termsAndConditions"
    privacy_policy = "privacyPolicy"
    signup_button = "/html/body/div/div/div[2]/div[2]/div[2]/form/button"