# COURSES
contain's JSON data 

links:

- image url sample address: `https://d37sy4vufic209.cloudfront.net/phrase-images/ZBF1FFH_qaeP0iMstKZAJSmjYuGUmlHD`

- audio file link: `https://d13tz37rv54ob.cloudfront.net/en_gb/5GwX74ia-8nEV1331d1QayXXQpa1TGsh?t=1543437435`

- get an image with `wget`:
```sh
$ wget https://d37sy4vufic209.cloudfront.net/phrase-images/r4pxGRXv2CnWTPSiIjgo7hfi7mOeML3m?t=1689159128
# use wget better than `curl` in images
```

- get an audio with `wget`
```sh
$ wget https://d13tz37rv54ob.cloudfront.net/en_gb/5GwX74ia-8nEV1331d1QayXXQpa1TGsh?t=1543437435
# note ../en_gb/... for english but you cannot replace it as tr,ur,.... . instead for urdu, use:
$ wget https://d13tz37rv54ob.cloudfront.net/ur/5yJIklmE-tT6L44G-d2no9epgjQXY1kV?t=1580691716

```

branches:

**images**: all images related to all courses. target language flags in flags dir.
**custorm-hook**:
- `useFetcher.jsx`: custom hook used to fetch course data then extracted as `quizzes`,`lesson`
- `globals.js`: example of using globals varaibles
- `AppContext`: another way of using global variables

