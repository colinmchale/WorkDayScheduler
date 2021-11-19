// Javascript Page

let currentDate = $("#currentDay");
let description = $(".description");
let saveBtn = $(".saveBtn");
let currentHour = moment().format("H")

let hourDescription = [];



function renderDescription() {
    hourDescription = localStorage.getItem("description");
    hourDescription = JSON.parse(hourDescription);

    for (let i = 0; i < hourDescription.length; i++) {
        let itemHour = hourDescription[i].hour;
        let itemText = hourDescription[i].text;

        $("[data-hour=" + itemHour + "]").children("textarea").val(itemText);        
    }



    let timeDescription = localStorage.getItem("description");
  
    if (!timeDescription) {
      return;
    }
  
    description.textContent = timeDescription;
  }


function hourColor() {
    description.each(function(){
        let thisDescription = $(this)
        let thisHour = parseInt(thisDescription.attr("data-hour"));

        if (thisHour == currentHour) {
            thisDescription.addClass("present").removeClass("past future")
        } else if (thisHour > currentHour) {
            thisDescription.addClass("future").removeClass("past present")
        } else {
            thisDescription.addClass("past").removeClass("present future")
        }
    })
};




saveBtn.on("click", function(event) {
    event.preventDefault();
    let $target = $(event.target)
if ($target.is("i")) {
    $target = $target.parent()
}

    let $description = $target.siblings("textarea")
    console.log($description.val());

    timeSlot = $target.value

  console.log(event.target)
      localStorage.setItem("description", $description.val());
      renderDescription();
    });


function displayTime() {
    let rightNow = moment().format("dddd, MMMM Do");
    currentDate.text(rightNow);
  }

hourColor()

setInterval(displayTime, 1000)