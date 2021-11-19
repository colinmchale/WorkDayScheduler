// Javascript Page

let currentDate = $("#currentDay");
let description = $(".description");
let saveBtn = $(".saveBtn")



function renderLastAppointment() {
    let appointment = localStorage.getItem("appointment");
  
    if (!appointment) {
      return;
    }
  
    description.textContent = appointment;
  }


saveBtn.on("click", function(event) {
    event.preventDefault();
    let $target = $(event.target)
if ($target.is("i")) {
    $target = $target.parent()
}

    let $description = $target.siblings("textarea")
    console.log($description.val());

    console.log($target.data.value);

    timeSlot = $target.value


    let appointment = description.value;
  console.log(event.target)
      localStorage.setItem("appointment", $description.val());
      renderLastAppointment();
    });


function displayTime() {
    let rightNow = moment().format("dddd, MMMM Do");
    currentDate.text(rightNow);
  }

setInterval(displayTime, 1000)