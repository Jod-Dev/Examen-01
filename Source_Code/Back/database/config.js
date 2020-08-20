const mongoose = require('mongoose');
const dbConnect = async() => {

    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('Database Conect');
    } catch (error) {
        console.log(error);
        throw new Error('Error al conectar la BD');
    }

}

module.exports = {
    dbConnect
}