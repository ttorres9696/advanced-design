# Run backend

## with docker

* build `docker build -t advenced-design-backend:latest .`
* run `docker run -d --env-file environment/development.env -p 8882:8882 advenced-design-backend`

## with virtualenv

* create virtualenv `virtualenv venv` (if needed install it first with `pip3 install virtualenv`)
* source it `source venv/bin/activate`
* install project requirements `pip3 install -r requirements.txt` (optionally dev dependencies too `pip3 install -r requirements.dev.txt`)
* optionally source default development env variables:

```bash
environment/development.env
```

* run backend with `python3 src/server.py`
