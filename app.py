import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS

submission = pd.read_csv('notebooks/submission.csv')

app = Flask(__name__)
CORS(app, resources={r"/predict": {"origins": "https://titanic-ml-project-phi.vercel.app"}})


@app.route('/predict', methods=['GET'])
def predict():
    passenger_id = request.args.get('passenger_id', type=int)
    if passenger_id is None:
        return jsonify({'error': 'No PassengerId provided'}), 400

    # Look up the PassengerId in the submission file
    row = submission[submission['PassengerId'] == passenger_id]
    if row.empty:
        return jsonify({'error': 'PassengerId not found'}), 404

    survived = int(row['Survived'].values[0])
    result = 'Survived' if survived == 1 else 'Not Survived'
    return jsonify({'PassengerId': passenger_id, 'Survived': survived, 'Result': result})

if __name__ == '__main__':
    app.run(debug=True)
