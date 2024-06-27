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
                <button class="increase-quantity" data-id="${item.id}">+</button>
                <button class="decrease-quantity" data-id="${item.id}">-</button>
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

    // Handle quantity changes
    const updateQuantity = (id, delta) => {
        const item = cart.find(item => item.id === id);
        if (item) {
            item.quantity += delta;
            if (item.quantity <= 0) {
                cart = cart.filter(item => item.id !== id);
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            location.reload(); // Reload the page to reflect changes
        }
    };

    document.querySelectorAll('.increase-quantity').forEach(button => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id');
            updateQuantity(id, 1);
        });
    });

    document.querySelectorAll('.decrease-quantity').forEach(button => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id');
            updateQuantity(id, -1);
        });
    });

    // Form validation for Checkout page
    const checkoutForm = document.getElementById('checkout-form');

    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let valid = true;

            // Validate first name
            const firstName = document.getElementById('first-name');
            const firstNameError = document.getElementById('first-name-error');
            if (firstName.value.trim() === '') {
                firstNameError.textContent = 'First name must be filled and cannot be empty.';
                firstNameError.style.display = 'block';
                valid = false;
            } else {
                firstNameError.style.display = 'none';
            }

            // Validate last name
            const lastName = document.getElementById('last-name');
            const lastNameError = document.getElementById('last-name-error');
            if (lastName.value.trim() === '') {
                lastNameError.textContent = 'Last name must be filled and cannot be empty.';
                lastNameError.style.display = 'block';
                valid = false;
            } else {
                lastNameError.style.display = 'none';
            }

            // Validate address
            const address = document.getElementById('address');
            const addressError = document.getElementById('address-error');
            if (address.value.trim() === '') {
                addressError.textContent = 'Address must be filled and cannot be empty.';
                addressError.style.display = 'block';
                valid = false;
            } else {
                addressError.style.display = 'none';
            }

            // Validate city
            const city = document.getElementById('city');
            const cityError = document.getElementById('city-error');
            if (city.value.trim() === '') {
                cityError.textContent = 'City must be filled and cannot be empty.';
                cityError.style.display = 'block';
                valid = false;
            } else {
                cityError.style.display = 'none';
            }

            // Validate state
            const state = document.getElementById('state');
            const stateError = document.getElementById('state-error');
            if (state.value.trim() === '') {
                stateError.textContent = 'State must be filled and cannot be empty.';
                stateError.style.display = 'block';
                valid = false;
            } else {
                stateError.style.display = 'none';
            }

            // Validate zip code
            const zip = document.getElementById('zip');
            const zipError = document.getElementById('zip-error');
            if (zip.value.trim() === '' || !/^\d{5}$/.test(zip.value)) {
                zipError.textContent = 'Zip code must be 5 digits.';
                zipError.style.display = 'block';
                valid = false;
            } else {
                zipError.style.display = 'none';
            }

            // Validate email
            const email = document.getElementById('email');
            const emailError = document.getElementById('email-error');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email.value.trim() === '' || !emailRegex.test(email.value)) {
                emailError.textContent = 'Please enter a valid email address.';
                emailError.style.display = 'block';
                valid = false;
            } else {
                emailError.style.display = 'none';
            }

            // Validate phone
            const phone = document.getElementById('phone');
            const phoneError = document.getElementById('phone-error');
            if (phone.value.trim() === '' || !/^\d{10}$/.test(phone.value)) {
                phoneError.textContent = 'Phone number must be 10 digits.';
                phoneError.style.display = 'block';
                valid = false;
            } else {
                phoneError.style.display = 'none';
            }

            if (valid) {
                alert('Checkout successful! Proceeding to payment.');
                window.location.href = 'payment.html'; // Redirect to payment page
            }
        });
    }
});
