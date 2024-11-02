FROM node:lts-alpine

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

RUN --mount=type=cache,target=/usr/src/app/.npm \
  npm set cache /usr/src/app.npm && \
  if ["$NODE_ENV" = 'development' ]; then \
    npm install; \
  else \
    npm ci --only=production; \
  fi

COPY . .

# RUN if  [ "$NODE_ENV" = "production"]; then cp .env.production .env;fi

EXPOSE 3000

RUN chown -R node /usr/src/app

USER node

CMD ["sh", "-c", "NODE_ENV=${NODE_ENV} npm run start:${NODE_ENV}"]