
function renderArticles(articles, category = '全部') {
  const container = document.getElementById('news-list');
  container.innerHTML = '';
  const filtered = category === '全部' ? articles : articles.filter(a => a.category === category);
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
  fetch('articles.json')
    .then(res => res.json())
    .then(data => renderArticles(data, category))
    .catch(err => console.error('加载失败:', err));
}

window.onload = () => {
  filterArticles('全部');
};
