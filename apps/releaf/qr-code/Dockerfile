FROM nginx:1.15

WORKDIR /interface
COPY ./ /interface/

RUN rm /etc/nginx/conf.d/*
COPY ./apps/releaf/qr-code/website.conf /etc/nginx/conf.d/website.conf

COPY --from=build-stage /interface/dist/apps/qr-code/ /usr/share/nginx/html
