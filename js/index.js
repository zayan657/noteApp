console.log("Welcome to Mi note App");
displayNotes();
let addBtn=document.getElementById("addBtn");
addBtn.addEventListener("click",function(){
    let inputText=document.getElementById("addText");
    let notes=localStorage.getItem("notes");
    if(notes==null){
        notesList=[];
    }
    else{
        notesList=JSON.parse(localStorage.getItem("notes"));
    }
    notesList.push(inputText.value);
    localStorage.setItem("notes",JSON.stringify(notesList));
    inputText.value="";
    displayNotes();
    showAlert('success','Your note added successfully.')
})
function displayNotes(){
    let notes=localStorage.getItem("notes");
    if(notes==null){
        notesList=[];
    }
    else{
        notesList=JSON.parse(localStorage.getItem("notes"));
    }
    let html="";
    notesList.forEach(function(element,index) {
        html+=`<div class="card mx-2 my-2 notecard" style="width: 21rem;">
        <div class="card-body">
          <h5 class="card-title">Card ${index+1}</h5>
          <p class="card-text">${element}</p>
          <button id="${index}" onclick="deleteNotes(this.id)" class="btn btn-dark btn-sm">Delete</button>
        </div>
      </div>`;
    });
    let notesElem=document.getElementById("notes");
    if(notesList.length==0){
        notesElem.innerHTML=`Nothing to Show!`;
    }
    else{
        notesElem.innerHTML=html;
    }
}


function showAlert(type,msg){
    let alert=document.getElementById("alert");
    let html=` <div class="alert alert-${type} alert-dismissible fade show" role="alert">
    <strong>${type}</strong>: ${msg}.
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`;
   alert.innerHTML=html;

   setTimeout(() => {
       alert.innerHTML="";
   }, 2000);
}

function deleteNotes(i){
    let notes=localStorage.getItem("notes");
    if(notes==null){
        notesList=[];
    }
    else{
        notesList=JSON.parse(localStorage.getItem("notes"));
    }
    notesList.splice(i,1);
    localStorage.setItem("notes",JSON.stringify(notesList));
    displayNotes();
    showAlert('success','Your note has been deleted Successfully.')
}

let search=document.getElementById("searchText");
search.addEventListener("input",function(){
 let inputValue=search.value;
let cards=document.getElementsByClassName("notecard");
Array.from(cards).forEach(function(element){
    cardText=element.getElementsByTagName("p")[0].innerHTML;
    if(cardText.includes(inputValue.toLowerCase())){
        element.style.display="block";
    }
    else{
        element.style.display="none";
    }
});

});

  
  