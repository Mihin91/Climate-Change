function validateForm() {
    let isValid = true; // Initialize the validation status as true

    // Define patterns for validation
    const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/; // Email regex pattern
    const phonePattern = /^\d{10}$/; // Phone number regex pattern

    // Select fields by type, name, or class
    const textFields = document.querySelectorAll('.shipping-form input[type="text"], .shipping-form input[type="email"], .shipping-form input[type="tel"], .shipping-form select, .shipping-form textarea');

    textFields.forEach(field => {
        if (field.name === 'address-line-1' && !field.value.trim()) { // Check if address line 1 is empty
            field.classList.add('error'); // Add error class
            field.style.border = '2px solid red'; // Set border color to red
            isValid = false; // Set validation status to false
        } else if (field.name === 'address-line-2' || field.name === 'address-line-3') { // Check if address lines 2 or 3 are empty
            // No validation needed for address line 2 and 3
            field.classList.remove('error'); // Ensure no error class is applied
            field.style.border = ''; // Reset border color
        } else if (!field.value.trim()) { // If the field value is empty or whitespace
            field.classList.add('error'); // Add error class
            field.style.border = '2px solid red'; // Set border color to red
            isValid = false; // Set validation status to false
        } else {
            if (field.type === 'email' && !emailPattern.test(field.value)) { // Validate email field
                field.classList.add('error'); // Add error class
                field.style.border = '2px solid red'; // Set border color to red
                isValid = false; // Set validation status to false
            } else if (field.type === 'tel' && !phonePattern.test(field.value.replace(/[^0-9]/g, ''))) { // Validate phone field
                field.classList.add('error'); // Add error class
                field.style.border = '2px solid red'; // Set border color to red
                isValid = false; // Set validation status to false
            } else {
                field.classList.remove('error'); // Remove error class
                field.style.border = ''; // Reset border color
            }
        }
    });

    // Save the form data to localStorage if the form is valid
    if (isValid) {
        const formData = {};
        textFields.forEach(field => {
            if (field.name) {
                formData[field.name] = field.value;
            }
        });
        localStorage.setItem('shippingInfo', JSON.stringify(formData));
    }

    return isValid; // Return the validation status
}

// Function to add input event listeners for real-time validation
function addInputEventListeners() {
    // Define patterns for validation
    const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/; // Email regex pattern
    const phonePattern = /^\d{10}$/; // Phone number regex pattern

    // Select fields by type, name, or class
    const textFields = document.querySelectorAll('.shipping-form input[type="text"], .shipping-form input[type="email"], .shipping-form input[type="tel"], .shipping-form select, .shipping-form textarea');
    
    textFields.forEach(field => {
        field.addEventListener('input', () => {
            if (field.type === 'email' && !emailPattern.test(field.value)) { // Validate email field
                field.classList.add('error'); // Add error class
                field.style.border = '2px solid red'; // Set border color to red
            } else if (field.type === 'tel' && !phonePattern.test(field.value.replace(/[^0-9]/g, ''))) { // Validate phone field
                field.classList.add('error'); // Add error class
                field.style.border = '2px solid red'; // Set border color to red
            } else if (field.name === 'address-line-2' || field.name === 'address-line-3') { // Address lines 2 and 3 are optional
                field.classList.remove('error'); // Ensure no error class is applied
                field.style.border = ''; // Reset border color
            } else if (!field.value.trim()) { // Check if the field is empty
                field.classList.add('error'); // Add error class
                field.style.border = '2px solid red'; // Set border color to red
            } else {
                field.classList.remove('error'); // Remove error class
                field.style.border = ''; // Reset border color
            }
        });
    });
}    

// DOMContentLoaded event to ensure the script runs after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const subtotalElement = document.getElementById('subtotal');
    const shippingElement = document.getElementById('shipping');
    const taxesElement = document.getElementById('taxes');
    const totalElement = document.getElementById('total');
    const payButton = document.getElementById('pay-button');
    const backButton = document.querySelector('.back-button');
    const continueButton = document.querySelector('.continue-button'); // Ensure this is defined
    const clearButton = document.querySelector('.clear-button');

    // Retrieve cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Function to update summary
    function updateSummary() {
        if (!cart || cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
            cartCount.textContent = '0';
            subtotalElement.textContent = '$ 0.00';
            shippingElement.textContent = 'FREE';
            taxesElement.textContent = '$ 0.00';
            totalElement.textContent = '$ 0.00';
            continueButton.disabled = true; // Disable continue button if the cart is empty
            return;
        }

        let subtotal = 0;
        let shipping = 0;
        let taxes = 0;
        let total = 0;

        cartItemsContainer.innerHTML = '';

        cart.forEach(item => {
            // Create cart item element
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');

            // Add product image
            const itemImage = document.createElement('img');
            itemImage.src = item.imageSrc;
            itemImage.alt = item.title;
            itemImage.classList.add('cart-item-image');

            const itemDetails = document.createElement('div');
            itemDetails.classList.add('item-details');

            const itemName = document.createElement('p');
            itemName.textContent = item.title;

            const itemPrice = document.createElement('p');
            itemPrice.classList.add('item-price');
            itemPrice.textContent = `CAD ${item.price.toFixed(2)}`;

            const itemQuantity = document.createElement('p');
            itemQuantity.classList.add('item-quantity');
            itemQuantity.innerHTML = `
                Quantity: <span class="quantity">${item.quantity}</span>
                <button class="increase-quantity">+</button>
                <button class="decrease-quantity">-</button>
                <button class="delete-item">Delete</button>`;

            itemDetails.appendChild(itemName);
            itemDetails.appendChild(itemPrice);
            itemDetails.appendChild(itemQuantity);
            cartItem.appendChild(itemImage);
            cartItem.appendChild(itemDetails);

            cartItemsContainer.appendChild(cartItem);

            // Update summary
            subtotal += item.price * item.quantity;

            // Add event listeners for quantity buttons and delete button
            cartItem.querySelector('.increase-quantity').addEventListener('click', () => {
                item.quantity++;
                localStorage.setItem('cart', JSON.stringify(cart));
                updateSummary();
            });

            cartItem.querySelector('.decrease-quantity').addEventListener('click', () => {
                if (item.quantity > 1) {
                    item.quantity--;
                    localStorage.setItem('cart', JSON.stringify(cart));
                    updateSummary();
                }
            });

            cartItem.querySelector('.delete-item').addEventListener('click', () => {
                cart = cart.filter(cartItem => cartItem.id !== item.id);
                localStorage.setItem('cart', JSON.stringify(cart));
                updateSummary();
            });
        });

        taxes = subtotal * 0.13; // Example tax calculation (13%)
        total = subtotal + shipping + taxes;

        cartCount.textContent = cart.length;
        subtotalElement.textContent = `$ ${subtotal.toFixed(2)}`;
        shippingElement.textContent = shipping > 0 ? `$ ${shipping.toFixed(2)}` : 'FREE';
        taxesElement.textContent = `$ ${taxes.toFixed(2)}`;
        totalElement.textContent = `$ ${total.toFixed(2)}`;

        continueButton.disabled = cart.length === 0; // Disable or enable button
    }

    // Call updateSummary on page load
    updateSummary();

    // Clear fields button functionality
    if (clearButton) {
        clearButton.addEventListener('click', function () {
            // Clear all input fields, including text, email, tel, and textarea
            document.querySelectorAll('.shipping-form input[type="text"], .shipping-form input[type="email"], .shipping-form input[type="tel"], .shipping-form textarea').forEach(input => {
                input.value = '';
            });

            // Remove error states from all relevant fields
            document.querySelectorAll('.shipping-form input, .shipping-form select, .shipping-form textarea').forEach(field => {
                field.classList.remove('error'); // Remove error class
                field.style.border = ''; // Reset border color
            });
        });
    }

    // Go back to shop button functionality
    if (backButton) {
        backButton.addEventListener('click', function () {
            window.location.href = 'shop.html'; // Redirect to shop page
        });
    }

    if (continueButton) {
        continueButton.addEventListener('click', () => {
            if (validateForm()) { // Validate the form
                window.location.href = 'checkout2.html'; // Redirect to checkout page if valid
            } else {
                alert('Please ensure all fields are correctly filled out.'); // Show alert if not valid
            }
        });
    }

    // Add input event listeners for real-time validation
    addInputEventListeners();
});
