#!/bin/sh

BUILD_PATH=$1
BUCKET_NAME=$2

aws s3 cp --recursive $BUILD_PATH s3://$BUCKET_NAME/