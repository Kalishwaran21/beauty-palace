require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        const adminEmail = 'admin@larastyles.com';
        let admin = await User.findOne({ email: adminEmail });
        
        if (admin) {
            admin.role = 'admin';
            admin.password = 'admin123'; // Will be hashed by pre-save hook
            await admin.save();
            console.log('Admin user updated!');
        } else {
            admin = new User({
                name: 'System Admin',
                email: adminEmail,
                password: 'admin123',
                phone: '9876543210',
                role: 'admin'
            });
            await admin.save();
            console.log('Admin user created!');
        }
        process.exit();
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
