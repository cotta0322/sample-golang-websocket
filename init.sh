#!/bin/bash

DIR=$(cd $(dirname $0); pwd)

cd $DIR/Frontend
npm ci
