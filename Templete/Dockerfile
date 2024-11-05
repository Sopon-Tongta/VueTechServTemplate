# build stage
FROM registryii.thaibevapp.com/ftd/inventory/templete_web/web:base as build-stage
COPY . .
RUN npm run build


# production stage
FROM registryii.thaibevapp.com/tbdev/baseimage/nginx:1.23.2-alpine as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist/inventory /app
COPY --from=build-stage /app/src/css/fonts /app/assets/fonts
COPY --from=build-stage /app/src/assets /app/assets/images
COPY deploy-app/nginx.conf /etc/nginx/nginx.conf
COPY entrypoint.sh . 
RUN chmod 777 entrypoint.sh
ENTRYPOINT [ "./entrypoint.sh" ]
