// script.js
let articlesData = [];

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

  articles.sort((a, b) => b.id - a.id); // 最新优先

  articles.forEach((article) => {
    const card = document.createElement("div");
    card.className = "article";

    const link = document.createElement("a");
    link.href = `article.html?id=${article.id}`;
    link.style.textDecoration = "none";
    link.style.color = "inherit";

    const imgHtml = article.image ? `<img src='${article.image}' alt='${article.title} 封面图'>` : "";
    const summaryText = article.summary || "（无摘要内容）";

    card.innerHTML = `
      <h3>${article.title}</h3>
      <p><strong>${article.date}</strong></p>
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


