let currentDay = $("#currentDay");
let hours = [9, 10, 11, 12, 1, 2, 3, 4, 5];

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
  let timeBlock = $("<div>").addClass("time-block row");
  let hourEl = $("<p>")
    .addClass("hour col-2 d-flex align-items-center justify-content-center")
    .text(hour);
  let hourTask = $("<textarea>").addClass("col-8 past");
  let saveBtn = $("<button>").addClass("saveBtn col-2");
  let saveIcon = $("<i>").addClass("fas fa-save");

  workDayContainer.append(timeBlock);
  timeBlock.append(hourEl, hourTask, saveBtn);
  saveBtn.append(saveIcon);
}

// addHourRow(11);

for (let i = 0; i < hours.length; i++) {
  addHourRow(hours[i]);
}

// 	let timeBlock = $('<table>').addClass('time-block');
// 	timeBlockContainer.append(timeBlock);
//
// 	let hourCol = $('<tr scope="row">').addClass('hour');
// 	timeBlock.append(hourCol);
//
//
// 	let hourRow = $('<td scope="row">');
//
// 	// function addHourRow() {
// 	// 	hourCol.append(hourRow);
// 	// }
// 	$(hours).each(function(index, item) {
// 		$(hourCol).append(hourRow);
// 		hourRow.text(`${item}`);
// 		console.log(hourRow.value);
// 	});

// $.each(hours[], function( index ) {
//   console.log( index + ": " + $( this ).text() );
// });
