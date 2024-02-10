const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, minlength: 4 },
    email: { type: String, required: true, match: /.+\@.+\..+/ },
    city: { type: String, required: true, match: /^[a-zA-Z\s]*$/ },
    website: { type: String, required: true, match: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/ },
    zip: { type: String, required: true, match: /^\d{5}-\d{4}$/ },
    phone: { type: String, required: true, match: /^1-\d{3}-\d{3}-\d{4}$/ }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
