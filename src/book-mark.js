//create bookmark html
function createBookmarkElement(bookmark){
    return `
    <div class="panel panel-default js-bookmark-element" data-item-id="${bookmark.id}">
    <div class="panel-heading" role="tab">
      <h3 class="panel-title">
        <a role="button" data-toggle="collapse" data-parent="#accordion" href="#${bookmark.id}" aria-expanded="true" aria-controls="${bookmark.id}">
          ${bookmark.title}
          <span class="bookmark-rating">${stars(bookmark.rating)}</span>
        </a>
      </h3>
    </div>
    <div id="${bookmark.id}" class="panel-collapse collapse" role="tabpanel">
      <div class="panel-body">
        <p data-id="${bookmark.id}">${bookmark.description}</p>
        <p><a data-id="${bookmark.id}" target="_blank" href="${bookmark.url}">Visit Site</a></p>
        <button type="button" class="btn btn-danger js-bookmark-delete" data-id="${bookmark.id}">Delete</button>
      </div>
    </div>
  </div>
    
    `
}

//create bookmark elements
function generateBookmarksListString(bookmarkList){
    const bookmarks =boomarksList.map(bookmark => generateBookmarkElement(bookmark));
    return bookmarks.join('')
}

//chessnutt rating
function chessnutts(numChess){
    const nutHTML = '<span class ="chessnuttrating"</span>'

    let currentString = '';
    for (let i = 0; i < numChess; i++){
        currentString += nutHTML;
    }
    return currentString;
}

//listeners for form submission
function bookmarkSubmit(){
    $('#js-add-bookmark-form').submit(function(event){
        event.preventDefault();
        const values = {};
        values.title = $('.js-bookmark-title').val();
        values.url =  $('.js-bookmark-url').val();
        values.description = $('.js-bookmark-description').val();
        values.rating = $('.js-bookmark-rating').val();
        API.addBookmark(values)
        .then((newBookmark) => {
          STORE.addBookmark(newBookmark);
         render();                   
    })
    .catch((err) => {
        STORE.setError(err.message);
        renderError();
      });
  });
    
}



//error handling
function renderError(){
    if (STORE.error){
        const err = generateError(STORE.error);
        $('.error-container').html(err);
    }else {
        $('.error-container').empty();
    }
}

function closeError(){
    $('.error-container').on('click','#cancel-error',() =>{
        STORE.setError(null);
        renderError();
    });
}

function render(){
    renderError();
    let bookmarks = STORE.bookmarks.filter(bookmark => {
        return bookmark.rating >= STORE.minimumRating;
    });

    $('.js-bookmarks-list').html(generateBookmarksListString(bookmarks));
}

function getIdFromElement(bookmark){
    return $(bookmark)
    .closest('.js-bookmark-element')
    .data('item-id');
}


//filter the minimum rating
function minimumRatingHandler(){
    $('.js-bookmark-rating-filter').on('change', event =>{
        let rating = $(event.target).val();
        STORE.minimumRating =rating;
        render();
    });
}

//bind event listeners 
