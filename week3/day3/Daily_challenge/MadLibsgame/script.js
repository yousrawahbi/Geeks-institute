// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get form and buttons
    const form = document.getElementById('libform');
    const shuffleButton = document.getElementById('shuffle-button');
    
    // Story templates
    const storyTemplates = [
        "Once upon a time, there was a [adjective] [noun] named [person]. It loved to [verb] all day long in [place].",
        "In the magical land of [place], [person] discovered a [adjective] [noun] that could [verb] with incredible power.",
        "It was a dark and stormy night when [person] found the [adjective] [noun] that would change everything. Little did they know, it was about to [verb] right there in [place]."
    ];
    
    let currentStoryIndex = 0;
    let userWords = {};
    
    // Handle form submission
    form.addEventListener('submit', function(event) {
        // Prevent form from actually submitting
        event.preventDefault();
        
        // Get input values
        const noun = document.getElementById('noun').value;
        const adjective = document.getElementById('adjective').value;
        const person = document.getElementById('person').value;
        const verb = document.getElementById('verb').value;
        const place = document.getElementById('place').value;
        
        // Check if any field is empty
        if (!noun || !adjective || !person || !verb || !place) {
            alert('Please fill in all fields!');
            return;
        }
        
        // Save user words
        userWords = { noun, adjective, person, verb, place };
        
        // Generate and display story
        generateStory();
    });
    
    // Handle shuffle button click
    shuffleButton.addEventListener('click', function() {
        if (Object.keys(userWords).length === 0) {
            alert('Please create a story first!');
            return;
        }
        
        // Change to the next story template
        currentStoryIndex = (currentStoryIndex + 1) % storyTemplates.length;
        
        // Generate and display the new story
        generateStory();
    });
    
    // Function to generate and display the story
    function generateStory() {
        // Get the current story template
        let story = storyTemplates[currentStoryIndex];
        
        // Replace placeholders with user words
        story = story.replace(/\[noun\]/g, userWords.noun);
        story = story.replace(/\[adjective\]/g, userWords.adjective);
        story = story.replace(/\[person\]/g, userWords.person);
        story = story.replace(/\[verb\]/g, userWords.verb);
        story = story.replace(/\[place\]/g, userWords.place);
        
        // Display the story
        document.getElementById('story').textContent = story;
    }
});