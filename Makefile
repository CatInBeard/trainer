sass:
	sass sass/style-cat.scss css/style-cat.css
	sass sass/style-trainer.scss css/style-trainer.css
docker-build:
	docker build -t catinbeard/trainer:latest .
docker-run: 
	docker run -p 10123:80 catinbeard/trainer:latest