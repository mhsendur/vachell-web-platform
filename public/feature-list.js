function fetchAndDisplayFeatures(apiUrl, containerSelector) {
  const container = document.querySelector(containerSelector);

  fetch(apiUrl)
    .then(response => response.json())
    .then(features => {
      features.reverse().forEach(feature => {
        const featureElement = document.createElement('div');
        featureElement.classList.add('feature-list-item');
        featureElement.innerHTML = featureConTemplate(feature);

        featureElement.addEventListener('click', () => {
          window.location.href = `/features/${encodeURIComponent(feature.title)}`;
        });

        container.appendChild(featureElement);
      });
    })
    .catch(error => console.error('Error fetching features:', error));
}


// the template function
function featureConTemplate(feature) {
  return `
    <div class="feature-content">
      <img src="${feature.featuredImage}" alt="${feature.title}" class="feature-image">
      <div class="feature-details">
        <h3 class="feature-title">${feature.title}</h3>
        <p class="feature-date">${feature.releaseDate}</p>
        <p class="feature-genre">${feature.genre}</p>
        <p class="feature-description">${feature.description}</p>
      </div>
    </div>
  `;
}

fetchAndDisplayFeatures('/routes/features', '.feature-list');
