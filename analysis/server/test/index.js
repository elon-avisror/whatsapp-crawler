
// const tagModule = require('../modules/tagger');
// var analysis = require('../api/analysis.js');
const Dictionary = require('../tagger/Dictionary.js');



var mydict = new Dictionary();
for(var i=0; i<a.length; i++){
    mydict.addTags(a[i]); //creating "pipes" by probability
}
// async function extractTags(input){
//     try{
//         await finish;
//         var a = cache;
//         var mydict = new Dictionary();
//         for(var i=0, i<a[i].length, i++)
//         mydict.addTags(a[0].tags);  //creating "pipes" by probability
//         var tags = mydict.textToTags(input.new_message);     //finding match from message & tagging
      
//         analysis.setTag(tags);  
//       }catch(e){
//         console.error('extractTags',e)
//       }
   
//   }






//  async function run(input) {
//     tagModule.extractTags(input);
//  }

 run( {
    "new_message": {
        "sender_id": "+972 50 4559015",
        "msg": "נסטלה נסטלה שלנו",
        "msg_id": "tgv5nb86fg56",
        "timestamp": 1546787132,
        "groupId": 1
    }
 });
 run( {
    "new_message": {
        "sender_id": "+972 50 4559015",
        "msg": "נסטלה נסטלה שלנו",
        "msg_id": "tgv5nb86fg56",
        "timestamp": 1546787132,
        "groupId": 1
    }
 });