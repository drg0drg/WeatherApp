

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
mainWeatherEl = document.getElementById("main-weather");
mainWeatherTitle = document.getElementById("main-weather-title");
mainWeatherTitleText = document.getElementById("main-weather-title-text");
mainWeatherTitleDate = document.getElementById("main-weather-title-date");
mainWeatherInfo = document.getElementById("main-weather-info");
tempEl = document.getElementById("temp");
humidityEl = document.getElementById("humidity");
windEl = document.getElementById("wind");
UVfactorEl = document.getElementById("UV-factor");

forecastBlock = document.getElementById("forecast-block");
nextDay1 = document.getElementById("next-day-1");
nextDay2 = document.getElementById("next-day-2");
nextDay3 = document.getElementById("next-day-3");
nextDay4 = document.getElementById("next-day-4");
nextDay5 = document.getElementById("next-day-5");
// nextDay1Date = document.getElementById("next-day-1-date");




var nowMoment = moment();

//Showing the date using Moment.js
var nowDateShown = document.getElementById("navbar-date");
nowDateShown.textContent = nowMoment.format("DD-MMM-YYYY");

//Showing the time using Moment.js
var nowHourShown = document.getElementById("navbar-hour");
nowHourShown.textContent = nowMoment.format("kk:mm");






var userInput;
var localStorageKey = 0;
var userCityList;
var cityLatitude;
var cityLongitude;





window.onload = function() {
    loadCitiesList();
}





//function <createUserCity> dynamically creates a div for each of user's searches
// These searches will load when page loads because they retreive info from localStorage

function createUserCity () {

        //creating the box
        userCityList = document.createElement("div");
        userCityList.setAttribute("class", "user-city-list");
        citiesListEl.appendChild(userCityList);

        //creating the text <p> inside the box
        var userCityListText = document.createElement("p");
        userCityListText.setAttribute("class", "user-city-list-Text");
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
        if(localStorage != null){
            localStorageKey++;
        }
        // localStorageKey++;
}



//Adding functionality for <search> button
searchBtn.addEventListener("click", function(e){
    e.preventDefault();
    localStorageSave();
    createUserCity ();
    getWeatherAPIdata();
    getWeatherAPI5Days();
    // getUVindex();
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
    var api = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&uvi&units=metric&appid=f729f6b644bc293d9f405e30b345dbd6";
    console.log("user input city is  " + city)
    
    fetch(api)
    .then(res => res.json())
    .then(data => {
        console.log(data);

        mainWeatherTitleText.textContent = data.name;
        tempEl.textContent = "Temperature: " + data.main.temp + "°C";
        humidityEl.textContent = "Humidity: " + data.main.humidity;
        windEl.textContent = "Wind speed: " + data.wind.speed + " m/s";

        cityLatitude = data.coord.lat;
        cityLongitude = data.coord.lon;
        UVfactorEl.textContent = "cityLatitude is: " + cityLatitude;
    })

// -------------------UV INDEX------------


    // // correct synthax for openWeather UVindex API
    // // http://api.openweathermap.org/data/2.5/uvi?appid={appid}&lat={lat}&lon={lon}
    // var api2 = "http://api.openweathermap.org/data/2.5/uvi?appid=f729f6b644bc293d9f405e30b345dbd6&lat="+cityLatitude+"&lon="+cityLongitude;

    // fetch(api2)
    //     .then(res => res.json())
    //     .then(data2 => {
    //     console.log(data2);
    //     })

} //end of getWeatherAPIdata()




// ---------------5 day forecast------------
//------------------------------------------
// correct synthax for openWeather 5 day forecast API
// api.openweathermap.org/data/2.5/forecast?q={city name}&appid={your api key}
// my key    f729f6b644bc293d9f405e30b345dbd6



function getWeatherAPI5Days(){
    userInput = input.value;
    var city = userInput;
    var api= "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=f729f6b644bc293d9f405e30b345dbd6";

    fetch(api)
    .then(res => res.json())
    .then(data => {
        console.log(data);

        //bring all <next day dates> from HTML
        dateNextDay1 = document.getElementById("next-day-1-date");
        dateNextDay2 = document.getElementById("next-day-2-date");
        dateNextDay3 = document.getElementById("next-day-3-date");
        dateNextDay4 = document.getElementById("next-day-4-date");
        dateNextDay5 = document.getElementById("next-day-5-date");

        //bring all <next day icons> from HTML
        iconNextDay1 = document.getElementById("next-day-1-image-box");

        for (i=1; i<=5; i++){
            var str = data.list[i].dt_txt;
            str = str.substring(0, str.length-8);
            // console.log(str);
            // nextDay1Date.textContent = str;
        }




        //-------------loop try-----------------
        // const ceva = data.list
        // const altceva = ceva.slice(1, 6);
        // console.log(altceva)

        // altceva.forEach(element => {
        //     const p = document.createElement("p");
        //     p.textContent = element[0].dt_txt;
        //     var forecastDay = document.getElementById("next-day-1");
        //     forecastDay.appendChild(p);
        // })




        // dt_txt: "2020-04-22 00:00:00"

    })


}

















// -------------------UV INDEX------------


// function getUVindex(){
//     userInput = input.value;
//     var city = userInput;
//     console.log("user input city is  " + city)
//     // http://api.openweathermap.org/data/2.5/uvi?appid={appid}&lat={lat}&lon={lon}
//     var api = "http://api.openweathermap.org/data/2.5/uvi?appid=f729f6b644bc293d9f405e30b345dbd6&lat="+cityLatitude+"&lon="+cityLongitude;

//     fetch(api)
//         .then(res => res.json())
//         .then(data => {
//         console.log(data);
// })
// }//end of getUVindex()






//----------------------------------------------------




// function fetchWeatherData(){
// }

// fetchWeatherData();


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

