import $ from 'jquery';
import api from './api'
import store from './store'

const deleteBookmarks = api.deleteBookmarks
//create bookmark html for form
function createBookmarkElement(bookmark){
    console.log(bookmark)
    return `
    <section>
    <div class=" container  js-bookmark-element" data-item-id="${bookmark.id}">
    <div class="" role="tab">
      <h3 class="panel-title">
        <a href="#" class = "expand-button" bookmark-id = "${bookmark.id}">
          ${bookmark.title}
          <i class="bookmark-rating">${chessnutts(bookmark.rating)}</i>
        </a>
      </h3>
    </div>
    <div id="${bookmark.id}" class="js-bookmark-description${bookmark.expanded?"":" hidden"}" role="tabpanel">
      <div class="col-25">
        <p data-id="${bookmark.id}">${(bookmark.desc)}</p>
        <p><a data-id="${bookmark.id}" target="_blank" href="${bookmark.url}">Visit Site</a></p>
        <button type="button" class="btn btn-danger js-bookmark-delete" data-id="${bookmark.id}">Delete</button>
      </div>
    </div>
  </div>
  </div>
    
    `
}

function render(){
    renderError();
    let bookmark = store.bookmark.filter(bookmark => {
        return bookmark.rating >= store.minimumRating;
    });

    $('.js-bookmarks-list').html(generateBookmarksListString(bookmark));

    console.log(store.bookmark)

}
function getItemIdFromElement(bookmark){
    return $(bookmark)
    .closest('.js-bookmark-element')
    .data('item-id');
}

//create bookmark elements
function generateBookmarksListString(bookmarkList){
    const bookmark = bookmarkList.map(bookmark => createBookmarkElement(bookmark));
    return bookmark.join('')
}

//chessnutt rating**
function chessnutts(numChess){
    const nutHTML = '<i class="fas fa-grin-stars"></i>'



    let currentString = '';
    for (let i = 0; i < numChess; i++){
        currentString += nutHTML;
    }
    return currentString;
}

//listeners for form submission new submissions
function handleNewBookmarkSubmit(){
    $('#js-add-bookmark-form').submit(function(event){
      event.preventDefault();
      const chessnuttValue = {};
      chessnuttValue.title = $('.js-bookmark-title').val();
      chessnuttValue.url = $('.js-bookmark-url').val();
      chessnuttValue.desc = $('.js-bookmark-description').val();
      chessnuttValue.rating = $('.js-bookmark-rating').val();
      // $('#js-add-bookmark-form').trigger('reset');
      api.addBookmark(chessnuttValue)
        .then((newBookmark) => {
          store.addBookmark(newBookmark);
          render();
        })
        .catch((error) => {
         store.setError(error.message);
          renderError();
        });
    });
  }

function removeBookmarkWhenClicked() {
    $('.js-bookmarks-list').on('click', '.js-bookmark-delete', event => {
      const id = getItemIdFromElement(event.currentTarget);
      api.deleteBookmarks(id)
        .then(() => {
          store.findAndDelete(id);
          render();
        })
        .catch((error) => {
          console.log(err);
          store.setError(error.message);
          renderError();
        });
    });
  }
const handleToggleExpand =()=>{
    $("section").on("click",".expand-button",function(e){
        e.preventDefault();
        let id = $(this).attr("bookmark-id")
        store.findAndToggleExpanded(id)
        render()
    })
}
//error handling
function renderError(){
    if (store.error){
        $('.error-container').html(store.error);
    }else {
        $('.error-container').empty();
    }
}

function closeError(){
    $('.error-container').on('click','#cancel-error',() =>{
        store.setError(null);
        renderError();
    });
}




//filter the minimum rating
function minimumRatingHandler(){
    $('.js-bookmark-rating-filter').on('change', event =>{
        let rating = $(event.target).val();
        store.minimumRating =rating;
        render();
    });
}
//bind event listeners 
function bindEventListeners(){
    closeError();
    handleNewBookmarkSubmit();
    removeBookmarkWhenClicked();
    minimumRatingHandler();
    handleToggleExpand();

    
   
}

export default {
    bindEventListeners,
    render,


}
