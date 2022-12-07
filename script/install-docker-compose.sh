#!/bin/bash

curl -SL https://github.com/docker/compose/releases/download/v2.13.0/docker-compose-linux-x86_64 -o /usr/local/bin/docker-compose
chmod +rwx /usr/local/bin/docker-compose
echo "Docker Compose installed successfully"