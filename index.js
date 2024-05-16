// let forAdd = document.getElementById('Add');
// forAdd.addEventListener('click', function(){
//     let item = document.getElementById('item');
//     let itemText = item.value;
//     console.log(itemText);
   
//         let li = document.createElement("li");
//         li.textContent = itemText + "";
//         let newChild = document.getElementById('itemAdd').appendChild(li);
//         item.value = '';
// });


let itemArray = [];
let latestCount=0;


// -------------------------------------------------------------------------------------------------------------
//Storing list items in Local Storage


window.onload = function() {
   loadListItems();
};


// Function to load existing list items from localStorage
function loadListItems() {
   var storedItems = localStorage.getItem("myListItems");
   // console.log(storedItems);
   if (storedItems) {
       document.getElementById("listItem").innerHTML = storedItems;
       
       //Update count
       var newList = list.querySelectorAll('li');
       counter.textContent = newList.length;
   }
}
function saveListItems() {
   var listItems = document.getElementById("listItem").innerHTML;
   localStorage.setItem("myListItems", listItems);
}


// -------------------------------------------------------------------------------------------------------------
// Delete


function deleteItemFromList(taskid){
   var RlistItem = document.getElementById(taskid);
   RlistItem.remove(); // Remove the list item from the DOM
   latestCount = parseInt(counter.textContent);
   counter.textContent = latestCount - 1;
   saveListItems();
}


// -------------------------------------------------------------------------------------------------------------
// Create
var clickButton = document.getElementById('button');
var text = document.getElementById('item');
var list = document.getElementById('listItem');
var counter = document.getElementById('tasks-counter');


function createListAll(textObj){
   var li = document.createElement("li");
   li.id = textObj.id;
   li.innerHTML = `


           <input type="checkbox" class="custom-checkbox" id="${textObj.id}" ${textObj.isDone ? 'checked': ''}>
           <label id="mainText" for="${textObj.id}"> ${textObj.text} </label>  
           <i class="fa-solid fa-trash-can" style="color: #02225a;" id="deleteIcon" data-id="${textObj.id}"></i>


   `;
           
   
   list.prepend(li); 
   text.value = "";
   saveListItems();


}


function createTask(e) {
   if(e.target.id === 'button'  || e.key === 'Enter'){


       if(text.value){
           var textObj = {
               text:text.value,
               id: Date.now().toString(),
               isDone : false
           }
           itemArray.push(textObj);
           createListAll(textObj);
           latestCount = parseInt(counter.textContent);
           counter.textContent = latestCount + 1;
       }else{
           alert('Kindly enter task');
       }


   }
}
// -------------------------------------------------------------------------------------------------------------
//Comment 




// -------------------------------------------------------------------------------------------------------------
//Toggle 


function toggleTask(taskId){
   var sortObj = itemArray.filter(function(item){
       return item.id === taskId;
   });
   sortObj[0].isDone = !sortObj.isDone;    // sortObj is a array of obj so thats why sortObj[0].
   return;
}


// -------------------------------------------------------------------------------------------------------------




function handleClickListener(e){
   var target = e.target;
   if(target.id === 'deleteIcon'){
       deleteItemFromList(target.dataset.id)
   }else if(target.className === 'custom-checkbox'){
       toggleTask(target.id);
   }
}


text.addEventListener('keyup',createTask);
clickButton.addEventListener('click', createTask);
document.addEventListener('click', handleClickListener);


