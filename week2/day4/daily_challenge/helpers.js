const fetch = require('node-fetch');

// Fetch countries from REST Countries API
async function fetchCountriesFromAPI() {
  try {
    console.log('Fetching countries from REST Countries API...');
    const response = await fetch('https://restcountries.com/v3.1/all?fields=name,capital,flag,subregion,population');
    
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }
    
    const countries = await response.json();
    console.log(`Fetched ${countries.length} countries from API`);
    return countries;
  } catch (error) {
    console.error('Error fetching countries from API:', error);
    throw error;
  }
}

// Get random countries from the list
function getRandomCountries(countries, count = 10) {
  if (!Array.isArray(countries) || countries.length === 0) {
    throw new Error('No countries available');
  }

  // Fisher-Yates shuffle algorithm
  const shuffled = [...countries];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, Math.min(count, shuffled.length));
}

// Validate and format country data based on API response structure
function validateCountryData(country) {
  // Handle the nested name structure from the API
  const name = country.name?.common || 'Unknown';
  
  // Handle capital which can be an array
  const capital = Array.isArray(country.capital) && country.capital.length > 0 
                  ? country.capital[0] 
                  : 'No capital';
  
  return {
    name,
    capital,
    flag: country.flag || '🏳️',
    subregion: country.subregion || 'Unknown subregion',
    population: typeof country.population === 'number' 
               ? country.population 
               : 0
  };
}

// Display countries in a formatted table in the console
function displayCountriesTable(countries) {
  console.log('\n📊 COUNTRIES IN DATABASE:');
  console.log('┌' + '─'.repeat(4) + '┬' + '─'.repeat(25) + '┬' + '─'.repeat(20) + '┬' + '─'.repeat(20) + '┬' + '─'.repeat(15) + '┐');
  console.log(`│ ${'ID'.padEnd(2)} │ ${'NAME'.padEnd(23)} │ ${'CAPITAL'.padEnd(18)} │ ${'SUBREGION'.padEnd(18)} │ ${'POPULATION'.padEnd(13)} │`);
  console.log('├' + '─'.repeat(4) + '┼' + '─'.repeat(25) + '┼' + '─'.repeat(20) + '┼' + '─'.repeat(20) + '┼' + '─'.repeat(15) + '┤');
  
  countries.forEach((country, index) => {
    const { id, name, capital, subregion, population } = country;
    const displayId = (id || index + 1).toString().padEnd(2);
    const displayName = (name || 'Unknown').substring(0, 23).padEnd(23);
    const displayCapital = (capital || 'Unknown').substring(0, 18).padEnd(18);
    const displaySubregion = (subregion || 'Unknown').substring(0, 18).padEnd(18);
    const displayPopulation = population.toLocaleString().padEnd(13);
    
    console.log(`│ ${displayId} │ ${displayName} │ ${displayCapital} │ ${displaySubregion} │ ${displayPopulation} │`);
  });
  
  console.log('└' + '─'.repeat(4) + '┴' + '─'.repeat(25) + '┴' + '─'.repeat(20) + '┴' + '─'.repeat(20) + '┴' + '─'.repeat(15) + '┘');
  
  // Display statistics
  const totalPopulation = countries.reduce((sum, country) => sum + country.population, 0);
  const avgPopulation = Math.round(totalPopulation / countries.length);
  
  console.log(`\n📈 STATISTICS:`);
  console.log(`   Total countries: ${countries.length}`);
  console.log(`   Total population: ${totalPopulation.toLocaleString()}`);
  console.log(`   Average population: ${avgPopulation.toLocaleString()}`);
}

module.exports = {
  fetchCountriesFromAPI,
  getRandomCountries,
  validateCountryData,
  displayCountriesTable
};