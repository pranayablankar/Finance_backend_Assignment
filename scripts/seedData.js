require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const FinancialRecord = require('../models/FinancialRecord');

const seedDatabase = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');

    // Clear existing data
    await User.deleteMany({});
    await FinancialRecord.deleteMany({});
    console.log('Cleared existing data');

    // Create sample users
    const viewers = await User.create([
      {
        name: 'John Viewer',
        email: 'viewer@example.com',
        password: 'password123',
        role: 'viewer',
        isActive: true,
      },
    ]);

    const analysts = await User.create([
      {
        name: 'Jane Analyst',
        email: 'analyst@example.com',
        password: 'password123',
        role: 'analyst',
        isActive: true,
      },
    ]);

    const admins = await User.create([
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password123',
        role: 'admin',
        isActive: true,
      },
    ]);

    console.log('Users created:', viewers.length + analysts.length + admins.length);

    // Create sample financial records for analyst
    const analystUserId = analysts[0]._id;
    const sampleRecords = [
      // April 2026 - Recent records
      {
        amount: 5000,
        type: 'income',
        category: 'salary',
        date: new Date('2026-04-01'),
        note: 'Monthly salary - April',
        createdBy: analystUserId,
      },
      {
        amount: 2500,
        type: 'income',
        category: 'freelance',
        date: new Date('2026-04-02'),
        note: 'Freelance web development project',
        createdBy: analystUserId,
      },
      {
        amount: 450,
        type: 'expense',
        category: 'food',
        date: new Date('2026-04-03'),
        note: 'Grocery shopping and groceries',
        createdBy: analystUserId,
      },
      {
        amount: 150,
        type: 'expense',
        category: 'transportation',
        date: new Date('2026-04-04'),
        note: 'Uber and taxi rides',
        createdBy: analystUserId,
      },
      {
        amount: 1200,
        type: 'expense',
        category: 'utilities',
        date: new Date('2026-04-05'),
        note: 'Electric and water bills',
        createdBy: analystUserId,
      },
      {
        amount: 200,
        type: 'expense',
        category: 'entertainment',
        date: new Date('2026-04-06'),
        note: 'Movie and entertainment',
        createdBy: analystUserId,
      },
      {
        amount: 800,
        type: 'income',
        category: 'bonus',
        date: new Date('2026-04-07'),
        note: 'Performance bonus - Q1',
        createdBy: analystUserId,
      },
      {
        amount: 120,
        type: 'expense',
        category: 'healthcare',
        date: new Date('2026-04-08'),
        note: 'Pharmacy and medical supplies',
        createdBy: analystUserId,
      },
      // March 2026
      {
        amount: 5000,
        type: 'income',
        category: 'salary',
        date: new Date('2026-03-01'),
        note: 'Monthly salary - March',
        createdBy: analystUserId,
      },
      {
        amount: 1500,
        type: 'income',
        category: 'freelance',
        date: new Date('2026-03-10'),
        note: 'Freelance consulting',
        createdBy: analystUserId,
      },
      {
        amount: 350,
        type: 'expense',
        category: 'food',
        date: new Date('2026-03-12'),
        note: 'Groceries and dining out',
        createdBy: analystUserId,
      },
      {
        amount: 1000,
        type: 'expense',
        category: 'utilities',
        date: new Date('2026-03-15'),
        note: 'Monthly rent',
        createdBy: analystUserId,
      },
      {
        amount: 300,
        type: 'expense',
        category: 'entertainment',
        date: new Date('2026-03-18'),
        note: 'Concert tickets and entertainment',
        createdBy: analystUserId,
      },
      {
        amount: 100,
        type: 'expense',
        category: 'healthcare',
        date: new Date('2026-03-20'),
        note: 'Doctor visit and checkup',
        createdBy: analystUserId,
      },
      // February 2026
      {
        amount: 5000,
        type: 'income',
        category: 'salary',
        date: new Date('2026-02-01'),
        note: 'Monthly salary - February',
        createdBy: analystUserId,
      },
      {
        amount: 2000,
        type: 'income',
        category: 'freelance',
        date: new Date('2026-02-05'),
        note: 'Freelance website design',
        createdBy: analystUserId,
      },
      {
        amount: 400,
        type: 'expense',
        category: 'food',
        date: new Date('2026-02-08'),
        note: 'Groceries and restaurant',
        createdBy: analystUserId,
      },
      {
        amount: 250,
        type: 'expense',
        category: 'transportation',
        date: new Date('2026-02-10'),
        note: 'Fuel and car maintenance',
        createdBy: analystUserId,
      },
      {
        amount: 1000,
        type: 'expense',
        category: 'utilities',
        date: new Date('2026-02-15'),
        note: 'Monthly rent',
        createdBy: analystUserId,
      },
      {
        amount: 500,
        type: 'income',
        category: 'bonus',
        date: new Date('2026-02-28'),
        note: 'Employee bonus',
        createdBy: analystUserId,
      },
    ];

    await FinancialRecord.create(sampleRecords);
    console.log('Sample records created:', sampleRecords.length);

    // Create sample records for viewer
    const viewerUserId = viewers[0]._id;
    const viewerRecords = [
      {
        amount: 4000,
        type: 'income',
        category: 'salary',
        date: new Date('2026-04-01'),
        note: 'Monthly salary - April',
        createdBy: viewerUserId,
      },
      {
        amount: 350,
        type: 'expense',
        category: 'food',
        date: new Date('2026-04-03'),
        note: 'Groceries and dining out',
        createdBy: viewerUserId,
      },
      {
        amount: 100,
        type: 'expense',
        category: 'transportation',
        date: new Date('2026-04-04'),
        note: 'Public transport and taxi',
        createdBy: viewerUserId,
      },
      {
        amount: 800,
        type: 'expense',
        category: 'utilities',
        date: new Date('2026-04-05'),
        note: 'Electric and water bills',
        createdBy: viewerUserId,
      },
      {
        amount: 150,
        type: 'expense',
        category: 'entertainment',
        date: new Date('2026-04-06'),
        note: 'Entertainment and movies',
        createdBy: viewerUserId,
      },
      {
        amount: 4000,
        type: 'income',
        category: 'salary',
        date: new Date('2026-03-01'),
        note: 'Monthly salary - March',
        createdBy: viewerUserId,
      },
      {
        amount: 300,
        type: 'expense',
        category: 'food',
        date: new Date('2026-03-05'),
        note: 'Grocery shopping',
        createdBy: viewerUserId,
      },
      {
        amount: 1000,
        type: 'income',
        category: 'freelance',
        date: new Date('2026-02-15'),
        note: 'Freelance work',
        createdBy: viewerUserId,
      },
    ];

    await FinancialRecord.create(viewerRecords);
    console.log('Viewer sample records created:', viewerRecords.length);

    console.log('\nSeed data created successfully!');
    console.log('\nTest Credentials:');
    console.log('Viewer - Email: viewer@example.com, Password: password123');
    console.log('Analyst - Email: analyst@example.com, Password: password123');
    console.log('Admin - Email: admin@example.com, Password: password123');

    await mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
