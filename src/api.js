
const corsURL = "https://cors-anywhere.herokuapp.com/"
const apiURL = "https://thinkful-list-api.herokuapp.com/dustin"
    const BASE_URL = apiURL

    const apiFetch = function(...arg){
        let error;
        // const proxyurl = "https://cors-anywhere.herokuapp.com/"; 
        // const url = "https://example.com"; // site that doesn’t send Access-Control-* 
        // fetch(proxyurl + url)
        return fetch(...arg)
        .then(response => {
            if(!response.ok){
                error = { code: response.status};
                if(!response.headers.get('content-type').includes('json')){
                    error.message = response.statusText;
                    return Promise.reject(error);
                }
            }
            return response.json();
        })
        .then(data =>{
            if (error){
                error.message = data.message;
                return Promise.reject(error)
            }
            // return normal
            return data;
        });
    }
    // GET Function
    function getBookmarks(){
        return apiFetch(`${BASE_URL}/bookmarks`);
      }
    function addBookmark(object){
        const newItem = JSON.stringify(object);
        return apiFetch(`${BASE_URL}/bookmarks`,{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: newItem,
        });
    }
    // PATCH
    function editBookmark(id,updateData){
        const newItem = JSON.stringify(object);
        return apiFetch(`${BASE_URL}/bookmarks`,{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: newData,
    });
}
    function deleteBookmarks(id){
        return apiFetch(`${BASE_URL}/bookmarks/${id}`,{
            method: 'DELETE',
          
        });
    }

    export default {
        getBookmarks,
        addBookmark,
        editBookmark,
        deleteBookmarks
       
    }
    


