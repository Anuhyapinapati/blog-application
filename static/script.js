// CODE SHOULD NOT BE MODIFIED

// Function to create a new post using the API
const createPost = async (title, content) => {
  try {
    const response = await fetch('/proxy/5000/posts', { // Absolute URL for Lab environment.
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, content })
    });

    if (!response.ok) {
      throw new Error('Failed to create post');
    }

    const newPost = await response.json();
    // Add the new post to the page
    addPostToPage(newPost);
  } catch (error) {
    console.error(error);
    // Handle errors (e.g., display an error message)
  }
};

// Function to get all posts from the API
const getPosts = async () => {
  try {
    const response = await fetch('/proxy/5000/posts'); // Absolute URL for Lab environment.
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }

    const posts = await response.json();
    // Display the posts on the page
    displayPosts(posts);
  } catch (error) {
    console.error(error);
    // Handle errors
  }
};

// Call getPosts() when the page loads to display existing posts
getPosts();
const addPostToPage = (post) => {
  const postElement = document.createElement('div');
  postElement.classList.add('post-card');  // 🎨 apply card style
  const now = new Date();
  const dateTimeString = now.toLocaleString();
  postElement.innerHTML = `<h3>${post.title}</h3><p>${post.content}</p><p class="post-date-time">${dateTimeString}</p>`;
  document.getElementById('posts-container').appendChild(postElement);
};

const displayPosts = (posts) => {
  const postsContainer = document.getElementById('posts-container');
  postsContainer.innerHTML = '';
  posts.forEach(post => {
    const postElement = document.createElement('div');
    postElement.classList.add('post-card');  // 🎨 apply card style
    const postDateTime = new Date(post.timestamp || Date.now());
    const dateTimeString = postDateTime.toLocaleString();
    postElement.innerHTML = `<h3>${post.title}</h3><p>${post.content}</p><p class="post-date-time">${dateTimeString}</p>`;
    postsContainer.appendChild(postElement);
  });
};

// Event listener for the new post form submission
const newPostForm = document.getElementById('new-post-form');
newPostForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent default form submission
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;
  createPost(title, content);
});