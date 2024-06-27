document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalItemsElement = document.getElementById('total-items');
    const totalPriceElement = document.getElementById('total-price');

    // Load cart items from localStorage
    let cart = localStorage.getItem('cart');
    if (cart) {
        cart = JSON.parse(cart);
    } else {
        cart = [];
    }

    // Display cart items
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>Price: $${item.price.toFixed(2)}</p>
                <p>Quantity: ${item.quantity}</p>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    // Update cart summary
    const updateCartSummary = () => {
        let totalItems = 0;
        let totalPrice = 0;

        cart.forEach(item => {
            totalItems += item.quantity;
            totalPrice += item.price * item.quantity;
        });

        totalItemsElement.textContent = totalItems;
        totalPriceElement.textContent = totalPrice.toFixed(2);
    };
    
    updateCartSummary();

    // Form validation for Payment page
    const paymentForm = document.getElementById('payment-form');

    if (paymentForm) {
        paymentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let valid = true;

            // Validate cardholder name
            const cardName = document.getElementById('card-name');
            const cardNameError = document.getElementById('card-name-error');
            if (cardName.value.trim() === '') {
                cardNameError.textContent = 'Cardholder name must be filled and cannot be empty.';
                cardNameError.style.display = 'block';
                valid = false;
            } else {
                cardNameError.style.display = 'none';
            }

            // Validate card number
            const cardNumber = document.getElementById('card-number');
            const cardNumberError = document.getElementById('card-number-error');
            if (cardNumber.value.trim() === '' || !/^\d{16}$/.test(cardNumber.value)) {
                cardNumberError.textContent = 'Card number must be 16 digits.';
                cardNumberError.style.display = 'block';
                valid = false;
            } else {
                cardNumberError.style.display = 'none';
            }

            // Validate expiry date
            const expiryDate = document.getElementById('expiry-date');
            const expiryDateError = document.getElementById('expiry-date-error');
            if (expiryDate.value.trim() === '' || !/^\d{2}\/\d{2}$/.test(expiryDate.value)) {
                expiryDateError.textContent = 'Expiry date must be in MM/YY format.';
                expiryDateError.style.display = 'block';
                valid = false;
            } else {
                expiryDateError.style.display = 'none';
            }

            // Validate CVV
            const cvv = document.getElementById('cvv');
            const cvvError = document.getElementById('cvv-error');
            if (cvv.value.trim() === '' || !/^\d{3}$/.test(cvv.value)) {
                cvvError.textContent = 'CVV must be 3 digits.';
                cvvError.style.display = 'block';
                valid = false;
            } else {
                cvvError.style.display = 'none';
            }

            if (valid) {
                alert('Payment successful! Thank you for your purchase.');
                localStorage.removeItem('cart'); // Clear the cart after successful payment
                window.location.href = 'index.html'; // Redirect to home page
            }
        });
    }
});
