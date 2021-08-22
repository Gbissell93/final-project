
// Selectors 
const search = document.querySelector('#search');
const searchBtn = document.querySelector('#search-btn');
const searchResults = document.querySelector('#search-results');
const myList = [];
const wishList = [];
let results = []



//Functions
const fetchBooks = () => {
    //empty results array on function call
    results = [];

    if (search.value === '' || search.value === null) {
       searchResults.innerHTML = '<div class = "h2 text-center mt-5"> No results found<div>'
    }

    else

    //clear search results each time function is called
    {searchResults.innerHTML = ''
    
    //fetch google books data based on search value
   fetch(`https://www.googleapis.com/books/v1/volumes?q=${search.value}`)
        .then( (rawData) => {
            return rawData.json()
        })
        //loop through data and populate results array
        .then((data) => {
           for (let i = 0; i < data.items.length; i++) {
                const bookItem = data.items[i].volumeInfo;
                results.push(bookItem)
            }
            
            //use results array to create li elements
            results.forEach((el, index) => {
                //create li
              const li = document.createElement('li');
              li.setAttribute('class', 'col-8 list-group-item')
           
                //html templet for each book item
             li.innerHTML = `
                            <div class="row">
                                <div class="d-flex align-items-center col-12">
                                    <img class="flex-shrink-1 d-md-block d-sm-none  me-4" src="${el.imageLinks.thumbnail}" alt="">
                                    <div class="">
                                    <a href="" class=" me-auto text-decoration-none">
                                        <div class="h3">${el.title}</div>
                                    </a>
                                    <div class=" fw-lighter fs-6 ">by ${el.authors}</div>
                                    <div class=" fw-lighter fs-6>${el.publisher}</div>
                                    <div class=" fw-lighter fs-6>${el.publishedDate}</div>
                                    <div class=" btn-group dropend">
                                        <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                        Actions
                                        </button>
                                        <ul class="dropdown-menu">
                                        <li><a class="preview dropdown-item" href="#">Preview</a></li>
                                        <li><a class="wish dropdown-item" href="#">Add to wish list</a></li>
                                        <li><a class="my-books dropdown-item" href="#">Add to My Books</a></li>
                                        </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                                
                                  
                                `

            //append li to results element
         searchResults.appendChild(li)

            //selectors for newly created elements
      
         //event listeners for each wish and myBooks element
     
            })
            const myBooks = document.querySelectorAll('.my-books');
            const wish = document.querySelectorAll('.wish')
            
           
            const addToList = (e) => {
                myList.push(e.target)
                console.log(myList) 
            }
            myBooks.forEach((el) => el.addEventListener('click', addToList))
   
        })}
}

//event listeners
searchBtn.addEventListener('click', fetchBooks)
