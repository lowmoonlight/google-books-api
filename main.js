// Get submit button element
const submitBtn = document.getElementById("search-btn");

// Get div that will display book entries
var resultsBox = document.getElementById("results-area");

// Invoke searchForBooks() function when button is clicked
submitBtn.addEventListener("click", function () {
  resultsBox.innerHTML = "";
  searchForBooks();
});

// Searches for books and returns a promise that resolves a JSON list
function searchForBooks(term) {
  // Set API URL and API key
  const api = "https://www.googleapis.com/books/v1/volumes?q=";
  const apiKey = "YOUR_API_KEY" + "&";

  // Get term entered in the search field by user and encode it
  var term = encodeURI(document.getElementById("search-bar").value) + "&";

  // Construct URL for API call
  var url = api + term + apiKey;

  // Perform call to API and manipulate results
  fetch(url)
    // Convert data into JSON object
    .then(function (resp) {
      var resp = resp.json();
      return resp;
    })

    // Run function to display book entries on the page
    .then(function (resp) {
      bookData = resp.items;
      return render(bookData);
    })

    // reject handler
    .catch(function () {
      console.log("Error occurred!");
    });
}

// Generate HTML and sets #results's contents to it
function render(data) {
  console.log(data);

  // Set variable for JSON data
  var bookData = data;

  bookData.map((book) => {
    // Set book information variables
    var bookId = book.id;
    var bookLink = book.volumeInfo.infoLink;
    var bookCoverUrl = book.volumeInfo.imageLinks.thumbnail;
    var bookTitle = book.volumeInfo.title;

    if (book.volumeInfo.subtitle) {
      var bookSubtitle = book.volumeInfo.subtitle;
    } else {
      var bookSubtitle = "";
    }

    var bookAuthors = book.volumeInfo.authors;

    // Create object with book information
    var bookEntry = {
      id: bookId,
      cover: bookCoverUrl,
      title: bookTitle,
      subtitle: bookSubtitle,
      authors: bookAuthors,
      link: bookLink,
    };

    // Generate HTML code
    const markup = `
		<div class="book">
			<img src="${bookEntry.cover}" />
			<div class="content">
				<h2>
					<a href="${bookEntry.link}">${bookEntry.title}</a>
				</h2>
				<h3>
					${bookEntry.subtitle}
				</h3>
				<h4>${bookEntry.authors}</h4>
			</div>
		</div>
	`;

    // Get div that will display book entries
    var resultsBox = document.getElementById("results-area");

    // Display book entry on page
    resultsBox.innerHTML += markup;
  });
}
