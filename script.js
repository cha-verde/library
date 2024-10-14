const myLibrary = [];

const addBookButton = document.querySelector(".add-book-button");

const dialog = document.querySelector("dialog");

const addBookDialogButton = document.querySelector(".add-book-dialog-button");

const closeDialogButton = document.querySelector(".close-dialog-button");

const bookContainer = document.querySelector(".book-container");


function Book(name, author, year, pages, status) {
    this.name = name;
    this.author = author;
    this.year = year;
    this.pages = pages;
    this.status = status;
}


Book.prototype.changeRead = function () {
    this.status = "Read";
};

function displayBooks() {
    bookContainer.replaceChildren();
    if (myLibrary.length == 0) {
        const div = document.createElement("div");
        div.textContent = "You don't have any books at the moment."
        bookContainer.appendChild(div);
    }
    else {
        for (var i = 0; i < myLibrary.length; i++) {
            const bookCard = document.createElement("div");
            const removeButton = document.createElement("button");
            bookCard.setAttribute("class", "book-card");
            const bookInfo = document.createElement("div");
            const bookButtons = document.createElement("div");
            removeButton.textContent = "Remove";
            removeButton.setAttribute("class", "remove-book-button")
            removeButton.setAttribute("data-index-number", i);
            removeButton.setAttribute("class", "remove-button");

            for (var prop in myLibrary[i]) {
                if (prop != "changeRead") {
                    if (myLibrary[i][prop] !== "") {
                        bookInfo.appendChild(createDiv(i, prop))
                    }
                }
            }

            const readButton = document.createElement("button");
            readButton.setAttribute("data-index-number", i);
            readButton.setAttribute("class", "read-button");
            readButton.textContent = "Change to read";

            bookButtons.appendChild(readButton);
            bookButtons.appendChild(removeButton);
            bookCard.appendChild(bookInfo);
            bookCard.appendChild(bookButtons);
            bookContainer.appendChild(bookCard);
        }
    }
}

function createDiv(index, c) {
    const div = document.createElement("div");
    c == "pages" ? div.textContent = myLibrary[index][c] + " pages" : div.textContent = myLibrary[index][c];
    return div;
}

document.addEventListener('DOMContentLoaded', (event) => {
    displayBooks();
});

function addBookToLibrary() {
    const bookName = document.querySelector(".book-name").value;
    const bookAuthor = document.querySelector(".book-author").value;
    const bookYear = document.querySelector(".book-year").value;
    const bookPages = document.querySelector(".book-pages").value;
    const bookReadStatus = document.querySelector('input[name="book-status"]:checked').value;
    myLibrary.push(new Book(bookName, bookAuthor, bookYear, bookPages, bookReadStatus));

}


addBookButton.addEventListener("click", () => {
    dialog.showModal();
});


closeDialogButton.addEventListener("click", () => {
    dialog.close();
});

addBookDialogButton.addEventListener("click", (e) => {
    e.preventDefault();
    const bookName = document.querySelector(".book-name").value;
    if (bookName != "") {
        addBookToLibrary();
        dialog.close();
        displayBooks();
    }
    else {
        alert("Please fill the name field.")
    }

})

document.addEventListener("click", (e) => {
    if (e.target && e.target.className == "remove-button") {
        myLibrary.splice(+e.target.dataset.indexNumber, 1);
        displayBooks();
    }

    if (e.target && e.target.className == "read-button") {

        var obj = myLibrary[e.target.dataset.indexNumber];
        console.log(obj);
        obj.changeRead();
        displayBooks();
        console.log(obj);
    }

});