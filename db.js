function fetchAndDisplayArticle(articleTitle) {
  const apiUrl = `/articles/${encodeURIComponent(articleTitle)}`;

  // Fetch the article data
  fetch(apiUrl)
    .then(response => response.json())
    .then(article => {
      const articleTitleElement = document.getElementById('article-title');
      const articleSubtextElement = document.getElementById('article-subtext');
      const articleContentElement = document.getElementById('article-content');

      articleTitleElement.textContent = article.title;
      articleSubtextElement.textContent = article.subText;
      articleContentElement.textContent = article.content;

    })
    .catch(error => console.error('Error fetching article:', error));
}

const articleTitleFromUrl = decodeURIComponent(window.location.pathname.split('/').pop());

fetchAndDisplayArticle(articleTitleFromUrl);
