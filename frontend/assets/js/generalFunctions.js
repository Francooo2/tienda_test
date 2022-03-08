export const getItemsLocalStorage = (list, totalInput) => {
    
    const arrayLocalStorage = Object.keys(localStorage)
    arrayLocalStorage.sort((a, b) => a - b)
    
    for (let i = 0; i < arrayLocalStorage.length; i++) {
        
        let data             = localStorage[arrayLocalStorage[i]]
        let position         = data.indexOf('$')
        let product          = data.substring(0, position)
        let parcial          = data.substring(position + 1, data.length)
            totalInput.value = parseInt(totalInput.value) + parseInt(parcial)
        
        list.innerHTML += `<li id="${arrayLocalStorage[i]}" >
            <p class="lateral__product">${product}</p>
            <input type="text" value="${parcial}" class="lateral__input" readonly>
            <i class="fa fa-window-close lateral__close"</i>
        </li>`
     
    }

}

export const addItem = (parent, lateral, list, totalInput) => {

    parent.addEventListener('click', (e) => {
        
        if ( e.target.classList[2] === 'card__plus' ) {
            lateral.classList.add('show')
            
            let elementsList = document.getElementsByTagName('li')
            let id

            if ( elementsList.length <= 0 ) {
                id = elementsList.length + 1
            } else {
                id          = parseInt(elementsList[elementsList.length - 1].id) + 1
            }

            let product     = e.target.parentNode.parentNode.children[2].textContent
            let parcial     = parseInt(e.target.parentNode.children[0].textContent.substring(1, e.target.parentNode.children[0].textContent.length)) * parseInt(e.target.parentNode.children[1].value)
                totalInput.value = parseInt(totalInput.value) + parcial
            
    
            list.innerHTML += `<li id="${id}" >
                <p class="lateral__product">${product}</p>
                <input type="text" value="${parcial}" class="lateral__input" readonly>
                <i class="fa fa-window-close lateral__close"</i>
            </li>`
    
            localStorage.setItem(`${id}`, `${product}$${parcial}`)
        }
    })

}

export const removeItem = (list, totalInput) => {
    lateral.addEventListener('click', (e) => {
        if ( e.target.classList[2] === 'lateral__close' ) {
                totalInput.value = parseInt(totalInput.value) - parseInt(e.target.parentNode.children[1].value)
            let child       = e.target.parentNode
            let id          = e.target.parentNode.id
            list.removeChild(child)
            localStorage.removeItem(id)
        }
    })
}

export const sale = (button, list, totalInput) => {
    
    button.addEventListener('click', () => {

        let elements = document.getElementsByTagName('li')
        
        if ( elements.length === 0 ) {
            alert('Estimado cliente, favor agregar productos a su carro.')
            return
        }
    
        let message  = confirm('¿Esta seguro de su compra?')
        
        if ( message === true ) {
            alert(`Su compra de un monto de $ ${total.value} ha sido realizada con exito, vuelva pronto.`)
            for (let index = elements.length - 1; index >= 0; index--) {
                list.removeChild(elements[index])
            }
            localStorage.clear()
            totalInput.value = '0'
        } else {
            alert('Su compra ha sido cancelada.')
        }
    
    })

}