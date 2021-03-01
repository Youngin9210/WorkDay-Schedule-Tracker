// declaring global variables
let currentDay = $("#currentDay");
let workDayContainer = $(".container");
let currentHour;
let timeBlock;
let hourEl;
let hourTask;
let saveBtn;
let saveIcon;

// defining an array to be used later to compare to the hour of the day
let hours = [9, 10, 11, 12, 13, 14, 15, 16, 17];

// defining an array of strings to input as text value in time blocks
let workDayHours = [
  "9 am",
  "10 am",
  "11 am",
  "12 pm",
  "1 pm",
  "2 pm",
  "3 pm",
  "4 pm",
  "5 pm",
];

// handling displaying the date using moment.js
function displayTime() {
  // using moment.js to set current date format
  var rightNow = moment().format("dddd, MMMM Do");
  // printing date onto page
  currentDay.text(rightNow);
}

// calling the current date and displaying it on the page
displayTime();

// getting the current hour of day using moment.js
function now() {
  // turning hour of day from string to number
  currentHour = Number.parseInt(moment().format("H"));
}

// setting a function to create time block structure
function addTimeBlock(hour, idHour) {
  // creatiing timeblock div
  timeBlock = $("<div>").addClass("time-block row");

  // creating an paragraph element to display the hour of the time block
  hourEl = $("<p>")
    // adding classes from style.css and bootstrap cdn
    .addClass("hour col-2 d-flex align-items-center justify-content-center")
    // giving hourEl an id
    .attr("id", `taskHour${idHour}`)
    // setting the text of hourEl
    .text(hour);

  // creating a textarea to use to input task
  hourTask = $(
    "<textarea placeholder='Enter task to be completed...'>"
    // adding classes from style.css and bootstrap cdn
  ).addClass("col-8 textarea description text-dark");

  // creating a save button to save tasks
  // adding classes from style.css and bootstrap cdn
  saveBtn = $("<button>").addClass(
    "saveBtn col-1 d-flex align-items-center justify-content-center "
  );

  // creating a save icon using bootstrap classes
  saveIcon = $("<i>").addClass("fas fa-save fa-2x");

  // calling function to append elements to the html
  appendElements();

  // calling function to add a click listener to the saveBtn to save the task into localStorage
  saveBtnClick();
}

// setting a function to append elements to html
function appendElements() {
  // appending the time block element to be a child element of workDayContainer
  workDayContainer.append(timeBlock);

  // appending the hourEl hourTask and saveBtn elements to be a child elements of the time block element
  timeBlock.append(hourEl, hourTask, saveBtn);

  // appending the saveIcon element to be a child element of the saveBtn element
  saveBtn.append(saveIcon);
}

// setting a function to remove any classes tied to the hourTask element and adding whatever class is called into the function(cl)
function addClass(cl) {
  hourTask.removeClass("past");
  hourTask.removeClass("present");
  hourTask.removeClass("future");
  hourTask.addClass(cl);
}

// function to create time block elements via a for loop
function createWorkDay() {
  // calling a function to get the current hour
  now();

  // looping through an array to to create time blocks
  for (let i = 0; i < workDayHours.length; i++) {
    // calling addTimeBlock function from above to create time blocks
    addTimeBlock(workDayHours[i], i);
    // if the current index of hours is less than the currentHour...
    if (hours[i] < currentHour) {
      // then, add the class 'past' to the hourTask element to add styling
      addClass("past");
      // if current index of hours is strictly equal to currentHour...
    } else if (hours[i] === currentHour) {
      // then, add class 'present'
      addClass("present");
      // if current index of hours is greater than the currentHour...
    } else if (hours[i] > currentHour) {
      // then, add class 'past'
      addClass("future");
    }
  }

  // calling a function to get values from localStorage
  getTasks();
}

// function to be called on later to implement a click event on saveBtn
function saveBtnClick() {
  // adding a click event to saveBtn
  saveBtn.click(function (event) {
    // preventing default action
    event.preventDefault();
    // defining a variable referring to this(saveBtn) and using DOM Traversal to get the value of textarea
    let taskDesc = $(this).parent().children(".textarea").val();
    // defining a variable referring to this(saveBtn) and using DOM Traversal to get the text value of <p>
    let taskHour = $(this).parent().children(".hour").text();

    // setting items into localStorage using variables defined above
    // taskHour is key and taskDesc is value
    localStorage.setItem(taskHour, taskDesc);
  });
}

// creating a function to get tasks from localStorage and place them in the corresponding textarea
function getTasks() {
  // looping through localStorage
  $.each(localStorage, function (key, value) {
    // looping through hours array
    for (let i = 0; i < hours.length; i++) {
      // then defining a variable to equal the text value of the current <p> with an id taskHour[i]
      let hourID = $(`#taskHour${i}`).text();
      // if localStorage key === hourId...
      if (key === hourID) {
        // then, using DOM Traversal, setting the text value of the corresponding textarea to that key's value
        $(`#taskHour${i}`).parent().children(".textarea").val(value);
        return;
      }
    }
  });
}

// creating the html structure and placing any items in localStorage into the list
createWorkDay();
