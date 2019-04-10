# -*- coding: utf-8 -*-
import re
import httplib,ssl
import json
from pprint import pprint
import os.path

URL = httplib.HTTPSConnection('unidress.cambium.co.il', 8080, context=ssl._create_unverified_context())
#HERE =os.path.dirname(os.path.abspath(__file__))
#csv_file = HERE+'/dict_keys.csv'


message=URL.request('POST', '/getTablesData',body='{}',headers={"Content-type": "application/json"}) # <---
message = URL.getresponse()
getFile = message.read()  #getting last timestamp from server

with open('tagger/jsonFile.json', 'w') as outfile:
    json.dump(getFile, outfile)

#to_TS_body = {"ts":getTS}
#TS_body = json.dumps(to_TS_body)
