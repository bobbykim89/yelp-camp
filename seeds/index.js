const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console.error, 'connection error:'));
db.once('open', () => {
  console.log('Database Connected');
});

//Pick an random element from an array
const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      // Your User ID
      author: '61019526884a373908ac5825',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos voluptas doloribus modi vero voluptatum expedita, aperiam eaque beatae? Perspiciatis, ad! Expedita suscipit, at cum alias facilis error provident a ullam!',
      price,
      geometry: {
        type: 'Point',
        coordinates: [-88.0078, 41.88],
      },
      images: [
        {
          url: 'https://res.cloudinary.com/dwgni1x3t/image/upload/v1627546591/YelpCamp/pp6kglxixcck8qglrwzk.jpg',
          filename: 'YelpCamp/pp6kglxixcck8qglrwzk',
        },
        {
          url: 'https://res.cloudinary.com/dwgni1x3t/image/upload/v1627546591/YelpCamp/raneahdxak8v7wconkzg.jpg',
          filename: 'YelpCamp/raneahdxak8v7wconkzg',
        },
        {
          url: 'https://res.cloudinary.com/dwgni1x3t/image/upload/v1627546591/YelpCamp/ohs4kophu9bajtl14yrw.jpg',
          filename: 'YelpCamp/ohs4kophu9bajtl14yrw',
        },
        {
          url: 'https://res.cloudinary.com/dwgni1x3t/image/upload/v1627546591/YelpCamp/wqls49pvvgyo7cu89guc.jpg',
          filename: 'YelpCamp/wqls49pvvgyo7cu89guc',
        },
        {
          url: 'https://res.cloudinary.com/dwgni1x3t/image/upload/v1627546592/YelpCamp/iyyubl6ezugchhmmfk04.jpg',
          filename: 'YelpCamp/iyyubl6ezugchhmmfk04',
        },
        {
          url: 'https://res.cloudinary.com/dwgni1x3t/image/upload/v1627546592/YelpCamp/ciglbz86fqvxuy7zjihn.jpg',
          filename: 'YelpCamp/ciglbz86fqvxuy7zjihn',
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
