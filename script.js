

//-----------------------------------------------------
//---------------WeatherApp Pseudocode-----------------
//-----------------------------------------------------

//LHS section logic:
    //function to dynamically create div (that is to hold prev search values)
    //add btn listener to: copy the input value && call create div function && place user value in newly created div

inputEl = document.getElementById("input");
searchBtn = document.getElementById("search-btn");
citiesListEl = document.getElementById("cities-list");
containerEl = document.getElementById("container");



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
var userCityList;





window.onload = function() {
    loadCitiesList();
}





//function <createUserCity> dynamically creates a div for each of user's searches
// These searches will load when page loads because they retreive info from localStorage

function createUserCity () {

        //creating the box
        userCityList = document.createElement("div");
        userCityList.setAttribute("class", "prev-Search");
        citiesListEl.appendChild(userCityList);

        //creating the text <p> inside the box
        var userCityListText = document.createElement("p");
        userCityListText.setAttribute("class", "prev-Search-Text");
        userCityList.appendChild(userCityListText);
        
        //taking the value from local storage and place it into the newly created div
        for (localStorageKey=0; localStorageKey<localStorage.length; localStorageKey++) {
            userCityListText.innerHTML = localStorage.getItem(localStorageKey);
            console.log("localStorageKey is " + localStorageKey);
            console.log("userCityListText is " + userCityListText.textContent);
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
    createUserCity ();
    getWeatherAPIdata();
    // createMainAppInfo();
})



//function to build cities list and populate each div with values from localStorage.
//this will be called inside <onload> function.
//It needs to be separate process from createUserCity (which is linked to searchBtn)
function loadCitiesList(){
    for (i=0; i<localStorage.length; i++) {

        //creating the box
        var userCityList = document.createElement("div");
        userCityList.setAttribute("class", "prev-Search");
        citiesListEl.appendChild(userCityList);
        
        //creating the text <p> inside the box
        var userCityListText = document.createElement("p");
        userCityListText.setAttribute("class", "prev-Search-Text");
        userCityList.appendChild(userCityListText);
                
        //taking the value from local storage and place it into the newly created div
        userCityListText.innerHTML = localStorage.getItem(i);
        console.log("localStorageKey is " + i);
        console.log("userCityListText is " + i);        
    }
}


// -----------------WATHER API----------------------
//--------------------------------------------------

//api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}
// my key    f729f6b644bc293d9f405e30b345dbd6
function getWeatherAPIdata(){
    userInput = input.value;
    var city = userInput;
    var api = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=f729f6b644bc293d9f405e30b345dbd6";
    console.log("user input city is  " + city)
    
    fetch(api)
    .then(res => res.json())
    .then(data => {
        console.log(data);
    })
}


//Function that creates <RHS div>
// function createMainAppInfo() {
//             //creating the box for RHS
//             RHSMain = document.createElement("div");
//             RHSMain.setAttribute("class", "RHS-main");
//             containerEl.appendChild(RHSMain);

//             //creating the main div for current city weather
//             mainWeather = document.createElement("div");
//             mainWeather.setAttribute("class", "main-weather");
//             RHSMain.appendChild(mainWeather);

//             //creating the title sub-block for the main weather section
//             mainWeatherTitle = document.createElement("div");
//             mainWeatherTitle.setAttribute("class", "main-weather-title")
//             mainWeather.appendChild(mainWeatherTitle);

//             //creating the info sub-block for the main weather section
//             mainWeatherInfo = document.createElement("div");
//             mainWeatherInfo.setAttribute("class", "main-weather-info")
//             mainWeather.appendChild(mainWeatherInfo);

//             //creating the div for the 5 days prognosis
//             forecastBlock = document.createElement("div");
//             forecastBlock.setAttribute("class", "forecast-block");
//             RHSMain.appendChild(forecastBlock);
// }