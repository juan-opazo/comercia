#!/bin/sh

set -o errexit
set -o nounset


rm -f './celerybeat.pid'
celery -A api.taskapp beat -l INFO
