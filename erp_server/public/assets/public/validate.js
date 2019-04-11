
const URL = 'http://unidress.cambium.co.il:8080';
//const URL = 'http://localhost:8080';

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
}
var msg_id = getQueryVariable('data');

class optionController {

    constructor(args) {
        this.id = undefined;
        this.name = undefined;
        for (var k in args) {
            if (k in this) {
                this[k] = args[k];
            }
        }
        if ('issueId' in args) {
            this.id = args['issueId'];
        }
        if ('description' in args) {
            this.name = args['description'];
        }
    }
}
function myController(inOptions,tag) {
    var self = this;
    var options = [];
    var selected = undefined;
    for (var i = 0; i < inOptions.length; i++) {
        var newOption = new optionController(inOptions[i]);
        options.push(newOption);
    }
    var baseHtml =`<select class="select" name="`+tag+`" required>__options__</select>`;
    function buildHtml() {
        var all = [];
        if(typeof selected == 'undefined') {
            let option = `<option value="" name="" selected>יש לבחור אחת מהאפשרויות</option>`;
            all.push(option);
        }
        for (var i = 0; i < options.length; i++) {
            let dataOption = options[i];
            let option = `<option value="__value__" name="__name__" __selected__> __discription__</option>`;
            option = option.replace('__value__', dataOption.id);
            option = option.replace('__name__', dataOption.name);       
            option = option.replace('__discription__', dataOption.name);
            if (typeof selected !== 'undefined' && selected == dataOption.id) {
                option = option.replace('__selected__', 'selected');
               // baseHtml = baseHtml.replace('__main_name__', dataOption.name);
            } else {
                option = option.replace('__selected__', '');
            }
            all.push(option);
        }
        var allhtml = all.join('');
        baseHtml = baseHtml.replace('__options__', allhtml);
        return baseHtml;
    }
    function setSelected(id) {
        selected = id;
    }
    self.buildHtml = buildHtml;
    self.setSelected = setSelected;

}



getDataToValidateByMsgId = msg_id => {
    var url = URL +"/getDataToValidateByMsgId";
    $.ajax({
        url: url,
        type: 'POST',
        data: JSON.stringify({ msg_id: msg_id }),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (data) {
            console.log(data);
            var cusomer_url =  URL +"/getEntity";
            $.ajax({
                url: cusomer_url,
                type: 'POST',
                data: JSON.stringify({ entity: 'customer,subIssue,issue' }),
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function (dropDownLists) {
                    console.log(dropDownLists);
                    data = data['data_to_validate'];
                    var issue_options = dropDownLists['issue'];
                    var subIssue_options = dropDownLists['subIssue'];
                    var customer_options = dropDownLists['customer'];
                    // initialize
                    var msg_text = msg_id = sender_id = group_name = group_id = customer = sub_issues = issue_id = issue_description =timestamp = receiver = date = "";
                    var sub_issues_str = customer_str = issue_str ="";

                    msg_text = data['msg_text'];
                    $('#msg_text').text(msg_text);
                    $('#text').val(msg_text);
                    msg_id = data['msg_id'];
                    $('#msg_id').val(msg_id);
                    group_id = data['group_id'];
                     $('#group_id').val(group_id);
                    sender_id = data['sender_id'];
                     $('#sender').text(sender_id);
                    $('#sender_id').val(sender_id);
                    group_name = data['group_name'];
                    $('#group_name').text(group_name);
                    var d = new Date(data['timestamp']);
                    var months = ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'];
                    var year = d.getFullYear();
                    var month = months[d.getMonth()];
                    var date = d.getDate();
                    var hour = d.getHours();
                    var min = d.getMinutes();
                    var sec = d.getSeconds();
                    var time = date+' ב'+month + ' ' + year + ', ' + hour + ':' + min;
                    $('#date').text(time);
                    receiver = data['receiver'];
                    $('#receiver').val(receiver);

                    issue = data['issue'];
                    issue_id = issue['id'];
                    issue_description = issue['description'];
                    //var str = '';
                    var name = issue_description;
                    var id = issue_id;
                    var title='issue';
                    let issueController = new myController(issue_options,title);
                    issueController.setSelected(id);
                    issue_str = issueController.buildHtml();
                    //issue_str = issue_str + str;
                    $(".issue-section").html(issue_str);

                   sub_issues = data['sub_issue'];
                    var title='sub_issue_'+0;
                    if(sub_issues.length < 1){
                       let sub_issueController = new myController(subIssue_options,title);
                       sub_issues_str += sub_issueController.buildHtml();
                   }else{
                        for(var is in sub_issues){
                            var str = '';
                            var name = sub_issues[is]['name'];
                            var id = sub_issues[is]['id'];
                            var title='sub_issue_'+is;
                            let sub_issueController = new myController(subIssue_options,title);
                            sub_issueController.setSelected(id);
                            sub_issues_str += sub_issueController.buildHtml();
                            sub_issues_str = sub_issues_str + str;
                            break;  //<--- LIMITS TO ONE ITEM                    
                       }                     
                   }                  

                    $(".sub_issue-section").html(sub_issues_str);


                   customer = data['customer'];
                   var title='customer';
                   if(customer.length < 1){
                       let customerController = new myController(customer_options,title);
                       customer_str += customerController.buildHtml();
                   }else{
                        for(var is in customer){
                            var str = '';
                            var name = customer[is]['name'];
                            var id = customer[is]['id'];                   
                            let customerController = new myController(customer_options,title);
                            customerController.setSelected(id);
                            customer_str += customerController.buildHtml();
                            customer_str = customer_str + str; 
                            break;   //<--- LIMITS TO ONE ITEM                 
                        }
                }
                    $(".customer-section").html(customer_str);                   
                }
            });
        }
    });
}



function submit()
{ 
    var data = window.location.search.substring(1); 
    if(true){
        $.ajax(
        {
            url: URL+"/Data_Validated",
            type: 'GET',
            data: data,
            success: function (res) 
            {
                console.log(res);
                var msg = res.message;
                if (msg == 'validated data registered') msg = 'המידע נרשם בהצלחה'; 
                if (msg == 'data already validated before') msg = 'עמוד זה כבר אושר בעבר ואין צורך באישור נוסף';
                $('main').html(
                    `<div class="main_title_wrap">
                        <div class="main_title">
                            !תודה לך
                        </div>
                    </div>
                    <div class="original_msg">
                    </div>
                    <div class="msg_wrap">
                        <div  id="msg_text" class="msg_text" type="text" name="msg_text" value="">`+msg
                        +`</div>
                        <hr class="line"></hr>
                    </div>`
                );
            }
        });      
    }

}


if(msg_id)
    getDataToValidateByMsgId(msg_id);
else
    submit();
