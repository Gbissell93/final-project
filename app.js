// Selectors
const search = document.querySelector("#search");
const searchBtn = document.querySelector("#search-btn");
const searchResults = document.querySelector("#search-results");
const sideList = document.querySelector("#my-list");
const clearListBtn = document.querySelector("#clear-list");
let dt = 0;
let myList = [];
let results = [];

//Check page for local storage then populate myList
const storedList = JSON.parse(localStorage.getItem("myList"));

if (storedList) {
  storedList.forEach((element) => {
    myList.push(element);
    updateList();
  });
}

//Functions

//function for clear list button
function clearList() {
    sideList.innerHTML = '';
    myList = [];
    localStorage.clear();
}

//updates my list and local storage //creates book items in DOM
function updateList() {
  dt++;
  const newBook = myList[myList.length - 1];
  console.log("new book", newBook);
  const div = document.createElement("div");
  div.setAttribute("class", "list-group-item border-0");
  div.innerHTML = ` 
    <div class="accordion">
        <div class="accordion-item">
        <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${dt}" aria-expanded="false" aria-controls="collapse-${dt}">
            ${newBook.title}
            </button>
        </h2>
        <div id="collapse-${dt}" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
            <div class="accordion-body d-flex justify-content-start">
            <img src="${newBook.imageLinks.thumbnail}">
            <div class="d-flex flex-column justify-content-center mt-5 ms-2">
            <div class="mb-1">${newBook.authors}</div>
            <div>${newBook.publishedDate.toLocaleString("en-US")}</div>
            <div class="mt-3"><a href="book.html">Preview</a></div>
            </div>
            </div>
        </div>
        </div>
</div>`;

  sideList.appendChild(div);

  //store new array in local storage
  localStorage.setItem("myList", JSON.stringify(myList));
}

const fetchBooks = () => {
  //empty results array on function call
  results = [];

  if (search.value === "" || search.value === null) {
    searchResults.innerHTML =
      '<div class = "h2 text-center mt-5"> No results found<div>';
  }

  //clear search results each time function is called
  else {
    searchResults.innerHTML = "";

    //fetch google books data based on search value
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${search.value}`)
      .then((rawData) => {
        return rawData.json();
      })
      //loop through data and populate results array
      .then((data) => {
        data.items.forEach((element) => {
          results.push(element.volumeInfo);
          // console.log(results)
          console.log(element);
        });

        //use results array to create li elements

        for (let i = 0; i < results.length; i++) {
          let currItem = results[i];

          //create url for preview viewer
          if (currItem.industryIdentifiers) {
            const isbn = currItem.industryIdentifiers[1].identifier;
            const previewURL = `book.html?isbn=` + isbn;

            console.log("preview", previewURL);

            //create li
            const li = document.createElement("li");
            li.setAttribute("class", "col-8 list-group-item");

            //html templet for each book item
            li.innerHTML = `
                            <div class="row">
                                <div class="d-flex align-items-center col-12">
                                    <a href="${currItem.infoLink}"><img class="flex-shrink-1 d-md-block d-sm-none  me-4" src="${currItem.imageLinks.thumbnail}" alt=""></a>
                                    <div class="">
                                    <a href="${currItem.infoLink}"  target="_blank" class=" me-auto text-decoration-none">
                                        <div class="h3">${currItem.title}</div>
                                    </a>
                                    <div class=" fw-lighter fs-6 ">by ${currItem.authors}</div>
                                    <div class=" fw-lighter fs-6>${currItem.publisher}</div>
                                    <div class=" fw-lighter fs-6>${currItem.publishedDate}</div>
                                    <div class=" btn-group dropend">
                                        <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                        Actions
                                        </button>
                                        <ul class="dropdown-menu">
                                        <li><a class="preview dropdown-item" target="_blank" href="${previewURL}">Preview</a></li>
                                        <li><a class="my-books dropdown-item" href="#">Add to My Books</a></li>
                                        </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                                
                                  
                                `;

            //append li to results element
            searchResults.appendChild(li);

            //selectors for newly created elements

            //event listeners for each wish and myBooks element
          }
        }
        const myBooks = document.querySelectorAll(".my-books");

        const addToList = (e) => {
          for (let i = 0; i < results.length; i++) {
            if (e.target.index === i) {
              myList.push(results[i]);
            }
            console.log("mylist", myList);
          }
          updateList();
          console.log(e.target.index);
        };

        myBooks.forEach((el, index) => {
          el.addEventListener("click", addToList);
          let count = 0;
          count++;
          el.index = index;
        });
      });
  }
};

//event listeners
searchBtn.addEventListener("click", fetchBooks);
clearListBtn.addEventListener("click", clearList)
