FROM nginx:1.15

RUN rm /etc/nginx/conf.d/*
COPY ./apps/releaf/qr-code/website.conf /etc/nginx/conf.d/website.conf

COPY ./dist/apps/releaf/qr-code/ /usr/share/nginx/html
