body{
    background-color: #C8C8C8 ;
    display: flex;
    flex-direction: column;
}

/* submit button */
.sub-it{
    box-shadow: 5px 10px #888888;
    background-color:#DAF7A6;
    border: solid black ;
     border-radius: 15px;
}
h1{
    text-shadow: 2px 2px #888888;
}
.form-group{
    box-shadow: 2px #888888;
}


.container {
        border-radius: 5px;
        background-color: #f2f2f2;
        padding: 20px;
        text-align: center;
        box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}
input{
    width: 50%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: vertical;
    text-align: center;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}
  


.title{
    text-align: left;
}

.col-25 {
    text-align: center;
    margin-top: 6px;
    font-weight: bold;
    margin-top: 11px;

}           

  /* Clear floats */
  .row:after {
    content: "";
    display: table;
    clear: both;
    text-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24); ;
  }

.hidden{
    display: none;
}


@media screen and (min-width: 600px) {
    .container{ 
    border-radius: 5px;
    background-color: #f2f2f2;
    padding: 20px;
    margin: 2% 25% 0 25%;
    text-align: center;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
    }
}
