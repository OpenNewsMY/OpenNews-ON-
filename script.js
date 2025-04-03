
const articles = [
  {
    id: 1,
    title: "政府考虑调高油价？",
    date: "2025年4月3日",
    image: "https://via.placeholder.com/800x400",
    summary: "据消息指出，政府正考虑在明年调高油价以应对财政赤字。",
    content: "政府财政部传出消息，可能会在明年开始调整油价以应对财政赤字问题。",
    category: "政治"
  },
  {
    id: 2,
    title: "新冠疫苗再升级！",
    date: "2025年4月2日",
    image: "https://via.placeholder.com/800x400",
    summary: "卫生部宣布新一代疫苗将在全国推出。",
    content: "卫生部今日宣布，结合AI研发的新一代疫苗即将全面推出。",
    category: "国际"
  },
  {
    id: 3,
    title: "艺人宣布闪婚，网友震惊！",
    date: "2025年4月1日",
    image: "https://via.placeholder.com/800x400",
    summary: "某知名艺人突然宣布结婚消息，引发网友热议。",
    content: "该艺人在社交平台宣布婚讯，网友纷纷留言祝福。",
    category: "八卦"
  }
];

function renderArticles(category = '全部') {
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
  renderArticles(category);
}

window.onload = () => renderArticles();
