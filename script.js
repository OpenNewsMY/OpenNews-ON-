// script.js

let articlesData = [];
const articlesPerPage = 6;
let currentPage = 1;

fetch("articles.json")
  .then((res) => res.json())
  .then((data) => {
    articlesData = data;
    renderArticles();
    populateDateFilter();
  });

function renderArticles() {
  const list = document.getElementById("news-list");
  const pagination = document.getElementById("pagination");
  if (!list || !pagination) return;

  list.innerHTML = "";

  const startIndex = (currentPage - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  const paginated = articlesData.slice(startIndex, endIndex);

  paginated.forEach((article) => {
    const card = document.createElement("div");
    card.className = "article";

    const link = document.createElement("a");
    link.href = `articles/${article.id}.html`; // ✅ 修复为正确的静态路径
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

  renderPagination();
}

function renderPagination() {
  const totalPages = Math.ceil(articlesData.length / articlesPerPage);
  const pagination = document.getElementById("pagination");
  if (!pagination) return;

  pagination.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.onclick = () => {
      currentPage = i;
      renderArticles();
    };
    if (i === currentPage) {
      btn.style.fontWeight = "bold";
    }
    pagination.appendChild(btn);
  }
}

function filterArticles(category) {
  if (category === "全部") {
    fetch("articles.json")
      .then((res) => res.json())
      .then((data) => {
        articlesData = data;
        currentPage = 1;
        renderArticles();
      });
  } else {
    fetch("articles.json")
      .then((res) => res.json())
      .then((data) => {
        articlesData = data.filter((a) => a.category === category);
        currentPage = 1;
        renderArticles();
      });
  }
}

function searchArticles() {
  const keyword = document.getElementById("searchInput").value.toLowerCase();
  fetch("articles.json")
    .then((res) => res.json())
    .then((data) => {
      articlesData = data.filter((a) =>
        a.title.toLowerCase().includes(keyword) ||
        (a.summary && a.summary.toLowerCase().includes(keyword)) ||
        (a.content && a.content.toLowerCase().includes(keyword))
      );
      currentPage = 1;
      renderArticles();
    });
}

function populateDateFilter() {
  const select = document.getElementById("dateFilter");
  if (!select) return;

  const dateSet = new Set(articlesData.map((a) => a.date));
  dateSet.forEach((date) => {
    const option = document.createElement("option");
    option.value = date;
    option.textContent = date;
    select.appendChild(option);
  });
}

function filterByDate() {
  const selectedDate = document.getElementById("dateFilter").value;
  if (selectedDate === "全部") {
    fetch("articles.json")
      .then((res) => res.json())
      .then((data) => {
        articlesData = data;
        currentPage = 1;
        renderArticles();
      });
  } else {
    fetch("articles.json")
      .then((res) => res.json())
      .then((data) => {
        articlesData = data.filter((a) => a.date === selectedDate);
        currentPage = 1;
        renderArticles();
      });
  }
}
