from flask import Flask,request,jsonify
import sys
sys.path.insert(1, 'AI-based-placement-management-system/backend/flask-server/controllers')
import accuracyCheckingController as ac

app = Flask(__name__)

@app.route('/technical/updateSingleTechnicalAccuracy', methods = ['POST'])
def checkAccuracy():

        dataForAccuracyChecking = {}
        dataForAccuracyChecking['question'] = request.json["question"]["question"]
        dataForAccuracyChecking['answer'] = request.json["answer"]["answer"]
        dataForAccuracyChecking['requiredWords'] = request.json["requiredWords"]["requiredWords"]
        dataForAccuracyChecking['testUUID'] = request.json["testUUID"]
        dataForAccuracyChecking['userAnswer'] = request.json["userAnswer"]
        dataForAccuracyChecking['topic'] = request.json["topic"]["topic"]

        
        response = ac.checkAccuracyAndSaveInDb(dataForAccuracyChecking);
        return jsonify(response);
         
@app.route('/technical/getReportWithtestUUID', methods = ['POST'])
def generateReportOfAParticularTest():
        response = ac.generateReportOfAParticularTest(request.json["testUUID"]);
        return response;
         
# @app.route('/technical/getReportWithouttestUUID', methods = ['POST'])
# def generateReportOfAParticularTest():
#         response = ac.generateReportOfAParticularTest(request.json["testUUID"]);
#         return response;

@app.route('/GD/convertParagraphToSentences', methods = ['POST'])
def generateSentencesFromAParagraph():
        obj = {};
        response = ac.split_into_sentences(request.json["topic"],request.json["paragraph"][0]);
        
        obj['splitSentences']=response;
        return obj;



if __name__ == "_main_":
    app.run(debug=True)