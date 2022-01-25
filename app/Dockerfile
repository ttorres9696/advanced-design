FROM python:3.7-alpine
COPY app/app.py /app/
COPY app/requirements.txt /app/requirements.txt
WORKDIR  /app
RUN pip install -r requirements.txt
CMD ["gunicorn","--bind","0.0.0.0:8000","app"]