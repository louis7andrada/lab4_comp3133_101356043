require('dotenv').config({ path: '../.env' });
const fs = require('fs');
const mongoose = require('mongoose');
const User = require('../models/User');


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Read JSON file
const rawdata = fs.readFileSync('../UsersData.json');
const users = JSON.parse(rawdata);

async function insertData() {
    try {
        for (let userData of users) {
            const formattedUser = {
                username: userData.username,
                email: userData.email,
                city: userData.address.city,
                website: userData.website.startsWith('http') ? userData.website : `http://${userData.website}`,
                zip: userData.address.zipcode,
                phone: userData.phone.includes('x') ? userData.phone.split('x')[0].trim() : userData.phone
            };

            // Create a new user with the formatted data and save to the database
            const user = new User(formattedUser);
            await user.save();
        }
        console.log('All users have been inserted into the database.');
    } catch (error) {
        console.error('An error occurred while inserting users:', error.message);
    }
}

insertData();
