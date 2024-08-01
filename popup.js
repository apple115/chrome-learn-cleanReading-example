// popup.js
document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("ReadMode");
  button.addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    // 向内容脚本发送消息，请求获取文章数据
    chrome.tabs.sendMessage(tab.id, { action: "getArticleData" });
  });
});
