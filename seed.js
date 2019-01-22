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
    .then((insertedData) => {

        const [vegetables, gardeners, plots] = insertedData;
        const [cabbage, carrot, potato, broccoli] = vegetables;
        const [hector, bill, frank, chuck] = gardeners;
        const [plot1, plot2, plot3, plot4] = plots;

        console.log(Object.keys(hector.__proto__))
        const promise1 = hector.setPlot(hector.id); //this will put hector's id in the plots table
        return Promise.all([promise1]);

    })
    .catch((err) => {
        console.error(err);
    })
    .finally(() => {
        db.close();
    })
