# import sqlite3

# connection=sqlite3.connect("student.db")

# cursor=connection.cursor()

# table_info="""create table Student(name varchar(25), class varchar(250), section varchar(25), marks int)"""

# cursor.execute(table_info)

# cursor.execute("Insert into Student(name,class,section ,marks) values('krishna','Data science','A',90)")
# cursor.execute("Insert into Student(name,class,section ,marks) values('raj','Analyst','B',70)")
# cursor.execute("Insert into Student(name,class,section ,marks) values('bharathi','Engineer','C',50)")
# cursor.execute("Insert into Student(name,class,section ,marks) values('gaya','Doctor','A',95)")

# print(" The inserted records are")

# data=cursor.execute('''select * from  STUDENT ''')


# for row in data:
#   print(row)

# connection.commit()
# connection.close()

import os
from langchain_community.utilities.sql_database import SQLDatabase
from langchain.chains import create_sql_query_chain
from langchain_openai import ChatOpenAI
from langchain_community.tools.sql_database.tool import QuerySQLDataBaseTool
from urllib.parse import quote

os.environ["OPENAI_API_KEY"] = "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" 


hostname='localhost'
database='inventoryManagement'
username='postgres'
pwd='kri@123'
port_id=5432
encoded_pwd = quote(pwd)
connection_uri = f"postgresql+psycopg2://{username}:{encoded_pwd}@{hostname}:{port_id}/{database}"
db = SQLDatabase.from_uri(connection_uri)


llm = ChatOpenAI(model="gpt-3.5-turbo", temperature=0)
generate_query = create_sql_query_chain(llm, db)
query = generate_query.invoke({"question": "how many products are there"})
print(query)


execute_query = QuerySQLDataBaseTool(db=db)
print(execute_query.invoke(query))

chain=generate_query | execute_query
chain










