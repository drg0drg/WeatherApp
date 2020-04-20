

//-----------------------------------------------------
//---------------WeatherApp Pseudocode-----------------
//-----------------------------------------------------

//LHS section logic:
    //function to dynamically create div (that is to hold prev search values)
    //add btn listener to: copy the input value && call create div function && place user value in newly created div

inputEl = document.getElementById("input");
searchBtn = document.getElementById("search-btn");
citiesListEl = document.getElementById("cities-list");


var nowMoment = moment();

// moment JS
// currentHour = moment().format("kk");

//Showing the date using Moment.js
var nowDateShown = document.getElementById("navbar-date");
nowDateShown.textContent = nowMoment.format("DD-MMM-YYYY")

//Showing the time using Moment.js
var nowHourShown = document.getElementById("navbar-hour");
nowHourShown.textContent = nowMoment.format("kk:mm")






var userInput;
var localStorageKey = 0;
var prevSearch;





window.onload = function() {
    loadCitiesList();
}





//function <createDiv> dynamically creates div to hold user input for searching places
function createDiv () {

    // for (i=0; i<localStorage.length; i++) {

        //creating the box
        var prevSearch = document.createElement("div");
        prevSearch.setAttribute("class", "prev-Search");
        citiesListEl.appendChild(prevSearch);

        //creating the text <p> inside the box
        var prevSearchText = document.createElement("p");
        prevSearchText.setAttribute("class", "prev-Search-Text");
        prevSearch.appendChild(prevSearchText);
        
        //taking the value from local storage and place it into the newly created div
        for (localStorageKey=0; localStorageKey<localStorage.length; localStorageKey++) {
            prevSearchText.innerHTML = localStorage.getItem(localStorageKey);
            console.log("localStorageKey is " + localStorageKey);
            console.log("prevSearchText is " + prevSearchText);
        }
}


//function to save user input to localStorage
function localStorageSave(){
        //saving user's input in localStorage
        userInput = input.value;
        localStorage.setItem(localStorageKey, userInput);
        localStorageKey++;
}



//Adding functionality for <search> button
searchBtn.addEventListener("click", function(e){
    e.preventDefault();
    localStorageSave();
    createDiv ();
})



//function to build cities list and populate each div with values from localStorage.
//this will be called inside <onload> function.
//It needs to be separate process from createDiv (which is linked to searchBtn)
function loadCitiesList(){
    for (i=0; i<localStorage.length; i++) {

        //creating the box
        var prevSearch = document.createElement("div");
        prevSearch.setAttribute("class", "prev-Search");
        citiesListEl.appendChild(prevSearch);
        
        //creating the text <p> inside the box
        var prevSearchText = document.createElement("p");
        prevSearchText.setAttribute("class", "prev-Search-Text");
        prevSearch.appendChild(prevSearchText);
                
        //taking the value from local storage and place it into the newly created div
        prevSearchText.innerHTML = localStorage.getItem(i);
        console.log("localStorageKey is " + i);
        console.log("prevSearchText is " + i);        
        
    }
}









