from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sqlalchemy import create_engine
from urllib.parse import quote

app = Flask(__name__)
CORS(app)

# PostgreSQL connection setup
pwd = 'kri@123'
encoded_pwd = quote(pwd)
DATABASE_URL = f"postgresql://postgres:{encoded_pwd}@localhost:5432/inventoryManagement"
engine = create_engine(DATABASE_URL)

from sqlalchemy.sql import text

@app.route('/upload', methods=['POST'])
def upload_csv():
    if 'file' not in request.files:
        return jsonify({"message": "No file provided"}), 400

    file = request.files['file']

    table_name = "demand"  # Target table
    if not table_name:
        return jsonify({"message": "No target table specified"}), 400

    try:
        # Read the CSV file into a pandas DataFrame
        df = pd.read_csv(file)

        # Validate required columns in the CSV
        required_columns = {'product', 'price', 'available', 'date'}
        if not required_columns.issubset(df.columns):
            return jsonify({"message": f"CSV must include columns: {required_columns}"}), 400

        # Ensure column names match database schema
        df = df[['product', 'price', 'available', 'date']]

        # SQL query with placeholders, wrapped in `text`
        query = text("""
            INSERT INTO demand (product, price, available, date)
            VALUES (:product, :price, :available, :date)
            ON CONFLICT (product)
            DO UPDATE SET
                price = EXCLUDED.price,
                available = EXCLUDED.available,
                date = EXCLUDED.date
        """)

        # Insert or update rows in the database
        with engine.begin() as conn:
            for _, row in df.iterrows():
                conn.execute(query, {
                    "product": row['product'],
                    "price": row['price'],
                    "available": row['available'],
                    "date": row['date']
                })

        return jsonify({"message": f"Data successfully uploaded to {table_name}!"}), 200
    except Exception as e:
        print(f"Error processing file: {e}")
        return jsonify({"message": f"Error processing file: {str(e)}"}), 500




if __name__ == '__main__':
    app.run(debug=True)
