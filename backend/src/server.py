import numpy as np
from flask import Flask
from flask.blueprints import Blueprint
from flask.json import JSONEncoder
from flask_cors import CORS

import config
import routes

server = Flask(__name__)
CORS(server)

server.debug = config.DEBUG


class CustomJSONEncoder(JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.ndarray):
            return obj.tolist()
        if isinstance(obj, np.float32):
            return float(obj)
        return super().default(obj)


server.json_encoder = CustomJSONEncoder

for blueprint in vars(routes).values():
    if isinstance(blueprint, Blueprint):
        server.register_blueprint(blueprint)

if __name__ == "__main__":
    server.run(host=config.HOST, port=config.PORT)
