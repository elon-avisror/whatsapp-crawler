
from gensim.parsing.preprocessing import preprocess_string,strip_non_alphanum
import math
BASETABLENAME = 'ldagroup'
class PostWordHolder:
def __init__(self,keyHash):
self.words = []
self.keyHash = keyHash
def addWord(self, word):
try:
self.words = self.words+preprocess_string(word)
except:
print('error',word) 
def cleanWords(self):
text = ' '.join(self.words)
text = strip_non_alphanum(text)
self.words = preprocess_string(text)
def toDocBow(self,dictionary):
self.bow = dictionary.doc2bow(self.words)
def toTopics(self,lda):
self.restopica = lda.get_document_topics(self.bow)
def toLsiTopics(self,lsi):
self.restopica = lsi[self.bow]
def topicsqlstrfromtopics(self,NUMOFTOPICS=50):
arr = self.restopica 
allvalues = []
allsqls = []
numparts = int(math.ceil(float(NUMOFTOPICS)/50))
for j in range(0,numparts):
allvalues.append(['\''+self.keyHash+'\''])
for i in range(1, 50+1):
for j in range(0,numparts):
if NUMOFTOPICS >= (i+(j*50)):
allvalues[j].append(0)
for topic in arr:
topicnum=topic[0]
arrpart = topicnum % 50
part = int(math.floor( topicnum/50)) 
allvalues[part][arrpart+1]=topic[1]
allsqls = ['('+','.join(map(str, values))+')' for values in allvalues]
return allsqls

class PostsHolder:
def __init__(self):
self.posts = []
self.postsMap = {}
def addPostWord(self, arr):
posthash = arr[1]
word = arr[0]
if(posthash in self.postsMap):
post = self.postsMap[posthash]
else:
post = PostWordHolder(posthash)
self.posts.append(post)
post.addWord(word)
self.postsMap[posthash]= post
def addPostWords(self, arr):
for elem in arr:
self.addPostWord(elem)
for post in self.posts:
post.cleanWords()
def setLda(self,lda):
self.lda = lda
self.dictionary=lda.id2word
for post in self.posts:
post.toDocBow(self.dictionary)
post.toTopics(self.lda)
def setLsi(self,lsi):
self.lsi = lsi
self.dictionary=lsi.id2word
for post in self.posts:
post.toDocBow(self.dictionary)
post.toLsiTopics(self.lsi)
def toSqlInsert(self,NUMOFTOPICS=50,LANGUAGE='HEB'):
TABLENAME = BASETABLENAME + LANGUAGE + str(NUMOFTOPICS)
allsql = ''
valuesarr = [obj.topicsqlstrfromtopics(NUMOFTOPICS)