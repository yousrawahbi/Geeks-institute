
// Exercise 5 : Users

    // part
            // qst1
               const container = document.getElementById('container');
               console.log(container);

//             // qst2
               document.querySelectorAll('li')[1].textContent = 'Richard';

//             // qst3
               const secondUl = document.querySelectorAll('ul')[1];
                secondUl.querySelectorAll('li')[1].remove();
             
//             // qst4
               
               document.querySelectorAll('ul').forEach(ul => {
                  ul.querySelectorAll('li')[0].textContent = 'Yousra';
               });
               

   // part2
               // qst1
               document.querySelectorAll('ul').forEach(ul => {
                  ul.classList.add('student_list');
               });

               // qst2
               const firstUl = document.querySelector('ul');
               firstUl.classList.add('university', 'attendance');
      // part3
               // qst1
               container.style.backgroundColor = 'lightblue';
               container.style.padding = '15px';

               // qst2
               document.querySelectorAll('li').forEach(li => {
                  if (li.textContent === 'Dan') {
                     li.classList.add('hidden');
                  }
               });

               // qst3
               document.querySelectorAll('li').forEach(li => {
                  if (li.textContent === 'Richard') {
                     li.classList.add('highlight');
                  }
               });

               // qst4
               document.body.style.fontSize = '18px';
