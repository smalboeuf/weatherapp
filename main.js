window.addEventListener('load',()=>{
    let longitude;
    let latitude;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureNumb = document.querySelector('.temperature-number');
    let locationTimezone = document.querySelector('.location-timezone');
    let degree_icon = document.querySelector('.degree-icon');
    const degree_Span = document.querySelector('.degree-icon span');

    if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position =>{
        
        longitude = position.coords.longitude;
        latitude = position.coords.latitude;
    
        const proxy = "http://cors-anywhere.herokuapp.com/";
        const api=`${proxy}https://api.darksky.net/forecast/e577fe35bc8b8f75c285c87be90d8c95/${latitude},${longitude}`;
    
        fetch(api)
    
            .then(response => {
                return response.json();
            })
            .then(data =>{
                const {temperature,summary, icon} = data.currently;
                //Pulling elements from the API
                temperatureNumb.textContent  = temperature;
                temperatureDescription.textContent = summary;
                //locationTimezone.textContent = data.timezone;
                //Rule For Celsius
                let celsius = (temperature - 32)*(5/9);

                //Icons
                setIcons(icon, document.querySelector(".icon"))

                //Changing temperature to celsius and fahrenheit on click
                degree_icon.addEventListener('click', () => {
                    if(degree_Span.textContent === "F"){
                        degree_Span.textContent = "C";
                        if (Math.floor(celsius)=== 0){
                            celsius = -1;
                        }
                        temperatureNumb.textContent = Math.floor(celsius);
                    }else{
                        temperatureNumb.textContent = temperature;
                        degree_Span.textContent = "F";
                    }

                })

            });
        
    })
    }else{
        h1.textContent = "Please show your location to know the weather."
    }


    function  setIcons(icon, iconID){
        const skycons = new Skycons({color:"white"});
        const currentIcon = icon.replace(/-/g,"_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }

    switch(temperatureDescription){

case "Mostly Cloudy":
document.body.style.backgroundImage = "url('cloudy.jpeg')";

case "Overcast":
document.body.style.backgroundImage = "url('cloudy.jpeg')";

    }

    });



    