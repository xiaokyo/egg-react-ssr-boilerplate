FROM node:12

# ADD jobs-buyer-h5 jobs-buyer-h5
WORKDIR /saas-buyer
ADD . /saas-buyer

CMD npm run prod && tail -100f /root/logs/saas-buyer/midway-core.log
