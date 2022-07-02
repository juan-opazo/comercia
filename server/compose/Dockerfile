FROM python:3.6
ENV PYTHONUNBUFFERED 1

# gdal dependencies for postgis
RUN apt-get update && apt-get install -y binutils libproj-dev gdal-bin

# Allows docker to cache installed dependencies between builds
COPY ./requirements.txt requirements.txt
RUN pip install -r requirements.txt

# Adds our application code to the image
COPY ./ code
WORKDIR code

ENV PORT=8000
EXPOSE $PORT
