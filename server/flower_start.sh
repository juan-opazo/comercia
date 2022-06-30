#!/bin/sh

set -o errexit
set -o nounset


celery flower -A api.taskapp \
        --address=0.0.0.0 \
        --port=7000 \
        --basic_auth="${CELERY_FLOWER_USER}:${CELERY_FLOWER_PASSWORD}"
