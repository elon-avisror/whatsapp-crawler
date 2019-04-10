# -*- coding: utf-8 -*-
import re
#import requests
#import http.client
#import urllib.request
import httplib,ssl
import json
from pprint import pprint
import os.path
def URL():
    return httplib.HTTPSConnection('unidress.cambium.co.il', 8080, context=ssl._create_unverified_context(),timeout=10)
#URL.set_debuglevel = 8
HERE =os.path.dirname(os.path.abspath(__file__))
csv_file = HERE+'/jsonFile.json'

def GET_TimeStamp():        #Getting last time-stamp from server (by API call)
    conn_TS = URL()
    message=conn_TS.request('POST', '/getTS',body='{}',headers={"Content-type": "application/json"}) # <---
    message = conn_TS.getresponse()
    getTS = message.read()  #getting last timestamp from server
    TS = json.loads(getTS)
    getTS = TS["timestamp"]
    to_TS_body = {"ts":getTS}
    TS_body = json.dumps(to_TS_body)
    print TS_body
    return TS_body

def GET_REQUEST(TS_body):       #Getting the messages and related details
    conn = URL()
    print TS_body
    message=conn.request('POST', '/getMessages', body=TS_body , headers={"Content-type": "application/json"}) # <---
    message = conn.getresponse()
    msgStr = message.read()
    json_data = json.loads(msgStr)  #all json data since timestamp above
    return json_data

def SET_REQUEST():          #Sending tagger's resulte to server    ----- no dealing with exceptions ? ------
    conn_t = URL()
    to_send = {"msg_id":msg_id,"tag_type":"לקוח","tag":match[0],"probability":match[2].replace('\n',''),"text":x[0],"msg":msg1_text}
    to_sends =  json.dumps(to_send)
    print to_sends
    try:
        send=conn_t.request('POST', '/setTag', body=to_sends, headers={"Content-type": "application/json"})
        message_t=conn_t.getresponse()
        msgStr = message_t.read()
        print msgStr
    except:
        print ('err',to_sends)

#def get_table name():
    return 

def tagger(msg_id,msg1_text,pips):      #taging words in the message & calling SET_REQEST

    print msg1_text
    for x in pips:  #לאתר את המילה מההודעה במילון, אם מוצא - לחפש את התיוג בקובץ
        print pips[x]
        tag = pips[x]
        # try:
        #     unicode(tag, "ascii")
        # except UnicodeError:
        #     tag = unicode(tag, "utf-8")
        # else:
        #     # value was valid ASCII data
        #     pass
        found = re.findall(tag,msg1_text)      #finding messages' words in the pips
        if not found:
            flag = 0        #couldn't find a tag
        else:
            flag=1          #found 1 tag, and stops looking for more  -------?-------
            #break
    if flag == 0:
        print "Sorry. Can't find Tagges for this message."
    else:
        for row in dicti:
            match = row.split(",")
            found_en = found[0]
            if found_en.encode('utf8') == match[1]:
                #to_send = {"msg_id":"jhfvhk8786h2","tag_type":"לקוח","tag":"1","probability":"0.9","text":"חברת החמשל","msg":"חברת החמשל הם אחלה!"}
                SET_REQUEST(msg_id, match, x, msg1_text)        #sending it with API to the server

dict_file = open(csv_file,'r')
#dict_by_lists = dict_file.readlines()
with open(csv_file) as file:
    data = json.load(file)

def pip_craeter(pro_file):       #creating precets pips from the file
    pro_dict = {}
    en_pro_dict = pro_file.encode('utf8')
    dicti = json.loads()
    for tab in dicti:
        if tab[2] == "customer_tag":
            for tag in dicti["tags"]:
                prob = dicti["tags"]["probability"]
                print prib
                if pro_dict.has_key(prob):  
                    print pro_dict[prob]      #המפתח כבר קיים-צריך רק לשרשר את הערכים
                    pro_dict[prob].append(en_pro_dict["tags"]["word"])
                else:                               #המפתח לא קיים, צריך ליצור אותו ולהכניס ערכים
                    pro_dict[prob] = [en_pro_dict["tags"]["word"]]
    # for row in pro_file:
    #     pro = row.split(",")
    #     print pro_dict.keys()
    #     prob = re.sub('\n',"",pro[2])
    #     print prob       
    #     if pro_dict.has_key(prob):  
    #         print pro_dict[prob]      #המפתח כבר קיים-צריך רק לשרשר את הערכים
    #         pro_dict[prob].append(pro[1])
    #     else:                               #המפתח לא קיים, צריך ליצור אותו ולהכניס ערכים
    #         pro_dict[prob] = [pro[1]]
    for pr in pro_dict:
        pro_dict[pr] = ','.join(pro_dict[pr])
        pro_dict[pr] = re.sub(',',"|",pro_dict[pr])
    return pro_dict   


courent_ts = GET_TimeStamp()
json_data = GET_REQUEST(courent_ts)
pips_dict = pip_craeter(data)       #filling pips 
for x in json_data:
    msg1_text = x['text'] #saving curent msg text
    msg_id = x['msg_id'] #saving msg_id
    msg_ts = x['timestamp'] #saving 
    tagger(msg_id,msg1_text,pips_dict)

def SET_TimeStamp(msg_ts):
    conn_ts = URL()
    TS_to_send = {"ts":msg_ts}
    TS_sends = json.dumps(TS_to_send)
    TS_send=conn_ts.request('POST', '/setTS', body=TS_sends, headers={"Content-type": "application/json"})
    print TS_to_send
    message_ts=conn_ts.getresponse()
    msgts = message_ts.read()
    print msgts
    
# dict_file.closjson_data = GET_REQUEST(courent_ts)
# for x in json_data:
#     msg1_text = x['text'] #saving curent msg text
#     msg_id = x['msg_id'] #saving msg_id
#     msg_ts = x['timestamp'] #saving 
#     tagger(msg_id,data,msg1_text)