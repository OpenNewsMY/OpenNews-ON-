// script.js - 包含新闻列表渲染、筛选、搜索、菜单展开等功能

let articlesData = [];

// 加载 JSON 新闻
fetch("articles.json")
  .then((res) => res.json())
  .then((data) => {
    articlesData = data;
    renderArticles(articlesData);
    populateDateFilter();
  });

function renderArticles(articles) {
  const list = document.getElementById("news-list");
  list.innerHTML = "";

  articles.forEach((article) => {
    const card = document.createElement("div");
    card.className = "article";

    const link = document.createElement("a");
    link.href = `articles/${article.id}.html`;
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

function populateDateFilter() {
  const dateSet = new Set(articlesData.map(a => a.date));
  const select = document.getElementById("dateFilter");
  dateSet.forEach(date => {
    const option = document.createElement("option");
    option.value = date;
    option.textContent = date;
    select.appendChild(option);
  });
}

function filterByDate() {
  const selectedDate = document.getElementById("dateFilter").value;
  if (selectedDate === "全部") {
    renderArticles(articlesData);
  } else {
    const filtered = articlesData.filter((a) => a.date === selectedDate);
    renderArticles(filtered);
  }
}

// ✅ 菜单展开收起功能
const toggleBtn = document.getElementById("menu-toggle");
if (toggleBtn) {
  toggleBtn.onclick = function () {
    const nav = document.getElementById("nav-menu");
    nav.style.display = nav.style.display === "block" ? "none" : "block";
  };
}
