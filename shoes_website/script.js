const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartContainer = document.getElementById('cart-container');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');

let cart = [];

// Apply styles to the parent container
cartContainer.style.display = 'flex';
cartContainer.style.flexDirection = 'column';
cartContainer.style.justifyContent = 'center';
cartContainer.style.alignItems = 'center';

addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    const productName = button.dataset.productName;
    const productPrice = parseFloat(button.dataset.productPrice);
    const productImage = button.dataset.productImage;

    const existingItem = cart.find(item => item.name === productName);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({ name: productName, price: productPrice, image: productImage, quantity: 1 });
    }

    updateCart();
    toggleCart();
  });
});

function updateCart() {
  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        <img src="${item.image}" alt="${item.name}" width="50">
        ${item.name}
      </td>
      <td>${item.quantity}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td>$${(item.price * item.quantity).toFixed(2)}</td>
      <td><button class="remove-from-cart" style="text-decoration: none; padding: 10px 20px; background: linear-gradient(to right, #c72092, #6c14d0); color: white; border: none; border-radius: 5px; cursor: pointer;" onmouseover="this.style.background='linear-gradient(to right, #6c14d0, #c72092)';" onmouseout="this.style.background='linear-gradient(to right, #c72092, #6c14d0)';">Remove</button></td>
    `;
    cartItems.appendChild(row);

    total += item.price * item.quantity;
  });

  cartTotal.textContent = `$${total.toFixed(2)}`;
}

function toggleCart() {
  cartContainer.style.display = cartContainer.style.display === 'none' ? 'block' : 'none';
}

cartItems.addEventListener('click', (event) => {
  if (event.target.classList.contains('remove-from-cart')) {
    const row = event.target.closest('tr');
    const productName = row.firstElementChild.textContent.trim();
    const itemIndex = cart.findIndex(item => item.name === productName);
    cart.splice(itemIndex, 1);
    updateCart();
  }
});
