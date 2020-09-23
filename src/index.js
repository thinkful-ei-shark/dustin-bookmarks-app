import $ from 'jquery';
import './bookmark.css'

function main() {
  console.log('DOM is loaded');
  api.getItems()
  .then((items) =>{
    items.forEach((item) => store.addItem(item));
    bookMarkedItem.render();
  });
  bookMark.bindEventListeners();
  bookMark.render();

  const startMsg = $('<p>Webpack is working!</p>');
  $('#root').append(startMsg);
}

$(main);