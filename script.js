const searchInput = document.getElementById('searchInput');
const resultsDiv = document.getElementById('results');


async function searchManga() {
  const searchTerm = searchInput.value.trim();
  if (searchTerm === '') {
    alert('Please enter a manga title!');
    return;
  }

  const apiUrl = `https://api.mangadex.org/manga?title=${encodeURIComponent(searchTerm)}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    const data = await response.json();
    displayResults(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    resultsDiv.innerHTML = 'Error fetching data. Please try again later.';
  }
}

function displayResults(data) {
  resultsDiv.innerHTML = ''; // Clear previous results

  if (data.data.length === 0) {
    resultsDiv.innerHTML = 'No manga found.';
    return;
  }

  data.data.forEach(async (manga) => {
    const title = manga.attributes.title.en || 'Title not available';
    const description = manga.attributes.description.en || 'Description not available';
    const coverId = manga.id;

    const coverUrl = `https://uploads.mangadex.org/covers/${coverId}/cover.jpg`;

    const mangaDiv = document.createElement('div');
    mangaDiv.classList.add('manga-card');

    mangaDiv.innerHTML = `
      <h2>${title}</h2>
      <img src="${coverUrl}" alt="${title} cover">
      <p>${description}</p>
    `;

    resultsDiv.appendChild(mangaDiv);
  });
}
