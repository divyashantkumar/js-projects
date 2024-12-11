document.addEventListener('DOMContentLoaded', () => {
    const products = [
        {id: 1, name: 'Product 1', price: 10, quantityAvailable: 10},
        {id: 2, name: 'Product 2', price: 20, quantityAvailable: 31},
        {id: 3, name: 'Product 3', price: 30, quantityAvailable: 23},
        {id: 4, name: 'Product 4', price: 40, quantityAvailable: 5},  
    ]

    const cart = [
        {id: 1, name: 'Product 1', price: 10, quantity: 1},
        {id: 2, name: 'Product 2', price: 20, quantity: 3},
        {id: 3, name: 'Product 3', price: 30, quantity: 2}, 
    ]

    const productsContainer = document.querySelector('#products');


    function renderProducts() {
        let productCards = "";
        products.forEach(product => {
            productCards += `
                <div class="col-12 col-md-6 col-lg-4 p-4 my-2">
                    <div class="card productCard p-3">
                        <div class="card-body">
                            <h5 class="card-title productName">${product.name}</h5>
                            <p class="card-text productPrice">Price: ${product.price}</p>
                            <p class="card-text productQuantity" id="productQuantity-${product.id}">Quantity Available: ${product.quantityAvailable}</p>
                        </div>
                        <div class="card-footer d-flex justify-content-between">
                            <button class="btn btn-outline-danger btn-sm" data-id="${product.id}" data-operation="remove" type="button">Remove</button>
                            <div class="input-group input-group-sm px-3">
                                <button class="btn btn-outline-primary" data-id="${product.id}" data-operation="decrement" type="button">-</button>
                                <input type="text" class="form-control text-center productQuantityInput" id="${product.id}" value="1">
                                <button class="btn btn-outline-primary" data-id="${product.id}" data-operation="increment" type="button">+</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
        productsContainer.innerHTML = productCards;
    }
    renderProducts();


    productsContainer.addEventListener('click', (event) => {
        const target = event.target;
        const operation = target.dataset.operation;
        const productId = target.dataset.id;

        const inputElement = document.getElementById(`${productId}`);
        const productQuantity = document.getElementById(`productQuantity-${productId}`);
        
        if (operation === 'remove') {    
            //remove product from the cart and revert the quantity available.
            const product = products.find(product => product.id === parseInt(productId));
            products.splice(products.indexOf(product), 1);

            const cartItem = cart.find(item => item.id === parseInt(productId));
            cart.splice(cart.indexOf(cartItem), 1);

            renderProducts();
        } else if (operation === 'increment') {
            // add the product to the cart if not there if already there add quantity 
            // and update the product quantity
            products.forEach(product => {
                if(product.id === parseInt(productId) && product.quantityAvailable > 0) {
                    product.quantityAvailable--;
                    productQuantity.innerHTML = `Quantity Available: ${product.quantityAvailable}`
                }
            });

            let quantity;
            cart.forEach(item => {
                if(item.id === parseInt(productId)) {
                    if(item.quantity > 0) {
                        item.quantity++;
                        quantity = item.quantity;
                    } else {
                        cart.splice(cart.indexOf(item), 1);
                        quantity = 0;
                    }
                }
            });
            inputElement.value = quantity;
        } else if (operation === 'decrement') {
            // Remove the product to the cart if only one quantity is there else decrement the quantity in the cart 
            // and add quantity and update the roduct quantity
            products.forEach(product => {
                if(product.id === parseInt(productId)) {
                    product.quantityAvailable++;
                    productQuantity.innerHTML = `Quantity Available: ${product.quantityAvailable}`
                }
            });   
            
            let quantity;
            cart.forEach(item => {
                if(item.id === parseInt(productId)) {
                    if(item.quantity > 0) {
                        item.quantity--;
                        quantity = item.quantity;
                    } else {
                        cart.splice(cart.indexOf(item), 1);
                        quantity = 0;
                    }
                }
            });
            inputElement.value = quantity;         
        }    
    });
});