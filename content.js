function getArticleText() {
  var articleRoot = document.getElementById("article-root");
  if (articleRoot) {
    // 获取该元素的innerHTML，即元素内的所有HTML内容
    var htmlContent = articleRoot.innerHTML
      .replace(/<style.*?<\/style>/gi, "")
      .replace(/<script.*?<\/script>/gi, "")
      .replace(/<pre[\s\S]*?<\/pre>/gi, "");
      //    console.log(htmlContent);
    return htmlContent;
  }
}

function getArticleTitle() {
  const titleElement = document.querySelector(".article-title");
  if (titleElement) {
    const titleText = titleElement.textContent || titleElement.innerText;
      // console.log(titleText);
    return titleText;
  }
}

function changePage(title,text) {
      // Create a new HTML structure
const juejinDiv = document.getElementById('juejin');
  if (juejinDiv) {
    const newContent = `
      <div id="new-article-container">
        <h1>${title}</h1>
        <div>${text}</div>
      </div>
    `;
    juejinDiv.innerHTML = newContent;
  }
}



// content.js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "getArticleData") {
    const title = getArticleTitle();
    const text = getArticleText();
    // 调用 changePage 函数并传入文章数据
    changePage(title, text);
  }
});
