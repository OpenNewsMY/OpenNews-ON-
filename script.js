let articlesData = [];

// 加载 JSON 新闻
fetch("articles.json")
  .then((res) => res.json())
  .then((data) => {
    articlesData = data;
    renderArticles(articlesData);
    populateDateFilter();
  });

// 渲染文章卡片
function renderArticles(articles) {
  const list = document.getElementById("news-list");
  list.innerHTML = "";

  articles.forEach((article) => {
    const card = document.createElement("div");
    card.className = "article";

    const link = document.createElement("a");
    link.href = `articles/${article.id}.html`; // ✅ 修复链接
    link.style.textDecoration = "none";
    link.style.color = "inherit";

    let imgHtml = article.image
      ? `<img src='${article.image}' style='width: 100%; border-radius: 8px; margin-bottom: 0.5rem;'>`
      : "";
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

// 分类筛选
function filterArticles(category) {
  if (category === "全部") {
    renderArticles(articlesData);
  } else {
    const filtered = articlesData.filter((a) => a.category === category);
    renderArticles(filtered);
  }
}

// 关键词搜索
function searchArticles() {
  const keyword = document.getElementById("searchInput").value.toLowerCase();
  const results = articlesData.filter((a) =>
    a.title.toLowerCase().includes(keyword) ||
    (a.summary && a.summary.toLowerCase().includes(keyword)) ||
    (a.content && a.content.toLowerCase().includes(keyword))
  );
  renderArticles(results);
}

// 日期筛选下拉选项
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

// 日期筛选
function filterByDate() {
  const selectedDate = document.getElementById("dateFilter").value;
  if (selectedDate === "全部") {
    renderArticles(articlesData);
  } else {
    const filtered = articlesData.filter((a) => a.date === selectedDate);
    renderArticles(filtered);
  }
}
