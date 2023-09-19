// Fetch and display the feature content
function fetchAndDisplayFeature() {
  const featureTitleFromUrl = decodeURIComponent(window.location.pathname.split('/').pop());

  fetch(`/features/${encodeURIComponent(featureTitleFromUrl)}/content`)
    .then(response => response.json())
    .then(feature => {
      const featureTitleElement = document.getElementById('feature-title');
      const featureDirectorProducerElement = document.getElementById('feature-director-producer');
      const featureReleaseDateElement = document.getElementById('feature-release-date');
      const featureGenreElement = document.getElementById('feature-genre');
      const featureDescriptionElement = document.getElementById('feature-description');
      const featureContentElement = document.getElementById('feature-content');
      const featureVideoElement = document.getElementById('feature-video');

      featureTitleElement.textContent = feature.title;
      featureDirectorProducerElement.textContent = `Director/Producer: ${feature.directorProducer}`;
      featureReleaseDateElement.textContent = `Release Date: ${feature.releaseDate}`;
      featureGenreElement.textContent = `Genre: ${feature.genre}`;
      featureDescriptionElement.textContent = feature.description;
      featureContentElement.innerHTML = feature.content;
      const videoId = feature.video.split('v=')[1].split('&')[0];
      const embedUrl = 'https://www.youtube.com/embed/' + videoId;

      featureVideoElement.setAttribute('src', embedUrl);    
    })
    .catch(error => console.error('Error fetching feature content:', error));
}

fetchAndDisplayFeature();
