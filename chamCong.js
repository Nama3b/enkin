import { Builder, Browser, By, Key, until } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";

export default async function chamCong(type) {
  const loginId = "258031_evn@entetsu.co.jp";
  const password = "Evn202107";
  const idButton = type === "on" ? "ext-element-616" : "ext-element-621";
  const screen = {
    width: 640,
    height: 480,
  };
  let driver = await new Builder()
    .forBrowser(Browser.CHROME)
    .setChromeOptions(new chrome.Options().headless().windowSize(screen))
    .build();
  try {
    await driver.get("https://etgroup.enkinlab.net/login");
    await driver.findElement(By.id("inputEmail")).sendKeys(loginId);
    await driver
      .findElement(By.id("inputPassword"))
      .sendKeys(password, Key.ENTER);
    await driver.wait(until.elementLocated(By.id(idButton)));
    await driver.wait(
      until.elementIsEnabled(driver.findElement(By.id(idButton))),
      10000,
      "Khong tim thay"
    );
    await driver.findElement(By.id(idButton)).click();
    await driver
      .findElement(
        By.xpath(
          "//*[@id='ext-work-input-dialog-1']/div[1]/div/div[2]/div/div[1]/button"
        )
      )
      .click();
    await driver.wait(
      until.elementIsDisabled(driver.findElement(By.id(idButton)))
    );
    await driver.quit();
  } catch (error) {
    return Promise.reject(error);
  }
}
