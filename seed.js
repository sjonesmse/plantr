const { db, Gardener, Plot, Vegetable } = require('./models');

db.sync({ forced: true })
    .then(() => {
        const vegetablesPromise = Vegetable.bulkCreate([
            {
                name: 'Cabbage',
                color: 'Purple',
                planted_on: '2016-08-09 04:05:02'
            },
            {
                name: 'Carrot',
                color: 'Orange',
                planted_on: '2016-08-09 04:05:02'
            },
            {
                name: 'Potato',
                color: 'Golden',
                planted_on: '2016-08-09 04:05:02'
            },
            {
                name: 'Broccoli',
                color: 'Green',
                planted_on: '2016-08-09 04:05:02'
            }
        ], { returning: true });
        console.log("Database is synctified!");


        return Promise.all(vegetablesPromise);

    })
    .catch((err) => {
        console.error(err);
    })
    .finally(() => {
        db.close();
    })
