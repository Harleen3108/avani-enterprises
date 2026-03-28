const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
require("dotenv").config();

async function resetAdmin() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");

        const email = process.env.ADMIN_EMAIL || "aanchal2115@gmail.com";
        const password = process.env.ADMIN_PASSWORD || "Rskban@123";
        const adminCode = process.env.ADMIN_SECRET_CODE || "31082004";

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const update = {
            name: "Admin",
            email: email,
            password: hashedPassword,
            role: "admin",
            isVerified: true
        };

        const result = await User.findOneAndUpdate(
            { email: email },
            update,
            { upsert: true, new: true }
        );

        console.log("Admin account successfully reset/created:");
        console.log("Email:", result.email);
        console.log("Password (use this in login):", password);
        console.log("Admin Code (use your VITE_ADMIN_CODE or 31082004 if configured):", adminCode);

        process.exit(0);
    } catch (err) {
        console.error("Error resetting admin:", err);
        process.exit(1);
    }
}

resetAdmin();
