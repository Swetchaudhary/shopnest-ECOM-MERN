const mongoose = require("mongoose");
require("dotenv").config();
const User = require("./model/User");
const Product = require("./model/Product");
const Order = require("./model/Order");
const bcrypt = require("bcryptjs");

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});
    console.log("Cleared existing data");

    // Seed Users
    const plainPassword = "password123";
    console.log(`Hashing password: ${plainPassword}`);
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    console.log(`Hashed password: ${hashedPassword}`);
    
    const users = await User.insertMany([
      {
        name: "John Doe",
        email: "john@example.com",
        password: hashedPassword,
        role: "user",
        verified: true,
      },
      {
        name: "Jane Smith",
        email: "jane@example.com",
        password: hashedPassword,
        role: "user",
        verified: true,
      },
      {
        name: "Admin User",
        email: "admin@example.com",
        password: hashedPassword,
        role: "admin",
        verified: true,
      },
      {
        name: "Mike Johnson",
        email: "mike@example.com",
        password: hashedPassword,
        role: "user",
        verified: false,
      },
      {
        name: "Sarah Williams",
        email: "sarah@example.com",
        password: hashedPassword,
        role: "user",
        verified: true,
      },
    ]);
    console.log("Users seeded successfully");

    // Seed Products
    const products = await Product.insertMany([
      {
        name: "Wireless Headphones",
        description: "High-quality wireless headphones with noise cancellation and 30-hour battery life",
        price: 149.99,
        category: "Electronics",
        stock: 50,
        imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
        rating: 4.5,
        numReviews: 128,
      },
      {
        name: "Smart Watch",
        description: "Advanced smartwatch with health tracking, fitness modes, and 7-day battery",
        price: 249.99,
        category: "Electronics",
        stock: 35,
        imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
        rating: 4.2,
        numReviews: 95,
      },
      {
        name: "USB-C Cable",
        description: "Durable USB-C charging cable with fast charging support",
        price: 9.99,
        category: "Accessories",
        stock: 200,
        imageUrl: "https://images.unsplash.com/photo-1592286927505-1fed5715fdc3?w=400",
        rating: 4.8,
        numReviews: 312,
      },
      {
        name: "Phone Case",
        description: "Protective phone case with premium materials and elegant design",
        price: 24.99,
        category: "Accessories",
        stock: 150,
        imageUrl: "https://images.unsplash.com/photo-1557405033-c7fb119e330f?w=400",
        rating: 4.6,
        numReviews: 256,
      },
      {
        name: "Portable Charger",
        description: "20000mAh portable power bank with dual USB ports and LED display",
        price: 39.99,
        category: "Electronics",
        stock: 75,
        imageUrl: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400",
        rating: 4.4,
        numReviews: 187,
      },
      {
        name: "Bluetooth Speaker",
        description: "Waterproof bluetooth speaker with 360-degree sound and 12-hour battery",
        price: 79.99,
        category: "Electronics",
        stock: 60,
        imageUrl: "https://images.unsplash.com/photo-1589003077984-894e133814c9?w=400",
        rating: 4.7,
        numReviews: 203,
      },
      {
        name: "Screen Protector",
        description: "Tempered glass screen protector with easy installation",
        price: 12.99,
        category: "Accessories",
        stock: 300,
        imageUrl: "https://images.unsplash.com/photo-1611532736579-6b16e2b50449?w=400",
        rating: 4.5,
        numReviews: 421,
      },
      {
        name: "Wireless Mouse",
        description: "Ergonomic wireless mouse with precision tracking and 18-month battery life",
        price: 34.99,
        category: "Electronics",
        stock: 85,
        imageUrl: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400",
        rating: 4.3,
        numReviews: 156,
      },
    ]);
    console.log("Products seeded successfully");

    // Seed Orders
    const orders = await Order.insertMany([
      {
        user: users[0]._id,
        items: [
          {
            productId: products[0]._id,
            qty: 1,
            price: 149.99,
          },
          {
            productId: products[2]._id,
            qty: 2,
            price: 9.99,
          },
        ],
        totalAmount: 169.97,
        address: {
          fullName: "John Doe",
          street: "123 Main Street",
          city: "New York",
          postalCode: "10001",
          country: "USA",
        },
        paymentId: "pay_123456789",
        status: "delivered",
      },
      {
        user: users[1]._id,
        items: [
          {
            productId: products[1]._id,
            qty: 1,
            price: 249.99,
          },
        ],
        totalAmount: 249.99,
        address: {
          fullName: "Jane Smith",
          street: "456 Oak Avenue",
          city: "Los Angeles",
          postalCode: "90001",
          country: "USA",
        },
        paymentId: "pay_987654321",
        status: "shipped",
      },
      {
        user: users[3]._id,
        items: [
          {
            productId: products[4]._id,
            qty: 1,
            price: 39.99,
          },
          {
            productId: products[3]._id,
            qty: 1,
            price: 24.99,
          },
        ],
        totalAmount: 64.98,
        address: {
          fullName: "Mike Johnson",
          street: "789 Pine Road",
          city: "Chicago",
          postalCode: "60601",
          country: "USA",
        },
        paymentId: "pay_456789123",
        status: "pending",
      },
      {
        user: users[4]._id,
        items: [
          {
            productId: products[5]._id,
            qty: 1,
            price: 79.99,
          },
          {
            productId: products[6]._id,
            qty: 3,
            price: 12.99,
          },
        ],
        totalAmount: 118.96,
        address: {
          fullName: "Sarah Williams",
          street: "321 Elm Street",
          city: "Houston",
          postalCode: "77001",
          country: "USA",
        },
        paymentId: "pay_321654987",
        status: "pending",
      },
    ]);
    console.log("Orders seeded successfully");

    console.log("\n✅ Database seeded successfully!");
    console.log(`✓ Users created: ${users.length}`);
    console.log(`✓ Products created: ${products.length}`);
    console.log(`✓ Orders created: ${orders.length}`);

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
