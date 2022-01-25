import logging
import os

DEBUG = os.getenv("FLASK_ENV", "").lower() == "development"
HOST = os.getenv("APPLICATION_HOST")
PORT = int(os.getenv("APPLICATION_PORT", "8882"))
APPLICATION_ROOT = os.getenv("APPLICATION_ROOT", "/api")

logging.basicConfig(
    filename=os.getenv("SERVICE_LOG", "server.log"),
    level=logging.DEBUG,
    format="%(levelname)s: %(asctime)s \
        pid:%(process)s module:%(module)s %(message)s",
    datefmt="%d/%m/%y %H:%M:%S",
)
