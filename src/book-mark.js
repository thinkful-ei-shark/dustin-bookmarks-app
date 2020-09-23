//create bookmark html
function createBookmarkElement(bookmark){
    return `
    <div class="panel panel-default js-bookmark-element" data-item-id="${bookmark.id}">
    <div class="panel-heading" role="tab">
      <h4 class="panel-title">
        <a role="button" data-toggle="collapse" data-parent="#accordion" href="#${bookmark.id}" aria-expanded="true" aria-controls="${bookmark.id}">
          ${bookmark.title}
          <span class="bookmark-rating">${stars(bookmark.rating)}</span>
        </a>
      </h4>
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