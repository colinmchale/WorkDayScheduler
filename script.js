// Javascript Page

let currentDate = $("#currentDay");
let description = $(".description");
let saveBtn = $(".saveBtn");
let currentHour = moment().format("H")

let hourDescription = [];

function init() {
    description.each(function(){
        let thisDescription = $(this)
        let thisHour = parseInt(thisDescription.attr("data-hour"));

        let detailsByTime = {
            hour: thisHour,
            text: "",
        };
        hourDescription.push(detailsByTime);
    })

    localStorage.setItem("description", JSON.stringify(hourDescription));

    renderDescription();

}

// function init() {
//     // Get stored todos from localStorage
//     let storedDetails = JSON.parse(localStorage.getItem("description"));
  
//     // If todos were retrieved from localStorage, update the todos array to it
//     if (storedDetails !== null) {
//       todos = storedTodos;
//     }
  
//     // This is a helper function that will render todos to the DOM
//     renderTodos();
//   }



function renderDescription() {
    hourDescription = localStorage.getItem("description");
    hourDescription = JSON.parse(hourDescription);

    for (let i = 0; i < hourDescription.length; i++) {
        let itemHour = hourDescription[i].hour;
        let itemText = hourDescription[i].text;

        $("[data-hour=" + itemHour + "]").val(itemText);        
    }

    console.log(hourDescription)
  
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

    timeSlot = $target.siblings("textarea").attr("data-hour")

    for (let i = 0; i < hourDescription.length; i++) {
        if (hourDescription[i].hour == timeSlot) {
            hourDescription[i].text = $description.val()
        }
        
    }
console.log(JSON.stringify(hourDescription))
  console.log(timeSlot)
      localStorage.setItem("description", JSON.stringify(hourDescription));
      renderDescription();
    });


function displayTime() {
    let rightNow = moment().format("dddd, MMMM Do");
    currentDate.text(rightNow);
  }

function startPage(){
    hourColor();
    if (!localStorage.getItem("description")){
        init()
    } else {
        renderDescription()
    }
}

startPage()

setInterval(displayTime, 1000)