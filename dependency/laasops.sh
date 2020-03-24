mkdir -p /data/tristan/laashub/laasops/distribution/configs/
mv application.yml /data/tristan/laashub/laasops/distribution/configs/application.yml

docker stop laasops
docker rm laasops

docker run -d --name laasops -p 5000:5000 -v /data/tristan/laashub/laasops/distribution/configs:/usr/src/app/distribution/configs  laashub/laasops
docker logs -f --tail 100 laasops

docker exec -it laasops bash