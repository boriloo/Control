function toDecimal(binary) {
    const toList = Array.from(String(binary), Number).reverse()
    let cont = 0
    for (let i = 0; i < toList.length; i++) {
        cont += (toList[i] * (2 ** i))
    }
    console.log(cont)
    return cont;
}

toDecimal(1010)