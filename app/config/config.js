module.exports = {
    PORT: process.env.PORT || 3000,
    DB: process.env.MONGO_URL || process.env.DB || 'mongodb://localhost:27017/restaurante_savory'
};