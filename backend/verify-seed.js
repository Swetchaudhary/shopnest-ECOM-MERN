const mongoose = require("mongoose");
require("dotenv").config();
const User = require("./model/User");
const bcrypt = require("bcryptjs");

const verifySeed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB\n");

    // Check if users exist
    const users = await User.find({});
    console.log(`Total users in database: ${users.length}\n`);

    if (users.length === 0) {
      console.log("❌ No users found! Run 'node seed.js' first\n");
    } else {
      console.log("Users in database:");
      users.forEach((user, index) => {
        console.log(`${index + 1}. ${user.name} (${user.email}) - Role: ${user.role}`);
      });
      console.log("\n");

      // Test login with first user
      const testUser = users[0];
      const testPassword = "password123";

      console.log(`Testing login with: ${testUser.email}`);
      console.log(`Test password: ${testPassword}\n`);

      const isPasswordValid = await bcrypt.compare(testPassword, testUser.password);
      console.log(`Password comparison result: ${isPasswordValid}`);

      if (isPasswordValid) {
        console.log("✅ Login should work!");
      } else {
        console.log("❌ Password doesn't match! Seed data might be corrupted.");
        console.log(`\nStored hash: ${testUser.password.substring(0, 20)}...`);
      }
    }

    process.exit(0);
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
};

verifySeed();
