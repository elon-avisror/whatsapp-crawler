updateGroupId =  function (data,callbackRes){


        var erp = {
               'route':'call/updateGroupName',
               'old':data.old,
               'new':data.new,
               'created_time':data.group_creation_time
    };


    callbackRes(erp);
}

exports.updateGroupId = updateGroupId;