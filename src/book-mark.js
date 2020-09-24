//create bookmark html
function createBookmarkElement(bookmark){
    return `
    <div class="container">
    <div class="error-container"></div>
    <div class="row">
      <div class="col-xs-12 col-md-4 col-md-offset-4">
        <header role="banner">
          <h1>My Bookmarks</h1>
        </header>
      </div>
    </div>

    <!-- Add Bookmarks Form -->
    <section role="region">
      <div class="row">
        <div class="form-container col-xs-12 col-md-4 col-md-offset-4">
            <form id="js-add-bookmark-form">
              <div class="form-group">
                <label for="bookmark-title">Title</label>
                <input type="text" name="bookmark-title" class="form-control js-bookmark-title" placeholder="Enter a title" required aria-label="bookmark-title">
              </div>
              <div class="form-group">
                <label for="bookmark-url">URL ('https://' is required)</label>
                <input type="url" name="bookmark-url" class="form-control js-bookmark-url" placeholder="http(s)://" required aria-label="bookmark-url">
              </div>
              <div class="form-group">
                <label for="bookmark-description">Description</label>
                <input type="text" name="bookmark-description" class="form-control js-bookmark-description" placeholder="Enter a description..." required aria-label="bookmark-description">
              </div>
              <div class="form-group">
              <label for="rating">Rating</label>
              <select name="rating" class="js-bookmark-rating" aria-label="rating-dropdown">
                <option value="1">1-Star</option>
                <option value="2">2-Stars</option>
                <option value="3">3-Stars</option>
                <option value="4">4-Stars</option>
                <option value="5">5-Stars</option>
              </select>
              </div>
              <div class="form-group">
              <button type="submit" class="btn btn-success add-bookmark-button">Submit</button>
              </div>  
            </form>
        </div>
      </div>
    </section>

    <!-- Filter Minimum Rating -->
    <section role="region">
      <div class="row">
        <div class="col-xs-12 col-md-4 col-md-offset-4 rating-filter">
          Sort by bookmarks with at least:
          <select name="Rating filter" class="js-bookmark-rating-filter" aria-label="rating-filter-dropdown">
            <option value="1">1-Star</option>
            <option value="2">2-Stars</option>
            <option value="3">3-Stars</option>
            <option value="4">4-Stars</option>
            <option value="5">5-Stars</option>
          </select>
        </div>
      </div>
    </section>

  <!-- Bookmarks List -->
    <main role="main" aria-live="polite">
      <section role="region">
        <div class="row">
          <div class="col-xs-12 col-md-6 col-md-offset-3">
            <div class="panel-group bookmarks-list js-bookmarks-list" id="accordion" role="tablist" aria-multiselectable="true">
            </div>
          </div>
        </div>
      </section>
    </main>

  </div>
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

//chessnutt rating**
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
return {
    bindEventListeners,
    render

}
