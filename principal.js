import { Builder, By, Key } from 'selenium-webdriver';

let origem = "São Paulo - Todos os Aeroportos (SAO)";
let destino = "Rio de Janeiro - Todos os Aeroportos (RIO)";
let campoOrigem = "input.MuiInputBase-input[placeholder='Busque por aeroporto']";
let campoDestino = `${campoOrigem}:not([value="${origem}"])`;
let campoDataIda = "datepicker-ida";
let campoDataVolta = "datepicker-volta";
let botaoBuscar = ".MuiButton-root[type='submit']";

/**
 * adiciona dias a uma data
 * @param {DateTime} date 
 * @param {Number} days 
 * @returns retorna a data enviada mais a quantidade de dias adicionada
 */
const addDays = (date, days) => {
    date.setDate(date.getDate() + days);
    return date;
}

let dataInicial = new Date(), dataFinal = new Date();
let adicionarAnoInicial = false;
let adicionarAnoFinal = false;
let newDataFinal = addDays(dataFinal, 8), newDataInicial = addDays(dataInicial, 1);

let diaInicial = newDataInicial.getDate(), mesInicial = newDataInicial.getMonth() + 2, anoInicial = newDataInicial.getFullYear();
let diaFinal = newDataFinal.getDate(), mesFinal = newDataFinal.getMonth() + 2, anoFinal = newDataFinal.getFullYear();

diaInicial = parseInt(diaInicial) > 28 ? 1 : diaInicial;
diaFinal = parseInt(diaFinal) > 28 ? 1 : diaFinal;

adicionarAnoInicial = parseInt(mesInicial) > 12;
adicionarAnoFinal = parseInt(mesFinal) > 12;
mesInicial = mesInicial > 12 ? 1 : mesInicial;
mesFinal = mesFinal > 12 ? 1 : mesFinal;

anoInicial = adicionarAnoInicial ? anoInicial + 1 : anoInicial;
anoFinal = adicionarAnoFinal ? anoFinal + 1 : anoFinal;

let dataInicialFormated = `${diaInicial}/${("00" + mesInicial).slice(-2)}/${("00" + anoInicial).slice(-2)}`;
let dataFinalFormated = `${diaFinal}/${("00" + mesFinal).slice(-2)}/${("00" + anoFinal).slice(-2)}`;

let keys = Key;

new Builder().forBrowser('chrome').build().then((driver) => {
    driver.get('https://123milhas.com/').then(() => {
        driver.manage().window().maximize().then(() => {
            driver.findElement(By.css(campoOrigem)).then((element) => {
                setTimeout(() => {
                    element.click().then(() => {
                        driver.actions().click(element).sendKeys(origem).perform().then(() => {
                            setTimeout(() => {
                                driver.actions().click(element).sendKeys(keys.ARROW_DOWN).perform()
                                driver.actions().click(element).sendKeys(keys.ENTER).perform()
                            }, 2000);
                        }).then(() => {
                            setTimeout(() => {
                                driver.findElement(By.css(campoDestino)).then((secondElement) => {
                                    secondElement.click().then(() => {
                                        secondElement.sendKeys(destino).then(() => {
                                            driver.actions().click(secondElement).sendKeys(keys.ARROW_DOWN).perform()
                                            driver.actions().click(secondElement).sendKeys(keys.ENTER).perform()
                                        })
                                    })
                                }).then(() => {
                                    setTimeout(() => {
                                        driver.findElement(By.id(campoDataIda)).then((initialDateElement) => {
                                            driver.actions().click(initialDateElement).sendKeys(dataInicialFormated).perform();
                                        }).then(() => {
                                            driver.findElement(By.id(campoDataVolta)).then((finalDateElement) => {
                                                driver.actions().click(finalDateElement).sendKeys(dataFinalFormated).perform();
                                            }).then(() => {
                                                setTimeout(() => {
                                                    driver.findElement(By.css(botaoBuscar)).then((searchButton) => {
                                                        driver.actions().click(searchButton).perform().then(() => {
                                                            setTimeout(() => {
                                                                driver.getWindowHandle().then((currentTab) => {
                                                                    driver.getAllWindowHandles().then((tabs) => {
                                                                        tabs.forEach((handle) => {
                                                                            if (handle !== currentTab) {
                                                                                driver.switchTo().window(handle).then(() => {
                                                                                    setTimeout(() => {
                                                                                        driver.findElement(By.id("searchResultGroup")).click();
                                                                                    }, 15000)
                                                                                });
                                                                            }
                                                                        })
                                                                    });
                                                                });
                                                            }, 20000);
                                                        });;
                                                    });
                                                }, 2000);
                                            });
                                        });
                                    }, 2000);
                                })
                            }, 2000);
                        })
                    })
                }, 5000)
            });
        });
    })
})
