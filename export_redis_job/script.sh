#!/bin/bash

redis_id="redis-pay"

echo "start export ${redis_id} ..."

gcloud redis instances export "gs://mrl-backup-ms-redis/${redis_id}_$(date +%FT%H%M%S).rdb" ${redis_id} --region=asia-east1  --project=czechrepublic-290206

echo "end of export ${redis_id}"

echo "done"
