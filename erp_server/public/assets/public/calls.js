var myList;
var mydata = null;

$(document).ready(function(){
    getGroups();
})


function show_table() {
    //get since
    var since = document.getElementById("since").value;
    since = new Date(since).getTime()
    //get until
    var until = document.getElementById("until").value;
    until = new Date(until).getTime()
    until += 86400000 // addnit time to the end of the day
    //get group
    var group = $('#select_group').val();
    if(!group)
        return alert('בחר קבוצה');

    $('#show_btn').html('..מציג');
    var url =  "http://wac.local:8080/getValidated_data";
    $.ajax({
        url: url,
        type: 'POST',
        data: JSON.stringify({ since:since, until:until, group_name: group }),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (data) {
            data = data['validated_data'];
            mydata = data;
            myList = data;
            $("#csv_btn").show();
            var Table = document.getElementById("excelDataTable");
            //Table.innerHTML = "<thead></thead><tbody></tbody>";
            Table.innerHTML = "<thead><tr><th>text</th><th>sender</th><th>time</th><th>group</th><th>issue</th><th>sub_issus</th><th>receiver</th><th>customer</th><th>status</th></tr></thead><tbody></tbody>";
            buildHtmlTable('#excelDataTable');
            var tf = new TableFilter('excelDataTable', filtersConfig);
            /*var tf = new TableFilter('excelDataTable',
            {
                 base_path: filtersConfig,
                         alternate_rows: true
            });*/
            tf.init();
            console.log(data);
            //complete: () => $('#show_btn').html('הצג דו"ח מידע מאושר')
            $('#show_btn').html('הצג דו"ח מידע מאושר');

        }
    });
}


var filtersConfig = {
    base_path: 'tablefilter/',
    col_0: 'select',
    col_1: 'select',
    col_2: 'select',
    col_3: 'select',
    col_4: 'select',
    col_5: 'select',
    col_6: 'select',
    col_7: 'select',
    col_8: 'select',
    col_9: 'select',

    alternate_rows: true,
    rows_counter: true,
    btn_reset: true,
    loader: true,
    status_bar: true,
    mark_active_columns: true,
    highlight_keywords: true,
    col_types: [
        'string', 'string', 'string',
        'string', 'string', 'string',
        'string', 'string', 'string'
    ],
    /*custom_options: {
        cols:[3],
        texts: [[
            '0 - 25 000',
            '100 000 - 1 500 000'
        ]],
        values: [[
            '>0 && <=25000',
            '>100000 && <=1500000'
        ]],
        sorts: [false]
    },*/

    extensions:[{ name: 'sort' }]
};




function buildHtmlTable(selector) {
    var columns = addAllColumnHeaders(myList, selector);

    for (var i = 0; i < myList.length; i++) {
        var row$ = $('<tr/>');
        for (var colIndex = 0; colIndex < columns.length; colIndex++) {
            var cellValue = myList[i][columns[colIndex]];
            if (cellValue == null) cellValue = "";
            row$.append($('<td/>').html(cellValue));
        }
        $(selector).append(row$);
    }
}


function addAllColumnHeaders(myList, selector) {
    var columnSet = [];
    var headerTr$ = $('<tr/>');

    for (var i = 0; i < myList.length; i++) {
        var rowHash = myList[i];
        for (var key in rowHash) {
            if ($.inArray(key, columnSet) == -1) {
                columnSet.push(key);
                headerTr$.append($('<th/>').html(key));
            }
        }
    }
    //$(selector).append(headerTr$);

    return columnSet;
}



function getGroups()
{
    var groupsArray = [];
    var data = ["מפעל ירושלים ושירות","מפעל בתי חולים"];
    for (var oneGroup of data)
        groupsArray.push(oneGroup);

    var options = '<option value="" disabled selected>בחר קבוצה</option>';
    for (var group of groupsArray)
        options += '<option>'+group+'</option>';
    $(".select_group").html(options);

    $("#csv_btn").hide();
    mydata = null;

}

function download_csv()
{
    if(mydata == null){
        alert("יש להציג את המידע על המסך לפני הוצאה כקובץ");
        return;
    }
    $('#csv_btn').html('..מייצא');

    var csv = '\ufeff';
    csv += 'call,date,sender,message,customer,issue,sub_issue,receiver,whatsApp group,status \n';
    for (var i = 0; i < mydata.length; i++) {
        var sender = mydata[i].sender;
        var isreal_area_code = "+972";
        var plus_sign = sender.includes(isreal_area_code);
        if (plus_sign) sender = sender.replace(isreal_area_code, "0");
        var row = [i + 1, mydata[i].time, sender, mydata[i].text, mydata[i].customer, mydata[i].issue, mydata[i].sub_issus, mydata[i].receiver, mydata[i].group, mydata[i].status];
        csv += row.join(',');
        csv += "\n";
    }

    console.log(csv);
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'wac_validated_data.csv';
    hiddenElement.click();
    //complete: () => $('#csv_btn').html('ייצוא דו"ח מידע מאושר')
    $('#csv_btn').html('ייצא טבלה')
}