const dotenv = require('dotenv')

dotenv.config();


let weather = {
    
    fetchWeather :(city) =>{
        fetch(
            "https:api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + `${process.env.API_KEY}` + "&units=metric"
        ).then(res => {
            if(!res.ok){
                alert("No weather data found")
                throw new Error("No weather data found")
            }
            return res.json();
        })
        .then((data) => {
            
        const{ name } = data;
        const { icon,description } = data.weather[0];
        const { humidity,temp } = data.main;
        const { speed } = data.wind

        document.querySelector(".city-name").innerText = "Weather in " + name;
        document.querySelector(".temp").innerText = temp + "℃"
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png" 
        document.querySelector(".clouds").innerText = description
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%"
        document.querySelector(".wind").innerText = "Wind Speed: " + speed + "km/h"
        document.querySelector(".weather").classList.remove("loading")
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')"
        } )
    },

    search : function(){
        this.fetchWeather(document.querySelector(".search-bar").value)
    }

}


let cities = ["Ayodhya","Hong Kong","Bangkok","London","Macau","Singapore","Paris","Dubai","New York City","Kuala Lumpur","Istanbul","Delhi","Antalya","Shenzhen","Mumbai","Phuket","Rome","Tokyo","Pattaya","Taipei","Mecca","Guangzhou",'Prague',"Medina","Seoul","Amsterdam","Agra","Miami","Osaka","Las Vegas","Shanghai","Ho Chi Minh City","Denpasar","Barcelona","Los Angeles","Milan","Chennai","Vienna","Johor Bahru","Jaipur","Cancún","Berlin","Cairo","Orlando","Moscow","Venice","Madrid","Ha Long","Riyadh","Dublin","Florence","Jerusalem","Hanoi","Toronto","Johannesburg","Sydney","Munich","Jakarta","Beijing","Saint Petersburg","Brussels","Budapest","Athens","Lisbon","Dammam","Penang Island","Heraklion","Kyoto","Zhuhai","Vancouver","Chiang Mai","Copenhagen","San Francisco","Melbourne","Warsaw","Marrakesh","Kolkata","Cebu City","Auckland","Tel Aviv","Guilin","Honolulu","Hurghada","Kraków","Muğla","Buenos Aires","Chiba","Frankfurt am Main","Stockholm","Lima","Da Nang","Batam","Nice","Fukuoka","Abu Dhabi","Jeju","Porto","Rhodes","Rio de Janeiro","Krabi","Bangalore","Mexico City","Punta Cana","São Paulo","Zürich","Montreal","Washington D.C.","Chicago","Düsseldorf","Boston","Chengdu","Edinburgh","San Jose","Philadelphia","Houston","Hamburg","Cape Town","Manila","Bogota","Xi'an","Beirut","Geneva","Colombo","Xiamen","Bucharest","Casablanca","Atlanta","Sofia","Dalian","Montevideo","Amman","Hangzhou","Pune","Durban","Dallas","Accra","Quito","Tianjin","Qingdao","Lagos"
];

const result_box = document.querySelector(".result_box");
const search_bar = document.getElementsByClassName(".search-bar");

document.querySelector(".search-bar").addEventListener("keyup", function(){
    let result = [];
    let input = document.querySelector(".search-bar").value;
    if(input.length){
        result = cities.filter(city => {
           return city.toLowerCase().includes(input.toLowerCase());
        });
        console.log(result);
    }
    display(result)
    if(!result.length){
        result_box.innerHTML = ''
    }
})

function display(result){
    const content = result.map(list => {
        return "<li onclick=selectInput(this)>" + list + "</li>"
    });
    result_box.innerHTML = "<ul>" + content.join('') + "</ul>"
}

function selectInput(list){
    weather.fetchWeather(list.innerHTML)
    document.querySelector(".search-bar").value = list.innerHTML;
    result_box.innerHTML = '';
}

weather.fetchWeather("Pune");

document.querySelector(".search-bar").addEventListener("keyup",function(event){
    if(event.key == "Enter"){
        result_box.innerHTML = '';
        weather.search()
        
    }
})

document.querySelector(".box button").addEventListener("click",function(){
    weather.search()
})