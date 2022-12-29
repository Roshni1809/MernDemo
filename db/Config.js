const mongoose = require('mongoose');
mongoose.set('strictQuery', true)

const dbConnect = mongoose.connect('mongodb://0.0.0.0:27017/e-commerce', (err) => {
    if (err) {
        console.log(err)
    }
    else {
        console.log("db Connected")
    }
}
)

module.exports = dbConnect;