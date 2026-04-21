const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../Avani-enterprises-backend-pure-bc/.env') });

const Seo = require('../Avani-enterprises-backend-pure-bc/models/Seo');

async function checkSeo() {
    try {
        console.log("Connecting to:", process.env.MONGO_URL || "Using default");
        await mongoose.connect(process.env.MONGO_URL || "mongodb+srv://avanienterprisesindia:WInW30XU7d1HAt90@cluster0.p0v7v.mongodb.net/avani-enterprises?retryWrites=true&w=majority&appName=Cluster0");
        
        const homeSeo = await Seo.find({ page: { $regex: /^\/?$/ } });
        console.log("Found Home SEO records:", JSON.stringify(homeSeo, null, 2));
        
        const allSeo = await Seo.find().limit(5);
        console.log("First 5 SEO records:", JSON.stringify(allSeo, null, 2));

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

checkSeo();
