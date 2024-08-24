function selectBHK(bhk) {
    document.getElementById('bhkValue').value = bhk;
    var buttons = document.querySelectorAll('#bhk .btn');
    buttons.forEach(btn => btn.classList.remove('selected'));
    buttons[bhk - 1].classList.add('selected');
}

function selectBath(bath) {
    document.getElementById('bathValue').value = bath;
    var buttons = document.querySelectorAll('#bath .btn');
    buttons.forEach(btn => btn.classList.remove('selected'));
    buttons[bath - 1].classList.add('selected');
}

function getBathValue() {
    var buttons = document.querySelectorAll("#bath .btn");
    for (var i = 0; i < buttons.length; i++) {
        if (buttons[i].classList.contains('selected')) {
            return i + 1;
        }
    }
    return -1;
}

function getBHKValue() {
    var buttons = document.querySelectorAll("#bhk .btn");
    for (var i = 0; i < buttons.length; i++) {
        if (buttons[i].classList.contains('selected')) {
            return i + 1;
        }
    }
    return -1;
}

function onClickedEstimatedPrice(event) {
    event.preventDefault(); // Prevent form submission
    console.log("Estimated price button clicked!");
    
    var sqft = document.getElementById('area').value;
    var bhk  = getBHKValue();
    var bath = getBathValue();
    var location = document.getElementById('uiLocations').value;
    var estPrice = document.getElementById('est-price');

    var url = "/api/predict_home_price";

    $.post(url, 
        {
            total_sqft: parseFloat(sqft), 
            bhk: bhk,
            bath: bath, 
            location: location
        }, 
        function(data, status) {
            console.log(data.estimated_price);
            estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + " Lakh</h2>";
            console.log(status);
        }
    );
}

function onPageLoad() {
    console.log("Document loaded!");
    var url = "/api/get_location_names";
    $.get(url, function(data, status) {
        console.log('Got response for get_location_names request');
        if(data) {
            var locations = data.locations;
            var uiLocations = document.getElementById('uiLocations');
            $('#uiLocations').empty();
            for(var i in locations) {
                var opt = new Option(locations[i]);
                $('#uiLocations').append(opt);
            }
        }
    });
}

window.onload = onPageLoad;

// Attach event listener correctly
document.querySelector('.estimate-btn').addEventListener("click", onClickedEstimatedPrice);
