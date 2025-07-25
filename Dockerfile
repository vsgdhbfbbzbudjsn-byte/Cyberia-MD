FROM node:lts-buster
USER root
RUN apt-get update && \
    apt-get install -y ffmpeg webp git && \
    apt-get upgrade -y && \
    rm -rf /var/lib/apt/lists/*
USER node
RUN git clone https://github.com/NaCkS-ai/Drakonis-MD /home/node/Drakonis-MD
WORKDIR /home/node/Drakonis-MD
RUN chmod -R 777 /home/node/n/
RUN yarn install --network-concurrency 1
EXPOSE 7860
ENV NODE_ENV=production
CMD ["npm", "start"]
