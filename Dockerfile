FROM ubuntu:latest
ARG DEBIAN_FRONTEND=noninteractive

WORKDIR /var/www/html

RUN apt update &&\
    apt install apache2 -y 

COPY . .

RUN cp apache/apache2.conf /etc/apache2/apache2.conf 
RUN a2enmod rewrite

EXPOSE 80

CMD apachectl -D FOREGROUND