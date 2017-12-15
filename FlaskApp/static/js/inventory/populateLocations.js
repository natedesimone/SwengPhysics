function populateLocations() {
    $.getJSON($SCRIPT_ROOT + '/getLocations', {
            type:"inventory"
        },
        function(data) {
            var select_location = document.getElementById('location_select');
            select_location.innerHTML = "";
            var data_array = data.result;
	    var index = 0;
            for(var i = 0; i < data_array.length; i++){
              var location = data_array[i];
              var location_id = location[0];
              var building = location[1];
              var room_num = location[2];
              var option = document.createElement('option');
              option.value = location_id;
              option.text = building + " " + room_num;
              select_location.appendChild(option);
	      index = i;
            }
            select_location.appendChild(document.createElement('option'));
	    select_location.selectedIndex = index + 1;

        });
}
