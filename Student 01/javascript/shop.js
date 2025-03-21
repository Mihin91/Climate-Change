document.addEventListener('DOMContentLoaded', () => {
    const cart = document.getElementById('cart');
    const sidecart = document.getElementById('sidecart');
    const closeCartButton = document.getElementById('closecart');
    const overlay = document.querySelector('.overlay');
    const cartItemsContainer = document.getElementById('cart-items');
    const totalAmount = document.getElementById('total-amount');
    const clearCartButton = document.getElementById('clear-cart');
    let cartCount = 0;
    let cartTotal = 0;
    let cartData = [];

    function initializeCart() {
        localStorage.removeItem('cart');
        cartData = [];
        cartCount = 0;
        cartTotal = 0;
        updateCart();
    }

    function updateCartCount() {
        document.querySelector('.count').innerText = cartCount;
    }

    function updateTotalAmount() {
        totalAmount.innerText = `$${cartTotal.toFixed(2)}`;
    }

    function addToCart(product) {
        const id = product.getAttribute('data-id');
        const title = product.querySelector('.title').innerText;
        const price = parseFloat(product.querySelector('.price').innerText.replace('$', ''));
        const quantity = parseInt(product.querySelector('select').value);

        let cartItem = cartData.find(item => item.id === id);

        if (cartItem) {
            cartItem.quantity += quantity;
        } else {
            cartItem = { id, title, price, quantity, imageSrc: product.querySelector('img').src };
            cartData.push(cartItem);
        }

        cartCount += quantity;
        cartTotal += price * quantity;
        localStorage.setItem('cart', JSON.stringify(cartData));
        updateCart();
    }

    function updateCart() {
        cartItemsContainer.innerHTML = '';
        cartCount = 0;
        cartTotal = 0;

        const fragment = document.createDocumentFragment();

        cartData.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('basket-item');
            cartItem.setAttribute('data-id', item.id);
            cartItem.innerHTML = `
                <img src="${item.imageSrc}" alt="${item.title}">
                <div class="item-details">
                    <div class="item-title">${item.title}</div>
                    <div class="item-price">$${item.price.toFixed(2)}</div>
                    <div class="item-quantity">
                        <span>Quantity: <span class="quantity">${item.quantity}</span></span>
                        <div class="quantity-buttons">
                            <button class="increase-quantity"><i class="fa fa-plus"></i></button>
                            <button class="decrease-quantity"><i class="fa fa-minus"></i></button>
                            <button class="delete-item"><i class="fa fa-trash"></i></button>
                        </div>
                    </div>
                </div>
            `;

            fragment.appendChild(cartItem);

            cartItem.querySelector('.delete-item').addEventListener('click', () => {
                removeFromCart(item);
            });

            cartItem.querySelector('.increase-quantity').addEventListener('click', () => {
                item.quantity++;
                cartCount++;
                cartTotal += item.price;
                localStorage.setItem('cart', JSON.stringify(cartData));
                updateCart();
            });

            cartItem.querySelector('.decrease-quantity').addEventListener('click', () => {
                if (item.quantity > 1) {
                    item.quantity--;
                    cartCount--;
                    cartTotal -= item.price;
                    localStorage.setItem('cart', JSON.stringify(cartData));
                    updateCart();
                }
            });

            cartItem.querySelector('.delete-item').addEventListener('click', () => {
                removeFromCart(item);
            });

            cartCount += item.quantity;
            cartTotal += item.price * item.quantity;
        });

        cartItemsContainer.appendChild(fragment);
        updateCartCount();
        updateTotalAmount();
    }

    function removeFromCart(item) {
        cartData = cartData.filter(cartItem => cartItem.id !== item.id);
        cartCount -= item.quantity;
        cartTotal -= item.price * item.quantity;
        localStorage.setItem('cart', JSON.stringify(cartData));
        updateCart();
    }

    function clearCart() {
        cartData = [];
        cartCount = 0;
        cartTotal = 0;
        localStorage.setItem('cart', JSON.stringify(cartData));
        updateCart();
    }

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const product = button.closest('.product');
            addToCart(product);
        });
    });

    clearCartButton.addEventListener('click', clearCart);

    function openSidecart() {
        sidecart.classList.add('open');
        overlay.classList.add('visible');
        cart.style.right = sidecart.offsetWidth + 'px';
    }

    function closeSidecart() {
        sidecart.classList.remove('open');
        overlay.classList.remove('visible');
        cart.style.right = '20px';
    }
    

    cart.addEventListener('click', openSidecart);
    closeCartButton.addEventListener('click', closeSidecart);
    overlay.addEventListener('click', closeSidecart);

    window.addEventListener('resize', () => {
        if (sidecart.classList.contains('open')) {
            cart.style.right = sidecart.offsetWidth + 'px';
        }
    });

    document.getElementById('search-button').addEventListener('click', function() {
        const category = document.getElementById('category-input').value.toLowerCase().trim();
        const products = document.querySelectorAll('.product');
    
        products.forEach(product => {
            const productCategory = product.getAttribute('data-category') ? product.getAttribute('data-category').toLowerCase() : '';
    
            if (category === '' || productCategory.includes(category)) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    });
    

    document.getElementById('reset-button').addEventListener('click', function() {
        const products = document.querySelectorAll('.product');
        products.forEach(product => {
            product.style.display = 'block';
        });
        document.getElementById('category-input').value = '';
    });

    initializeCart(); // Reset the cart when the page loads
    updateCart();
});
