function fetchAndDisplayContentArticle(apiUrl, containerSelector, contentTemplate) {
  const container = document.querySelector(containerSelector);
  const largeContainer = container.querySelector('.article-large');
  const mediumContainer = container.querySelector('.article-medium');
  const smallContainer = container.querySelector('.article-small');

  const rowContainer0 = container.querySelector('.article-row-third');
  const rowContainer1 = container.querySelector('.article-row-fourth');

  const rowContainerLast = container.querySelector('.article-row-last');

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const latestArticles = data.slice(-6); // Get the last 6 items latest
      latestArticles.reverse().forEach((article, index) => { // Reverse the order to display the latest first
        const itemElement = document.createElement('div');
        itemElement.classList.add('content-item');
        itemElement.innerHTML = contentTemplate(article, index);

        if (index === 0) {
          largeContainer.appendChild(itemElement);
        } else if (index === 1) {
          mediumContainer.appendChild(itemElement);
        } else if (index === 2) {
          smallContainer.appendChild(itemElement); 
        } else if (index == 3 ) {
          rowContainer0.appendChild(itemElement);
        }
        else if (index == 4 ) {
          rowContainer1.appendChild(itemElement);
        }
        else if (index == 5) {
          rowContainerLast.appendChild(itemElement); 

        }
      });
    })
    .catch(error => console.error('Error fetching content:', error));
}


// Template for articles
function articleTemplate(article, index) {
  const url = `/articles/${encodeURIComponent(article.title)}`; 

  if (index === 0) {
    return `
    <a href="${url}" class="a-zero">
      <div class="article-content article-large">
      
        <img src="${article.image}" alt="${article.title}" width="800" height="450">
        <h3 class="article-title">${article.title}</h3>
        <p class="article-subtext">${article.subText}</p>
        <p class="category-tag">${article.categoryTags}</p>
      </div>
    </a>
  `;
  } else if (index === 1) {
    return `
    <a href="${url}" class="a-one">
      <div class="article-content article-medium">
        <img src="${article.image}" alt="${article.title}" width="495" height="278.44">
        <h3 class="article-title">${article.title}</h3>
        <p class="article-subtext">${article.subText}</p>
        <p class="category-tag">${article.categoryTags}</p>
      </div>
    </a>

  `;
  } else if (index === 2) {
    return `
    <a href="${url}" class="a-two">
      <div class="article-content article-small">
        <h3 class="article-title">${article.title}</h3>
        <p class="article-subtext">${article.subText}</p>
        <p class="category-tag">${article.categoryTags}</p>
      </div>
    </a>
  `;
  } else if (index === 5) {
    return `
    <a href="${url}" class="a-five">
      <div class="article-content article-row-last">
        <img src="${article.image}" alt="${article.title}" width="421" height="236.8125">
        <h3 class="article-title">${article.title}</h3>
        <p class="article-subtext">${article.subText}</p>
      </div>
    </a>
  `;
  } else {
  return `
  <a href="${url}" class="a-six">
    <div class="article-content article-row">
      <img src="${article.image}" alt="${article.title}" width="421" height="236.8125">
      <h3 class="article-title">${article.title}</h3>
      <p class="article-subtext">${article.subText}</p>
    </div>
  </a>
`;
  }

}


// Fetch and display content from API routes
function fetchAndDisplayContentFeature(apiUrl, containerSelector, contentTemplate) {
  const container = document.querySelector(containerSelector);

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const latestItem = data[data.length - 1]; // Get the last item (latest)
      if (latestItem) {
        const itemElement = document.createElement('div');
        itemElement.classList.add('content-item');
        itemElement.innerHTML = contentTemplate(latestItem);
        container.appendChild(itemElement);
      } else {
        console.error('No items found in the database.');
      }
    })
    .catch(error => console.error('Error fetching content:', error));
}


// Template for features
function featureTemplate(feature) {
  // Extract the YouTube video ID from the URL
  const videoId = extractVideoIdFromUrl(feature.video);

  if (videoId) {
    // If a valid video ID is extracted, construct YouTube embed URL
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;

    // Create a link to the individual feature page
    const featureLink = `/features/${encodeURIComponent(feature.title)}`;

    return `
      <a href="${featureLink}" class="feature-link">
        <div class="full-width-video">
          <iframe width="100%" height="495" src="${embedUrl}?autoplay=1" frameborder="0" allowfullscreen></iframe>
        </div>
        <div class="video-overlay">
          <h1 class="featured-title">${feature.title}</h1>
        </div>
      </a>
    `;
  } else {

    return `<p>Error: Invalid YouTube video URL</p>`;
  }
}


function fetchAndDisplayContentFeatureCon(apiUrl, containerSelector, contentTemplate) {

  const container = document.querySelector(containerSelector);

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const latestArticles = data.slice(-4); // Get the last 6 items 
      latestArticles.reverse().forEach((feature, index) => { // Reverse the order to display the latest first
        const itemElement = document.createElement('div');
        itemElement.classList.add('content-item');
        itemElement.innerHTML = contentTemplate(feature, index);
        container.appendChild(itemElement);
      });
    })
    .catch(error => console.error('Error fetching content:', error));
}

// Template for features content
function featureConTemplate(feature) {
  // Create a link to the individual feature page
  const featureLink = `/features/${encodeURIComponent(feature.title)}`;

  return `
    <a href="${featureLink}" class="feature-link">
      <div class="feature-content">
        <img src="${feature.featuredImage}" alt="${feature.title}" class="feature-image" width="495" height="278.44">
        <div class="feature-details">
          <h3 class="feature-title">${feature.title}</h3>
          <p class="feature-date">${feature.releaseDate}</p>
          <p class="feature-genre">${feature.genre}</p>
          <p class="feature-description">${feature.description}</p>
        </div>
      </div>
    </a>
  `;
}




// Function to extract YouTube video ID from the URL
function extractVideoIdFromUrl(url) {
  const match = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}



// Fetch and display content from API routes
function fetchAndDisplayContentShop(apiUrl, containerSelector, contentTemplate) {
  const container = document.querySelector(containerSelector);

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const latestArticles = data.slice(-3); // Get the last 3 items (latest)
      latestArticles.reverse().forEach((feature, index) => { // Reverse the order to display the latest first
        const itemElement = document.createElement('div');
        itemElement.classList.add('content-item');
        itemElement.innerHTML = contentTemplate(feature, index);
        container.appendChild(itemElement);
      });
    })
    .catch(error => console.error('Error fetching content:', error));
}

// Template for shop items
function shopTemplate(item) {
  return `
    <a href="${item.additionalInfo}" target="_blank" style="text-decoration: none; color: inherit;">
      <img src="${item.image}" alt="${item.title}" width="421" height="421">
      <h3 class="item-title">${item.title}</h3>
      <p class="item-description">${item.description}</p>
      <p class="item-price">$${item.price.toFixed(2)}</p>
    </a>
  `;
}




// Fetch and display features
fetchAndDisplayContentFeature('/routes/features', '.video-section', featureTemplate);

// Fetch and display articles
fetchAndDisplayContentArticle('/routes/articles', '.article-gallery', articleTemplate);

// Fetch and display feature content
fetchAndDisplayContentFeatureCon('/routes/features', '.featured-content', featureConTemplate);

// Fetch and display shop items
fetchAndDisplayContentShop('/routes/shop', '.merchandise-items', shopTemplate);
