FROM ubuntu:18.04
COPY . /server
RUN apt-get update
RUN curl -fsSL https://deb.nodesource.com/setup_14.x | sudo -E bash -
RUN apt-get install -y nodejs npm redis-server
WORKDIR /server
RUN npm install