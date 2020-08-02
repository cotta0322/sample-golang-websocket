#!/bin/bash

DIR=$(cd $(dirname $0); pwd)

cd $DIR/Backend
go run main.go

