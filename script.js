const GAS_URL = "https://script.google.com/macros/s/AKfycbzsQTVr4H4B6kK_PvDIqNwibryPHJdtHrl8hRvCFg-9_YN_LFNbyjt38RNGboeWxUmC/exec";

function addPost() {
    const postText = document.getElementById('postInput').value;
    if (postText.trim() === '') return;

    fetch(`${GAS_URL}?action=addPost&postText=${encodeURIComponent(postText)}`)
        .then(() => loadData());

    document.getElementById('postInput').value = '';
}

function addResponse(button, postId) {
    const responseInput = button.previousElementSibling;
    const responseText = responseInput.value;
    if (responseText.trim() === '') return;

    fetch(`${GAS_URL}?action=addResponse&postId=${postId}&responseText=${encodeURIComponent(responseText)}`)
        .then(() => loadData());

    responseInput.value = '';
}

function loadData() {
    fetch(`${GAS_URL}?action=getPosts`)
        .then(response => response.json())
        .then(posts => {
            const postsContainer = document.getElementById('postsContainer');
            postsContainer.innerHTML = '';

            posts.forEach(post => {
                const postDiv = document.createElement('div');
                postDiv.classList.add('post');
                postDiv.innerHTML = `
                    <p><strong>${post.text}</strong></p>
                    <div class="responses"></div>
                    <textarea class="responseInput" placeholder="Respond with shop details..."></textarea>
                    <button onclick="addResponse(this, '${post.id}')">Respond</button>
                `;
                const responsesDiv = postDiv.querySelector('.responses');

                post.responses.forEach(responseText => {
                    const responseDiv = document.createElement('div');
                    responseDiv.classList.add('response');
                    responseDiv.innerHTML = `<p>${responseText}</p>`;
                    responsesDiv.appendChild(responseDiv);
                });

                postsContainer.appendChild(postDiv);
            });
        });
}

window.onload = loadData;
