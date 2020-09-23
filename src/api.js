

const API = function(){
    const BASE_URL ='https://thinkful-list-api.herokuapp.com/dustin'

    const apiFetch = function(...arg){
        let error;
        return fetch(...arg)
        .then(response =>{
            if(!response.ok){
                error { code: response.status};
                if(!response.headers.get('content-type').includes('json')){
                    error.message = response.statusText;
                    return Promise.reject(error);
                }
            }
            return response.json();
        })
    }
}