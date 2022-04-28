from flask import Flask,request,jsonify
import accuracyCheckingController as ac
from flask_cors import CORS,cross_origin
import time

from functools import wraps, partial

def exponential_backoff(func=None, seconds=10, attempts=10):
    if func is None:
        return partial(exponential_backoff, seconds=seconds, attempts=attempts)

    @wraps(func)
    def function_wrapper(*args, **kwargs):
        for s in range(0, seconds*attempts, attempts):
            time.sleep(s)
            try:
                return func(*args, **kwargs)
            except Exception as e:
                print(e)
    return function_wrapper

app = Flask(__name__)
CORS(app,resources={r"/*":{"origins":"*"}})
#CORS("Cross-Origin Resource Sharing")
app.config['CORS HEADERS'] = 'Content-Type'
@app.route("/", endpoint='func1')
@exponential_backoff()
def hello():
	return "Hello World!"


@app.route('/technical/updateSingleTechnicalAccuracy', endpoint='func2', methods = ['POST'])
@exponential_backoff()
def checkAccuracy():
	var = request.json
	dataForAccuracyChecking = {}
	dataForAccuracyChecking['question'] = str(request.json["question"]["question"])
	dataForAccuracyChecking['answer'] = request.json["answer"]["answer"]
	dataForAccuracyChecking['requiredWords'] = request.json["requiredWords"]["requiredWords"]
	dataForAccuracyChecking['testUUID'] = request.json["testUUID"]
	dataForAccuracyChecking['userAnswer'] = request.json["userAnswer"]
	dataForAccuracyChecking['topic'] = request.json["topic"]["topic"]

	
	response = ac.checkAccuracyAndSaveInDb(dataForAccuracyChecking);
	return jsonify(response);
@app.route('/technical/getReportWithtestUUID', methods = ['POST'])
@exponential_backoff()
def generateReportOfAParticularTest():
	response = ac.generateReportOfAParticularTest(request.json["testUUID"]);
	return response;


@app.route('/GD/convertParagraphToSentences', methods = ['POST'])
@exponential_backoff()
def generateSentencesFromAParagraph():
	obj = {};
	response = ac.split_into_sentences(request.json["topic"],request.json["paragraph"][0]);
	obj['splitSentences']=response;
	return obj;

@app.route('/GD/chechAccuracyOfIndividualSentences', methods = ['POST'])
@exponential_backoff()
def chechAccuracyOfIndividualSentences():
    obj = {};
    response = ac.chechAccuracyOfIndividualSentences(request.json["topicSentences"],request.json["userSentences"],request.json["topic"],request.json["testUUID"]);
    return jsonify(response); 
        # obj['splitSentences']=response;
	

@app.route('/GD/getGDReportAccordingTestUUID', methods = ['POST'])
def getGDReportAccordingTestUUID():
    response = ac.getGDResultsAccordingToTestUUID(request.json["testUUID"]);
    return response;

@app.route('/technical/getTechnicalQuestions', methods = ['POST'])
@exponential_backoff()
def getTechnicalQuestions():
	response = ac.getTechnicalQuestions();
	return response;


@app.route('/technical/storeSingleQuestion', methods = ['POST'])
@exponential_backoff()
def storeSingleQuestionAnswerKeyword():
	response = ac.storeSingleQuestionAnswerKeyword(request.json["question"].request.json["answer"],request.json["requiredWords"],request.json["topic"]);
	return response;


@app.route('/technical/generateQuestionsFromParagraph', methods = ['POST'])
@exponential_backoff()
def generateQuestionsFromParagraph():
    response = ac.generateQuestionsFromParagraph(request.json["topic"],request.json["paragraph"][0]);
    return response;


@app.route('/GD/getSentencesAccordingToTopic', methods = ['POST'])
@exponential_backoff()
def getSentencesAccordingToTopic():
    response = ac.getSentencesAccordingToTopic(request.json["topic"]);
    return response

#get sentences according to topic to speak for the bot
@app.route('/GD/getSentencesToSpeak', methods = ['POST'])
def getSentencesToSpeak():
    response = ac.getSentencesToSpeak(request.json["topic"],request.json["testUUID"]);
    return response

@app.route('/proctoring/saveImages', methods = ['POST'])
@exponential_backoff()
def getProctoringImages():
    response = ac.getProctoringImages(request.json["userCode"],request.json["userInput"],request.json["userOutput"],request.json["imageArray"],request.json["testUUID"])
    return response

@app.route('/resume/parsing', methods = ['POST'])
@exponential_backoff()
def resumeParsing():
    response = ac.resumeParsing(request.json["emailId"],);
    return response;






if __name__ == "__main__":
	app.run(host='0.0.0.0', port=5000)