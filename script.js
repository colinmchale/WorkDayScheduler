// Javascript Page

let currentDate = $("#currentDay");











function displayTime() {
    let rightNow = moment().format("dddd");
    currentDate.text(rightNow);
  }

setInterval(displayTime, 1000)