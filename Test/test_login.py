import pytest
import time
import json
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities

class TestLogin():
  def setup_method(self, method):
    self.driver = webdriver.Chrome()
    self.vars = {}

  def teardown_method(self, method):
    self.driver.quit()

  def test_login(self):
    self.driver.get("http://localhost:3000/login")
    self.driver.set_window_size(1440, 794)
    self.driver.find_element(By.CSS_SELECTOR, ".input:nth-child(1) > input").click()
    self.driver.find_element(By.CSS_SELECTOR, ".input:nth-child(1) > input").send_keys("sam")
    self.driver.find_element(By.CSS_SELECTOR, ".input:nth-child(2) > input").click()
    self.driver.find_element(By.CSS_SELECTOR, ".input:nth-child(2) > input").send_keys("123456")
    self.driver.find_element(By.CSS_SELECTOR, ".submit").click()