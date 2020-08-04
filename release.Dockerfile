# Build CMD: docker build -t cotta0322/sample-golang-websocket:0.0.1 -f .\release.Dockerfile .
# Run CMD: docker run -p 8080:8080 cotta0322/sample-golang-websocket:0.0.1


FROM node:14.8.0-alpine3.12 as npmmodule
    WORKDIR /workspace/
    COPY Frontend/package*.json /workspace/Frontend/

    RUN cd /workspace/Frontend/; npm ci;

FROM golang:1.14.7-alpine3.12 as backend
    COPY . /workspace/
    WORKDIR /workspace/Backend
    
    RUN go build -o backend *.go

FROM node:14.8.0-alpine3.12 as frontend
    WORKDIR /workspace/
    COPY . /workspace/
    COPY --from=npmmodule /workspace/Frontend/node_modules /workspace/Frontend/node_modules

    RUN cd /workspace/Frontend/; npm run build:prod;


FROM alpine:3.12
    WORKDIR /workspace/Backend
    COPY --from=backend /workspace/Backend/backend ./
    COPY --from=frontend /workspace/Backend/www ./www

    CMD [ "./backend" ]
