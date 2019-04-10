//const num = new Date().getTime() - 1000 * 60 * 60;
const num = 10;

console.log("num = " + num);
const ts = {
    ts: num
};

function messageBuilder(msg, sender_id, group_name, tag, text_probability) {
    let structure =
        `<details open>
            <summary>הודעה:</summary>
            <p class="message">${msg}</p> 
        
            <p>
                <span class="sender_id-heading">שולח:</span>
                <span class="sender_id-details">
                    <tel>${sender_id}</tel>
                </span> 
                <span class="br"></span> 

                <span class="group_name-heading">קבוצה:</span>
                <span class="group_name-details">${group_name}</span> 
                <span class="br"></span>

                <span class="tag-heading">תגית:</span>
                <span class="tag-details">${tag}</span>
                <span class="br"></span>

                <span class="text-heading">מילים מובילות:</span>
                <span class="text-details">${text_probability}</span>
            </p> 
        </details>`;

    return structure;
}

getTags = ts => {
    const url = "https://unidress.cambium.co.il:8080/getTags";
    $.post(url, ts, function (data, status) {
        data = data.tags;

        console.log(data);
        console.log(status);

        let result = "";

        for (var element in data) {

            // initialize
            var msg = sender_id = group_name = tags = tag = text = mark = text_probability = "";
            var first = true;

            msg = data[element].msg;

            sender_id = data[element].sender_id;

            group_name = data[element].groupData.group_name;

            tags = data[element].tags;

            for (var n in tags) 
            {
                tag += tags[n].tag_Type+": "+tags[n].tag+", "

                text = tags[n].text;
                mark = `<span class="mark">${text}</span>`;
                msg = msg.replace(text, mark);

                text_probability += tags[n].text + " (" + tags[n].probability + "), ";
            }

            // newsets messages --> oldest messages
            result = messageBuilder(msg, sender_id, group_name, tag, text_probability) + result;
        }

        $(".messages-section").html(result);
    });
}

getTags(ts);