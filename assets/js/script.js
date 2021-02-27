let currentDay = $("#currentDay");
let workDayContainer = $(".container");
let hours = [9, 10, 11, 12, 13, 14, 15, 16, 17];
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
let currentHour;
let timeBlock;
let hourEl;
let hourTask;
let saveBtn;
let saveIcon;

// handle displaying the date
function displayTime() {
  var rightNow = moment().format("dddd, MMMM Do");
  currentDay.text(rightNow);
}

displayTime();

function now() {
  currentHour = Number.parseInt(moment().format("H"));
}

function addHourRow(hour, idHour) {
  timeBlock = $("<div>").addClass("time-block row");
  workDayContainer.append(timeBlock);
  hourEl = $("<p>")
    .addClass("hour col-2 d-flex align-items-center justify-content-center")
    .text(hour);
  timeBlock.append(hourEl);
  hourTask = $("<textarea placeholder='Enter task to be completed...'>")
    .addClass("col-8 textarea description")
    .attr("id", `taskHour${idHour}`);
  timeBlock.append(hourTask);
  saveBtn = $("<button>").addClass("saveBtn col-2");
  timeBlock.append(saveBtn);
  saveIcon = $("<i>").addClass("fas fa-save fa-2x");
  saveBtn.append(saveIcon);

  saveBtn.click(function (event) {
    event.preventDefault;
    let taskDesc = $(this).parent().children(".textarea").val();
    let taskHour = $(this).parent().children(".hour").text();

    localStorage.setItem(taskHour, taskDesc);
  });
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
    addHourRow(workDayHours[i], i);
    if (hours[i] < currentHour) {
      addClass("past");
    } else if (hours[i] === currentHour) {
      addClass("present");
    } else if (hours[i] > currentHour) {
      addClass("future");
    }
  }
}

function setStorage() {
  event.parent();
  console.log(e.parent());
  //   for (let i = 0; i < hours.length; i++) {
  //     let task = $(`#taskHour${i}`).val();
  //     let taskHour = hourTask.attr("id", i);
  //
  //     localStorage.setItem(`taskHour${i}`, task);
  //   }
}

createWorkDay();