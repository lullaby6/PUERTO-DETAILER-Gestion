const filasElements = document.querySelectorAll('.fila')
const costoElements = document.querySelectorAll('.costo')
const manoElements = document.querySelectorAll('.mano')
const mainElement = document.querySelector('.main')
const addElement = document.querySelector('.add')
const removeElement = document.querySelector('.remove')

const totalCostoElement = document.querySelector('.total-costo')
const totalManoElement = document.querySelector('.total-mano')
const totalPropElement = document.querySelector('.total-prop')
const totalBrutoElement = document.querySelector('.total-bruto')

const costoCallback = event => {
    event.target.parentNode.querySelector('.bruto').value = event.target.value - event.target.parentNode.querySelector('.mano').value
    event.target.parentNode.querySelector('.prop').value = (event.target.parentNode.querySelector('.mano').value * 100) / event.target.value
    if (event.target.parentNode.querySelector('.bruto').value < 0){
        event.target.parentNode.querySelector('.bruto').classList.add('text-red-600')
    }else{
        event.target.parentNode.querySelector('.bruto').classList.remove('text-red-600')
    }

    let totalCosto = 0
    document.querySelectorAll('.costo').forEach(costoElement => {
        if(costoElement.value.length > 0) totalCosto = parseFloat(totalCosto) + parseFloat(costoElement.value)
    })
    totalCostoElement.innerHTML = totalCosto

    totalPropElement.innerHTML = (parseFloat(totalManoElement.innerHTML) * 100) / parseFloat(totalCostoElement.innerHTML)
    totalBrutoElement.innerHTML = Math.round(parseFloat(totalCostoElement.innerHTML) - parseFloat(totalManoElement.innerHTML))
}

const manoCallback = event => {
    event.target.parentNode.querySelector('.bruto').value = event.target.parentNode.querySelector('.costo').value - event.target.value
    event.target.parentNode.querySelector('.prop').value = (event.target.value * 100) / event.target.parentNode.querySelector('.costo').value

    if (event.target.parentNode.querySelector('.bruto').value < 0){
        event.target.parentNode.querySelector('.bruto').classList.add('text-red-600')
        event.target.parentNode.querySelector('.bruto').classList.remove('text-green-600')
    }else{
        event.target.parentNode.querySelector('.bruto').classList.remove('text-red-600')
        event.target.parentNode.querySelector('.bruto').classList.add('text-green-600')
    }

    let totalMano = 0
    document.querySelectorAll('.mano').forEach(manoElement => {
        if(manoElement.value.length > 0) totalMano = parseFloat(totalMano) + parseFloat(manoElement.value)
    })
    totalManoElement.innerHTML = totalMano

    totalPropElement.innerHTML = (parseFloat(totalManoElement.innerHTML) * 100) / parseFloat(totalCostoElement.innerHTML)
    totalBrutoElement.innerHTML = Math.round(parseFloat(totalCostoElement.innerHTML) - parseFloat(totalManoElement.innerHTML))
}

costoElements.forEach(costoElement => {
    costoElement.addEventListener('input', event => costoCallback(event))
})

manoElements.forEach(manoElement => {
    manoElement.addEventListener('input', event => manoCallback(event))
})

addElement.addEventListener('click', () => {
    const newFilaElement = filasElements[0].cloneNode(true)
    newFilaElement.childNodes.forEach(newFilaElementChild => {
        newFilaElementChild.value = ''
        try {
            if(newFilaElementChild.className.includes('zero')) newFilaElementChild.value = '0'
            if(newFilaElementChild.className.includes('costo')) newFilaElementChild.addEventListener('input', event => costoCallback(event))
            if(newFilaElementChild.className.includes('mano')) newFilaElementChild.addEventListener('input', event => manoCallback(event))
        } catch (error) {}
    })
    mainElement.appendChild(newFilaElement)
})

removeElement.addEventListener('click', () => {
    if(mainElement.childNodes.length > 3) mainElement.lastChild.remove()
})

document.querySelectorAll('.date-now').forEach(dateNowElement => {
    let now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    dateNowElement.value = now.toISOString().slice(0, 16);
})