

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
    
    
    
    
    
    window.onload = function() {
        loadCitiesList();
    }
    
    
    
    
    
    //function <createUserCityHistory> dynamically creates a div for each of user's searches
    // These searches will load when page loads because they retreive info from localStorage
    
    function createUserCityHistory () {
    
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
            for (localStorageKey=0; localStorageKey<localStorageLength; localStorageKey++) {
                prevSearchText.innerHTML = localStorage.getItem(localStorageKey);
                console.log("localStorageKey is " + localStorageKey);
                console.log("prevSearchText is " + prevSearchText);
            }
    }
    
    
    //function to save user input to localStorage
    function localStorageSave(){
        userInput = input.value;
    
        //checks if local storage is empty
        if (Object.keys(localStorage).length === 0){
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
    searchBtn.addEventListener("click", function(e){
        e.preventDefault();
        localStorageSave();
        createUserCityHistory ();
        getWeatherAPIdata();
        getWeatherAPI5Days();
        checkIfMainWeatherDivExists();
    })
    
    
    
    //function to build cities list and populate each div with values from localStorage.
    //this will be called inside <onload> function.
    //It needs to be separate process from createUserCityHistory (which is linked to searchBtn)
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
    
    
    // -----------------WEATHER API----------------------
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
    
            //Fill in the <divs> with fetched API info
            mainWeatherTitleText.textContent = data.name;
            mainWeatherTemp.textContent = "Temperature: " + data.main.temp + "°C";
            mainWeatherHumidity.textContent = "Humidity: " + data.main.humidity;
            mainWeatherWind.textContent = "Wind speed: " + data.wind.speed + " m/s";
    
            cityLatitude = data.coord.lat;
            cityLongitude = data.coord.lon;
            
            //---------UV Index API---------------
            //------------------------------------
            // // correct synthax for openWeather UVindex API
            // // http://api.openweathermap.org/data/2.5/uvi?appid={appid}&lat={lat}&lon={lon}
            var api2 = "http://api.openweathermap.org/data/2.5/uvi?appid=f729f6b644bc293d9f405e30b345dbd6&lat="+cityLatitude+"&lon="+cityLongitude;
            
            fetch(api2)
            .then(res => res.json())
            .then(data2 => {
                console.log(data2);
                
                //Date formatting
                // date_iso: "2020-04-22T12:00:00Z"
                var str = data2.date_iso;
                str = str.substring(0, str.length-10);
                mainWeatherTitleDate.textContent = str;

                //Fill in the <divs> with fetched API info
                mainWeatherUV.textContent = "UV factor index: " + data2.value;
            })
        })//end of then from fetch(api)
    } //end of getWeatherAPIdata()
    
    
    
    
    
    // ---------------5 DAY FORECAST------------
    //------------------------------------------
    // correct synthax for openWeather 5 day forecast API --->  api.openweathermap.org/data/2.5/forecast?q={city name}&appid={your api key}
    // my key    f729f6b644bc293d9f405e30b345dbd6
    function getWeatherAPI5Days(){
        userInput = input.value;
        var city = userInput;
        var api= "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=f729f6b644bc293d9f405e30b345dbd6";
    
        fetch(api)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            
            // dt_txt: "2020-04-22 00:00:00"
            for (i=1; i<=5; i++){
                var dataDate = data.list[i].dt_txt;
                dataDate = dataDate.substring(0, dataDate.length-8);
                // console.log(str);
                //updating the dynamic html divs with API data
                forecastBlockDayDate.textContent = dataDate;
                //converting Kelvin to Celsius
                var dataKelvin = data.list[i].main.temp;
                var dataCelsius = dataKelvin - 273.15; //this is a number
                var dataCelsiusFormat = Math.round(dataCelsius)
                forecastBlockDayTemp.textContent = dataCelsiusFormat + " °C";

                forecastBlockDayHumidity.textContent= data.list[i].main.humidity + " %";
            }
        })
    }//end of getWeatherAPI5Days()
    
    
    
    
    //Function that creates <RHS div>
    function createMainAppInfo() {

                //creating the main div for current city weather
                mainWeather = document.createElement("div");
                mainWeather.setAttribute("id", "main-weather");
                mainWeather.setAttribute("class", "main-weather");
                RHSMainEl.appendChild(mainWeather);
    
                //creating the title sub-block for the main weather section comprised of title, title date and title icon
                mainWeatherTitle = document.createElement("div");
                mainWeatherTitle.setAttribute("class", "main-weather-title")
                mainWeather.appendChild(mainWeatherTitle);

                //Creating the div for the main title text
                mainWeatherTitleText = document.createElement("p");
                mainWeatherTitleText.setAttribute("class", "main-weather-title-text");
                mainWeatherTitle.appendChild(mainWeatherTitleText);

                //Creating the div for main weather date
                mainWeatherTitleDate = document.createElement("p");
                mainWeatherTitleDate.setAttribute("class", "main-weather-title-date");
                mainWeatherTitle.appendChild(mainWeatherTitleDate);

                //Creating the div for main weather icon
                mainWeatherTitleIcon = document.createElement("div");
                mainWeatherTitleIcon.setAttribute("class", "main-weather-title-icon")
                mainWeatherTitle.appendChild(mainWeatherTitleIcon);

                //Creating the div for main weather temperature
                mainWeatherTemp = document.createElement("p");
                mainWeatherTemp.setAttribute("class", "main-weather-data")
                mainWeather.appendChild(mainWeatherTemp);

                //Creating the div for main weather humidity
                mainWeatherHumidity = document.createElement("p");
                mainWeatherHumidity.setAttribute("class", "main-weather-data")
                mainWeather.appendChild(mainWeatherHumidity);
                
                //Creating the div for main weather wind
                mainWeatherWind = document.createElement("p");
                mainWeatherWind.setAttribute("class", "main-weather-data")
                mainWeather.appendChild(mainWeatherWind);

                //Creating the div for main weather UV Factor
                mainWeatherUV = document.createElement("p");
                mainWeatherUV.setAttribute("class", "main-weather-data")
                mainWeather.appendChild(mainWeatherUV);
                
                // //Creating the div for the 5 days prognosis
                // forecastBlock = document.createElement("div");
                // forecastBlock.setAttribute("id", "forecast-block");
                // forecastBlock.setAttribute("class", "forecast-block");
                // RHSMainEl.appendChild(forecastBlock);

                // //Creating the div for the 5 days prognosis boxes
                // forecastBlockDay = document.createElement("div");
                // forecastBlockDay.setAttribute("class", "forecast-block-day-box")
                // forecastBlock.appendChild(forecastBlockDay);
                

    }//end of function createMainAppInfo()


    function create5DaysPrognosis(){
        //Creating the div for the 5 days prognosis
        forecastBlock = document.createElement("div");
        forecastBlock.setAttribute("id", "forecast-block");
        forecastBlock.setAttribute("class", "forecast-block");
        RHSMainEl.appendChild(forecastBlock);
        
        //Creating the div for the 5 days prognosis boxes
        forecastBlockDay = document.createElement("div");
        forecastBlockDay.setAttribute("class", "forecast-block-day-box")
        forecastBlock.appendChild(forecastBlockDay);

        //Creating the div for the 5 days prognosis date
        forecastBlockDayDate = document.createElement("p");
        forecastBlockDayDate.setAttribute("class", "forecast-block-day-date");
        forecastBlockDay.appendChild(forecastBlockDayDate);

        //Creating the div for the 5 days prognosis icon
        forecastBlockDayIcon = document.createElement("p");
        forecastBlockDayIcon.setAttribute("class", "forecast-block-day-icon");
        forecastBlockDay.appendChild(forecastBlockDayIcon);

        //Creating the div for the 5 days prognosis temp
        forecastBlockDayTemp = document.createElement("p");
        forecastBlockDayTemp.setAttribute("class", "forecast-block-day-temp");
        forecastBlockDay.appendChild(forecastBlockDayTemp);

        //Creating the div for the 5 days prognosis humidity
        forecastBlockDayHumidity = document.createElement("p");
        forecastBlockDayHumidity.setAttribute("class", "forecast-block-day-temp");
        forecastBlockDay.appendChild(forecastBlockDayHumidity);
        
        
        
        
        
    }
    



    //Function to check if the divs exist. it will call/not call createMainAppInfo()
    function checkIfMainWeatherDivExists(){
        //Attempt to get the element using document.getElementById
        var element = document.getElementById("main-weather");
        //If it isn't "undefined" and it isn't "null", then it exists.
        if(typeof(element) != 'undefined' && element != null){
            getWeatherAPIdata();
            getWeatherAPI5Days();
        }else {
            createMainAppInfo();
            create5DaysPrognosis();
        }
    }