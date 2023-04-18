let assert = require('assert');
let cookieBotao = "cookies-politics-button";
let origem = "São Paulo, SAO - Brasil";
let destino = "Rio de Janeiro, RIO - Brasil";
let autoComplete = "btnItemAutoComplete_0";
let campoOrigem = "txtInputOrigin_field";
let campoDestino = `txtInputDestination_field`;
let campoDataIda = "departureDate";
let campoDataVolta = "arrivalDate";
let botaoBuscar = "btnSearchCTA";

let driver = $webDriver;
let By = $selenium.By;
let keys = $selenium.Key;

driver.get('https://www.latamairlines.com/br/pt').then(() => {
    driver.manage().window().maximize().then(() => {
        setTimeout(() => {
            driver.findElement(By.id(cookieBotao)).then((buttonCookie) => {
                driver.actions().click(buttonCookie).perform().then(() => {
                    driver.findElement(By.id(campoOrigem)).then((element) => {
                        setTimeout(() => {
                            driver.actions().click(element).sendKeys(origem).perform().then(() => {
                                setTimeout(() => {
                                    driver.findElement(By.id(autoComplete)).then((item) => {
                                        driver.actions().click(item).perform();
                                    }).then(() => {
                                        setTimeout(() => {
                                            driver.findElement(By.id(campoDestino)).then((secondElement) => {
                                                driver.actions().click(secondElement).sendKeys(destino).perform().then(() => {
                                                    setTimeout(() => {
                                                        driver.findElement(By.id(autoComplete)).then((itemDois) => {
                                                            driver.actions().click(itemDois).perform();
                                                        }).then(() => {
                                                            setTimeout(() => {
                                                                driver.findElement(By.id(campoDataIda)).then((initialDate) => {
                                                                    driver.actions().click(initialDate).perform().then(() => {
                                                                        driver.actions().click(initialDate)
                                                                            .sendKeys(keys.TAB)
                                                                            .sendKeys(keys.TAB)
                                                                            .sendKeys(keys.TAB)
                                                                            .sendKeys(keys.TAB)
                                                                            .sendKeys(keys.TAB)
                                                                            .sendKeys(keys.ENTER)
                                                                            .perform();
                                                                    }).then(() => {
                                                                        setTimeout(() => {
                                                                            driver.findElement(By.id(campoDataVolta)).then((finalDate) => {
                                                                                driver.actions().click(finalDate).perform().then(() => {
                                                                                    setTimeout(() => {
                                                                                        driver.actions().click(finalDate)
                                                                                            .sendKeys(keys.TAB)
                                                                                            .sendKeys(keys.TAB)
                                                                                            .sendKeys(keys.TAB)
                                                                                            .sendKeys(keys.TAB)
                                                                                            .sendKeys(keys.ENTER)
                                                                                            .perform()
                                                                                            .then(() => {
                                                                                                setTimeout(() => {
                                                                                                    driver.findElement(By.id(botaoBuscar)).then((searchButton) => {
                                                                                                        driver.actions().click(searchButton).perform().then(() => {
                                                                                                            setTimeout(() => {
                                                                                                                driver.getWindowHandle().then((currentTab) => {
                                                                                                                    driver.getAllWindowHandles().then((tabs) => {
                                                                                                                        tabs.forEach((handle) => {
                                                                                                                            if (handle !== currentTab) {
                                                                                                                                driver.switchTo().window(handle).then(() => {
                                                                                                                                    setTimeout(() => {
                                                                                                                                        driver.findElement(By.id("sort-by-dropdown")).click();
                                                                                                                                    }, 10000)
                                                                                                                                });
                                                                                                                            }
                                                                                                                        })
                                                                                                                    });
                                                                                                                });
                                                                                                            }, 31000);
                                                                                                        });
                                                                                                    })
                                                                                                }, 500);
                                                                                            });;
                                                                                    }, 2000);
                                                                                })
                                                                            })
                                                                        }, 500);
                                                                    })
                                                                });
                                                            }, 1000);
                                                        })
                                                    }, 100);
                                                })
                                            })
                                        }, 100)
                                    });
                                }, 100);
                            })
                        }, 500)
                    })
                });
            })
        })
    }, 500)
});
