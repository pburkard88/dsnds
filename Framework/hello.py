from flask import Flask
from flask import render_template
import pandas as pd

app = Flask(__name__)



@app.route("/")
def hello():
    return "Hello World!"

@app.route('/hello2/')
@app.route('/hello2/<name>')
def hello2(name=None):
    return render_template('hello.html', name=name)

@app.route('/index/')
def index(name=None):
    return render_template('index.html', name=name)

if __name__ == "__main__":
    app.run()

pd.read_csv('http://archive.ics.uci.edu/ml/machine-learning-databases/bridges/bridges.data.version1',
                       names = cols)