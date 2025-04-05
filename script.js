let articlesData = [];

fetch("articles.json")
  .then((res) => res.json())
  .then((data) => {
    articlesData = data;
    renderArticles(articlesData);
  });

function renderArticles(articles) {
  const list = document.getElementById("news-list");
  list.innerHTML = "";

  articles.forEach((article) => {
    const card = document.createElement("div");
    card.className = "article";

    const link = document.createElement("a");
    link.href = `article.html?id=${article.id}`;
    link.style.textDecoration = "none";
    link.style.color = "inherit";

    let imgHtml = article.image ? `<img src='${article.image}' style='width: 100%; border-radius: 8px; margin-bottom: 0.5rem;'>` : "";
    let summaryText = article.summary || "（无摘要内容）";

    card.innerHTML = `
      <h3>${article.title}</h3>
      <p>${article.date}</p>
      ${imgHtml}
      <p>${summaryText}</p>
      <p><em>分类：${article.category}</em></p>
    `;

    link.appendChild(card);
    list.appendChild(link);
  });
}

function filterArticles(category) {
  if (category === "全部") {
    renderArticles(articlesData);
  } else {
    const filtered = articlesData.filter((a) => a.category === category);
    renderArticles(filtered);
  }
}

function searchArticles() {
  const keyword = document.getElementById("searchInput").value.toLowerCase();
  const results = articlesData.filter((a) =>
    a.title.toLowerCase().includes(keyword) ||
    (a.summary && a.summary.toLowerCase().includes(keyword)) ||
    (a.content && a.content.toLowerCase().includes(keyword))
  );
  renderArticles(results);
}

function toggleMenu() {
  const nav = document.getElementById("nav-menu");
  nav.style.display = nav.style.display === "block" ? "none" : "block";
}
