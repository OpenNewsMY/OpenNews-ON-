
let allArticles = [];

function renderArticles(articles, category = '全部') {
  const container = document.getElementById('news-list');
  container.innerHTML = '';
  const filtered = category === '全部' ? articles : articles.filter(a => a.category === category);
  if (filtered.length === 0) {
    container.innerHTML = '<p>没有找到符合条件的新闻。</p>';
    return;
  }
  filtered.forEach(article => {
    const div = document.createElement('div');
    div.className = 'article';
    div.innerHTML = `
      <h3>${article.title}</h3>
      <p><strong>${article.date}</strong></p>
      <img src="${article.image}" style="width:100%; max-width:800px;">
      <p>${article.summary}</p>
      <p><em>分类: ${article.category}</em></p>
    `;
    container.appendChild(div);
  });
}

function filterArticles(category) {
  renderArticles(allArticles, category);
}

function searchArticles() {
  const keyword = document.getElementById('searchInput').value.toLowerCase().trim();
  if (!keyword) {
    renderArticles(allArticles, '全部');
    return;
  }

  const result = allArticles.filter(article =>
    article.title.toLowerCase().includes(keyword) ||
    article.summary.toLowerCase().includes(keyword) ||
    article.content.toLowerCase().includes(keyword)
  );

  renderArticles(result, '全部');
}

window.onload = () => {
  fetch('articles.json')
    .then(res => res.json())
    .then(data => {
      allArticles = data;
      renderArticles(allArticles);
    })
    .catch(err => console.error('加载失败:', err));
};
