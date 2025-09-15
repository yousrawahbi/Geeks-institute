let quotes = [
    {
        id: 0,
        author: "Charles Lindbergh",
        quote: "Life is like a landscape. You live in the midst of it but can describe it only from the vantage point of distance.",
        likes: 0
    },
    {
        id: 1,
        author: "Albert Einstein",
        quote: "Imagination is more important than knowledge.",
        likes: 0
    },
    {
        id: 2,
        author: "Maya Angelou",
        quote: "I've learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.",
        likes: 0
    },
    {
        id: 3,
        author: "Steve Jobs",
        quote: "The only way to do great work is to love what you do.",
        likes: 0
    }
];

let lastQuoteId = -1;

function generateQuote() {
    let availableQuotes = quotes.filter(quote => quote.id !== lastQuoteId);
    
    if (availableQuotes.length === 0) {
        availableQuotes = quotes;
    }
    
    const randomIndex = Math.floor(Math.random() * availableQuotes.length);
    const randomQuote = availableQuotes[randomIndex];
    lastQuoteId = randomQuote.id;
    
    displayQuote(randomQuote);
}

function displayQuote(quoteObj) {
    const quoteDisplay = document.getElementById('quote-display');
    quoteDisplay.innerHTML = `
        <div class="quote-text">"${quoteObj.quote}"</div>
        <div class="quote-author">- ${quoteObj.author}</div>
        <div class="quote-stats">
            <span>Likes: ${quoteObj.likes}</span> | 
            <span>ID: ${quoteObj.id}</span>
        </div>
    `;
}

document.getElementById('generate-btn').addEventListener('click', generateQuote);

generateQuote();


document.getElementById('add-quote-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const newQuote = document.getElementById('new-quote').value;
    const newAuthor = document.getElementById('new-author').value;
    
    if (newQuote && newAuthor) {
        const newId = quotes.length > 0 ? Math.max(...quotes.map(q => q.id)) + 1 : 0;
        
        quotes.push({
            id: newId,
            author: newAuthor,
            quote: newQuote,
            likes: 0
        });
        
        document.getElementById('new-quote').value = '';
        document.getElementById('new-author').value = '';
        alert('Quote added successfully!');
    }
});


document.getElementById('count-chars-with-spaces').addEventListener('click', function() {
    const currentQuote = quotes.find(q => q.id === lastQuoteId);
    if (currentQuote) {
        alert(`Characters (with spaces): ${currentQuote.quote.length}`);
    }
});

document.getElementById('count-chars-no-spaces').addEventListener('click', function() {
    const currentQuote = quotes.find(q => q.id === lastQuoteId);
    if (currentQuote) {
        const noSpaces = currentQuote.quote.replace(/\s/g, '').length;
        alert(`Characters (no spaces): ${noSpaces}`);
    }
});

document.getElementById('count-words').addEventListener('click', function() {
    const currentQuote = quotes.find(q => q.id === lastQuoteId);
    if (currentQuote) {
        const words = currentQuote.quote.split(/\s+/).filter(word => word.length > 0);
        alert(`Words: ${words.length}`);
    }
});

document.getElementById('like-quote').addEventListener('click', function() {
    const currentQuote = quotes.find(q => q.id === lastQuoteId);
    if (currentQuote) {
        currentQuote.likes++;
        displayQuote(currentQuote);
        alert('Liked! 👍');
    }
});

let filteredQuotes = [];
let currentFilterIndex = -1;


document.getElementById('filter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const authorName = document.getElementById('filter-author').value.toLowerCase();
    filteredQuotes = quotes.filter(quote => 
        quote.author.toLowerCase().includes(authorName)
    );
    
    if (filteredQuotes.length > 0) {
        currentFilterIndex = 0;
        displayFilteredQuote();
        document.getElementById('navigation-buttons').style.display = 'block';
    } else {
        document.getElementById('filter-results').innerHTML = '<p>No quotes found for this author.</p>';
        document.getElementById('navigation-buttons').style.display = 'none';
    }
});

function displayFilteredQuote() {
    if (filteredQuotes.length > 0 && currentFilterIndex >= 0) {
        const quote = filteredQuotes[currentFilterIndex];
        document.getElementById('filter-results').innerHTML = `
            <div class="quote-text">"${quote.quote}"</div>
            <div class="quote-author">- ${quote.author}</div>
            <div>Quote ${currentFilterIndex + 1} of ${filteredQuotes.length}</div>
        `;
    }
}

document.getElementById('prev-quote').addEventListener('click', function() {
    if (filteredQuotes.length > 0) {
        currentFilterIndex = (currentFilterIndex - 1 + filteredQuotes.length) % filteredQuotes.length;
        displayFilteredQuote();
    }
});

document.getElementById('next-quote').addEventListener('click', function() {
    if (filteredQuotes.length > 0) {
        currentFilterIndex = (currentFilterIndex + 1) % filteredQuotes.length;
        displayFilteredQuote();
    }
});