const { sequelize } = require('./db');
const Car = require('./carModel');
const Bike = require('./bikeModel');
const Vehicle = require('./vehicleModel');

const seedData = async () => {
  await sequelize.sync({ force: true });

  const carTypesData = ['Hatchback', 'SUV', 'Sedan'];
  const bikeTypeData = ['Cruiser'];

  // Seed car types
  const carTypes = await Promise.all(carTypesData.map(name => Car.create({ name })));

  // Seed bike types
  const bikeTypes = await Promise.all(bikeTypeData.map(name => Bike.create({ name })));

  // Seed vehicles
  await Promise.all([
    Vehicle.create({ name: 'Car1', CarId: carTypes[0].id }),
    Vehicle.create({ name: 'Car2', CarId: carTypes[1].id }),
    Vehicle.create({ name: 'Car3', CarId: carTypes[2].id }),
    Vehicle.create({ name: 'Bike1', BikeId: bikeTypes[0].id }),
  ]);

  console.log('Database seeded successfully');
  process.exit();
};

seedData();
