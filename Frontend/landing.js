document.addEventListener('DOMContentLoaded', function () {
    // Fetch trending events and display
    const eventsContainer = document.getElementById('events-container');
    const trendingEvents = [
        { title: 'Event 1', description: 'Description for Event 1' },
        { title: 'Event 2', description: 'Description for Event 2' },
        { title: 'Event 3', description: 'Description for Event 3' },
        { title: 'Event 3', description: 'Description for Event 3' },
        // Add more trending events as needed
    ];

    trendingEvents.forEach(event => {
        const eventCard = createCard(event.title, event.description);
        eventsContainer.appendChild(eventCard);
    });

    // Fetch trending blogs and display
    const blogsContainer = document.getElementById('blogs-container');
    const trendingBlogs = [
        { title: 'Blog 1', description: 'Description for Blog 1' },
        { title: 'Blog 2', description: 'Description for Blog 2' },
        { title: 'Blog 3', description: 'Description for Blog 3' },
        { title: 'Blog 3', description: 'Description for Blog 3' },
        // Add more trending blogs as needed
    ];

    trendingBlogs.forEach(blog => {
        const blogCard = createCard(blog.title, blog.description);
        blogsContainer.appendChild(blogCard);
    });
});

// Function to create a card for events and blogs
function createCard(title, description) {
    const card = document.createElement('div');
    card.classList.add('card');

    const titleElement = document.createElement('h3');
    titleElement.textContent = title;

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = description;

    card.appendChild(titleElement);
    card.appendChild(descriptionElement);

    return card;
}
