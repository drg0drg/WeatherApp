

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
RHSMainEl = document.getElementById("RHS-main");
// const daysCard = document.querySelector(".forecast-block-day-box");

mainWeatherEl = document.getElementById("main-weather");
// mainWeatherTitle = document.getElementById("main-weather-title");
// mainWeatherTitleText = document.getElementById("main-weather-title-text");
// mainWeatherTitleDate = document.getElementById("main-weather-title-date");
// mainWeatherInfo = document.getElementById("main-weather-info");
// tempEl = document.getElementById("temp");
// humidityEl = document.getElementById("humidity");
// windEl = document.getElementById("wind");
// UVfactorEl = document.getElementById("UV-factor");

// forecastBlock = document.getElementById("forecast-block");
// nextDay1 = document.getElementById("next-day-1");
// nextDay2 = document.getElementById("next-day-2");
// nextDay3 = document.getElementById("next-day-3");
// nextDay4 = document.getElementById("next-day-4");
// nextDay5 = document.getElementById("next-day-5");
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
var forecastDayArray = [];
var forecastDayDateArray = [];
var forecastDayIconArray = [];
var forecastDayTempArray = [];
var forecastDayHumidityArray = [];
var arrayAllDay = [];

let mainWeatherTitleText

//Function to check if the divs exist. it will call/not call createMainAppInfo()
// function checkIfMainWeatherDivExists()
// {
//     searchBtn.addEventListener("click", function (e)
//     {
//         e.preventDefault();
//         checkIfMainWeatherDivExists()
//         localStorageSave();
//         createUserCityHistory();
//         getWeatherAPIdata();
//         getWeatherAPI5Days();

//         // createMainAppInfo()
//         // checkIfMainWeatherDivExists();
//     })
// searchBtn.addEventListener("click", function (e)
// {

//Attempt to get the element using document.getElementById
// var element = document.getElementById("main-weather");
//If it isn't "undefined" and it isn't "null", then it exists.
// searchBtn.addEventListener("click", function (e)
// {
//     if (typeof (mainWeather) != 'undefined' && mainWeather != null) { //daca exista

//         location.reload();
//         return false;

//     } else {

//         location.reload();
//         return true;

//     }

// })

// })




window.onload = function ()
{
    loadCitiesList();

    // if (typeof (mainWeather) != 'undefined' && mainWeather != null) { //daca exista

    //     RHSMainEl
    // } else {

    //     searchBtn.addEventListener("click", function (e)
    //     {
    //         e.preventDefault();
    //         checkIfMainWeatherDivExists()
    //         localStorageSave();
    //         createUserCityHistory();
    //         getWeatherAPIdata();
    //         getWeatherAPI5Days();
    //         // createMainAppInfo()
    //         // checkIfMainWeatherDivExists();
    //     })



    //     // createMainAppInfo();
    //     // create5DaysPrognosis();
    //     // clearA
    // }

}





searchBtn.addEventListener("click", function (e)
{


    e.preventDefault();
    // checkIfMainWeatherDivExists()
    localStorageSave();
    createUserCityHistory();
    getWeatherAPIdata();
    getWeatherAPI5Days();
    RHSMainEl.innerHTML = '';
    inputEl.value = '';

    // createMainAppInfo()
    // checkIfMainWeatherDivExists();
})



// function reload()
// {
//     if (userInput === '') {

//     }

// }
// reload()


//function <createUserCityHistory> dynamically creates a div for each of user's searches
// These searches will load when page loads because they retreive info from localStorage

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
        prevSearchText.innerHTML = localStorage.getItem(localStorageKey).toUpperCase();
        // console.log("localStorageKey is " + localStorageKey);
        // console.log("prevSearchText is " + prevSearchText);
    }
}


//function to save user input to localStorage
function localStorageSave()
{
    userInput = input.value;

    //checks if local storage is empty
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
}



//Adding functionality for <search> button
// function eventListener()
// {
//     searchBtn.addEventListener("click", function (e)
//     {
//         e.preventDefault();
//         checkIfMainWeatherDivExists()
//         localStorageSave();
//         createUserCityHistory();
//         getWeatherAPIdata();
//         getWeatherAPI5Days();
//         // createMainAppInfo()
//         // checkIfMainWeatherDivExists();
//     })
// }




//function to build cities list and populate each div with values from localStorage.
//this will be called inside <onload> function.
//It needs to be separate process from createUserCityHistory (which is linked to searchBtn)
function loadCitiesList()
{
    // eventListener()
    for (i = 0; i < localStorage.length; i++) {

        //creating the box
        var prevSearch = document.createElement("div");
        prevSearch.setAttribute("class", "prev-Search");
        citiesListEl.appendChild(prevSearch);

        //creating the text <p> inside the box
        var prevSearchText = document.createElement("p");
        prevSearchText.setAttribute("class", "prev-Search-Text");
        prevSearch.appendChild(prevSearchText);

        //taking the value from local storage and place it into the newly created div
        prevSearchText.innerHTML = localStorage.getItem(i).toUpperCase();
        // console.log("localStorageKey is " + i);
        // console.log("prevSearchText is " + i);  
        prevSearch.addEventListener('click', function (e)
        {
            RHSMainEl.innerHTML = '';
            e = e || window.event;
            var target = e.target || e.srcElement;
            userInput = target.textContent || target.innerText;
            getWeatherAPIdata()
            getWeatherAPI5Days()
        })
    }

}


// -----------------WEATHER API----------------------
//--------------------------------------------------
//api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}
// my key    f729f6b644bc293d9f405e30b345dbd6
function getWeatherAPIdata()
{
    // eventListener()
    userInput = input.value;
    var city = userInput;

    var api = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&uvi&units=metric&appid=f729f6b644bc293d9f405e30b345dbd6";
    console.log("user input city is  " + city)

    fetch(api)
        .then(res => res.json())
        .then(data =>
        {
            let cityLatitude = data.coord.lat;
            let cityLongitude = data.coord.lon;
            console.log(data);

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

            //Fill in the <divs> with fetched API info
            mainWeatherTitleText.textContent = data.name;
            mainWeatherTemp.textContent = "Temperature: " + data.main.temp + "°C";
            mainWeatherHumidity.textContent = "Humidity: " + data.main.humidity;
            mainWeatherWind.textContent = "Wind speed: " + data.wind.speed + " m/s";




            //---------UV Index API---------------
            //------------------------------------
            // // correct synthax for openWeather UVindex API
            // // http://api.openweathermap.org/data/2.5/uvi?appid={appid}&lat={lat}&lon={lon}
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
                    //Filling in 
                    mainWeatherUV.textContent = "UV factor index: " + data2.value;
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





// ---------------5 DAY FORECAST------------
//------------------------------------------
// correct synthax for openWeather 5 day forecast API --->  api.openweathermap.org/data/2.5/forecast?q={city name}&appid={your api key}
// my key    f729f6b644bc293d9f405e30b345dbd6


let eachData;
let arrayAPI = []
console.log(arrayAPI.length)
let arrayData


function getWeatherAPI5Days()
{

    // eventListener()
    userInput = input.value;
    var city = userInput;
    var api = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=metric&appid=f729f6b644bc293d9f405e30b345dbd6";

    fetch(api)
        .then(res => res.json())
        .then(data =>
        {
            console.log(data);
            let arrayAPI = []
            console.log(arrayAPI.length)
            // let arrayData = []

            // forecastDayDateArray.forEach(forecastBlockDayDate  => {   //})

            arrayAPI = data.list //Array de obiecte din API
            // arrayAPI.push(arrayAPI)
            console.log(arrayAPI)//ARRAY DE OBIECTE(40 obiecte)
            // let eachData = arrayAPI.data
            // console.log(eachData)
            let forecastBlock = document.createElement("div");
            forecastBlock.setAttribute("id", "forecast-block");
            forecastBlock.setAttribute("class", "forecast-block");
            RHSMainEl.appendChild(forecastBlock);

            for (i = 7; i < arrayAPI.length; i += 8) {

                arrayAPI.push(arrayAPI[i]);

                //Creating the div for the 5 days prognosis boxes
                let forecastBlockDay = document.createElement("div");
                forecastBlockDay.setAttribute("class", "forecast-block-day-box")
                forecastBlock.appendChild(forecastBlockDay);

                let forecastBlockDayDate = document.createElement("p");
                forecastBlockDayDate.setAttribute("class", "forecast-block-day-date");
                let dataFormat = arrayAPI[i].dt_txt
                forecastBlockDayDate.textContent = dataFormat.substring(0, dataFormat.length - 8)
                console.log(forecastBlockDayDate)
                forecastBlockDay.appendChild(forecastBlockDayDate);

                //Creating the div for main weather icon    
                let forecastBlockDayIcon = document.createElement("img");
                forecastBlockDayIcon.setAttribute("class", "forecast-block-day-icon");
                const iconData = arrayAPI[i].weather[0].icon;
                forecastBlockDayIcon.setAttribute('src', `http://openweathermap.org/img/wn/${iconData}@2x.png`)
                forecastBlockDayIcon.textContent = iconData
                forecastBlockDay.appendChild(forecastBlockDayIcon)

                //Creating the div for the 5 days prognosis temp
                let forecastBlockDayTemp = document.createElement("p");
                forecastBlockDayTemp.setAttribute("class", "forecast-block-day-temp");
                let tempRound = arrayAPI[i].main.temp
                forecastBlockDayTemp.textContent = 'Temp:' + ' ' + Math.round(tempRound) + '°C'
                forecastBlockDay.appendChild(forecastBlockDayTemp);

                //Creating the div for the 5 days prognosis humidity
                let forecastBlockDayHumidity = document.createElement("p");
                forecastBlockDayHumidity.setAttribute("class", "forecast-block-day-hum");
                forecastBlockDayHumidity.textContent = "Humidity: " + arrayAPI[i].main.humidity + "%";
                forecastBlockDay.appendChild(forecastBlockDayHumidity);

                console.log(arrayAPI[i])

            }
            console.log(arrayAPI)
            let slice = arrayAPI.splice(0, 5)
            console.log(slice)
            // eachData = arrayAPI.dt
            // console.log(eachData)

            //         var numbers = [1, 2, 3, 4, 5];
            //         var length = numbers.length;
            //         for (var i = 0; i < length; i++) {
            //         numbers[i] *= 2;
            // }   

            //Date
            //trece prin array
            // console.log(arrayAPI[i])
            // eachData = arrayAPI[i].dt//ia fiecare elem cu dt
            // console.log(eachData)
            // arrayData.push(eachData)

            // console.log(arrayData.length)


            // slice.forEach(elem =>
            // {
            //     // let altElem = elem
            //     console.log(elem)
            //     let forecastBlockDay = document.createElement("div");
            //     forecastBlockDay.setAttribute("class", "forecast-block-day-box")
            //     forecastBlock.appendChild(forecastBlockDay);

            //     let eachElem = elem.main.temp
            //     let forecastBlockDayTemp = document.createElement("p");
            //     forecastBlockDayTemp.setAttribute("class", "forecast-block-day-temp");
            //     forecastBlockDayTemp.textContent = eachElem
            //     forecastBlockDay.appendChild(forecastBlockDayTemp);

            //     let eachDate = elem.dt_txt
            //     console.log('eacg data' + eachData)
            //     let forecastBlockDayDate = document.createElement("p");
            //     forecastBlockDayDate.setAttribute("class", "forecast-block-day-date");
            //     forecastBlockDayDate.textContent = eachDate
            //     console.log(forecastBlockDayDate)
            //     forecastBlockDay.appendChild(forecastBlockDayDate);



            //     //Creating the div for the 5 days prognosis humidity
            //     let forecastBlockDayHumidity = document.createElement("p");
            //     forecastBlockDayHumidity.setAttribute("class", "forecast-block-day-hum");
            //     forecastBlockDay.appendChild(forecastBlockDayHumidity);

            //     let forecastBlockDayIcon = document.createElement("img");
            //     forecastBlockDayIcon.setAttribute("class", "forecast-block-day-icon");
            //     const iconData = elem.weather[0].icon;
            //     forecastBlockDayIcon.setAttribute('src', `http://openweathermap.org/img/wn/${iconData}@2x.png`)
            //     forecastBlockDayIcon.textContent = iconData
            //     forecastBlockDay.appendChild(forecastBlockDayIcon)
            //     // daysCard.appendChild(forecastBlockDayIcon);


            // })

            // for (i = 0; i <)
            // for (i = 0; i < arrayAPI.length; i++) {

            // }

            //     console.log(arrayAPI[i])
            //     // eachData = arrayAPI[i].dt//ia fiecare elem cu dt
            //     // console.log(eachData)
            //     arrayData.push(arrayAPI[i].dt)
            //     //adauga fiecare dt in arrayAPI
            //     // arrayAPI.splice(1, 10)
            //     // console.log(arrayAPI)
            //     console.log(arrayData)



            //     // var dataDate = data.list[i].dt_txt;
            //     // dataDate = dataDate.substring(0, dataDate.length - 8);
            //     // forecastBlockDayDate.textContent = dataDate;
            //     // // console.log(forecastDayDateArray);
            //     // //Temp
            //     // var dataCelsius = data.list[i].main.temp;
            //     // var dataCelsiusFormat = Math.round(dataCelsius)
            //     // forecastBlockDayTemp.textContent = dataCelsiusFormat + " °C";
            //     // //Humidity
            //     // var humidity = JSON.stringify(data.list[i].main.humidity);
            //     // forecastBlockDayHumidity.textContent= humidity + " %";
            // }//end of for

            // console.log(arrayData.length)

            // })//end of forEach


            // forecastDayTempArray.forEach(forecastBlockDayTemp  => { 
            //     for (i=6; i<38; i+=8){
            //         //Temp
            //         var dataCelsius = data.list[i].main.temp;
            //         var dataCelsiusFormat = Math.round(dataCelsius)
            //         forecastBlockDayTemp.textContent = dataCelsiusFormat + " °C";
            //     }//end of for
            // })//end of forEach


            // for (i=6; i<38; i+=8){

            //     forecastDayDateArray.forEach(forecastBlockDayDate  => {
            //         //Date
            //         // for (a=0; a<forecastDayDateArray.length; a++){
            //             var dataDate = data.list[i].dt_txt;
            //             dataDate = dataDate.substring(0, dataDate.length-8);
            //             forecastBlockDayDate.textContent = dataDate;
            //         // }//end of for(a=...)

            //     })//end of forEach
            // }//end of for




        }) //end of then
}


// }//end of getWeatherAPI5Days()

// const length = arrayData.length
// console.log(length);


//Function that creates <RHS div>
// function createMainAppInfo()
// {

//     //creating the main div for current city weather
//     let mainWeather = document.createElement("div");
//     mainWeather.setAttribute("id", "main-weather");
//     mainWeather.setAttribute("class", "main-weather");
//     RHSMainEl.appendChild(mainWeather);

//     //creating the title sub-block for the main weather section comprised of title, title date and title icon
//     let mainWeatherTitle = document.createElement("div");
//     mainWeatherTitle.setAttribute("class", "main-weather-title")
//     mainWeather.appendChild(mainWeatherTitle);

//     //Creating the div for the main title text
//     let mainWeatherTitleText = document.createElement("p");
//     mainWeatherTitleText.setAttribute("class", "main-weather-title-text");
//     mainWeatherTitle.appendChild(mainWeatherTitleText);

//     //Creating the div for main weather date
//     let mainWeatherTitleDate = document.createElement("p");
//     mainWeatherTitleDate.setAttribute("class", "main-weather-title-date");
//     mainWeatherTitle.appendChild(mainWeatherTitleDate);

//     //Creating the div for main weather icon
//     let mainWeatherTitleIcon = document.createElement("div");
//     mainWeatherTitleIcon.setAttribute("class", "main-weather-title-icon")
//     mainWeatherTitle.appendChild(mainWeatherTitleIcon);

//     //Creating the div for main weather temperature
//     let mainWeatherTemp = document.createElement("p");
//     mainWeatherTemp.setAttribute("class", "main-weather-data")
//     mainWeather.appendChild(mainWeatherTemp);

//     //Creating the div for main weather humidity
//     let mainWeatherHumidity = document.createElement("p");
//     mainWeatherHumidity.setAttribute("class", "main-weather-data")
//     mainWeather.appendChild(mainWeatherHumidity);

//     //Creating the div for main weather wind
//     let mainWeatherWind = document.createElement("p");
//     mainWeatherWind.setAttribute("class", "main-weather-data")
//     mainWeather.appendChild(mainWeatherWind);

//     //Creating the div for main weather UV Factor
//     let mainWeatherUV = document.createElement("p");
//     mainWeatherUV.setAttribute("class", "main-weather-data")
//     mainWeather.appendChild(mainWeatherUV);

//     // //Creating the div for the 5 days prognosis
//     // forecastBlock = document.createElement("div");
//     // forecastBlock.setAttribute("id", "forecast-block");
//     // forecastBlock.setAttribute("class", "forecast-block");
//     // RHSMainEl.appendChild(forecastBlock);

//     // //Creating the div for the 5 days prognosis boxes
//     // forecastBlockDay = document.createElement("div");
//     // forecastBlockDay.setAttribute("class", "forecast-block-day-box")
//     // forecastBlock.appendChild(forecastBlockDay);


// }//end of function createMainAppInfo()

// console.log(arrayAPI.length)
// function create5DaysPrognosis()
// {
//Creating the div for the 5 days prognosis

// console.log(arrayData.length)
// console.log(arrayAPI)
// arrayAPI.forEach(elem =>
// {


//     forecastBlockDay = document.createElement("div");
//     forecastBlockDay.setAttribute("class", "forecast-block-day-box")
//     forecastBlock.appendChild(forecastBlockDay);

//     let forecastBlockDayDate = document.createElement("p");
//     forecastBlockDayDate.setAttribute("class", "forecast-block-day-date");
//     forecastBlockDayDate.textContent = elem.dt
//     console.log(forecastBlockDayDate)
//     forecastBlockDay.appendChild(forecastBlockDayDate);



// })

// console.log(elem.dt)
// console.log(arrayData)
// arrayData.forEach(elem =>
// {
//     console.log(elem)
// })
// for (i = 0; i < 5; i++) {



// arrayAPI.forEach(forecastBlockDay =>
// {

//     // const altul = document.createElement('p')


//     let forecastBlockDayDate = document.createElement("p");
//     forecastBlockDayDate.setAttribute("class", "forecast-block-day-date");
//     forecastBlockDayDate.textContent = elem
//     console.log(forecastBlockDayDate)
//     forecastBlockDay.appendChild(forecastBlockDayDate);

// })


// let forecastBlockDay = document.createElement("div");
// forecastBlockDay.setAttribute("class", "forecast-block-day-box")
// forecastBlock.appendChild(forecastBlockDay);

// let forecastBlockDayDate = document.createElement("p");
// forecastBlockDayDate.setAttribute("class", "forecast-block-day-date");
// forecastBlockDayDate.textContent = String(arrayAPI)
// console.log(forecastBlockDayDate)
// forecastBlockDay.appendChild(forecastBlockDayDate);
// console.log(elem)
// elem = document.createElement("p");
// elem.textContent = arrayAPI
// elem.setAttribute("class", "forecast-block-day-date");
// daysCard.appendChild(elem);
// }



// console.log(arrayAPI.length)
// console.log(arrayAPI)
// for (i = 0; i < arrayAPI.length; i++) {
//     console.log(arrayAPI[i])

//Creating the div for the 5 days prognosis date
// forecastBlockDayDate = document.createElement("p");
// forecastBlockDayDate.setAttribute("class", "forecast-block-day-date");
// daysCard.appendChild(forecastBlockDayDate);

//Creating the div for the 5 days prognosis icon
// forecastBlockDayIcon = document.createElement("p");
// forecastBlockDayIcon.setAttribute("class", "forecast-block-day-icon");
// daysCard.appendChild(forecastBlockDayIcon);

// //Creating the div for the 5 days prognosis temp
// forecastBlockDayTemp = document.createElement("p");
// forecastBlockDayTemp.setAttribute("class", "forecast-block-day-temp");
// daysCard.appendChild(forecastBlockDayTemp);

// //Creating the div for the 5 days prognosis humidity
// forecastBlockDayHumidity = document.createElement("p");
// forecastBlockDayHumidity.setAttribute("class", "forecast-block-day-temp");
// daysCard.appendChild(forecastBlockDayHumidity);


//trece peste fiecare dt din array
// let forecast = document.createElement('p')
// daysCard.appendChild(forecast)
// forecast.textContent = arrayAPI[i]
// }

// for (let i = 1; i < arrayData.length; i++) {
//     console.log(arrayData[i])
//     arrayData.forEach(elem =>
//     {
//         elem.push(arrayData)
//         console.log(elem)
//     })


//Creating the div for the 5 days prognosis boxes
// forecastBlockDay = document.createElement("div");
// forecastBlockDay.setAttribute("class", "forecast-block-day-box")
// forecastBlock.appendChild(forecastBlockDay);

//Creating the div for the 5 days prognosis date
// forecastBlockDayDate = document.createElement("p");
// forecastBlockDayDate.setAttribute("class", "forecast-block-day-date");
// daysCard.appendChild(forecastBlockDayDate);

// //Creating the div for the 5 days prognosis icon
// forecastBlockDayIcon = document.createElement("p");
// forecastBlockDayIcon.setAttribute("class", "forecast-block-day-icon");
// daysCard.appendChild(forecastBlockDayIcon);

// //Creating the div for the 5 days prognosis temp
// forecastBlockDayTemp = document.createElement("p");
// forecastBlockDayTemp.setAttribute("class", "forecast-block-day-temp");
// daysCard.appendChild(forecastBlockDayTemp);

// //Creating the div for the 5 days prognosis humidity
// forecastBlockDayHumidity = document.createElement("p");
// forecastBlockDayHumidity.setAttribute("class", "forecast-block-day-temp");
// daysCard.appendChild(forecastBlockDayHumidity);

// forecastDayDateArray.push(forecastBlockDayDate);
// forecastDayIconArray.push(forecastBlockDayIcon);
// forecastDayTempArray.push(forecastBlockDayTemp);
// forecastDayHumidityArray.push(forecastBlockDayHumidity);

// forecastDayArray.push(forecastBlockDayDate);
// forecastDayArray.push(forecastBlockDayIcon);
// forecastDayArray.push(forecastBlockDayTemp);
// forecastDayArray.push(forecastBlockDayHumidity);

// arrayAllDay.push(forecastDayArray);

// }

// }







