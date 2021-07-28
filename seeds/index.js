const mongoose = require('mongoose');
const cities = require ('./cities');
const { places, descriptors } = require ('./seedHelpers');
const Campground = require ('../models/campground');

mongoose.connect ('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on ("error", console.error.bind (console.error, "connection error:"))
db.once ("open", () => {
    console.log ("Database Connected");
});

//Pick an random element from an array
const sample = (array) => array [Math.floor (Math.random () * array.length)];

const seedDB = async () => {
    await Campground.deleteMany ({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor (Math.random () * 20) + 10;
        const camp = new Campground ({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${ sample(descriptors) } ${ sample(places) }`,
            image: 'https://source.unsplash.com/collection/483251/',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos voluptas doloribus modi vero voluptatum expedita, aperiam eaque beatae? Perspiciatis, ad! Expedita suscipit, at cum alias facilis error provident a ullam!',
            price

        })
        await camp.save ();
    }
}

seedDB ().then (() => {
    mongoose.connection.close ();
})