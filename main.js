// Constructor
function Book(name, author, pages) {
  this.name = name;
  this.author = author;
  this.pages = pages;
}

// Display Constructor
function Display() {}

// Add methods to display prototype
Display.prototype.add = function (book) {
  console.log('Adding to UI');

  const tableBody = document.querySelector('#tableBody');
  const uiString = `<tr>                    
                    <td data-label="Name">${book.name}</td>
                    <td data-label="Author">${book.author}</td>
                    <td data-label="Pages">${book.pages}</td>
                    <td><button class="delete">Delete</button></td>
                  </tr>`;
  tableBody.innerHTML += uiString;
};

// Implement the clear function
Display.prototype.clear = function () {
  const libraryForm = document.querySelector('#libraryForm');
  libraryForm.reset();
};

// Implement the validate function
Display.prototype.validate = function (book) {
  if (book.name.length < 2 || book.author.length < 2 || book.pages === '') {
    return false;
  }
  return true;
};

Display.prototype.show = function (type, message) {
  const msg = document.querySelector('#msg');
  msg.innerHTML = `<strong>${type} ${message}</strong>
                   <button id="close">x</button>`;
  setTimeout(() => {
    msg.innerHTML = '';
  }, 2000);
};

// Add submit event listener to form
const libraryForm = document.querySelector('#libraryForm');

function libraryFormSubmit(e) {
  console.log('You have submitted library form');
  const name = document.getElementById('bookName').value;
  const author = document.getElementById('authorName').value;
  const pages = document.getElementById('pages').value;
  const book = new Book(name, author, pages);
  console.log(book);

  const display = new Display();

  if (display.validate(book)) {
    display.add(book);
    display.clear();
    display.show('Success', 'Your book has been successfully added.');
  } else {
    // Show error to the user
    display.show('Error', 'You cannot add this book.');
  }

  e.preventDefault();
}

libraryForm.addEventListener('submit', libraryFormSubmit);
