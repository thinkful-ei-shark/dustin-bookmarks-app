import $ from 'jquery';
import api from './api'
import store from './store'

const deleteBookmarks = api.deleteBookmarks
//create bookmark html for form


const generateForm = function(){
  // if(store.appStarted){
  //   return ""
  // }
  store.appStarted = true
  return `
  <div class="container">
  <header class="banner">
          <h1>The Greatest Bookmark app I've Ever Created</h1>
      <form id="js-add-bookmark-form">
      <div class="row">
      <div class="col-25">
        <label for="bookmark-title">Title</label>
      </div>
      <div class="col-75">
      <input type="text" id="bookmark-title" name="bookmark-title" class="form-control js-bookmark-title" placeholder="Enter a title" required aria-label="bookmark-title">
      </div>
      </div>
      <div class="row">
      <div class="col-25">
        <label for="bookmark-url">URL ('https://' is required)</label>
      </div>
      <div class="col-75">
        <input type="url" id="bookmark-url" name="bookmark-url" class="form-control js-bookmark-url" placeholder="http(s)://" required aria-label="bookmark-url">
      </div>
      </div>
      <div class="row">
      <div class="col-25">
        <label for="bookmark-description">Description</label>
      </div>
      <div class="col-75">
        <input type="text" id="bookmark-description" name="bookmark-description" class="form-control js-bookmark-description" placeholder="Enter a description..." required aria-label="bookmark-description">
      </div>
      </div>

      <div class="row">
      <div class="col-25">
        <select name="rating" class="js-bookmark-rating" aria-label="rating-dropdown">
          <option value="1">1-Chessnutt</option>
          <option value="2">2-Chessnutts</option>
          <option value="3">3-Chessnutts</option>
          <option value="4">4-Chessnutts</option>
          <option value="5">5-Chessnutts</option>
        </select>
        <div class="enter">
          <button type="submit" class="sub-it">Submit</button>
          </div>  
      </div>
      <section class="container">
      <div class="drop">
        <div>
          Sort by Chessnuttst:
          <select name="Rating filter" class="js-bookmark-rating-filter" aria-label="rating-filter-dropdown">
            <option value="1">1-Chessnutt</option>
            <option value="2">2-Chessnutts</option>
            <option value="3">3-Chessnutts</option>
            <option value="4">4-Chessnutts</option>
            <option value="5">5-Chessnutts</option>
          </select>
        </div>
      </div>
    </section>

      </form>
    
      </div> 
 

  
  
  
  `
}



function createBookmarkElement(bookmark){
    console.log(bookmark)
    return `
    
    
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
  
    
    `
}




function render(){
    renderError();
    let bookmark = store.bookmark.filter(bookmark => {
        return bookmark.rating >=  store.minimumRating;
    });
    let page = generateForm();
    page +=generateBookmarksListString(bookmark);
    $('main').html(page);
    $(`.js-bookmark-rating-filter option[value='${store.minimumRating}']`).prop("selected", true)
    bindEventListeners();
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
    const nutHTML = '<i class="fa fa-thumbs-up"></i>'
    let currentString = '';
    for (let i = 0; i < numChess; i++){
        currentString += nutHTML;
    }
    return currentString;
}

//listeners for form submission new submissions
function handleNewBookmarkSubmit(){
    $('main').submit(function(event){
      event.preventDefault();
      const chessnuttValue = {};
      chessnuttValue.title = $('.js-bookmark-title').val();
      chessnuttValue.url = $('.js-bookmark-url').val();
      chessnuttValue.desc = $('.js-bookmark-description').val();
      chessnuttValue.rating = $('.js-bookmark-rating').val();
      $("#js-add-bookmark-form").trigger("reset")
 

     
      
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
    $('main').on('click', '.js-bookmark-delete', event => {
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
    $("main").on("click",".expand-button",function(e){
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
      store.minimumRating = rating;
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
