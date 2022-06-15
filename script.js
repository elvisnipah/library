let myLibrary = [];

class Book {
    constructor(title, author, pages, status) {
        this.title = title,
        this.author = author,
        this.pages = pages,
        this.status = status
    }
}

function showBooksInLibrary() {
    const bookList = document.querySelector("#table-body");
    bookList.textContent = "";
    for (let i = 0; i < myLibrary.length; i += 1) {
        const bookRow = document.createElement("tr");
        bookRow.classList.add("book-info");
        bookList.appendChild(bookRow);
        // Add the book title
        const bookTitle = document.createElement("td");
        bookTitle.textContent = `"${myLibrary[i].title}"`;
        bookRow.appendChild(bookTitle);
        //Add the book author
        const bookAuthor = document.createElement("td");
        bookAuthor.textContent = myLibrary[i].author;
        bookRow.appendChild(bookAuthor);
        //Add the number of pages
        const bookPages = document.createElement("td");
        bookPages.textContent = myLibrary[i].pages;
        bookRow.appendChild(bookPages);
        //Add the book status
        const bookStatus = document.createElement("td");
        const bookStatusText = document.createElement("button")
        if (myLibrary[i].status === false) {
            bookStatusText.textContent = "Not Read";
            bookStatusText.classList.add("check-not-read")
        } else {
            bookStatusText.textContent = "Read";
            bookStatusText.classList.add("check-read")
        }
        bookStatus.appendChild(bookStatusText);
        bookRow.appendChild(bookStatus);
        //Delete a book
        const bookDelete = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-btn")
        deleteButton.textContent = "Delete";
        bookDelete.appendChild(deleteButton);
        bookRow.appendChild(bookDelete);
    }
}

function addBookToLibrary (title, author, pages, status) {
    const book = new Book(title, author, pages, status);
    myLibrary.push(book);
    showBooksInLibrary();
}

// FORM VALIDATION
function validateForm(event) {
    event.preventDefault();
    const form = document.querySelector('form');
    const titleInput = document.querySelector('#title');
    const authorInput = document.querySelector('#author');
    const pagesInput = document.querySelector('#pages');
    const checkbox = document.querySelector('input[name="checkbox"]');
    if (titleInput.value !== '' && authorInput.value !== '' && pagesInput.value !== '' && pagesInput.value > 0) {
        if (checkbox.checked) {
            addBookToLibrary(titleInput.value, authorInput.value, pagesInput.value, true);
        } else {
            addBookToLibrary(titleInput.value, authorInput.value, pagesInput.value, false);
        }
      form.reset();
    }
}

function listenClicks () {
    document.addEventListener("click", (event) => {
        const { target } = event;
        const tr = target.parentNode.parentNode.rowIndex - 1;
        if (target.id === "add-book") {
            validateForm(event);
        } else if (target.classList.contains("delete-btn")) {
            myLibrary.splice(tr, 1);
        } else if (target.classList.contains("check-read")) {
            target.classList.remove("check-read");
            target.classList.add("check-not-read");
            target.textContent = "Not Read";
            myLibrary[tr].status = false;
        } else if (target.classList.contains("check-not-read")) {
            target.classList.remove("check-not-read");
            target.classList.add("check-read");
            target.textContent = "Read";
            myLibrary[tr].status = true;
        }
        showBooksInLibrary();
    });
}

showBooksInLibrary();
listenClicks();
