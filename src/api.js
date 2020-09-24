

    const BASE_URL ='https://thinkful-list-api.herokuapp.com/dustin'

    const apiFetch = function(...arg){
        let error;
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
            if (err){
                err.message = data.message;
                return Promise.reject(err)
            }
            // return normal
            return data;
        });
    }
    // GET Function
    function getBookmarks(){
        return apiFetch(`${BASE_URL}/bookmark`);
      }
    function addBookmark(object){
        const newItem = JSON.stringify(object);
        return apiFetch(`${BASE_URL}/bookmark`,{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: newItem,
        });
    }
    // PATCh
    function editBookmark(id,updateData){
        const newItem = JSON.stringify(object);
        return apiFetch(`${BASE_URL}/bookmark`,{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: newData,
    });
    function deleteBookmarks(id){
        return fetch(`${BASE_URL}/bookmark/${id}`,{
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: ''
        });
    }
}
    export default {
        getBookmarks,
        addBookmark,
        editBookmark,
        deleteBookmarks
       
    }
    


