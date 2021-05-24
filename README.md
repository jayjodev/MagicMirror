Setting for Korean users

Added Modules

Fork by https://github.com/MichMich/MagicMirror

- MMM-AirQuality 5/19
- MMM-Jast 5/21
- MMM-LICE 5/21
- MMM-cryptocurrency 5/19
- calendar_monthly 5/19

### Copy sample config

```
cp config/config.js.sample config/config.js
```

- API KEY should be added

### Example Create a image

```
docker build -t jayjodev/magic-mirror:v1 .
```

### Run the image

```
docker run -d --name jayjodev/magic-mirror -p 8080:8080 jayjodev/magic-mirror:v1
```
