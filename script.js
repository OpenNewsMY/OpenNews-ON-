// 更新后的 script.js 示例代码

// 获取文章列表容器
const newsList = document.getElementById("news-list");

// 加载 JSON 数据
fetch("articles.json")
  .then((response) => response.json())
  .then((data) => {
    displayArticles(data);
  })
  .catch((error) => {
    newsList.innerHTML = "<p>❌ 无法加载文章内容。</p>";
    console.error("加载失败:", error);
  });

function displayArticles(articles) {
  const selectedDate = document.getElementById("dateFilter").value;
  const selectedCategory = document.getElementById("categoryFilter").value;
  newsList.innerHTML = "";

  const filtered = articles.filter((a) => {
    const matchDate = selectedDate === "全部" || a.date === selectedDate;
    const matchCategory = selectedCategory === "全部" || a.category === selectedCategory;
    return matchDate && matchCategory;
  });

  if (filtered.length === 0) {
    newsList.innerHTML = "<p>没有找到符合条件的新闻。</p>";
    return;
  }

  filtered.forEach((article) => {
    const card = document.createElement("div");
    card.className = "article";

    card.innerHTML = `
      <a href="article.html?id=${article.id}" style="text-decoration:none;color:inherit;">
        <h3>${article.title}</h3>
        <p>${article.date}</p>
        ${article.image ? `<img src="${article.image}" alt="图片加载失败">` : ""}
        <p>${article.summary || article.content.slice(0, 100)}...</p>
        <p><span class="tag">分类: ${article.category}</span></p>
      </a>
    `;

    newsList.appendChild(card);
  });
}

