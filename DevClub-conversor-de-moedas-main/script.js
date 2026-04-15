const convertSelectB = document.querySelector(".currency-select-2")
const convertButton = document.querySelector(".button")
const dolarValue = document.querySelector(".B-value")
const realValue = document.querySelector(".A-value")
const input = document.querySelector(".input-value")

async function convertValue() {
  try {
    const response = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL")
    const data = await response.json()

    const dolartoday = Number(data.USDBRL.high)
    const eurotoday = Number(data.EURBRL.high)
    const bitcointoday = Number(data.BTCBRL.high)

    const libratoday = 6.14

    const inputValue = Number(input.value)

    if (!inputValue) {
      alert("Digite um valor válido")
      return
    }

    realValue.innerHTML = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(inputValue)

    let result = ""

    if (convertSelectB.value === "Dolar") {
      result = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
      }).format(inputValue / dolartoday)
    }

    if (convertSelectB.value === "Euro") {
      result = new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR"
      }).format(inputValue / eurotoday)
    }

    if (convertSelectB.value === "Bitcoin") {
      result = `${(inputValue / bitcointoday).toFixed(6)} BTC`
    }

    if (convertSelectB.value === "Libra") {
      result = new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP"
      }).format(inputValue / libratoday)
    }

    if (convertSelectB.value === "Real") {
      result = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
      }).format(inputValue)
    }

    dolarValue.innerHTML = result

  } catch (error) {
    console.error(error)
    alert("Erro ao buscar cotação")
  }
}

convertButton.addEventListener("click", convertValue)