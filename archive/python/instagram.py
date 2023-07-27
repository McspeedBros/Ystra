import requests
import time
from selenium import webdriver
from selenium_stealth import stealth
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.webdriver.chrome.options import Options

url = "https://www.instagram.com/ystra_ice/"

# function to save image
def save_image(image_url, image_name):
    # open image url and save as file
    img = requests.get(image_url, stream=True)
    with open(image_name, "wb") as file:
        for chunk in img.iter_content(chunk_size=1024):
            if chunk:
                file.write(chunk)

# Chrome
chrome_options = webdriver.ChromeOptions()
# chrome_options.add_experimental_option("prefs", {"profile.managed_default_content_settings.images": 2})
chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
chrome_options.add_experimental_option("excludeSwitches", ["ignore-certificate-errors"])
chrome_options.add_experimental_option('useAutomationExtension', False)
chrome_options.add_argument("--log-level=3")
chrome_options.add_argument("--enable-stealth-mode")

driver = webdriver.Chrome(options=chrome_options)
driver.get(url)
driver.maximize_window()

# Stealth
stealth(driver,
    languages=["en-US", "en"],
    vendor="Google Inc.",
    platform="Win32",
    webgl_vendor="Intel Inc.",
    renderer="Intel Iris OpenGL Engine",
    fix_hairline=True,
    )

# Wait
WebDriverWait(driver, 60)
time.sleep(5)

cookies = driver.find_element(By.CLASS_NAME, "_a9_1").click()

# register = driver.find_element(By.CLASS_NAME, "xoegz02")
# register.find_element(By.CLASS_NAME, "_abn5").click()

time.sleep(10)

# scroll down
driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")

i = 0
images = driver.find_elements(By.CLASS_NAME, "_aagv")
for image in images:
    post = image.find_element(By.TAG_NAME, "img").get_attribute("src")
    # save image to folder
    save_image(post, f"post_{i}.png")
    i += 1
    


time.sleep(75)

# Close
driver.close()
