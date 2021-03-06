var getFilteredLabsAdmin = function(order_by) {
    var select_type = document.getElementById('filter_type');
    var select_topic = document.getElementById('filter_topic');
    var select_concept = document.getElementById('filter_concept');
    var select_subconcept = document.getElementById('filter_subconcept');

    var filter_type;
    if(select_type.options[select_type.selectedIndex])
      filter_type = select_type.options[select_type.selectedIndex].value.toLowerCase();

    var filter_name = document.getElementById('filter_name').value.toLowerCase();

    var filter_topic;
    if(select_topic.options[select_topic.selectedIndex])
      filter_topic = select_topic.options[select_topic.selectedIndex].text.toLowerCase();

    var filter_concept;
    if(select_concept.options[select_concept.selectedIndex])
      filter_concept = select_concept.options[select_concept.selectedIndex].text.toLowerCase();

    var filter_subconcept;
    if(select_subconcept.options[select_subconcept.selectedIndex])
      filter_subconcept = select_subconcept.options[select_subconcept.selectedIndex].text.toLowerCase();

    $.getJSON($SCRIPT_ROOT + '/getFilteredLabsDemos', {
            input_type: filter_type,
            name: filter_name,
            topic: filter_topic,
            concept: filter_concept,
            subconcept: filter_subconcept,
            order_by:order_by
        },
        function(data) {
            var data_array = data.result;
            var table = document.getElementById('tablebody');
            table.innerHTML = "";
            for (var curr_lab = 0; curr_lab < data_array.length; curr_lab++) {
                var item = data_array[curr_lab];
                var type = item[1];
                var name = item[2];
                var topic = item[3];
                var concept = item[4];
                var subconcept = item[5];
                var lab_id = item[0];

                var newRow = document.createElement("tr");
                newRow.id = lab_id;
                var rowIndex = document.createElement("td")
                rowIndex.innerHTML = (curr_lab + 1);
                var type_td = document.createElement("td");
                type_td.innerHTML = type;
                var name_td = document.createElement("td");
                name_td.innerHTML = name;
                var topic_td = document.createElement("td");
                topic_td.innerHTML = topic;
                var concept_td = document.createElement("td");
                concept_td.innerHTML = concept;
                var subconcept_td = document.createElement("td");
                subconcept_td.innerHTML = subconcept;


                //Do e.stopPropagation() was not working, so I had to do this.
                //Also couldn't put all the elements inside a span or div, since that messes up the
                //table columns

                //This prevents the "edit" and "delete" buttons from also opening up the Info modal
                rowIndex.setAttribute('data-title', 'Info');
                rowIndex.setAttribute('data-toggle', 'modal');
                rowIndex.setAttribute('data-target', '#info');

                type_td.setAttribute('data-title', 'Info');
                type_td.setAttribute('data-toggle', 'modal');
                type_td.setAttribute('data-target', '#info');

                name_td.setAttribute('data-title', 'Info');
                name_td.setAttribute('data-toggle', 'modal');
                name_td.setAttribute('data-target', '#info');

                topic_td.setAttribute('data-title', 'Info');
                topic_td.setAttribute('data-toggle', 'modal');
                topic_td.setAttribute('data-target', '#info');

                concept_td.setAttribute('data-title', 'Info');
                concept_td.setAttribute('data-toggle', 'modal');
                concept_td.setAttribute('data-target', '#info');

                subconcept_td.setAttribute('data-title', 'Info');
                subconcept_td.setAttribute('data-toggle', 'modal');
                subconcept_td.setAttribute('data-target', '#info');

                newRow.appendChild(rowIndex);
                newRow.appendChild(type_td);
                newRow.appendChild(name_td);
                newRow.appendChild(topic_td);
                newRow.appendChild(concept_td);
                newRow.appendChild(subconcept_td);

				       var moreinfo_td = document.createElement('td');
				       var moreinfo_p = document.createElement('p');
			          moreinfo_p.setAttribute('data-placement', 'top');
                moreinfo_p.setAttribute('data-toggle', 'tooltip');
                moreinfo_p.setAttribute('title', 'Information');
				        var moreinfo_btn = document.createElement('button');
                moreinfo_btn.setAttribute('class', 'btn btn-info btn-xs');
                var moreinfo_span = document.createElement('span');
				        moreinfo_span.setAttribute('class', 'glyphicon glyphicon-info-sign');
                moreinfo_btn.appendChild(moreinfo_span);
                moreinfo_p.appendChild(moreinfo_btn);
                moreinfo_td.appendChild(moreinfo_p);

                var edit_td = document.createElement('td');
                var edit_p = document.createElement('p');
                edit_p.setAttribute('data-placement', 'top');
                edit_p.setAttribute('data-toggle', 'tooltip');
                edit_p.setAttribute('title', 'Edit');
                var edit_btn = document.createElement('button');
                edit_btn.setAttribute('class', 'btn btn-primary btn-xs');
                edit_btn.setAttribute('data-title', 'Edit');
                edit_btn.setAttribute('data-toggle', 'modal');
                edit_btn.setAttribute('data-target', '#edit');
                var edit_span = document.createElement('span');
                edit_span.setAttribute('class', 'glyphicon glyphicon-pencil');
                edit_btn.appendChild(edit_span);
                edit_p.appendChild(edit_btn);
                edit_td.appendChild(edit_p);

                var delete_td = document.createElement('td');
                var delete_p = document.createElement('p');
                delete_p.setAttribute('data-placement', 'top');
                delete_p.setAttribute('data-toggle', 'tooltip');
                delete_p.setAttribute('title', 'Edit');
                var delete_btn = document.createElement('button');
                delete_btn.setAttribute('class', 'btn btn-danger btn-xs');
                delete_btn.setAttribute('data-title', 'Delete');
                delete_btn.setAttribute('data-toggle', 'modal');
                delete_btn.setAttribute('data-target', '#delete');
                var delete_span = document.createElement('span');
                delete_span.setAttribute('class', 'glyphicon glyphicon-trash');



                delete_btn.appendChild(delete_span);
                delete_p.appendChild(delete_btn);
                delete_td.appendChild(delete_p);

				        newRow.appendChild(moreinfo_td);
                newRow.appendChild(edit_td);
                newRow.appendChild(delete_td);


                newRow.onclick = function(e) {
                  populateInfoModal(this);
                };

                moreinfo_btn.onclick = function(e){
                  openPDFTab(this);
                };

                table.appendChild(newRow);
                edit_btn.onclick = function() {
                    populateEditModal(this);
                };

                delete_btn.onclick = function() {
                  var tr = this.closest('tr');
                  var lab_id = tr.id;
                  window.sessionStorage.setItem('lab_id', lab_id);
                };

            }

        });
}
