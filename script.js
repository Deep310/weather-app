const btn = document.getElementById('search-icon');

btn.addEventListener('click', function(){ 
    if(document.getElementById('searchbar').value ===''){
        alert('Error: Please enter name of a city');
    }
    else{
        let cityname = document.getElementById('searchbar').value;
        getWeather(cityname)
            .then( function(response){
                return response;  
            })
            .then(function newResponse(response){
                loadData(response);
            })
            .catch(function(err){
                console.log('Request failed! Error ' + err);
            });

    }
});

// function getWeather(city){
//     return new Promise(function(resolve, reject){
//         const apiURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bf1bedbf24ebcc81a53dcd314db85f38`;
//         let xhr = new XMLHttpRequest();
//         xhr.open('GET', apiURL);

//         xhr.onload = function(){
//             if(this.status==200){
//                 resolve(JSON.parse(this.responseText));
//             }
//             else{
//                 reject(this.status);
//             }
//         }

//         xhr.send();
//     });
// };

 
async function getWeather(city){
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bf1bedbf24ebcc81a53dcd314db85f38`;
    const response = await fetch(apiURL);
    const data = await response.json();
    return(data);
}
      
/*show the answer-container*/
function loadData(data){
    document.getElementById('hi').classList.add('answer-container');
    
    document.getElementById('a1').innerHTML = data.name; 
    document.getElementById('a1').style.textTransform = 'capitalize';

    document.getElementById('a2').innerHTML = checkLatitude(data.coord.lat) + ' & ' + checkLongitude(data.coord.lon);
    document.getElementById('a3').innerHTML = data.weather[0].main ;
    
    document.getElementById('a4').innerHTML = kelToCelcius(data.main.temp);
    document.getElementById('a5').innerHTML = kelToCelcius(data.main.feels_like);
    document.getElementById('a7').innerHTML = kelToCelcius(data.main.temp_max);
    document.getElementById('a6').innerHTML = kelToCelcius(data.main.temp_min);
    document.getElementById('a8').innerHTML = data.wind.speed+ ' m/s';
    document.getElementById('a9').innerHTML = data.clouds.all + ' %';
    document.getElementById('a10').innerHTML = data.main.humidity + ' %';
};

function kelToCelcius(kelvinTemp){
    return ((kelvinTemp-273.15).toFixed(2)+' C');
}

function checkLongitude(lon){
    if(lon >= 0){
        return lon+' E';
    }
    return lon*(-1) + ' W';   
};

function checkLatitude(lat){
    if(lat >= 0){
        return lat + ' N';
    }
    return lat*(-1) + ' S';
};