from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sqlalchemy import create_engine
import os
from urllib.parse import quote
app = Flask(__name__)
CORS(app)
pwd='kri@123'
encoded_pwd = quote(pwd)
DATABASE_URL = f"postgresql://postgres:{encoded_pwd}@localhost:5432/Redaction"
engine = create_engine(DATABASE_URL)
@app.route('/upload', methods=['POST'])
def upload_csv():
    if 'file' not in request.files:
        print("File not found in request.files")
        return jsonify({"message": "No file provided"}), 400

    file = request.files['file']
    print(f"Received file: {file.filename}")

    try:
        df = pd.read_csv(file)
        

        table_name = request.args.get('table')
        print(table_name)  
        if not table_name:
            print("Target table not specified")
            return jsonify({"message": "Specify a target table"}), 400

        df.to_sql(table_name, engine, if_exists='append', index=False)
        print(f"Data uploaded to {table_name}")
        return jsonify({"message": "Data uploaded successfully"}), 200
    except Exception as e:
        print(f"Error processing file: {e}")
        return jsonify({"message": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
