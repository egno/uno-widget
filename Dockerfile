FROM gitlab.unosalon.ml:4567/containers/nginx:latest

COPY /dist /usr/share/nginx/html

