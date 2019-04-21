//const URL = 'http://unidress.cambium.co.il:8080';
const URL = 'http://localhost:8080';  // download_to_csv
//const num = new Date().getTime() - 1000 * 60 * 60;
const num = 10;
console.log("num = " + num);


function messageBuilder(msg, sender_id, group_name, tag, text_probability, msg_id, ref_msg_text, ref_id, issue, receiver, status, dateString) 
{
    let reference_structure = ``;
    if(ref_msg_id)
    {
        reference_structure = `<div class="wrap_ref">`;
        if(status == "closed")
            reference_structure = `<div class="wrap_ref close_ref">`;            

        reference_structure += `<div id="${ref_id}" class="reference">
                <span class="ref_heading">בתגובה ל:</span>
                <span class="ref_details">${ref_msg_text}</span>
            </div>
        </div>`;
    }

    let isOpen = '';
    if (tag)
        isOpen='open';

    let structure =`<details `+isOpen+` id="${msg_id}">`;
    if(status == "close" && ref_msg_id)
        structure = `<details `+isOpen+` id="${msg_id}" class="close_details">`;
    else if (status == "close" && !ref_msg_id)
        structure = `<details `+isOpen+` id="${msg_id}" class="close_details_no_ref">`;
    structure +=
            `<summary class="summary">
                <span class="message">הודעה:</span>
                <span class="message_details">${msg}</span>
            </summary>   
            <p></p>     
            <hr>
            <div class="raw">
                <span class="sender_id heading">שולח:</span>
                <span class="sender_id_d details">
                    <tel>${sender_id}</tel>
                </span>
                <span class="group_name heading">קבוצה:</span>
                <span class="details">${group_name}</span>
                <span class="group_name hour heading">שעה:</span>
                <span class="details hour_d">${dateString}</span> 
            </div>
            <hr>`;
    if (issue || receiver)
    {
        structure +=
            `<div class="raw">
                <span class="issue heading">סיווג:</span>
                <span class="issue_d details">${issue}</span>

                <span class="receiver heading">גורם מטפל:</span>
                <span class="receiver_d details">${receiver}</span> 
            </div>
            <hr>`;
    }
        structure +=
            `<div class="raw">
                <span class="tag heading">תגיות:</span>
                <span class="tag details">${tag}</span>
            </div>
            <hr>
            <div class="raw">
                <div class="text heading" >מילים<br>מובילות:</div>
                <div class="text_d details">${text_probability}</div>
            </div>
        </details>`;

    return structure+reference_structure;
}

function getTags()
{
    $(".loader_wrap").show();

    var url = URL+"/getTags";
    var group = $('#select_group').val();
    console.log(group);

    var body = 
    {
        ts: num,
        group_name: group
    }

    $.post(url, body, function (data, status) 
    { 
        data = data.tags;

        console.log(data);
        console.log(status);

        let result = "";

        for (var element in data) 
        {
            if (data[element].groupData.group_name != "WhatsApp Crawler 2" && data[element].groupData.group_name != "הכרת מערכת הוואטסאפ")
            {
                // initialize
                var dateString = msg = msg_id = sender_id = group_name = tags = tag = text = mark = text_probability = ref_msg_id = ref_msg_text = issue = receiver = status = "";
                var ts = 0;

                msg_id = element;
                msg = data[element].msg;
                sender_id = data[element].sender_id;
                group_name = data[element].groupData.group_name;
                issue = data[element].issue;
                receiver = data[element].receiver;
                status = data[element].status;
                ts = data[element].timeStamp;
                date = new Date(ts);
                // TODO: check it for diffrenet timezone
                options = {hour:'2-digit',minute:'2-digit',day:'2-digit',month:'2-digit',year:'numeric', timeZone:"Asia/Jerusalem"};
                dateString = date.toLocaleString('he-IL', options);

                tags = data[element].tags;
                for (var n in tags) 
                {
                    tag += ",("+tags[n].tag_Type+")"+tags[n].tag;

                    text = tags[n].text;
                    mark = `<span class="mark">${text}</span>`;
                    msg = msg.replace(text, mark);

                    text_probability += tags[n].text + " (" + tags[n].probability + "), ";
                }

                //reference message
                if (data[element].reference.ref_msg_id)
                {
                    ref_msg_id = data[element].reference.ref_msg_id;
                    ref_msg_text = data[element].reference.ref_txt;
                }

                // newsets messages --> oldest messages
                result += messageBuilder(msg, sender_id, group_name, tag, text_probability, msg_id, ref_msg_text, ref_msg_id, issue, receiver, status, dateString);
            }
        }
        $(".messages-section").html(result); 
        $(".loader_wrap").hide();
    }); 
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

    /*var url = URL+"/getWAGroups";

    $.post(url,{}, function (data, status)
    { 
        console.log(data);
        console.log(status);

        var groupsArray = [];
        for (var oneGroup of data)
            groupsArray.push(oneGroup.groupName);

        var options = '<option value="" disabled selected>Select group</option>';
        for (var group of groupsArray)
            options += '<option>'+group+'</option>';

        $(".select_group").html(options); 
    });*/
}

function changeStyle()
{
    $(".csv_btn").css('box-shadow','0 0 0 0 rgba(0,0,0,0)');
}

$(".loader_wrap").hide();
getGroups()