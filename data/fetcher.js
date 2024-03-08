import fs from "fs";
import { categories } from "./categories";

let AudioArray = [];
let ImageArray = [];
target_lang = "ur"; // change this per target language
// function to extract image and audio links from quizzes
// TODO: dont forget vocabularies.json
function extractUrls(quiz) {
  let quiz_type = quiz.type;
  switch (quiz_type) {
    case "P":
    case "F":
      quiz.alts.forEach((x) => {
        AudioArray.push(
          `https://d13tz37rv54ob.cloudfront.net/${target_lang}/${x.key}?t=${x.audio_updated_at}`
        );
        ImageArray.push(
          `https://d37sy4vufic209.cloudfront.net/phrase-images/${x.image}`
        );
      });
      break;

    case "Q":
    case "Qb":
    case "D":
      quiz.alts.forEach((x) => {
        AudioArray.push(
          `https://d13tz37rv54ob.cloudfront.net/en_gb/${x.key}?t=${x.audio_updated_at}`
        );
      });
      break;

    case "T1b":
    case "T1":
    case "R":
    case "C1b":
    case "C2b":
    case "L1":
      quiz.sols.forEach((x) => {
        AudioArray.push(
          `https://d13tz37rv54ob.cloudfront.net/en_gb/${x.key}?t=${x.audio_updated_at}`
        );
      });
      break;
    case "W1b":
      let x = quiz.sols[1];
      AudioArray.push(
        `https://d13tz37rv54ob.cloudfront.net/en_gb/${x.key}?t=${x.audio_updated_at}`
      );
      ImageArray.push(
        `https://d37sy4vufic209.cloudfront.net/phrase-images/${x.image}`
      );
      break;

    default:
      console.log("quiz type: ", quiz_type, " ignored.........");
  }
}

function getCategory(category_id) {
  for (let i = 1; i <= 6; i++) {
    let rawdata = fs.readFileSync(`./${category_id}/${category_id}0${i}.json`);
    let topic_data = JSON.parse(rawdata);
    let quizzes = topic_data.quizzes;
    quizzes.forEach((quiz) => {
      extractUrls(quiz);
    });
  }
}

// getUrls

categories.forEach((category_id) => {
  getCategory(category_id);
  setTimeout(function () {
    console.log("category_id: ", category_id, " done.........");
  }, 2000);
});

// remove duplicate array using `Sets` which allows you to create collections of unique values:
// for other ways see: https://builtin.com/software-engineering-perspectives/remove-duplicates-from-array-javascript

function removeDubplicates(arr) {
  return [...new Set(arr)];
}

let audios_set = removeDubplicates(AudioArray);
let images_set = removeDubplicates(ImageArray);

// console.log('joined audios_set:');
// console.log(audios_set.join('\n')); // working

// wait 2 seconds before writing audio array
setTimeout(function () {
  console.log(">>>  writing audio array to audio_urls.txt....");
}, 2000);
fs.appendFileSync("audios/audios_urls.txt", audios_set.join("\n"), (err) => {
  if (err) console.log(err);
  console.log("OK...");
});
// wait 2 seconds before writing image array
setTimeout(function () {
  console.log(">>>  writing image array to images_urls.txt....");
}, 2000);

fs.appendFileSync("images/images_urls.txt", images_set.join("\n"), (err) => {
  if (err) console.log(err);
  console.log("OK...");
});
