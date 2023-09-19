// Fetch and display the article content based on the title from the URL
function fetchAndDisplayArticle() {

  
  const articleTitleFromUrl = decodeURIComponent(window.location.pathname.split('/').pop());
  fetch(`/articles/${encodeURIComponent(articleTitleFromUrl)}/content`)
    .then(response => response.json())
    .then(article => {
      const articleTitleElement = document.getElementById('article-title');
      const articleSubtextElement = document.getElementById('article-subtext');
      const articleContentElement = document.getElementById('article-content');
      const articleAuthorElement = document.getElementById('article-author'); 
      const articlePublicationDateElement = document.getElementById('article-publication-date'); // Publication Date
      const articleCategoryTagsElement = document.getElementById('article-category-tags'); // Category Tags
      const articleReadTimeElement = document.getElementById('article-read-time'); 
      const articleImageElement = document.getElementById('article-image'); // Image
      const articleSourcesElement = document.getElementById('article-sources'); // Sources and References

      articleTitleElement.textContent = article.title;
      articleSubtextElement.textContent = article.subText;
      articleContentElement.innerHTML = article.content;
      articleAuthorElement.textContent = `Author: ${article.author}`;
      articlePublicationDateElement.textContent = `Publication Date: ${article.publicationDate}`;
      articleCategoryTagsElement.textContent = `Category Tags: ${article.categoryTags}`;
      articleReadTimeElement.textContent = `Read Time: ${article.readTime}`;
      articleImageElement.setAttribute('src', article.image); 
      articleSourcesElement.textContent = `Sources and References: ${article.sourcesAndReferences}`;

    })
    .catch(error => console.error('Error fetching article content:', error));
}

fetchAndDisplayArticle();
