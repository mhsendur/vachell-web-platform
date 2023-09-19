function fetchAndDisplayArticles(apiUrl, containerSelector) {
  const container = document.querySelector(containerSelector);

  fetch(apiUrl)
    .then(response => response.json())
    .then(articles => {
      articles.reverse().forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.classList.add('article-list-item');
        articleElement.innerHTML = `
          <h2 class="article-title">${article.title}</h2>          
          <p class="readTime">${article.readTime}</p>
          <p class="publication-date">${article.publicationDate}</p>
          <p class="categoryTags">${article.categoryTags}</p>
          <p class="subText">${article.subText}</p>
          <img src="${article.image}" alt="${article.title}" />
          <hr />
        `;

        // event listener to make the article clickable
        articleElement.addEventListener('click', () => {
          window.location.href = `/articles/${encodeURIComponent(article.title)}`;
        });

        container.appendChild(articleElement);
      });
    })
    .catch(error => console.error('Error fetching articles:', error));
}


fetchAndDisplayArticles('/routes/articles', '.article-list');
