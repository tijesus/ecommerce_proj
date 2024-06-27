document.addEventListener('DOMContentLoaded', () => {
    const increaseBtn = document.querySelector('.increase-btn');
    const decreaseBtn = document.querySelector('.decrease-btn');
    const quantityInput = document.querySelector('.quantity-input');
    const addToCartBtn = document.querySelector('.add-to-cart-btn');

    // Update quantity input value
    increaseBtn.addEventListener('click', () => {
        quantityInput.value = parseInt(quantityInput.value) + 1;
    });

    decreaseBtn.addEventListener('click', () => {
        if (parseInt(quantityInput.value) > 1) {
            quantityInput.value = parseInt(quantityInput.value) - 1;
        }
    });

    // Add product to cart
    addToCartBtn.addEventListener('click', () => {
        const productName = document.querySelector('.product-name').textContent;
        const productPrice = parseFloat(document.querySelector('.product-price').textContent.replace('$', ''));
        const productQuantity = parseInt(quantityInput.value);
        const productImage = document.querySelector('.product-image').src;

        const cartItem = {
            name: productName,
            price: productPrice,
            quantity: productQuantity,
            image: productImage
        };

        let cart = localStorage.getItem('cart');
        if (cart) {
            cart = JSON.parse(cart);
        } else {
            cart = [];
        }

        const existingItemIndex = cart.findIndex(item => item.name === cartItem.name);
        if (existingItemIndex !== -1) {
            cart[existingItemIndex].quantity += productQuantity;
        } else {
            cart.push(cartItem);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Product added to cart!');
    });
});
