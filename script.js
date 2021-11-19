let currentDate = $("#currentDay");
let description = $(".description");
let saveBtn = $(".saveBtn");
let currentHour = moment().format("H")

let hourDescription = [];

// ran to initialize storage if there is nothing saved in local storage
function init() {
// assign hour integer to each element in the description class
    description.each(function(){
        let thisDescription = $(this)
        let thisHour = parseInt(thisDescription.attr("data-hour"));
// initialize the key and value and add them too the hourDescription array
        let detailsByTime = {
            hour: thisHour,
            text: "",
        };
        hourDescription.push(detailsByTime);
    })
// set local storage as one long string
    localStorage.setItem("description", JSON.stringify(hourDescription));

    renderDescription();

}

// allows what is in local storage to be shown on the page in the correct place it was saved at
function renderDescription() {
// grabbing item from storage and seperating out from the string it was stored as
    hourDescription = localStorage.getItem("description");
    hourDescription = JSON.parse(hourDescription);

// looping through info to set the text value of each textarea by using the "data-hour" class
    for (let i = 0; i < hourDescription.length; i++) {
        let itemHour = hourDescription[i].hour;
        let itemText = hourDescription[i].text;

        $("[data-hour=" + itemHour + "]").val(itemText);        
    }

    console.log(hourDescription)
  
  }

// function to set color for each textarea
function hourColor() {
    description.each(function(){
        let thisDescription = $(this)
        let thisHour = parseInt(thisDescription.attr("data-hour"));
// this sets the correct class for the textarea according to current time and also removes the previous class that was on it
        if (thisHour == currentHour) {
            thisDescription.addClass("present").removeClass("past future")
        } else if (thisHour > currentHour) {
            thisDescription.addClass("future").removeClass("past present")
        } else {
            thisDescription.addClass("past").removeClass("present future")
        }
    })
};

// when the button is clicked the typed message in the textarea will be saved to localstorage and rendering on the page
saveBtn.on("click", function(event) {
    event.preventDefault();
    let $target = $(event.target)
// if the word "save" on top of the button was clicked it would function as if the button was clicked
    if ($target.is("i")) {
        $target = $target.parent()
    }
// textarea is the sibling of the button
    let $description = $target.siblings("textarea")
    // console.log($description.val());

    timeSlot = $target.siblings("textarea").attr("data-hour")
// finds the correct time of the button that was clicked and sets that text to what was typed in the corresponding box
    for (let i = 0; i < hourDescription.length; i++) {
        if (hourDescription[i].hour == timeSlot) {
            hourDescription[i].text = $description.val()
        }
        
    }
    // console.log(JSON.stringify(hourDescription))
    //   console.log(timeSlot)
      localStorage.setItem("description", JSON.stringify(hourDescription));
      renderDescription();
    });

// dispalys the time at the top of the page under the header
function displayTime() {
    let rightNow = moment().format("dddd, MMMM Do");
    currentDate.text(rightNow);
  }

// runs color function and if there is local storage will render it, if not will run init function
function startPage(){
    hourColor();
    if (!localStorage.getItem("description")){
        init()
    } else {
        renderDescription()
    }
}

// Runs everytime the page is reloaded
startPage()

// Running an interval every second to refresh the displayTime function
setInterval(displayTime, 1000)