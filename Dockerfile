FROM node:15.3-alpine as builder

# Install node-canvas dependencies
RUN apk add --no-cache cairo-dev g++ giflib-dev jpeg-dev make pango-dev pixman-dev pkgconfig python

COPY . /build/advanced-design

# Build the frontend
WORKDIR /build/advanced-design

ARG node_variable=local
ENV NODE_ENV=$node_variable

RUN echo $NODE_ENV && yarn install && yarn build

# Build the demo
WORKDIR /build/advanced-design/demo
RUN yarn install && yarn build
RUN yarn global add serve

# Run serve
EXPOSE 80
CMD ["serve", "-s", "-l", "80", "build"]
