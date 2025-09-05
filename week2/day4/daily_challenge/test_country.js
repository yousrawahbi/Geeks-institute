// test-countries.js
async function fetchRandomCountries() {
  try {
    console.log('Fetching countries from API...');
    
    const response = await fetch('https://restcountries.com/v3.1/all?fields=name,capital,flag,subregion,population');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const countries = await response.json();
    
    // Get 10 random countries
    const randomCountries = getRandomCountries(countries, 10);
    
    // Display the results
    console.log('\n=== 10 RANDOM COUNTRIES ===\n');
    randomCountries.forEach((country, index) => {
      console.log(`${index + 1}. ${country.name.common}`);
      console.log(`   Capital: ${country.capital ? country.capital[0] : 'N/A'}`);
      console.log(`   Flag: ${country.flag}`);
      console.log(`   Subregion: ${country.subregion || 'N/A'}`);
      console.log(`   Population: ${formatPopulation(country.population)}`);
      console.log('----------------------------------------');
    });
    
    return randomCountries;
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

function getRandomCountries(countries, count) {
  const shuffled = [...countries].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function formatPopulation(population) {
  return population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Run the test
fetchRandomCountries();