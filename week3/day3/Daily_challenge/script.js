
document.addEventListener('DOMContentLoaded', function() {
    //1)Get the value of each of the inputs in the HTML file when the form is submitted.
    const form = document.getElementById('libform');
     //3)Write a story that uses each of the values.
    const storyTemplates = [
        "Once upon a time, there was a [adjective] [noun] named [person]. It loved to [verb] all day long in [place].",
        "In the magical land of [place], [person] discovered a [adjective] [noun] that could [verb] with incredible power.",
        "It was a dark and stormy night when [person] found the [adjective] [noun] that would change everything. Little did they know, it was about to [verb] right there in [place]."
    ];
    
    let currentStoryIndex = 0;
    let userWords = {};
    

    form.addEventListener('submit', function(event) {
    
        event.preventDefault();
      
        const noun = document.getElementById('noun').value;
        const adjective = document.getElementById('adjective').value;
        const person = document.getElementById('person').value;
        const verb = document.getElementById('verb').value;
        const place = document.getElementById('place').value;
        //2)Make sure the values are not empty
        if (!noun || !adjective || !person || !verb || !place) {
            alert('Please fill in all fields!');
            return;
        }
        
        userWords = { noun, adjective, person, verb, place };
        
        generateStory();
    });
    

    function generateStory() {

        let story = storyTemplates[currentStoryIndex];
        
        story = story.replace(/\[noun\]/g, userWords.noun);
        story = story.replace(/\[adjective\]/g, userWords.adjective);
        story = story.replace(/\[person\]/g, userWords.person);
        story = story.replace(/\[verb\]/g, userWords.verb);
        story = story.replace(/\[place\]/g, userWords.place);
       
        document.getElementById('story').textContent = story;
    }
});