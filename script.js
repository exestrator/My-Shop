const products = [
    { id: 1, title: "mini points", price: 0.01, category: "currency" },
    { id: 2, title: "mini Beans", price: 1, category: "currency" },
    { id: 3, title: "mini Coins", price: 10, category: "currency" },

    { id: 4, title: "minigun: phantom", price: 150, category: "skins" },
    { id: 5, title: "minigun: dragon", price: 100, category: "skins" },
    { id: 6, title: "minigun: gold", price: 100, category: "skins" },

    { id: 7, title: "pistol: star crasher", price: 120, category: "skins" },
    { id: 8, title: "pistol: neon rider", price: 80, category: "skins" },
    { id: 9, title: "pistol: classic", price: 50, category: "skins" },

    { id: 10, title: "rifle: thunder", price: 180, category: "skins" },
    { id: 11, title: "rifle: shadow", price: 130, category: "skins" },
    { id: 12, title: "rifle: blaze", price: 90, category: "skins" },

    { id: 13, title: "sniper: eagle eye", price: 200, category: "skins" },
    { id: 14, title: "sniper: ghost", price: 160, category: "skins" },
    { id: 15, title: "sniper: frost", price: 110, category: "skins" }
];

let cart = [];

const cartInfo = document.getElementById("cart-info");
const productContainer = document.getElementById("product-container");
const clearCartBtn = document.getElementById("clear-cart-btn");
const minPriceInput = document.getElementById("min-price-input");
const resultsInfo = document.getElementById("results-info");
const searchInput = document.getElementById("search-input");
const categorySelect = document.getElementById("category-select");

// загрузка корзины
function loadCart() {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
    updateCartInfo();
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartInfo() {
    cartInfo.textContent = "Products in cart: " + cart.length;
}

// рендер товаров
function renderProducts() {
    productContainer.innerHTML = "";

    let filteredProducts = products;

    const searchText = searchInput.value.toLowerCase();
    const selectedCategory = categorySelect.value;
    const minPrice = minPriceInput.value;

    if (searchText !== "") {
        filteredProducts = filteredProducts.filter(product =>
            product.title.toLowerCase().includes(searchText)
        );
    }

    if (selectedCategory !== "") {
        filteredProducts = filteredProducts.filter(product =>
            product.category === selectedCategory
        );
    }

    if (minPrice !== "") {
        filteredProducts = filteredProducts.filter(product =>
            product.price >= minPrice
        );
    }

    resultsInfo.textContent =
        filteredProducts.length > 0
            ? "Found products: " + filteredProducts.length
            : "No products found for your request.";

    filteredProducts.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";

        const title = document.createElement("h3");
        title.textContent = product.title;

        const price = document.createElement("p");
        price.textContent = "Price: " + product.price + " $";

        const button = document.createElement("button");
        button.textContent = "Add to cart";

        button.addEventListener("click", () => {
            cart.push(product);
            saveCart();
            updateCartInfo();
        });

        card.append(title, price, button);
        productContainer.appendChild(card);
    });
}

// события
searchInput.addEventListener("input", renderProducts);
categorySelect.addEventListener("change", renderProducts);
minPriceInput.addEventListener("input", renderProducts);

clearCartBtn.addEventListener("click", () => {
    cart = [];
    saveCart();
    updateCartInfo();
});

loadCart();
renderProducts();
