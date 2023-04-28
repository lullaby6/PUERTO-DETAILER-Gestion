const filasElements = document.querySelectorAll('.fila')
const costoElements = document.querySelectorAll('.costo')
const manoElements = document.querySelectorAll('.mano')
const selectElements = document.querySelectorAll('.select')
const mainElement = document.querySelector('.main')

const pdfElement = document.querySelector('.pdf')
const addElement = document.querySelector('.add')
const removeElement = document.querySelector('.remove')

const totalCostoElement = document.querySelector('.total-costo')
const totalManoElement = document.querySelector('.total-mano')
const totalPropElement = document.querySelector('.total-prop')
const totalBrutoElement = document.querySelector('.total-bruto')

console.log('juan5');

const updateFila = (costoElement, manoElement) => {
    const brutoElement = costoElement.parentNode.querySelector('.bruto')
    const propElement = costoElement.parentNode.querySelector('.prop')

    brutoElement.value = costoElement.value - manoElement.value
    propElement.value = (manoElement.value * 100) / costoElement.value

    if (brutoElement.value < 0){
        brutoElement.classList.add('text-red-600')
        brutoElement.classList.remove('text-green-600')
    }else{
        brutoElement.classList.remove('text-red-600')
        brutoElement.classList.add('text-green-600')
    }

    updateTotal()
}

const updateTotal = () => {
    let totalCosto = 0
    document.querySelectorAll('.costo').forEach(costoElement => {
        if(costoElement.value.length > 0) totalCosto = parseFloat(totalCosto) + parseFloat(costoElement.value)
    })
    totalCostoElement.innerHTML = totalCosto

    let totalMano = 0
    document.querySelectorAll('.mano').forEach(manoElement => {
        if(manoElement.value.length > 0) totalMano = parseFloat(totalMano) + parseFloat(manoElement.value)
    })
    totalManoElement.innerHTML = totalMano

    totalPropElement.innerHTML = ((parseFloat(totalManoElement.innerHTML) * 100) / parseFloat(totalCostoElement.innerHTML)).toFixed(2)
    totalBrutoElement.innerHTML = (parseFloat(totalCostoElement.innerHTML) - parseFloat(totalManoElement.innerHTML))

    if (parseFloat(totalBrutoElement.innerHTML) < 0){
        totalBrutoElement.classList.add('text-red-600')
        totalBrutoElement.classList.remove('text-green-600')
    }else{
        totalBrutoElement.classList.remove('text-red-600')
        totalBrutoElement.classList.add('text-green-600')
    }
}

const costoCallback = event => {
    const costoElement = event.target
    const manoElement = event.target.parentNode.querySelector('.mano')

    updateFila(costoElement, manoElement)
}

const manoCallback = event => {
    const manoElement = event.target
    const costoElement = event.target.parentNode.querySelector('.costo')

    updateFila(costoElement, manoElement)
}

const selectCallback = event => {
    if(event.target.value == 'escribir'){
        event.target.classList.add('hidden')
        event.target.parentNode.querySelector('.s-text').classList.remove('hidden')
    }
}

costoElements.forEach(costoElement => {
    costoElement.addEventListener('input', event => costoCallback(event))
})

manoElements.forEach(manoElement => {
    manoElement.addEventListener('input', event => manoCallback(event))
})

selectElements.forEach(selectElement => {
    selectElement.addEventListener('change', event => selectCallback(event))
})

addElement.addEventListener('click', () => {
    const newFilaElement = filasElements[0].cloneNode(true)
    newFilaElement.childNodes.forEach(newFilaElementChild => {
        newFilaElementChild.value = ''
        try {
            if(newFilaElementChild.className.includes('zero')) newFilaElementChild.value = '0'
            if(newFilaElementChild.className.includes('costo')) newFilaElementChild.addEventListener('input', event => costoCallback(event))
            if(newFilaElementChild.className.includes('mano')) newFilaElementChild.addEventListener('input', event => manoCallback(event))
            if(newFilaElementChild.className.includes('s-text')) newFilaElementChild.classList.add('hidden')
            if(newFilaElementChild.className.includes('select')) {
                newFilaElementChild.classList.remove('hidden')
                newFilaElementChild.value = 'servicio'
                newFilaElementChild.addEventListener('change', event => selectCallback(event))
            }
        } catch (error) {}
    })
    mainElement.appendChild(newFilaElement)
})

removeElement.addEventListener('click', () => {
    if(mainElement.childNodes.length > 3) mainElement.lastChild.remove()
})

pdfElement.addEventListener('click', () => {
    const target = document.getElementById('main')

    // html2pdf(target)

    // let divContents = $("#main").html();
    // let printWindow = window.open('', '', 'height=400,width=800');
    // printWindow.document.write('<html><head>');
    // printWindow.document.write('</head><body >');
    // printWindow.document.write(divContents);
    // printWindow.document.write('</body></html>');
    // printWindow.document.close();

    print(target);
});

document.querySelectorAll('.date-now').forEach(dateNowElement => {
    let now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    dateNowElement.value = now.toISOString().slice(0, 16);
})