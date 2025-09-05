
require('dotenv').config();
const readline = require('readline');
const Country = require('./models/Country');
const { 
  fetchCountriesFromAPI, 
  getRandomCountries, 
  validateCountryData,
  displayCountriesTable
} = require('./utils/helpers');

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Ask a question and return the answer as a promise
function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

// Main function
async function main() {
  try {
    console.log('🌍 REST COUNTRIES DATA FETCHER');
    console.log('='.repeat(40));
    
    // Ensure table exists
    await Country.createTable();
    
    let exit = false;
    
    while (!exit) {
      console.log('\nPlease choose an option:');
      console.log('1. Fetch 10 random countries from API and store in database');
      console.log('2. View all countries in database');
      console.log('3. Count countries in database');
      console.log('4. Clear all countries from database');
      console.log('5. Exit');
      
      const choice = await askQuestion('\nEnter your choice (1-5): ');
      
      switch (choice) {
        case '1':
          await fetchAndStoreCountries();
          break;
        case '2':
          await viewCountries();
          break;
        case '3':
          await countCountries();
          break;
        case '4':
          await clearCountries();
          break;
        case '5':
          exit = true;
          console.log('Goodbye! 👋');
          break;
        default:
          console.log('Invalid choice. Please try again.');
      }
    }
    
    rl.close();
    
  } catch (error) {
    console.error('Error in main function:', error);
    rl.close();
    process.exit(1);
  }
}

// Fetch and store countries
async function fetchAndStoreCountries() {
  try {
    console.log('\nFetching countries from REST Countries API...');
    
    // Fetch all countries from API
    const allCountries = await fetchCountriesFromAPI();
    
    // Get 10 random countries
    const randomCountries = getRandomCountries(allCountries, 10);
    console.log('Selected 10 random countries');
    
    // Clear existing data
    await Country.clearAll();
    
    // Insert each validated country
    for (const country of randomCountries) {
      const validatedData = validateCountryData(country);
      await Country.create(validatedData);
      console.log(`✓ Inserted: ${validatedData.name}`);
    }
    
    console.log('\n✅ Successfully stored 10 random countries in database');
    
  } catch (error) {
    console.error('Error fetching and storing countries:', error);
  }
}

// View countries in database
async function viewCountries() {
  try {
    const countries = await Country.findAll();
    
    if (countries.length === 0) {
      console.log('\nNo countries found in database. Fetch some first!');
      return;
    }
    
    displayCountriesTable(countries);
    
  } catch (error) {
    console.error('Error viewing countries:', error);
  }
}

// Count countries in database
async function countCountries() {
  try {
    const count = await Country.count();
    console.log(`\nThere are ${count} countries in the database`);
  } catch (error) {
    console.error('Error counting countries:', error);
  }
}

// Clear all countries from database
async function clearCountries() {
  try {
    const confirm = await askQuestion('\nAre you sure you want to clear all country data? (y/N): ');
    
    if (confirm.toLowerCase() === 'y') {
      await Country.clearAll();
      console.log('✅ All country data has been cleared');
    } else {
      console.log('Operation cancelled');
    }
  } catch (error) {
    console.error('Error clearing countries:', error);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = {
  fetchAndStoreCountries,
  viewCountries,
  countCountries,
  clearCountries
};