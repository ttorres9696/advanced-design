from flask import Flask, jsonify
application = Flask(__name__)


@application.route("/")
def home():
    response = {"response": "simple api server running on k8s"}
    return jsonify(response)


@application.route("/health")
def health():
    resp = jsonify(healthy=True)
    return resp


@application.route("/ready")
def ready():
    resp = jsonify(ready=True)
    return resp


if __name__ == "__main__":
    application.run(host='0.0.0.0')
