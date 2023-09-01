// class untuk product
class Product {
    constructor(name, price, img) {
        this.name = name;
        this.price = price;
        this.img = img;
    }
}

// class untuk keranjang
class Cart {
    constructor() {
        this.items = [];
        this.checkoutButton = document.getElementById('checkOut');
    }

    // menambahkan produk ke dalam keranjang
    addProduct(product, quantity) {
        const existingItem = this.items.find(item => item.product.name === product.name);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({ product, quantity });
        }
    }

    // menghapus produk dari keranjang
    removeProduct(productName) {
        const indexToRemove = this.items.findIndex(item => item.product.name === productName);

        if (indexToRemove !== -1) {
            this.items.splice(indexToRemove, 1);
        }
    }

    // menghitung total harga keranjang
    getTotalPrice() {
        return this.items.reduce((total, item) => {
            return total + (item.product.price * item.quantity);
        }, 0);
    }

    // mengosongkan keranjang
    clearCart() {
        this.items = [];
    }

    // menampilkan produk pada keranjang
    showCart(){
        const container = document.getElementById('listCart');
        container.innerHTML='';

        const table = document.createElement('table');
        table.innerHTML = `
            <thead>
                <tr>
                    <th>Img</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Qt</th>
                    <th>Subtotal</th>
                    <th></th>
                </tr>
            </thead>
            <tbody></tbody>
        `;

        const tbody = table.querySelector('tbody');

        this.items.forEach(item => {
            const { product, quantity } = item;
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${product.img}" alt="${product.name}" height="40"></td>
                <td>${product.name} Glass</td>
                <td>${formatCurrency(product.price)}</td>
                <td>x${quantity}</td>
                <td>${formatCurrency(product.price * quantity)}</td>
                <td><button class="btn btn-danger btn-sm" onclick="removeFromCart('${product.name}')">Remove</button></td>
            `;
            tbody.appendChild(row);
        });

        const totalPurchase = this.getTotalPrice();
        const taxRate = 0.11;
        const totalPayment = totalPurchase + (totalPurchase * taxRate);

        const totalInfo = document.createElement('div');
        totalInfo.classList.add('total-info');
        totalInfo.classList.add('mt-4');
        totalInfo.innerHTML = `
            <p>Total Purchase: ${formatCurrency(totalPurchase)}</p>
            <p>Tax (11%): ${formatCurrency(totalPurchase * taxRate)}</p>
            <p>Total Payment: ${formatCurrency(totalPayment)}</p>
        `;

        container.appendChild(table);
        container.appendChild(totalInfo);
    }

    // menampilkan struk pembelian
    printInvoice(){
        const modalBody = document.getElementById('invoiceProduct');
        modalBody.innerHTML = '';

        const table = document.createElement('table');
        table.innerHTML = `
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Qt</th>
                    <th>Subtotal</th>
                </tr>
            </thead>
            <tbody></tbody>
        `;

        const tbody = table.querySelector('tbody');

        this.items.forEach(item => {
            const { product, quantity } = item;
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.name} Glass</td>
                <td>${formatCurrency(product.price)}</td>
                <td>${quantity}</td>
                <td>${formatCurrency(product.price * quantity)}</td>
            `;
            tbody.appendChild(row);
        });

        modalBody.appendChild(table);

        const totalPurchase = this.getTotalPrice();
        const taxRate = 0.11;
        const totalPayment = totalPurchase + (totalPurchase * taxRate);

        const totalInfo = document.createElement('div');
        totalInfo.innerHTML = `
            <p class='mt-4 mb-0'>Total Purchase: ${formatCurrency(totalPurchase)}</p>
            <p class='mb-0'>Tax (11%): ${formatCurrency(totalPurchase * taxRate)}</p>
            <p>Total Payment: ${formatCurrency(totalPayment)}</p>
        `;

        modalBody.appendChild(totalInfo);
    }

    // pengatur visibilitas tombol CO
    updateCheckoutButton() {
        if (this.items.length > 0) {
            this.checkoutButton.style.display = 'block'; // ditampilkan
        } else {
            this.checkoutButton.style.display = 'none'; // dihide
        }
    }
}

// data product yang dijual
var dataProduct = [
    {
        "name": "Black",
        "price": 50000,
        "img": "img/black.jpg"
    },
    {
        "name": "Gold",
        "price": 60000,
        "img": "img/gold.jpg"
    },
    {
        "name": "Pink",
        "price": 80000,
        "img": "img/pink.jpg"
    },
    {
        "name": "Rose",
        "price": 100000,
        "img": "img/rose.jpg"
    },
    {
        "name": "Silver",
        "price": 111000,
        "img": "img/silver.jpg"
    },
    {
        "name": "Transparent",
        "price": 125000,
        "img": "img/transparent.jpg"
    }
];

// memasukkan dataProduct ke objek products
const products = dataProduct.map(data => new Product(data.name, data.price, data.img));

// membuat objek keranjang
const cart = new Cart();


// MENAMPILKAN LIST PRODUK YANG DIJUAL
const row = document.getElementById("productList");

products.forEach(productData => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("col-lg-4");
    productDiv.classList.add("col-sm-6");
    productDiv.innerHTML = `
        <div class="card mx-auto">
            <img src="${productData.img}" class="card-img-top" alt="${productData.name} glass">
            <div class="card-body">
                <h6 class="card-title mb-0">${productData.name} Glass</h6>
                <p class="card-text fs-6">${formatCurrency(productData.price)}</p>
                <div class="input-group mb-3 justify-content-center">
                    <button class="btn btn-outline-light" type="button" onclick="minQT('${productData.name}')">-</button>
                    <input type="number" class="form-control" id="${productData.name}" min="0" value="0">
                    <button class="btn btn-outline-light" type="button" onclick="addQT('${productData.name}')">+</button>
                </div>                            
                <div class="d-grid">
                    <button class="btn btn-bd-primary btn-block" data-product='${JSON.stringify(productData)}' onclick="addToCart(this)">add to cart</button>
                </div>
            </div>
        </div>
    `;
    row.appendChild(productDiv);
});

// menampilkan isi struk ketika modal muncul
document.getElementById('staticBackdrop').addEventListener('shown.bs.modal', function () {
    cart.printInvoice();
});

cart.updateCheckoutButton();

// tambah produk ke keranjang
function addToCart(addBtn){
    const productDataString = addBtn.getAttribute('data-product');
    const productData = JSON.parse(productDataString);
    const quantity = parseInt(document.getElementById(productData.name).value);
    if(quantity>0){
        cart.addProduct(productData, quantity);
        cart.showCart();
        resetQt();
        cart.updateCheckoutButton();
    }
}

// hapus produk dari keranjang
function removeFromCart(productToRemove){
    cart.removeProduct(productToRemove);
    console.log(productToRemove);
    cart.showCart();
    cart.updateCheckoutButton();
}

// tambah quantity produk
function addQT(productName){
    var qt = document.getElementById(productName).value;
    console.log(productName);
    qt++;
    document.getElementById(productName).value=qt;
}

// kurangin quantity produk
function minQT(productName){
    var qt = document.getElementById(productName).value;
    if(qt>0){
        qt--;
        document.getElementById(productName).value=qt;
    }
}

// reset qt seluruh produk
function resetQt(){
    products.forEach(productData => {
        document.getElementById(productData.name).value=0;
    });
}

// fungsi ketika invoice ditutup
function closeInvoice() {
    // mengosongkan keranjang
    cart.clearCart();
    cart.showCart();
    
    cart.updateCheckoutButton();
}


function formatCurrency(amount) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
}