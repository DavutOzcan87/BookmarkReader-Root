

function dumpBookmarks() {
  var bookmarkTreeNodes = chrome.bookmarks.getTree(
    function (bookmarkTreeNodes) {
      $('#bookmarks').append(dumpTreeNodes(bookmarkTreeNodes));
    });
}

function dumpTreeNodes(bookmarkNodes) {
  var list = $('<ul>');
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
     let root = $('<li>').append(bookmarkNode.title);
     bookmarkNode.children.forEach(element => {
       let subRoot= $('<ul>');
       subRoot.append(dumpNode(element));
       root.append(subRoot);
     });
     return root;
   }
}

document.addEventListener('DOMContentLoaded', function () {
  dumpBookmarks();
});