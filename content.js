function getArticleText() {
  var articleRoot = document.getElementById("article-root");
  if (articleRoot) {
    // 获取该元素的innerHTML，即元素内的所有HTML内容
    var htmlContent = articleRoot.innerHTML
      .replace(/<style.*?<\/style>/gi, "")
      .replace(/<script.*?<\/script>/gi, "")
      .replace(/<pre[\s\S]*?<\/pre>/gi, "")
      .replace(/<img.*?>/g, "");
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

function changePage(title, text) {
    // 创建一个容器用于加载新页面的内容
    const tempContainer = document.createElement('div');
    tempContainer.style.display = 'none';
    document.body.appendChild(tempContainer);

    // 加载自定义布局的HTML文件
    fetch('newPage.html')
        .then(response => response.text())
        .then(data => {
            // 将获取到的 HTML 内容插入临时容器中
            tempContainer.innerHTML = data;

            // 从临时容器中提取页面内容
            const newArticleContainer = tempContainer.querySelector('#page-container');

            // 将提取到的内容替换到当前页面的主体部分
            document.body.innerHTML = newArticleContainer.outerHTML;

            // 设置标题和内容
            document.getElementById('new-article-title').textContent = title;
            document.getElementById('new-article-content').innerHTML = text;

            // 移除临时容器
            document.body.removeChild(tempContainer);
        })
        .catch(error => console.error('Error loading custom layout:', error));
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
