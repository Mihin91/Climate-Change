document.addEventListener('DOMContentLoaded', function () {
    const shippingInfoContainer = document.getElementById('shipping-info');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const subtotalElement = document.getElementById('subtotal');
    const shippingElement = document.getElementById('shipping');
    const taxesElement = document.getElementById('taxes');
    const totalElement = document.getElementById('total');
    const payButton = document.getElementById('pay-button');
    const paymentFields = document.querySelectorAll('.payment-form input');
    const backButton = document.getElementById('back-button');
    const modal = document.getElementById("custom-alert-modal");
    const closeButton = document.querySelector(".close-button");

    // Retrieve cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateSummary() {
        if (!cart || cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
            cartCount.textContent = '0';
            subtotalElement.textContent = '$0.00';
            shippingElement.textContent = 'FREE';
            taxesElement.textContent = '$0.00';
            totalElement.textContent = '$0.00';
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
            itemPrice.textContent = `CAD $${item.price.toFixed(2)}`;

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

        const selectedDeliveryMethod = localStorage.getItem('deliveryMethod'); // Retrieve delivery method from localStorage

        if (selectedDeliveryMethod === 'express') {
            shipping = 40; // Express delivery fee
        }

        taxes = subtotal * 0.13; // Example tax calculation (13%)
        total = subtotal + shipping + taxes;

        cartCount.textContent = cart.length;
        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        shippingElement.textContent = shipping > 0 ? `$${shipping.toFixed(2)}` : 'FREE';
        taxesElement.textContent = `$${taxes.toFixed(2)}`;
        totalElement.textContent = `$${total.toFixed(2)}`;
    }

    // Initial update
    updateSummary();

    // Function to format card number with spaces
    function formatCardNumber(value) {
        return value.replace(/\s+/g, '').replace(/(.{4})/g, '$1 ').trim();
    }

    // Function to validate payment fields
    function validatePaymentFields() {
        const cardNumber = document.getElementById('num').value.replace(/\s+/g, ''); // Remove spaces for validation
        const expiryDate = document.getElementById('date').value;
        const cvv = document.getElementById('pass').value;
        const cardHolderName = document.getElementById('name').value;

        let valid = true;

        // Card Number validation (adjust to 12 digits with spaces if needed)
        const cardNumberPattern = /^\d{16}$/; // Check for 12 digits without spaces
        if (!cardNumberPattern.test(cardNumber)) {
            valid = false;
            document.getElementById('num').setCustomValidity('Card number must be exactly 12 digits.');
        } else {
            document.getElementById('num').setCustomValidity('');
        }

        // Expiry Date validation
        const expiryDatePattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
        if (!expiryDatePattern.test(expiryDate)) {
            valid = false;
            document.getElementById('date').setCustomValidity('Expiry date must be in MM/YY format.');
        } else {
            document.getElementById('date').setCustomValidity('');
        }

        // CVV validation
        const cvvPattern = /^\d{3}$/;
        if (!cvvPattern.test(cvv)) {
            valid = false;
            document.getElementById('pass').setCustomValidity('CVV must be a 3-digit number.');
        } else {
            document.getElementById('pass').setCustomValidity('');
        }

        // Card Holder Name validation
        if (cardHolderName.trim() === '' || /[^a-zA-Z\s]/.test(cardHolderName)) {
            valid = false;
            document.getElementById('name').setCustomValidity('Card Holder Name must not be empty and can only contain letters and spaces.');
        } else {
            document.getElementById('name').setCustomValidity('');
        }

        // Enable or disable the pay button based on validation
        payButton.disabled = !valid;
    }

    // Format card number on input
    document.getElementById('num').addEventListener('input', function (event) {
        const formattedValue = formatCardNumber(event.target.value);
        event.target.value = formattedValue;
        validatePaymentFields();
    });

    // Add event listeners to payment fields to validate them on input
    paymentFields.forEach(field => {
        field.addEventListener('input', validatePaymentFields);
    });

    // Back button functionality to navigate to checkout page
    if (backButton) {
        backButton.addEventListener('click', function () {
            window.location.href = 'checkout.html'; // Replace with the correct URL to your checkout page
        });
    }

    // Pay button functionality with custom alert
    if (payButton) {
        payButton.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent form submission

            // Validate fields before proceeding
            validatePaymentFields();

            if (payButton.disabled) {
                alert('Please fill out all payment fields correctly.');
                return; // Stop further execution
            }

            // Show custom alert
            modal.style.display = "block";
        });
    }

    // Close the modal when the user clicks on <span> (x) or OK button
    if (closeButton) {
        closeButton.addEventListener('click', function () {
            modal.style.display = "none";
        });
    }

    // Close the modal when the user clicks anywhere outside of the modal
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // Function to retrieve and display shipping information
    function displayShippingInfo() {
        const shippingInfo = JSON.parse(localStorage.getItem('shippingInfo')) || {};
   
        let infoHtml = `<p><strong>Shipping Address:</strong></p>`;
        for (const key in shippingInfo) {
            if (key !== 'address-line-2' && key !== 'address-line-3') {
                const value = shippingInfo[key] || 'N/A';
                infoHtml += `<p><strong>${key.replace(/-/g, ' ')}:</strong> ${value}</p>`;
            }
        }

        shippingInfoContainer.innerHTML = infoHtml;
    }

    // Call displayShippingInfo on page load
    displayShippingInfo();

    // Redirect to the shop page when the Done button is clicked
    const doneButton = document.getElementById('okButton');
    if (doneButton) {
        doneButton.addEventListener('click', function () {
            window.location.href = 'shop.html'; // Replace with the correct URL to your shop page
        });
    }

    // Reset cart and shipping info on page unload
    window.addEventListener('beforeunload', function () {
        localStorage.removeItem('cart'); // Clear cart
        localStorage.removeItem('shippingInfo'); // Clear shipping info
        localStorage.removeItem('deliveryMethod'); // Clear delivery method
        updateSummary(); // Reset summary section
    });
});
