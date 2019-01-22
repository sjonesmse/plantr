const { db, Gardener, Plot, Vegetable } = require('./models');

const vegData = [
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
]

const gardenerData = [
    {
        name: 'Hector',
        age: 47
    },
    {
        name: 'Bill',
        age: 32
    },
    {
        name: 'Frank',
        age: 87
    },
    {
        name: 'Chuck',
        age: 42
    }
]

const plotData = [
    {
        size: 462,
        shaded: true
    },
    {
        size: 50,
        shaded: false
    },
    {
        size: 100,
        shaded: true
    },
    {
        size: 90,
        shaded: false
    }
]

db.sync({ forced: true })
    .then(() => {
        const vegetablesPromise = Vegetable.bulkCreate(vegData, { returning: true });
        const gardenerPromise = Gardener.bulkCreate(gardenerData, { returning: true });
        const plotPromise = Plot.bulkCreate(plotData, { returning: true });

        console.log('Database is synctified!');

        return Promise.all([vegetablesPromise, gardenerPromise, plotPromise]);

    })
    .catch((err) => {
        console.error(err);
    })
    .finally(() => {
        db.close();
    })
