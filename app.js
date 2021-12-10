// === API URL ===
const url = "https://fakestoreapi.com/products";

// === DOM VARIABLES ===
const searchInput = document.querySelector(".header__search-input > input");
const categoriesWrapper = document.querySelector(".header__categories");
const productsWrapper = document.querySelector(".products__wrapper");

// === APP VARIABLES ===
let products = [];
let categories = ["all"];
let filterValue;
let filteredProducts;

// === FUNCTIONS ===

//  == GET PRODUCTS FUNCTION ==
const getProducts = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    products = [...data];
    products.shift();

    showDataInDom();
};

getProducts(url);
// == GET CATEGORIES FUNCTION ==
const getCategories = () => {
    products.forEach((product) => {
        if (!categories.includes(product.category))
            categories.push(product.category);
    });
};

// == CREATE CART FUNCTION ==
const createCart = (product) => {
    // CART
    const productCart = document.createElement("div");
    productCart.classList.add("products__cart");

    // CART IMAGE SECTION
    const productCartImageWrapper = document.createElement("div");
    productCartImageWrapper.classList.add("products__cart-image");

    // CART IMAGE ELEMENT
    const productCartImage = document.createElement("img");
    productCartImage.src = product.image;
    productCartImage.alt = product.title;
    productCartImageWrapper.appendChild(productCartImage);

    // CART CONTENT SECTION
    const productCartContent = document.createElement("div");
    productCartContent.classList.add("products__cart-content");

    // CART TITLE ELEMENT
    const productCartTitle = document.createElement("h3");
    productCartTitle.classList.add("products__cart-title");
    productCartTitle.innerText = product.title;
    productCartContent.appendChild(productCartTitle);

    // CART PRICE ELEMENT
    const productCartPrice = document.createElement("p");
    productCartPrice.classList.add("products__cart-price");
    productCartPrice.innerText = `\$${product.price}`;
    productCartContent.appendChild(productCartPrice);

    // CART BUTTON ELEMENT
    const productCartButton = document.createElement("button");
    productCartButton.className = "products__cart-button btn btn-primary";
    productCartButton.innerText = "Add to cart";
    productCartContent.appendChild(productCartButton);

    // ADD CART IMAGE AND CART SECTION TO CART
    productCart.appendChild(productCartImageWrapper);
    productCart.appendChild(productCartContent);

    // ADD CART TO PRODUCT WRAPPER
    productsWrapper.appendChild(productCart);
};

// == CREATE CATEGORY FUNCTION ==
const createCategory = (category) => {
    // CREATE CATEGORY BUTTON
    const categoryButton = document.createElement("button");
    categoryButton.className = "products__category-button btn btn-primary";
    categoryButton.innerText = category;

    // ADD CATEGORY BUTTON TO CATEGORY WRAPPER
    categoriesWrapper.appendChild(categoryButton);
};

// == FILTER PRODUCTS FUNCTION
const filterProducts = () => {
    // GET CATEGORY BUTTONS
    const categoryButtons = document.querySelectorAll(
        ".products__category-button",
    );

    categoryButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            filterValue = button.innerText;

            // CHECK FILTER VALUE AND PUSH ITEMS TO FILTERED PRODUCTS ARRAY
            if (filterValue === "all") {
                filteredProducts = [...products];
            } else {
                filteredProducts = products.filter(
                    (product) =>
                        product.category.toLowerCase() ===
                        filterValue.toLowerCase(),
                );
            }

            // CLEAR PRODUCTS WRAPPER
            while (productsWrapper.lastElementChild) {
                productsWrapper.lastElementChild.remove();
            }

            // ADD FILTERED PRODUCTS TO PRODUCT WRAPPER
            filteredProducts.forEach((product) => {
                createCart(product);
            });
        });
    });
};

// SEARCH IN PRODUCTS FUNCTION
const searchInProducts = () => {
    searchInput.addEventListener("input", (e) => {
        filterValue = e.target.value;

        if (filterValue == "") {
            filteredProducts = [...products];
        } else {
            filteredProducts = products.filter((product) =>
                product.title.toLowerCase().includes(filterValue.toLowerCase()),
            );
            console.log(filteredProducts);
        }

        // CLEAR PRODUCTS WRAPPER
        while (productsWrapper.lastElementChild) {
            productsWrapper.lastElementChild.remove();
        }

        // ADD FILTERED PRODUCTS TO PRODUCT WRAPPER
        filteredProducts.forEach((product) => {
            createCart(product);
        });
    });
};

//  === ADD CARTS AND CATEGORIES TO DOM ===
const showDataInDom = () => {
    products.forEach((product) => {
        createCart(product);
    });

    getCategories();
    categories.forEach((category) => {
        createCategory(category);
    });

    // CALL FILTER FUNCTION
    filterProducts();

    // CALL SEARCH IN PRODUCTS
    searchInProducts();
};
