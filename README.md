

## Docker
To build the app
`docker build -t pollycast .`

Running a Docker Container
`docker images`
`docker run -it --rm -e AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID -e AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY -p 80:3000 {container-id}`

At any moment, you can check running Docker containers by typing:
`docker container ls`

Finally, you can stop the container from running by:
`docker stop {container-id}`
