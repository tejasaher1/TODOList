let itemArray = [];
let latestCount = 0;
let arrayOfli = [];

// -------------------------------------------------------------------------------------------------------------
//Storing list items in Local Storage

window.onload = function () {
  loadListItems();
};

// Adding or rendering items in DOM structure-
function renderUI(textObj) {
  var li = document.createElement("li");
  li.id = textObj.id;
  li.innerHTML = `

              <input type="checkbox" class="custom-checkbox" id="${
                textObj.id
              }" ${textObj.isDone ? "checked" : ""}>
              <label id="mainText" for="${textObj.id}"> ${
    textObj.text
  } </label>  
              <i class="fa-solid fa-trash-can" style="color: #f001fe;" id="deleteIcon" data-id="${
                textObj.id
              }"></i>`;

  list.prepend(li);
}

// Function to load existing list items from localStorage
function loadListItems() {
  var storedItems = localStorage.getItem("myListItems");
  if (storedItems) {
    // document.getElementById("listItem").innerHTML = storedItems;
    let a = JSON.parse(storedItems);
    itemArray = a;
    a.forEach(function (textObj) {
      renderUI(textObj);
    });
    //Update count
    var newList = list.querySelectorAll("li");
    counter.textContent = newList.length;
    let readCompleteCount = 0,
      readPendingCount = 0;
    itemArray.forEach(function (textObj) {
      if (textObj.isDone) {
        readCompleteCount++;
      } else {
        readPendingCount++;
      }
    });
    completeTaaskCount.textContent = readCompleteCount;
    pendingTaskCount.textContent = readPendingCount;
  }
}

// Saving itemArray list in local storage using localStorage.setItem -
function saveListItems() {
  var listItems = document.getElementById("listItem").innerHTML;
  localStorage.setItem("myListItems", JSON.stringify(itemArray));
  // localStorage.setItem("myListItems", listItems);
}

// -------------------------------------------------------------------------------------------------------------
// Delete
// Here we take ID of the item from handleClick function and remove it from DOM and localStorage -
function deleteItemFromList(taskid) {
  var RlistItem = document.getElementById(taskid);
  RlistItem.remove(); // Remove the list item from the DOM
  saveListItems();
  latestCount = parseInt(counter.textContent);
  counter.textContent = latestCount - 1;

  var element = itemArray.filter(function (item) {
    return item.id == taskid;
  });

  // Delete the list item from itemArray array list.
  var index = itemArray.findIndex(function (item) {
    return item.id == taskid;
  });

  if (index !== -1) {
    // Remove the item from the array
    var removedElement = itemArray.splice(index, 1)[0]; // Removed element
    // Save the updated array to localStorage
    saveListItems();
  } else {
    console.log("Element not found");
  }

  if (!element[0].isDone) {
    console.log(element[0].isDone);
    pendingCount = parseInt(pendingTaskCount.textContent);
    pendingTaskCount.textContent = pendingCount - 1;
  } else {
    completeTaaskCount.textContent =
      parseInt(completeTaaskCount.textContent) - 1;
  }

  saveListItems();
}

// -------------------------------------------------------------------------------------------------------------
// Create
var clickButton = document.getElementById("button");
var text = document.getElementById("item");
var list = document.getElementById("listItem");
var counter = document.getElementById("tasks-counter");
var completeTaaskCount = document.getElementById("complete-task-counter");
var pendingTaskCount = document.getElementById("pending-tasks-counter");

function createListAll(textObj) {
  renderUI(textObj);
  // arrayOfli.push(li);
  text.value = "";
  saveListItems();
}

function createTask(e) {
  if (e.target.id === "button" || e.key === "Enter") {
    if (text.value) {
      var textObj = {
        text: text.value,
        id: Date.now().toString(),
        isDone: false,
      };
      itemArray.push(textObj);
      createListAll(textObj);
      latestCount = parseInt(counter.textContent);
      pendingCount = parseInt(pendingTaskCount.textContent);
      counter.textContent = latestCount + 1;
      pendingTaskCount.textContent = pendingCount + 1;
    } else {
      alert("Kindly enter task");
    }
  }
}
// -------------------------------------------------------------------------------------------------------------

//Toggle the status of tasks that are clicked by user -

function toggleTask(taskId) {
  let foundItem;
  itemArray.forEach(function (item) {
    if (item.id === taskId) {
      item.isDone = !item.isDone;
      saveListItems();
      foundItem = item;
    }
  });
  //Below Code for task counting -
  var count = parseInt(completeTaaskCount.textContent);
  if (foundItem.isDone === true) {
    completeTaaskCount.textContent = count + 1;
    pendingTaskCount.textContent =
      counter.textContent - completeTaaskCount.textContent;
  } else {
    completeTaaskCount.textContent = count - 1;
    pendingTaskCount.textContent =
      counter.textContent - completeTaaskCount.textContent;
  }

  return;
}

// -------------------------------------------------------------------------------------------------------------

function handleClickListener(e) {
  var target = e.target;
  if (target.id === "deleteIcon") {
    deleteItemFromList(target.dataset.id);
  } else if (target.className === "custom-checkbox") {
    toggleTask(target.id);
  }
}

text.addEventListener("keyup", createTask);
clickButton.addEventListener("click", createTask);
document.addEventListener("click", handleClickListener);

// -------------------------------------------------------------------------------------------------------------

/// Function to check All, complete and Pending tasks status -

document.addEventListener("DOMContentLoaded", function () {
  const customSelect = document.querySelector(".custom-select");
  const selectedOption = document.querySelector(".selected-option");
  const selectOptions = document.querySelectorAll(".select-options li");

  selectOptions.forEach((option) => {
    option.addEventListener("click", function () {
      selectedOption.textContent = option.textContent;
      if (option.textContent === "All") {
        list.innerHTML = "";
        itemArray.forEach(function (textObj) {
          renderUI(textObj);
        });
      } else if (option.textContent === "Complete") {
        var checkCount = 0;
        list.innerHTML = "";
        if (itemArray.length > 0) {
          itemArray.forEach(function (textObj) {
            if (textObj.isDone) {
              renderUI(textObj);
              checkCount++;
            }
          });
          selectedOption.textContent = `Completed - ${checkCount}`;
        }
      } else {
        list.innerHTML = "";
        if (itemArray.length > 0) {
          var checkCount = 0;
          itemArray.forEach(function (textObj) {
            if (!textObj.isDone) {
              renderUI(textObj);
              checkCount++;
            }
          });
          selectedOption.textContent = `Pending - ${checkCount}`;
        }
      }
    });
  });
});
