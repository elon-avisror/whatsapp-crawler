function download_csv() 
{
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
    
    $('#csv_btn').html('..מייצא');

    var url = URL + "/getValidated_data";
    $.ajax({
        url: url,
        type: 'POST',
        data: JSON.stringify({ since: since, until: until, group_name: group}),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (data) 
        {
            data = data['validated_data'];
            console.log(data);
            console.log(JSON.stringify(data));

            var csv = '\ufeff';
            csv += 'call,date,sender,message,customer,issue,sub_issue,receiver,whatsApp group,status \n';
            for (var i = 0; i < data.length; i++) {
                var sender = data[i].sender;
                var isreal_area_code = "+972";
                var plus_sign = sender.includes(isreal_area_code);
                if (plus_sign) sender = sender.replace(isreal_area_code, "0");
                var row = [i + 1, data[i].time, sender, data[i].text, data[i].customer, data[i].issue, data[i].sub_issus, data[i].receiver, data[i].group, data[i].status];
                csv += row.join(',');
                csv += "\n";
            }

            console.log(csv);
            var hiddenElement = document.createElement('a');
            hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
            hiddenElement.target = '_blank';
            hiddenElement.download = 'unidress_validated_data.csv';
            hiddenElement.click();
        },
        complete: () => $('#csv_btn').html('ייצוא דו"ח מידע מאושר')                
    });
}