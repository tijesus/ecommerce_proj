document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalItemsElement = document.getElementById('total-items');
    const totalPriceElement = document.getElementById('total-price');

    // Function to update the cart summary
    function updateCartSummary() {
        const cartItems = cartItemsContainer.querySelectorAll('.cart-item');
        let totalItems = 0;
        let totalPrice = 0;

        cartItems.forEach(cartItem => {
            const quantityInput = cartItem.querySelector('.quantity-input');
            const price = parseFloat(cartItem.querySelector('.cart-item-details p').textContent.replace('Price: $', ''));
            const quantity = parseInt(quantityInput.value);

            totalItems += quantity;
            totalPrice += price * quantity;
        });

        totalItemsElement.textContent = totalItems;
        totalPriceElement.textContent = totalPrice.toFixed(2);
    }

    // Add event listeners for quantity change buttons
    cartItemsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('increase-btn') || e.target.classList.contains('decrease-btn')) {
            const cartItem = e.target.closest('.cart-item');
            const quantityInput = cartItem.querySelector('.quantity-input');
            let quantity = parseInt(quantityInput.value);

            if (e.target.classList.contains('increase-btn')) {
                quantity += 1;
            } else if (e.target.classList.contains('decrease-btn') && quantity > 1) {
                quantity -= 1;
            }

            quantityInput.value = quantity;
            updateCartSummary();
        }
    });

    // Add event listener for removing cart items
    cartItemsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-btn')) {
            const cartItem = e.target.closest('.cart-item');
            cartItem.remove();
            updateCartSummary();
        }
    });

    // Initial cart summary update
    updateCartSummary();
});
