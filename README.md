# Castpie
Converts article to audio using [AWS Polly](https://aws.amazon.com/polly/)

## Introduction
I build this service for myself.  I subscribed to Ben Thompson's daily update [Stratechery](https://stratechery.com/).  I found myself don't have time to read it everyday, even though, they are all well written.  I live in Los Angeles, CA, and everyday, I spend 2 hours on commute.  It will be great that I can listen to his articles while I'm driving.

To get started, you simply enter a rss feed, and choose the blogpost you wish to listen.  The article will be converted into audio (.mp3 format) in few seconds.

## Tech
1. [AWS Polly](https://aws.amazon.com/polly/)
2. [Digital Ocean](https://www.digitalocean.com/)

## Docker
To build the app
`docker build -t pollycast .`

Running a Docker Container
`docker images`

`docker run -it --rm -e AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID -e AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY -e pollyreader=$DO_SPACES_ACCESS_KEY_ID -e Secret=$DO_SECRET_ACCESS_KEY  -p 80:3000 pollycast`

`docker run -p 80:3000 {image-id}`

At any moment, you can check running Docker containers by typing:
`docker container ls`

Finally, you can stop the container from running by:
`docker stop {container-id}`

Delete image
`docker rmi {image-id}`

Delete linked container
`docker rm {container-id}`