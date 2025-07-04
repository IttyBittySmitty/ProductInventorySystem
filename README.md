# Product Inventory System

A simple Node.js command-line application for managing a product inventory (e.g., computer parts). Features include adding, updating, searching, sorting, and filtering products.

## How to Run

1. **Install Node.js** (if not already installed):
   - Download from [nodejs.org](https://nodejs.org/) and install.
2. **Open your terminal** and navigate to the folder containing `productInventory.js`.
3. **Start the program:**
   ```
   node productInventory.js
   ```

## Menu Options & Example Inputs

When you run the program, you'll see:
```
Product Inventory System
1. Add Product
2. Update Product
3. Search Products
4. Sort Products
5. Filter Product by ID
6. Show All Products
0. Exit
Choose an option:
```

### 1. Add Product
You'll be prompted for each field:
```
Enter product ID: P021
Enter product name: Intel Core i5
Enter product category: CPU
Enter product price: 199.99
Enter product quantity: 12
```

### 2. Update Product
You'll be prompted for the product ID, then for each field to update. Leave blank to skip a field:
```
Enter product ID to update: P001
Update price? (leave blank to skip): 299.99
Update quantity? (leave blank to skip):
Update category? (leave blank to skip): High-End CPU
```

### 3. Search Products
You'll be prompted for the key and value:
```
Search by name or category? name
Enter name to search for: Intel Core i7
```
Or:
```
Search by name or category? category
Enter category to search for: GPU
```

### 4. Sort Products
You'll be prompted for the field to sort by:
```
Sort by name, price, or category? price
```

### 5. Filter Product by ID
You'll be prompted for the product ID:
```
Enter product ID to filter: P003
```

### 6. Show All Products
No input needed; displays all products in the inventory.

### 0. Exit
Closes the program.

---

 
