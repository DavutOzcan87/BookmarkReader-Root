

function dumpBookmarks() {
  var bookmarkTreeNodes = chrome.bookmarks.getTree(
    function (bookmarkTreeNodes) {
      $('#bookmarks').append(dumpTreeNodes(bookmarkTreeNodes));
    });
}

function dumpTreeNodes(bookmarkNodes) {
  console.log("bookmarknodes->" , bookmarkNodes);
  var list = $('<div>');
  var i;
  for (i = 0; i < bookmarkNodes.length; i++) {
    list.append(dumpNode(bookmarkNodes[i]));
  }
  return list;
}

function dumpNode(bookmarkNode) {
   console.log("node ->" , bookmarkNode);
   if(!bookmarkNode.children)
   {
      return $('<li class="single_url">').append(bookmarkNode.url);
   }else{
    let root = undefined;
     if(bookmarkNode.title == 0)
        root = $('<div>');
     else
        root = $('<li>').append(bookmarkNode.title);

     let listRoot = $("<ul>");
     bookmarkNode.children.forEach(element => {
       listRoot.append(dumpNode(element));
     });
     root.append(listRoot);
     return root;
   }
}

document.addEventListener('DOMContentLoaded', function () {
  dumpBookmarks();
  var button = document.getElementById('saveButton');
  button.addEventListener('click', function() {
      saveBookmarks();
  });
});

function saveBookmarks(){
  //alert("Clicked");
  let urls = $('.single_url').toArray().map(item=>item.innerHTML);
  console.log("urls" , urls);

  let data = urls.reduce((a,b)=>a+'\n'+b);

  var file = new Blob([data], {type: "text/plain"});
  
  console.log("file" , file);

  var a = document.createElement("a"),
    url = URL.createObjectURL(file);
  a.href = url;
  a.download = "bookmarks.txt";
  document.body.appendChild(a);
  a.click();
  setTimeout(function () {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    chrome.tabs.create({ url: "http://185.52.2.180:3000/users" });
  }, 0);

}