       (function(name) {
            const container = document.getElementById('user-container');
            container.innerHTML = `
                <div class="user-profile">
                    <div class="avatar">${name[0]}</div>
                    <div>${name}</div>
                </div>
            `;
        })("John");