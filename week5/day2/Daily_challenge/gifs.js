const API_KEY = 'hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My';
const BASE_URL = 'https://api.giphy.com/v1/gifs/random';

const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const gifsContainer = document.getElementById('gifsContainer');
const deleteAllBtn = document.getElementById('deleteAllBtn');
const messageDiv = document.getElementById('message');

searchForm.addEventListener('submit', handleSearch);
deleteAllBtn.addEventListener('click', deleteAllGifs);

async function handleSearch(event) {
    event.preventDefault();
    
    const searchTerm = searchInput.value.trim();
    
    if (!searchTerm) {
        showMessage('Please enter a search term!', 'error');
        return;
    }
    
    searchInput.value = '';
    
    try {
        showMessage('Loading...', 'loading');
        
        const gifData = await fetchRandomGif(searchTerm);
        
        clearMessage();
        
        if (gifData) {
            displayGif(gifData, searchTerm);
        }
    } catch (error) {
        showMessage(`Error fetching GIF: ${error.message}`, 'error');
        console.error('Error:', error);
    }
}

async function fetchRandomGif(tag) {
    const url = `${BASE_URL}?api_key=${API_KEY}&tag=${encodeURIComponent(tag)}&rating=g`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.data) {
        throw new Error('No GIF found for this search term');
    }
    
    return data.data;
}

function displayGif(gifData, searchTerm) {
    const gifItem = document.createElement('div');
    gifItem.className = 'gif-item';
    
    const gifUrl = gifData.images.fixed_height.url;
    const originalUrl = gifData.images.original.url;
    
    gifItem.innerHTML = `
        <img src="${gifUrl}" alt="${searchTerm} GIF" class="gif-image" 
             onclick="window.open('${originalUrl}', '_blank')" style="cursor: pointer;">
        <div class="gif-info">
            <p><strong>Category:</strong> ${searchTerm}</p>
            <p><strong>Title:</strong> ${gifData.title || 'Untitled'}</p>
            <button class="delete-btn" onclick="deleteGif(this)">DELETE</button>
        </div>
    `;
    
    gifsContainer.appendChild(gifItem);
    
    showMessage(`Successfully fetched a random "${searchTerm}" GIF!`, 'success');
    setTimeout(clearMessage, 3000);
}

function deleteGif(button) {
    const gifItem = button.closest('.gif-item');
    gifItem.remove();
    showMessage('GIF deleted!', 'success');
    setTimeout(clearMessage, 2000);
}

function deleteAllGifs() {
    if (gifsContainer.children.length === 0) {
        showMessage('No GIFs to delete!', 'error');
        setTimeout(clearMessage, 2000);
        return;
    }
    
    gifsContainer.innerHTML = '';
    showMessage('All GIFs deleted!', 'success');
    setTimeout(clearMessage, 2000);
}

function showMessage(text, type) {
    messageDiv.textContent = text;
    messageDiv.className = type;
    messageDiv.style.display = 'block';
}

function clearMessage() {
    messageDiv.style.display = 'none';
    messageDiv.textContent = '';
    messageDiv.className = '';
}