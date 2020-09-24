import $ from 'jquery';
import './bookmark.css';
import bookmark from './bookmark';
import store from './store';
import API from './api'

$(document).ready(function(){
 bookmark.bindEventListeners();

  API.getBookmarks()
    .then((bookmark) => {
      bookmark.forEach((bookmark) => STORE.addBookmark(bookmark));
      bookmark.render();
    })
    .catch(err => console.log(err.message));
});