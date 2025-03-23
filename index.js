// ----------- First Method without using async, await ----------------  

// fetch('https://ipapi.co/json/')
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         return response.json();
//     })
//     .then(data => console.log(data))
//     .catch(error => console.error('Error:', error));

// ------------------------------------------------------------------------------------------------------------------------


// --------------------- Fetch method using async and await-------------------------------------

let inputele =document.querySelector("#input1");
let ipele = document.querySelector("#iptext");
let locationele = document.querySelector("#locationtext");
let timezoneele = document.querySelector("#timezonetext");
let ispele = document.querySelector("#isptext");
let alertele = document.querySelector("#alert");
let closeele = document.querySelector("#close")


// let timeout; // Timer for debounce

// //Listen for user input and debounce API calls
// inputele.addEventListener("input", function () {
//     clearTimeout(timeout);
//     timeout = setTimeout(() => fetchData(this.value.trim()), 1000); // Wait 1 sec
// });

document.getElementById("click1").addEventListener("click", function (event) {
    let userInput = this.value.trim();
    if (event.key === "Enter") { // If Enter key is pressed
        fetchData(userInput);
    }
});
document.getElementById("input1").addEventListener("keydown", function (event) {
    let userInput = this.value.trim();
    if (event.key === "Enter") { // If Enter key is pressed
        fetchData(userInput);
    }
});

async function fetchData(query) {
    if(!query){
        try {
            console.log("useripaddress")
            let response = await fetch('https://ipinfo.io/json/');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        let data = await response.json();
        console.log(data);

        ipele.innerHTML = data.ip;
        locationele.innerHTML = data.city +", "+ data.region+", "+data.country;
        timezoneele.innerHTML = data.timezone;
        ispele.innerHTML = data.org;
         // Update Map
         let [lat, lon] = data.loc.split(",");
         updateMap(lat, lon);
            
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    else{
        try {
            console.log("queryip");
            
            let response = await fetch(`https://ipinfo.io/${query}/json/`);
            console.log(query)
            if (!response.ok) {
                console.log("alert")
                alert(query)
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            let data = await response.json();
            console.log(data);
    
            ipele.innerHTML = data.ip;
            locationele.innerHTML = data.city +", "+ data.region+", "+data.country;
            timezoneele.innerHTML = data.timezone;
            ispele.innerHTML = data.org;
             //Update Map
        let [lat, lon] = data.loc.split(",");
        updateMap(lat, lon);
            
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
}
  
// ------------------------- Map-----------------
let map = L.map('map').setView([50, 0], 2); // Default View

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Update Map Location
function updateMap(lat, lon) {
    map.flyTo([lat, lon], 10);
    L.marker([lat, lon]).addTo(map)
        .bindPopup(`Location: ${lat}, ${lon}`)
        .openPopup();
}

function alert(query){
    document.getElementById("alert").style.display="block";
    document.getElementById("alertmessage").innerText=query+" Incorrect IP Address";
}
document.getElementById("close").addEventListener("click",close)
function close(){
    inputele.value="";
    console.log("close");
    document.getElementById("alert").style.display="none";
}


fetchData()

