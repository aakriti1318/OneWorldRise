
document.addEventListener('DOMContentLoaded', function () {
    // Fetch trending events and display
    const eventsContainer = document.getElementById('events-container');
    const blogsContainer = document.getElementById('blogs-container');

    // Fetch trending events
    fetch('http://localhost:5000/api/events')
        .then(response => response.json())
        .then(trendingEvents => {
            trendingEvents.forEach(event => {
                const eventCard = createCard(event.name, event.country,event.purpose);
                eventsContainer.appendChild(eventCard);
            });
        })
        .catch(error => console.error('Error fetching trending events:', error));

    // Fetch trending blogs
    fetch('http://localhost:5000/api/blogs')
        .then(response => response.json())
        .then(trendingBlogs => {
            trendingBlogs.forEach(blog => {
                const blogCard = createCard(blog.title, blog.country);
                blogsContainer.appendChild(blogCard);
            });
        })
        .catch(error => console.error('Error fetching trending blogs:', error));
});

// Function to create a card for events and blogs
function createCard(title, country) {
    const card = document.createElement('div');
    card.classList.add('card');

    const titleElement = document.createElement('h3');
    titleElement.textContent = title;

    const countryElement = document.createElement('p');
    countryElement.textContent = `Country: ${country}`;

    card.appendChild(titleElement);
    card.appendChild(countryElement);
   

    return card;
}
