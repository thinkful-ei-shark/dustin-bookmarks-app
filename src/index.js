import $ from 'jquery';
import './bookmark.css';
import bookmark from './bookmark';
import store from './store';
import api from './api'

$(document).ready(function(){
 bookmark.bindEventListeners();

  api.getBookmarks()
 .then((bookmarks) => {
   bookmarks.forEach((bookmark) => store.addBookmark(bookmark));
   bookmark.render();
 })
    .catch(error => console.log(error.message));
});
bookmark.bindEventListeners();
bookmark.render();