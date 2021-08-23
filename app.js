
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
            data.items.forEach(element => {
                results.push(element.volumeInfo)
                // console.log(results)
            } )
            
            //use results array to create li elements
            
            for (let i = 0; i < results.length; i++) {
                let currItem = results[i];
                console.log(currItem)
                //create li
              const li = document.createElement('li');
              li.setAttribute('class', 'col-8 list-group-item')
           
                //html templet for each book item
             li.innerHTML = `
                            <div class="row">
                                <div class="d-flex align-items-center col-12">
                                    <img class="flex-shrink-1 d-md-block d-sm-none  me-4" src="${currItem.imageLinks.thumbnail}" alt="">
                                    <div class="">
                                    <a href="${currItem.infoLink}" class=" me-auto text-decoration-none">
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
                                        <li><a class="preview dropdown-item" href="${currItem.previewLink}">Preview</a></li>
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
       
            }
            const myBooks = document.querySelectorAll('.my-books');
            const wish = document.querySelectorAll('.wish')
            
           
            const test = (e) => {
               for (let i = 0; i < results.length; i++) {
                   if (e.target.index === i) {
                       myList.push(results[i])
                   }
                   console.log(myList)
               }
                 
                   console.log(e.target.index)
            }
            
             myBooks.forEach((el, index) => {
                 el.addEventListener('click', test)
                 let count = 0;
                 count ++
                 el.index = index
                 
                })
   
        })}
}

//event listeners
searchBtn.addEventListener('click', fetchBooks)
