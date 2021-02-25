let currentDay = $("#currentDay");
let workDayContainer = $(".container");
let hours = [9, 10, 11, 12, 13, 14, 15, 16, 17];
let currentHour = Number.parseInt(moment().format("H"));
let timeBlock;
let hourEl;
let hourTask;
let saveBtn;

// handle displaying the date
function displayTime() {
  var rightNow = moment().format("dddd, MMMM Do");
  currentDay.text(rightNow);
}
displayTime();

function addHourRow(hour, dataHour) {
  timeBlock = $("<div>").addClass("time-block row");
  workDayContainer.append(timeBlock);
  hourEl = $("<p>")
    .addClass("hour col-2 d-flex align-items-center justify-content-center")
    .text(hour);
  timeBlock.append(hourEl);
  hourTask = $("<textarea placeholder='Enter task to be completed...'>")
    .addClass("col-8 textarea")
    .attr("data-hour", dataHour);
  timeBlock.append(hourTask);
  saveBtn = $("<button>").addClass("saveBtn col-2");
  timeBlock.append(saveBtn);
  let saveIcon = $("<i>").addClass("fas fa-save fa-2x");
  saveBtn.append(saveIcon);
}

function addClass(cl) {
  hourTask.removeClass("past");
  hourTask.removeClass("present");
  hourTask.removeClass("future");
  hourTask.addClass(cl);
}

function createWorkDay() {
  for (let i = 0; i < hours.length; i++) {
    addHourRow(hours[i], hours[i]);

    if (hours[i] < currentHour) {
      addClass("past");
    } else if (hours[i] === currentHour) {
      addClass("present");
    } else if (hours[i] > currentHour) {
      addClass("future");
    }
  }
}

createWorkDay();
