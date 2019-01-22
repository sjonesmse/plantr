const db = require('./models');

db.sync({ forced: true })
    .then(() => {
        console.log("Database is synctified!");
    })
    .catch((err) => {
        console.error(err);
    })
    .finally(() => {
        db.close();
    })