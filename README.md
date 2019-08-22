# Castpie
Converts article to audio using [AWS Polly](https://aws.amazon.com/polly/)

## Introduction
Like many other commuters living and working around Los Angeles, I do not have the time to read articles that interest me on the go. I subscribed to Ben Thompson’s [Stratechery](https://stratechery.com/), and I would like to use my daily two-hour commute to do something productive. So, I built this service for myself.

To get started, you simply enter a rss feed, and choose the blogpost you wish to listen.  The article will be converted into audio (.mp3 format) in few seconds.

![screehost][screenshot]
![castpie][demo]


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

## Endpoint/APIs
### Feed
1. CREATE - /api/feed
2. GET - /api/feed
3. GET - /api/feed/:id
4. DELETE - /api/feed/:id

### Articles
1. GET - /api/feed/:id/articles
2. GET - /api/articles/:id
3. GET - /api/articles/:id/mp3

[screenshot]: https://pollyaudio.sfo2.digitaloceanspaces.com/assets/assets/screenshot.png
[demo]: https://pollyaudio.sfo2.digitaloceanspaces.com/assets/assets/castpie.gif
