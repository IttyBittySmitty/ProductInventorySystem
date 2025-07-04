// Product Inventory System
// In-memory product list
const products = [
    { id: 'P001', name: 'Intel Core i7', category: 'CPU', price: 320.99, quantity: 10 },
    { id: 'P002', name: 'AMD Ryzen 5', category: 'CPU', price: 220.49, quantity: 15 },
    { id: 'P003', name: 'NVIDIA RTX 3060', category: 'GPU', price: 399.99, quantity: 8 },
    { id: 'P004', name: 'Corsair Vengeance 16GB', category: 'RAM', price: 79.99, quantity: 25 },
    { id: 'P005', name: 'Samsung 970 EVO 1TB', category: 'SSD', price: 109.99, quantity: 12 },
    { id: 'P006', name: 'Seagate Barracuda 2TB', category: 'HDD', price: 54.99, quantity: 20 },
    { id: 'P007', name: 'ASUS Prime Z590', category: 'Motherboard', price: 189.99, quantity: 7 },
    { id: 'P008', name: 'MSI B550 Tomahawk', category: 'Motherboard', price: 159.99, quantity: 9 },
    { id: 'P009', name: 'EVGA 600W PSU', category: 'Power Supply', price: 49.99, quantity: 18 },
    { id: 'P010', name: 'Cooler Master Hyper 212', category: 'CPU Cooler', price: 34.99, quantity: 14 },
    { id: 'P011', name: 'NZXT H510', category: 'Case', price: 69.99, quantity: 11 },
    { id: 'P012', name: 'Logitech G502', category: 'Mouse', price: 49.99, quantity: 30 },
    { id: 'P013', name: 'Corsair K70', category: 'Keyboard', price: 119.99, quantity: 16 },
    { id: 'P014', name: 'Dell UltraSharp 27"', category: 'Monitor', price: 329.99, quantity: 6 },
    { id: 'P015', name: 'TP-Link Archer AX50', category: 'Router', price: 99.99, quantity: 13 },
    { id: 'P016', name: 'Kingston A400 480GB', category: 'SSD', price: 39.99, quantity: 22 },
    { id: 'P017', name: 'Gigabyte GTX 1660', category: 'GPU', price: 229.99, quantity: 10 },
    { id: 'P018', name: 'Patriot Viper 8GB', category: 'RAM', price: 39.99, quantity: 28 },
    { id: 'P019', name: 'WD Blue 1TB', category: 'HDD', price: 44.99, quantity: 19 },
    { id: 'P020', name: 'Noctua NH-D15', category: 'CPU Cooler', price: 89.99, quantity: 5 }
];

// Function to add a product
function addProduct(id, name, category, price, quantity) {
    // Prevent duplicate IDs
    if (products.some(p => p.id === id)) {
        console.log('Error: Product ID already exists.');
        return false;
    }
    products.push({ id, name, category, price: parseFloat(price), quantity: parseInt(quantity) });
    console.log('Product added successfully!');
    return true;
}

// Function to update a product by ID
function updateProduct(id, updates) {
    const product = products.find(p => p.id === id);
    if (!product) {
        console.log('Product not found.');
        return false;
    }
    if (updates.price !== undefined) product.price = parseFloat(updates.price);
    if (updates.quantity !== undefined) product.quantity = parseInt(updates.quantity);
    if (updates.category !== undefined) product.category = updates.category;
    console.log('Product updated successfully!');
    return true;
}

// Function to search products by name or category (binary search)
function searchProducts(key, value) {
    // Sort products by key for binary search
    const sorted = [...products].sort((a, b) => {
        if (a[key] < b[key]) return -1;
        if (a[key] > b[key]) return 1;
        return 0;
    });
    // Binary search for all matches
    let left = 0, right = sorted.length - 1;
    let found = [];
    value = value.toLowerCase();
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        let midVal = String(sorted[mid][key]).toLowerCase();
        if (midVal === value) {
            // Find all matches (could be multiple)
            let i = mid;
            while (i >= 0 && String(sorted[i][key]).toLowerCase() === value) {
                found.unshift(sorted[i]);
                i--;
            }
            i = mid + 1;
            while (i < sorted.length && String(sorted[i][key]).toLowerCase() === value) {
                found.push(sorted[i]);
                i++;
            }
            break;
        } else if (midVal < value) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    if (found.length > 0) {
        console.log('Search results:', found);
    } else {
        console.log('No products found for', key, '=', value);
    }
    return found;
}

function mergeSort(arr, field) {
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid), field);
    const right = mergeSort(arr.slice(mid), field);
    return merge(left, right, field);
}

function merge(left, right, field) {
    let result = [], i = 0, j = 0;
    while (i < left.length && j < right.length) {
        if (left[i][field] < right[j][field]) {
            result.push(left[i++]);
        } else {
            result.push(right[j++]);
        }
    }
    return result.concat(left.slice(i)).concat(right.slice(j));
}

function sortProducts(field) {
    if (!["name", "price", "category"].includes(field)) {
        console.log('Invalid sort field.');
        return;
    }
    const sorted = mergeSort(products, field);
    // Copy sorted array back to products
    for (let i = 0; i < products.length; i++) {
        products[i] = sorted[i];
    }
    console.log(`Products sorted by ${field}:`, products);
}

// Function to filter product by ID
function filterProductById(id) {
    const product = products.find(p => p.id === id);
    if (product) {
        console.log('Product found:', product);
        return product;
    } else {
        console.log('No product found with ID:', id);
        return null;
    }
}

// Simple CLI menu
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

function showMenu() {
    console.log('\nProduct Inventory System');
    console.log('1. Add Product');
    console.log('2. Update Product');
    console.log('3. Search Products');
    console.log('4. Sort Products');
    console.log('5. Filter Product by ID');
    console.log('6. Show All Products');
    console.log('0. Exit');
    readline.question('Choose an option: ', handleMenu);
}

function handleMenu(option) {
    switch(option) {
        case '1':
            readline.question('Enter product ID: ', id => {
                readline.question('Enter product name: ', name => {
                    readline.question('Enter product category: ', category => {
                        readline.question('Enter product price: ', price => {
                            readline.question('Enter product quantity: ', quantity => {
                                addProduct(id, name, category, price, quantity);
                                showMenu();
                            });
                        });
                    });
                });
            });
            break;
        case '2':
            readline.question('Enter product ID to update: ', id => {
                readline.question('Update price? (leave blank to skip): ', price => {
                    readline.question('Update quantity? (leave blank to skip): ', quantity => {
                        readline.question('Update category? (leave blank to skip): ', category => {
                            const updates = {};
                            if (price) updates.price = price;
                            if (quantity) updates.quantity = quantity;
                            if (category) updates.category = category;
                            updateProduct(id, updates);
                            showMenu();
                        });
                    });
                });
            });
            break;
        case '3':
            readline.question('Search by name or category? ', key => {
                key = key.toLowerCase();
                if (key !== 'name' && key !== 'category') {
                    console.log('Invalid search key.');
                    showMenu();
                    return;
                }
                readline.question(`Enter ${key} to search for: `, value => {
                    searchProducts(key, value);
                    showMenu();
                });
            });
            break;
        case '4':
            readline.question('Sort by name, price, or category? ', field => {
                sortProducts(field.toLowerCase());
                showMenu();
            });
            break;
        case '5':
            readline.question('Enter product ID to filter: ', id => {
                filterProductById(id);
                showMenu();
            });
            break;
        case '6':
            if (products.length === 0) {
                console.log('No products in inventory.');
            } else {
                console.log('All Products:');
                products.forEach(p => {
                    console.log(`ID: ${p.id}, Name: ${p.name}, Category: ${p.category}, Price: $${p.price}, Quantity: ${p.quantity}`);
                });
            }
            showMenu();
            break;
        case '0':
            readline.close();
            break;
        default:
            console.log('Invalid option.');
            showMenu();
    }
}

showMenu(); 