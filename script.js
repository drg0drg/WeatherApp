//--------------------------------------------------------------
//-----------------------WEATHER APP----------------------------
//--------------------------------------------------------------
inputEl = document.getElementById("input");
searchBtn = document.getElementById("search-btn");
citiesListEl = document.getElementById("cities-list");
containerEl = document.getElementById("container");
RHSMainEl = document.getElementById("RHS-main");
mainWeatherEl = document.getElementById("main-weather");

var localStorageKey = 0;
var userCityList;
var cityLatitude;
var cityLongitude;
var forecastDayArray = [];
var forecastDayDateArray = [];
var forecastDayIconArray = [];
var forecastDayTempArray = [];
var forecastDayHumidityArray = [];
var arrayAllDay = [];
var userInput = input.value;
var city = userInput;
let mainWeatherTitleText

var nowMoment = moment();
//Showing the date using Moment.js
var nowDateShown = document.getElementById("navbar-date");
nowDateShown.textContent = nowMoment.format("DD-MMM-YYYY");
//Showing the time using Moment.js
var nowHourShown = document.getElementById("navbar-hour");
nowHourShown.textContent = nowMoment.format("kk:mm");
//---------------------------------------------------------------------------------------------------------------
window.onload = function ()
{
    loadCitiesList();
}
//---------------------------------------------------------------------------------------------------------------
searchBtn.addEventListener("click", function (e)
{
    userInput = input.value;
    var city = userInput;
    e.preventDefault();
    // checkIfMainWeatherDivExists()
    localStorageSave();
    createUserCityHistory();
    getWeatherAPIdata(city);
    getWeatherAPI5Days(city);
    RHSMainEl.innerHTML = '';
    inputEl.value = '';
})//end of searchBtn.addEventListener
//---------------------------------------------------------------------------------------------------------------
input.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("search-btn").click();
    }
  });
//---------------------------------------------------------------------------------------------------------------
//function <createUserCityHistory> dynamically creates a div for each of user's searches
function createUserCityHistory()
{
    //creating the box
    var prevSearch = document.createElement("div");
    prevSearch.setAttribute("class", "prev-Search");
    citiesListEl.appendChild(prevSearch);
    //creating the text <p> inside the box
    var prevSearchText = document.createElement("p");
    prevSearchText.setAttribute("class", "prev-Search-Text");
    prevSearch.appendChild(prevSearchText);
    localStorageLength = localStorage.length;
    //taking the value from local storage and place it into the newly created div
    for (localStorageKey = 0; localStorageKey < localStorageLength; localStorageKey++) {
        prevSearchText.innerHTML = localStorage.getItem(localStorageKey);
    }
}//end of createUserCityHistory()
//-------------------------------------------------------------------------------------------------------
//function to save user input to localStorage
function localStorageSave()
{
    userInput = input.value;
    //Checks if local storage is empty
    if (Object.keys(localStorage).length === 0) {
        localStorageKey = 0;
        userInput = input.value;
        //saving user's input in localStorage
        localStorage.setItem(localStorageKey, userInput);
        localStorageKey++;
        //if localStorage is not empty, 
    } else {
        let localStorageLength = Object.keys(localStorage).length;
        localStorageKey = localStorageLength;
        //saving user's input in localStorage
        userInput = input.value;
        localStorage.setItem(localStorageKey, userInput);
        localStorageKey++;
    }
}//end of localStorageSave()
//--------------------------------------------------------------------------------------------------------
//function to build cities list and populate each div with values from localStorage called at <onload>
//Because of the for loop, it needs to be separate process from createUserCityHistory (which is linked to searchBtn)
function loadCitiesList()
{
    // eventListener()
    for (i = 0; i < localStorage.length; i++) {
        //Creating the box
        var prevSearch = document.createElement("div");
        prevSearch.setAttribute("class", "prev-Search");
        citiesListEl.appendChild(prevSearch);
        //Creating the text <p> inside the box
        var prevSearchText = document.createElement("p");
        prevSearchText.setAttribute("class", "prev-Search-Text");
        prevSearch.appendChild(prevSearchText);
        //Taking the value from local storage and place it into the newly created div
        prevSearchText.innerHTML = localStorage.getItem(i);
        //Functionality of previous searches history buttons
        prevSearch.addEventListener('click', function (e)
        {
            RHSMainEl.innerHTML = '';
            e = e || window.event;
            var target = e.target || e.srcElement;
            prevCity = target.textContent || target.innerText;
            getWeatherAPIdata(prevCity)
            getWeatherAPI5Days(prevCity)
        })//end of prevSearch.addEventListener
    }//end of for loop
}//loadCitiesList()

//api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}
function getWeatherAPIdata(city)
{
    var api = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&uvi&units=metric&appid=f729f6b644bc293d9f405e30b345dbd6";
    console.log("user input city is  " + city)

    fetch(api)
        .then(res => res.json())
        .then(data =>
        {
            let mainWeather = document.createElement("div");
            mainWeather.setAttribute("id", "main-weather");
            mainWeather.setAttribute("class", "main-weather");
            RHSMainEl.appendChild(mainWeather);
            //creating the title sub-block for the main weather section comprised of title, title date and title icon
            let mainWeatherTitle = document.createElement("div");
            mainWeatherTitle.setAttribute("class", "main-weather-title")
            mainWeather.appendChild(mainWeatherTitle);
            //Creating the div for the main title text
            let mainWeatherTitleText = document.createElement("p");
            mainWeatherTitleText.setAttribute("class", "main-weather-title-text");
            mainWeatherTitle.appendChild(mainWeatherTitleText);
            //Creating the div for main weather date
            let mainWeatherTitleDate = document.createElement("p");
            mainWeatherTitleDate.setAttribute("class", "main-weather-title-date");
            mainWeatherTitle.appendChild(mainWeatherTitleDate);
            //Creating the div for main weather icon
            let mainWeatherTitleIcon = document.createElement("img");
            mainWeatherTitleIcon.setAttribute("class", "main-weather-title-icon")
            mainWeatherTitle.appendChild(mainWeatherTitleIcon);
            //Main Icon
            var imgSrc = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
            mainWeatherTitleIcon.setAttribute("src", imgSrc);
            mainWeatherTitleIcon.setAttribute("alt", data.weather[0].icon)
            //Creating the div for main weather temperature
            let mainWeatherTemp = document.createElement("p");
            mainWeatherTemp.setAttribute("class", "main-weather-data")
            mainWeather.appendChild(mainWeatherTemp);
            //Creating the div for main weather humidity
            let mainWeatherHumidity = document.createElement("p");
            mainWeatherHumidity.setAttribute("class", "main-weather-data")
            mainWeather.appendChild(mainWeatherHumidity);
            //Creating the div for main weather wind
            let mainWeatherWind = document.createElement("p");
            mainWeatherWind.setAttribute("class", "main-weather-data")
            mainWeather.appendChild(mainWeatherWind);
            //Creating the div for main weather UV Factor
            let mainWeatherUV = document.createElement("p");
            mainWeatherUV.setAttribute("class", "main-weather-data")
            mainWeather.appendChild(mainWeatherUV);
            //Fill in the <divs> with fetched API info
            mainWeatherTitleText.textContent = data.name;
            mainWeatherTemp.textContent = "Temperature: " + data.main.temp + "°C";
            mainWeatherHumidity.textContent = "Humidity: " + data.main.humidity;
            mainWeatherWind.textContent = "Wind speed: " + data.wind.speed + " m/s";

            // // http://api.openweathermap.org/data/2.5/uvi?appid={appid}&lat={lat}&lon={lon}
            let cityLatitude = data.coord.lat;
            let cityLongitude = data.coord.lon;
            console.log(data);
            var api2 = "http://api.openweathermap.org/data/2.5/uvi?appid=f729f6b644bc293d9f405e30b345dbd6&lat=" + cityLatitude + "&lon=" + cityLongitude;

            fetch(api2)
                .then(res => res.json())
                .then(data2 =>
                {
                    console.log(data2);
                    //Date formatting
                    // date_iso: "2020-04-22T12:00:00Z"
                    var str = data2.date_iso;
                    str = str.substring(0, str.length - 10);
                    console.log("main W title DATE string is  " + str);
                    // mainWeatherTitleDate = document.createElement("p");
                    mainWeatherTitleDate.textContent = str;
                    // //Creating the box for UV index tht will change color
                    mainWeatherUVbox = document.createElement("div");
                    mainWeatherUVbox.setAttribute("class", "main-weather-UV-box");
                    mainWeather.appendChild(mainWeatherUVbox);
                    //Creating the div for main weather UV Factor
                    let mainWeatherUV = document.createElement("p");
                    mainWeatherUV.setAttribute("class", "main-weather-data")
                    mainWeatherUVbox.appendChild(mainWeatherUV);
                    mainWeatherUV.textContent = "UV factor index: " + data2.value;
                    //UV index indication coloring depending on value
                    var mainUV = data2.value;
                    if (mainUV <2){
                        mainWeatherUVbox.setAttribute("class", "UVclass-green")
                    } else if (mainUV <5){
                        mainWeatherUVbox.setAttribute("class", "UVclass-yellow")
                    } else if (mainUV <7){
                        mainWeatherUVbox.setAttribute("class", "UVclass-orange")
                    }
                    else {
                        mainWeatherUVbox.setAttribute("class", "UVclass-red")
                    }
                })
        })//end of then from fetch(api)
} //end of getWeatherAPIdata()
//-------------------------------------------------------------------------------------------------------------
//api.openweathermap.org/data/2.5/forecast?q={city name}&appid={your api key}
let eachData;
let arrayAPI = []
console.log(arrayAPI.length)
let arrayData

function getWeatherAPI5Days(city)
{
    var api = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=metric&appid=f729f6b644bc293d9f405e30b345dbd6";

    fetch(api)
        .then(res => res.json())
        .then(data =>
        {
            console.log(data);
            let arrayAPI = []
            console.log(arrayAPI.length)
            arrayAPI = data.list //Array of API objects (40 objects)
            let forecastBlock = document.createElement("div");
            forecastBlock.setAttribute("id", "forecast-block");
            forecastBlock.setAttribute("class", "forecast-block");
            RHSMainEl.appendChild(forecastBlock);

            for (i = 0; i < arrayAPI.length; i += 9) {
                arrayAPI.push(arrayAPI[i])
                //Creating the div for the 5 days forecast boxes
                let forecastBlockDay = document.createElement("div");
                forecastBlockDay.setAttribute("class", "forecast-block-day-box")
                forecastBlock.appendChild(forecastBlockDay);
                //Creating the div for the 5 days forecast Date
                let forecastBlockDayDate = document.createElement("p");
                forecastBlockDayDate.setAttribute("class", "forecast-block-day-date");
                let dataFormat = arrayAPI[i].dt_txt
                forecastBlockDayDate.textContent = dataFormat.substring(0, dataFormat.length - 8)
                console.log(forecastBlockDayDate)
                forecastBlockDay.appendChild(forecastBlockDayDate);
                //Creating the div for the 5 days forecast Icon    
                let forecastBlockDayIcon = document.createElement("img");
                forecastBlockDayIcon.setAttribute("class", "forecast-block-day-icon");
                const iconData = arrayAPI[i].weather[0].icon;
                forecastBlockDayIcon.setAttribute('src', `http://openweathermap.org/img/wn/${iconData}@2x.png`)
                forecastBlockDayIcon.textContent = iconData
                forecastBlockDay.appendChild(forecastBlockDayIcon)
                //Creating the div for the 5 days forecast Temp
                let forecastBlockDayTemp = document.createElement("p");
                forecastBlockDayTemp.setAttribute("class", "forecast-block-day-temp");
                let tempRound = arrayAPI[i].main.temp
                forecastBlockDayTemp.textContent = 'Temp:' + ' ' + Math.round(tempRound) + '°C'
                forecastBlockDay.appendChild(forecastBlockDayTemp);
                //Creating the div for the 5 days forecast Humidity
                let forecastBlockDayHumidity = document.createElement("p");
                forecastBlockDayHumidity.setAttribute("class", "forecast-block-day-hum");
                forecastBlockDayHumidity.textContent = "Humidity: " + arrayAPI[i].main.humidity + "%";
                forecastBlockDay.appendChild(forecastBlockDayHumidity);
            }
            let slice = arrayAPI.splice(0, 5)
        }) //end of then
}//end of getWeatherAPI5Days(city)
