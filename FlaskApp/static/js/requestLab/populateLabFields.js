var populateLabFields = function() {
    var lab_id = window.sessionStorage.getItem('lab_id');
    $.getJSON($SCRIPT_ROOT + '/getLab', {
        lab_id: lab_id
    }, function(data) {
        console.log(data.result);
        var lab = document.getElementById('lab');
        var data_array = data.result;
        var lab_data = data_array[0];

        lab.value = lab_data[2];
        getCourses();
        getLabClassrooms();
        getNumTeams();
        getWeeks();
        return false;
    });
}

var getLabClassrooms = function(){
  $.getJSON($SCRIPT_ROOT + '/getLocations', {
      type: "classroom"
  }, function(data) {
      console.log(data.result);
      var room_select = document.getElementById('room');
      var data_array = data.result;
      for(var i = 0; i < data_array.length; i++){
        var location = data_array[i];
        var building = location[1];
        var room_num = location[2];
        var location_id = location[0];
        var option = document.createElement('option');
        option.value = location_id;
        option.text = building + " " + room_num;
        room_select.appendChild(option);
      }
      return false;
  });
}

  var getCourses = function() {
    $.getJSON($SCRIPT_ROOT + '/getAllCourses', {}, function(data) {
        console.log(data.result);
        var course_select = document.getElementById('course');
        var data_array = data.result;
        for(var i = 0; i < data_array.length; i++){
          var course_name = data_array[i][1];
          var option = document.createElement('option');
          option.value = course_name;
          option.text = course_name;
          course_select.appendChild(option);
        }
        return false;
    });
  }

  var getNumTeams = function(){
    $.getJSON($SCRIPT_ROOT + '/getAllConstants', {}, function(data) {
        console.log("CONSTANTS: ")
        console.log(data.result);
        var num_teams_field = document.getElementById('numTeams');
        var data_array = data.result;
        num_teams_field.value = data_array[0][2];
        return false;
    });
  }

  var getWeeks = function() {
    $.getJSON($SCRIPT_ROOT + '/remainingWeeks', {}, function(data) {
        var week_select = document.getElementById('week');
        var remaining = data.remaining;
        var total = data.total;
        for(var week = (total-remaining + 1); week <= total+1; week++){
          var option = document.createElement('option');
          option.value = week;
          option.text = week;
          week_select.appendChild(option);
        }
        return false;
    });
  }
