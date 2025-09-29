const getCharacterBtn = document.getElementById('getCharacterBtn');
const loadingElement = document.getElementById('loading');
const errorElement = document.getElementById('error');
const characterCard = document.getElementById('characterCard');
const characterName = document.getElementById('characterName');
const characterHeight = document.getElementById('characterHeight');
const characterGender = document.getElementById('characterGender');
const characterBirthYear = document.getElementById('characterBirthYear');
const characterHomeworld = document.getElementById('characterHomeworld');

const API_BASE_URL = 'https://www.swapi.tech/api';
const TOTAL_CHARACTERS = 83;

getCharacterBtn.addEventListener('click', getRandomCharacter);

async function getRandomCharacter() {
    hideElement(characterCard);
    hideElement(errorElement);
    
    showElement(loadingElement);

    try {
        const randomId = Math.floor(Math.random() * TOTAL_CHARACTERS) + 1;
        
        const characterData = await fetchCharacterData(randomId);
        
        const homeworldData = await fetchHomeworldData(characterData.homeworld);
        
        displayCharacter(characterData, homeworldData);
        
        hideElement(loadingElement);
        showElement(characterCard);
        
    } catch (error) {
        console.error('Error fetching character:', error);
        hideElement(loadingElement);
        showElement(errorElement);
    }
}

async function fetchCharacterData(characterId) {
    const response = await fetch(`${API_BASE_URL}/people/${characterId}`);
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.result) {
        throw new Error('Character data not found');
    }
    
    return data.result.properties;
}

async function fetchHomeworldData(homeworldUrl) {

    const homeworldId = homeworldUrl.split('/').filter(Boolean).pop();
    
    const response = await fetch(`${API_BASE_URL}/planets/${homeworldId}`);
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.result) {
        throw new Error('Homeworld data not found');
    }
    
    return data.result.properties.name;
}

function displayCharacter(character, homeworld) {
    characterName.textContent = character.name;
    characterHeight.textContent = `${character.height} cm`;
    characterGender.textContent = formatGender(character.gender);
    characterBirthYear.textContent = character.birth_year;
    characterHomeworld.textContent = homeworld;
}

function formatGender(gender) {
    if (!gender || gender === 'n/a') return 'Unknown';
    return gender.charAt(0).toUpperCase() + gender.slice(1);
}

function showElement(element) {
    element.classList.add('visible');
}

function hideElement(element) {
    element.classList.remove('visible');
}

document.addEventListener('DOMContentLoaded', () => {
    getRandomCharacter();
});

window.addEventListener('online', () => {
    if (errorElement.classList.contains('visible')) {
        hideElement(errorElement);
    }
});

window.addEventListener('offline', () => {
    hideElement(loadingElement);
    hideElement(characterCard);
    showElement(errorElement);
});