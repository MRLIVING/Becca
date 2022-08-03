FROM google/cloud-sdk:latest

RUN apt-get update

ENV TZ=Asia/Taipei

RUN dpkg-reconfigure -f noninteractive tzdata


WORKDIR /workspace

COPY script.sh .

RUN chmod +x ./script.sh

CMD [ "./script.sh" ]
