
// Use the firstElementChild and the lastElementChild properties to retrieve the first and last <li> elements from their parent element (<ul>). Display the text of each link. (Hint: use the textContent property).
        const navBar = document.getElementById('navBar');
        navBar.setAttribute('id', 'socialNetworkNavigation');
        
// We are going to add a new <li> to the <ul>.
// First, create a new <li> tag (use the createElement method).
        const newLi = document.createElement('li');
        
// Create a new text node with “Logout” as its specified text.
        const logoutText = document.createTextNode('Logout');
        newLi.appendChild(logoutText);
        
// Append the text node to the newly created list node (<li>).
        document.querySelector('#socialNetworkNavigation ul').appendChild(newLi);
        
// Finally, append this updated list node to the unordered list (<ul>), using the appendChild method
        const ulElement = document.querySelector('#socialNetworkNavigation ul');
        const firstLi = ulElement.firstElementChild;
        const lastLi = ulElement.lastElementChild;
        
// Use the firstElementChild and the lastElementChild properties to retrieve the first and last <li> elements from their parent element (<ul>). Display the text of each link.
        console.log('First link:', firstLi.textContent);
        console.log('Last link:', lastLi.textContent);
        


        document.getElementById('firstLink').textContent = firstLi.textContent;
        document.getElementById('lastLink').textContent = lastLi.textContent;