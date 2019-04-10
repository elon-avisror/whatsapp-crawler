class CreateTag{
    constructor(args){
        this.probability =undefined;
        this.text=undefined;
        this.msg_id=undefined;
        this.tag=undefined;
        this.msg=undefined;
        this.tag_type=undefined;
        for(var k in args){
            if(k in args){
                this[k] = args[k];
            }
        }
    }
}
class DictionaryElement{
    constructor(){
        this.tags= [];
        this.wordTagMap= {};
        this.probability= 0;
    }
    addWord(word){
        this.words.push(word);
    }
    /**
     * pushing words into the right probability list
     * @param {*} tag 
     */
    addTag(tag,t_name){
        this.tags.push(tag);
        tag.t_name = t_name;
        var word = tag.word;
        this.wordTagMap[word] = tag;
        if(this.probability==0){
            this.probability= tag.probability;
        }
    }
    /**creating the regexes from the list of words we created above
     * @returns {RegExp}
     */
    getRegex(){
        var words =  this.tags.map(e=>e.word);
        var a = words.join('|');
        var regex = new RegExp(a,'gm');
        return regex;
    }
    /**
     * checking if there is a matching regex in the message's text
     * @param {*} text 
     */
    textHasWords(text){
        var reg = this.getRegex();
        return reg.test(text);
    }
    //creating 1 object with the relevant fildes
    textToTags(text){
        var msg = text.msg;
        var msg_id = text.msg_id;
        //var regex = this.getRegex();
        let m;
        var arr=[];
        var words =  this.tags.map(e=>e.word);

        words.forEach(el =>{
            var regex = new RegExp(el,'gm');
            if((m = regex.exec(msg)) !== null){
                var tag = this.wordTagMap[el];
                var a = console.log({tag_type:tag.t_name.substring(0, tag.t_name.length-4),msg:msg,msg_id:msg_id,tag:tag.tagName,probability:tag.probability,text:m[0]})
                arr.push({tag_type:tag.t_name.substring(0, tag.t_name.length-4),msg:msg,msg_id:msg_id,tag:tag.tagName,probability:tag.probability,text:m[0]})
            }
        });
        return arr;

        // while ((m = regex.exec(msg)) !== null) {
        //     var regexword = this.words[m[0]];
        //     var tag = this.wordTagMap[words[regexword]];
        //     //console.log(tag);
        //     console.log({tag_type:tag.t_name.substring(0, tag.t_name.length-4),msg:msg,msg_id:text.msg_id,tag:tag.tagName,probability:this.probability,text:regexword})
        //     arr.push({tag_type:tag.t_name.substring(0, tag.t_name.length-4),msg:msg,msg_id:text.msg_id,tag:tag.tagName,probability:this.probability,text:regexword})
        // }
        // return arr;
    }
}

module.exports = class Dictionary{
    constructor(){
        this.map = {};
        this.arr = [];
    }
    //creating the "pipes"
    addTagToDict(tags,t_name){
       var tag;
       var probability;
       for (let obj of tags){
           probability = obj.probability;
           if(probability in this.map){
                tag = this.map[probability];
            }
            else{
                tag = new DictionaryElement(obj);
                this.map[probability] = tag;  
                this.arr.push(tag);
            }
            tag.addTag(obj,t_name);
       }
       
    }
/**
     * 
     * @param {any[]} tags 
     */
    addTags(table){
        var tags = table.tags;
        var g = table.table_name;
        this.addTagToDict(tags,table.table_name);// code to be executed
    }
    //
    textHasWords(text){
        var ret = false;
        for(var i =0;i<this.arr.length;i++){
            var tag = this.arr[i];
            ret = tag.textHasWords(text);
            if(ret){
                break;
            }
        }
        return ret;
    }
    //
    textProbabilty(text){
        var ret = false;
        for(var i =0;i<this.arr.length;i++){
            var tag = this.arr[i];
            let ret = tag.textHasWords(text);
            if(ret){
                ret = tag.probability;
                break;
            }
        }
        return ret;
    }
    //
    textToProbabiltyArr(text){
        var ret = false;
        for(var i =0;i<this.arr.length;i++){
            var tag = this.arr[i];
            let has = tag.textHasWords(text);
            if(ret){
                ret = tag.probability;
                break;
            }
        }
        return ret;
    }
    //collecting all objects into 1 (sendable) object
    textToTags(text){
        var arr =[];
        for(var i =0;i<this.arr.length;i++){
            var tag = this.arr[i];
            let inarr= tag.textToTags(text);
            arr.push.apply(arr,inarr);
        }
        return arr;
    }
}

