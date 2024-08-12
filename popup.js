// popup.js
document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("ReadMode");
  button.innerText = "ReadMode"
  button.addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    if (button.innerText === "ReadMode"){
      // 向内容脚本发送消息，请求获取文章数据
      chrome.tabs.sendMessage(tab.id, { action: "getArticleData" });
      button.innerText = "Exit";
    }else{
      button.innerText = "ReadMode";
      // 刷新当前页面
      chrome.tabs.reload(tab.innerText);
    }
  });
});
