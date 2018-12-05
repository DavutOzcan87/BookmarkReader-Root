

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
});