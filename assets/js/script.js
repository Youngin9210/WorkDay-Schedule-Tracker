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
    .addClass("hour col-2 d-flex align-items-center justify-content-center")
    .attr("id", `taskHour${idHour}`)
    .text(hour);

  // creating a textarea to use to input task
  hourTask = $(
    "<textarea placeholder='Enter task to be completed...'>"
  ).addClass("col-8 textarea description text-dark");

  // creating a save button to save tasks
  saveBtn = $("<button>").addClass("saveBtn col-1");

  // creating a save icon using bootstrap classes
  saveIcon = $("<i>").addClass("fas fa-save fa-2x");

  // calling function to append elements to the html
  appendElements();

  // calling function to add a click listener to the saveBtn to save the task into localStorage
  saveBtnClick();
}

// setting a function to append elements to html
function appendElements() {
  //
  workDayContainer.append(timeBlock);
  timeBlock.append(hourEl, hourTask, saveBtn);
  saveBtn.append(saveIcon);
}

function addClass(cl) {
  hourTask.removeClass("past");
  hourTask.removeClass("present");
  hourTask.removeClass("future");
  hourTask.addClass(cl);
}

function createWorkDay() {
  now();
  for (let i = 0; i < workDayHours.length; i++) {
    addTimeBlock(workDayHours[i], i);
    if (hours[i] < currentHour) {
      addClass("past");
    } else if (hours[i] === currentHour) {
      addClass("present");
    } else if (hours[i] > currentHour) {
      addClass("future");
    }
  }
  getTasks();
}

function saveBtnClick() {
  saveBtn.click(function (event) {
    event.preventDefault;

    let taskDesc = $(this).parent().children(".textarea").val();
    let taskHour = $(this).parent().children(".hour").text();

    localStorage.setItem(taskHour, taskDesc);
  });
}

function getTasks() {
  $.each(localStorage, function (key, value) {
    for (let i = 0; i < hours.length; i++) {
      let hourID = $(`#taskHour${i}`).text();
      if (key === hourID) {
        $(`#taskHour${i}`).parent().children(".textarea").val(value);
      }
    }
  });
}

createWorkDay();
