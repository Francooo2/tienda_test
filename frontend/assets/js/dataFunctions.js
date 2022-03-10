export const getMainData = async (url) => {

    try {
        const response = await fetch(url)
        const products = await response.json()
        return products
    } catch (error) {
        return 'Productos no disponibles en este momento, favor intentar en unos minutos nuevamente.'
    }

}

export const renderCards = (elements, nameArray, list, parent, imgDefault, select, category) => {

    let discount

    for (const product of elements) {

        if (product.discount > 0) {
            discount = `${product.discount}  % Desc.`
        } else {
            discount = ''
        }

        if (product.url_image) {
            parent.innerHTML += `<article class="card">
                <div class="card__header">
                    <p>${product.nameCategory.toUpperCase()}</p>
                    <p class="card__discount">${discount}</p>   
                </div>  
                <img class="card__img" src=${product.url_image} alt="Producto a la venta">
                <p class="card__text">${product.nameProduct}</p>
                <div class="card__footer">
                    <p>$${product.price}</p>
                    <input type="number" value="1" min="1" class="lateral__input">
                    <i class="fas fa-cart-plus card__plus"></i>   
                </div>
            </article>`
        } else {
            parent.innerHTML += `<article class="card">
            <div class="card__header">
                <p>${product.nameCategory.toUpperCase()}</p>
                <p class="card__discount">${discount}</p>   
            </div>    
            <img class="card__img" src=${imgDefault} alt="Producto a la venta">
            <p class="card__text">${product.nameProduct}</p>
            <div class="card__footer">
                <p>$${product.price}</p>
                <input type="number" value="1" min="1" class="lateral__input">
                <i class="fas fa-cart-plus card__plus"></i>   
            </div>
        </article>`
        }

        let opt = document.createElement('option')
        opt.value = product.nameProduct
        list.appendChild(opt)

        if ( category.includes(product.nameCategory) === false ) {
            let opt2           = document.createElement('option')
            opt2.value     = product.category
            opt2.innerHTML = product.nameCategory.toUpperCase()
            select.appendChild(opt2)
        }

        nameArray.push(product.nameProduct)
        category.push(product.nameCategory)
    }

    return nameArray

}