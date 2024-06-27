// scripts.js

document.addEventListener('DOMContentLoaded', () => {
    // Form validation for Create Account page
    const createAccountForm = document.getElementById('create-account-form');

    if (createAccountForm) {
        createAccountForm.addEventListener('submit', (e) => {
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

            // Validate email
            const email = document.getElementById('email');
            const emailError = document.getElementById('email-error');
            if (email.value.trim() === '') {
                emailError.textContent = 'Email must be filled and cannot be empty.';
                emailError.style.display = 'block';
                valid = false;
            } else {
                emailError.style.display = 'none';
            }

            // Validate password
            const password = document.getElementById('password');
            const passwordError = document.getElementById('password-error');
            if (password.value.trim() === '') {
                passwordError.textContent = 'Password must be filled and cannot be empty.';
                passwordError.style.display = 'block';
                valid = false;
            } else {
                passwordError.style.display = 'none';
            }

            // Validate confirm password
            const confirmPassword = document.getElementById('confirm-password');
            const confirmPasswordError = document.getElementById('confirm-password-error');
            if (confirmPassword.value.trim() === '') {
                confirmPasswordError.textContent = 'Confirm password must be filled and cannot be empty.';
                confirmPasswordError.style.display = 'block';
                valid = false;
            } else if (confirmPassword.value !== password.value) {
                confirmPasswordError.textContent = 'Passwords do not match.';
                confirmPasswordError.style.display = 'block';
                valid = false;
            } else {
                confirmPasswordError.style.display = 'none';
            }

            // Validate phone number
            const phone = document.getElementById('phone');
            const phoneError = document.getElementById('phone-error');
            const phonePattern = /^[0-9]{10}$/;
            if (phone.value.trim() === '') {
                phoneError.textContent = 'Phone number must be filled and cannot be empty.';
                phoneError.style.display = 'block';
                valid = false;
            } else if (!phonePattern.test(phone.value)) {
                phoneError.textContent = 'Phone number must be exactly 10 digits.';
                phoneError.style.display = 'block';
                valid = false;
            } else {
                phoneError.style.display = 'none';
            }

            if (!valid) {
                e.preventDefault(); // Prevent form submission if invalid
            }
        });
    }
});
