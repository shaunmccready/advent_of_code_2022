#!/bin/bash

if [ $# -eq 0 ]; then
	echo "You need to give me a directory name to create!"
	exit 1
elif (($# > 1))
then
	echo "Only one argument needed, the project directory name"
	exit 1
fi

YELLOW="$(tput setaf 3)"
NO_COLOR="$(tput sgr0)"

dir_name=${1}

printf "\n\n${YELLOW}Creating directory ${dir_name}...${NO_COLOR}\n"
mkdir ${dir_name}
cd ${dir_name}

printf "\n\n${YELLOW}Initializing NodeJS project...${NO_COLOR}\n"

npm init -y
tsc --init

printf "\n\n${YELLOW}Adding dependencies...${NO_COLOR}\n"

yarn add ts-node
yarn add -D @types/node

touch README.md

printf "\n\n\n${YELLOW}********** Happy Coding! **********"
