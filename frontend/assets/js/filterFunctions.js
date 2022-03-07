import { getMainData } from './dataFunctions.js'

export const filterNameProduct = (input, arrayNames) => {

    const cards = document.getElementsByClassName('card')

    input.addEventListener('keyup', async (e) => {
    
        if ( arrayNames.includes(input.value.toUpperCase()) ) {
            
            const product = await getMainData(`http://localhost:3000/${input.value.toUpperCase()}`)
            
            for (let index = 0; index < cards.length; index++) {
                if ( cards[index].children[1].textContent !== product[0].name.toUpperCase().trim() ) {
                    cards[index].classList.add('hide')
                }
            }
    
        } else {
            
            for (let index = 0; index < cards.length; index++) {
                cards[index].classList.remove('hide')
            }
    
        }
    
    })

}