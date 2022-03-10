import { getMainData } from './dataFunctions.js'

export const filterNameProduct = (input, nameArray) => {

    const cards = document.getElementsByClassName('card')

    input.addEventListener('keyup', async (e) => {

        for (let index = 0; index < cards.length; index++) {
            cards[index].classList.remove('hide')
        }
        
        if ( nameArray.includes(input.value.toUpperCase()) ) {

            const product = await getMainData(`http://localhost:3000/${input.value.toUpperCase()}`)
            
            if ( product.message ) {
                alert('Servicio no disponible.')
            } else {
                for (let index = 0; index < cards.length; index++) {
                    if (cards[index].children[2].textContent !== product[0].name.toUpperCase().trim()) {
                        cards[index].classList.add('hide')
                    }
                }
            }

        }
    })
}

export const filterCategoryProduct = (select) => {

    const cards = document.getElementsByClassName('card')

    select.addEventListener('change', async (e) => {


        if ( select.value !== '0' ) {
            const category = await getMainData(`http://localhost:3000/category/${select.value}`)

            if ( category.message ) {

                alert('Servicio no disponible en este momento.')
            
            } else {
    
                for (let index = 0; index < cards.length; index++) {
                    cards[index].classList.remove('hide')
                }
                
                for (let index = 0; index < cards.length; index++) {
                    if (cards[index].children[0].children[0].textContent !== category[0].nameCategory.toUpperCase().trim()) {
                        cards[index].classList.add('hide')
                    }
                }
    
            }
        } else {
            for (let index = 0; index < cards.length; index++) {
                cards[index].classList.remove('hide')
            }           
        }

    })
}