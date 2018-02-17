# Class for maintaining scores
class Scores:
    def __init__(self):
        self.scores = [100]
    def add(self, score):
        self.scores.append(score)
    def average(self):
        return sum(self.scores) / len(self.scores)
    def max(self):
        return max(self.scores)
scores = Scores()


# Web portion

from flask import Flask, request
app = Flask(__name__, static_folder='static', static_url_path='') # Initialize Flask and serve static folder

@app.route('/')
def root():
    # Serve index.html under /
    return app.send_static_file('index.html')

@app.route("/add", methods=["POST"])
def add():
    scores.add(request.form['score'])

@app.route("/average")
def get_avg():
    return str(scores.average())

@app.route("/max")
def get_max():
    return str(scores.max())


# Start app
if __name__ == "__main__":
    app.run(debug=True)
