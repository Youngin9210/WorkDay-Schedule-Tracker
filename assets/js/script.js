let currentDay = $("#currentDay");
let hours = [
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
let currentHour = moment().format("h a");
let timeBlock;
let hourEl;
let hourTask;
let saveBtn;
console.log(typeof currentHour);

// handle displaying the date
function displayTime() {
  var rightNow = moment().format("dddd, MMMM Do");
  currentDay.text(rightNow);
}
displayTime();

// function addScheduleContents() {
//
// }

let workDayContainer = $(".container");

function addHourRow(hour) {
  timeBlock = $("<div>").addClass("time-block row");
  hourEl = $("<p>")
    .addClass("hour col-2 d-flex align-items-center justify-content-center")
    .text(hour);
  hourTask = $("<textarea>").addClass("col-8");
  saveBtn = $("<button>").addClass("saveBtn col-2");
  let saveIcon = $("<i>").addClass("fas fa-save");

  workDayContainer.append(timeBlock);
  timeBlock.append(hourEl, hourTask, saveBtn);
  saveBtn.append(saveIcon);
}

function createWorkDay() {
  for (let i = 0; i < hours.length; i++) {
    addHourRow(hours[i]);
    if (hours[i] < currentHour) {
      hourTask.addClass("past");
    } else if (hours[i] === currentHour) {
      hourTask.addClass("present");
      console.log(hours[i]);
    } else if (hours[i] > currentHour) {
      hourTask.addClass("future");
    }
  }
}

createWorkDay();
