from urllib import response
import requests

BASE="http://127.0.0.1:5000/"

response = requests.get(BASE+"technical/updateSingleTechnicalAccuracy")
print(response.json())

response = requests.post(BASE+"/technical/updateSingleTechnicalAccuracy",{"question":"what is your name","answer":"Mithilesh","requiredKeywords":["this","is","a"],"testUUID":1234,"userAnswer":"user's answer is this this this","userUUID":"THis is the user's user"})
print(response.json())

# response = requests.post(BASE+"/users",{"question":"what is your name","answer":"Mithilesh","requiredKeywords":["this","is","a"],"testUUID":1234,"userAnswer":"user's answer is this this this","userUUID":"THis is the user's user"})
# print(response.json())