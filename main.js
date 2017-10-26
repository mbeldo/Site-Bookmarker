document.getElementById("myForm").addEventListener("submit", saveBookmark);

function saveBookmark(e) {
  //Prevent default form submission
  e.preventDefault();
  //Get variables
  var siteName = document.getElementById("siteName").value;
  var siteUrl = document.getElementById("siteUrl").value;

  //Bookmark object
  var bookmark = {
    name: siteName,
    url: siteUrl
  };
  //check if bookmarks already exists in local storage
  if (localStorage.getItem("bookmarks") === null) {
    //Inialise bookmarks array
    var bookmarks = [];
    //Push new item to the array
    bookmarks.push(bookmark);
    //Set to local storage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  } else {
    //Get bookmarks from local storage and parse as Object
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    //Push the new bookmark onto the newly assigned array
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }

  fetchBookmarks();
}

function deleteBookmark(url) {
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  for (var i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].url == url) {
      bookmarks.splice(i, 1);
    }
  }
  //Set to local storage
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

  //Reload bookmarks
  fetchBookmarks();
}

function fetchBookmarks() {
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  //Get output id
  var bookmarksResults = document.getElementById("bookmarksResults");
  // Build our output
  bookmarksResults.innerHTML = "";
  for (var i = 0; i < bookmarks.length; i++) {
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarksResults.innerHTML +=
      '<div class="card">' +
      "<h3 class='card-body'>" +
      name +
      '<a class="btn btn-primary" target="_blank"> Visit </a>' +
      "<button onclick=\"deleteBookmark('" +
      url +
      '\')" class="btn btn-danger" href="#" > Delete </button>' +
      "</h3>" +
      "</div>";
  }
}
