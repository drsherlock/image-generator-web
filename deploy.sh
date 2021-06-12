docker ps --filter "name=image-generator-web"
docker pull $IMAGE
docker rm -f image-generator-web || true
docker run -d \
           --name image-generator-web \
           --restart unless-stopped \
           -p 80:3000 \
           $IMAGE
docker ps --filter "name=image-generator-web"
