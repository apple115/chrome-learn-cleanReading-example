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

function applyStyles() {
  // 创建一个新的<style>元素
  const styleElement = document.createElement("style");
  // 添加CSS样式
  styleElement.textContent = `
    #new-article-container p {
      font-size: 16px;
      line-height: 1.6;
    }
    #new-article-container li {
      margin-left: 20px;
    }
    #new-article-container code {
      background-color: #f5f5f5;
      padding: 2px 6px;
      border-radius: 3px;
     display: inline-block; /* 或者使用 block; 如果您希望 <code> 元素独占一行 */
     margin: 10px 0; /* 上下边距增加，可根据需要调整 */
    }
    .article-viewer {
    width: 80%;
    max-width: 800px; /* 根据需要调整最大宽度 */
    margin: 0 auto; /* 水平居中 */
    padding: 20px; /* 添加内边距 */
    font-size: 16px; /* 根据需要调整字体大小 */
    line-height: 1.6; /* 设置行高 */
    }
    /* 添加更多样式规则 */
  `;
  // 将<style>元素添加到<head>中
  document.head.appendChild(styleElement);
}


function changePage(title, text) {
  // Create a new HTML structure
  // const juejinDiv = document.getElementById("juejin");
  // if (juejinDiv) {
  //   const newContent = `
  //     <div id="new-article-container">
  //       <h1>${title}</h1>
  //       <div>${text}</div>
  //     </div>
  //   `;
  //   juejinDiv.innerHTML = newContent;
  //     // applyStyles();
  // }

// 移除所有样式表链接

var newHTML = `
    <div id="new-article-container">
      <h1 id="new-article-title"></h1>
      <div id="new-article-content"></div>
    </div>
  `;

  // 将新HTML插入到body中，替换原有的内容。
  document.body.innerHTML = newHTML;

  // 设置标题和内容。
  document.getElementById('new-article-title').textContent = title;
  document.getElementById('new-article-content').innerHTML = text;



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
