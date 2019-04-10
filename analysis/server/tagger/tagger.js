var analyze = require('../api/analysis');


var data = {'ts':1547982426};
var res = analysisApi.setTag(data);

//gets data, tagging it and calls set_tags
function tagging_massage(data){ 
    var msg_data = data.new_message
}

function pipping(data){
    var regex = "";
    for (var x=0 in data){
        if (data[x].table_name = "customer_tag"){
            for (var y=0 in data[x].tags){
                
                pips.data[x].tags[y].probability +=  data[x].tags[y].word;
            }
        }
        else{
            
        }
    }
    var endregex = new RegExp(regex,'gm');

}

function get_massage()