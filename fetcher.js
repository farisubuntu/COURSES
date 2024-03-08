import fs from "fs";
import categories from "./categories.js";

let AudioArray = [];
let ImageArray = [];
let target_lang = "he"; // change this per target language
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
          `https://d13tz37rv54ob.cloudfront.net/${target_lang}/${x.key}?t=${x.audio_updated_at}`
        );
      });
      break;

    case "T1b":
    case "T1":
    case "T2":
    case "T2b":
    case "R":
    case "C1b":
    case "C2b":
    case "L1":
      quiz.sols.forEach((x) => {
        AudioArray.push(
          `https://d13tz37rv54ob.cloudfront.net/${target_lang}/${x.key}?t=${x.audio_updated_at}`
        );
      });
      break;
    case "W1b":
      let x = quiz.sols[1];
      AudioArray.push(
        `https://d13tz37rv54ob.cloudfront.net/${target_lang}/${x.key}?t=${x.audio_updated_at}`
      );
      ImageArray.push(
        `https://d37sy4vufic209.cloudfront.net/phrase-images/${x.image}`
      );
      break;

    default:
      console.log(`${quiz_type} ignored in lesson id: ${quiz.lesson}`);
  }
}

function getCategory(category_id) {
  for (let i = 1; i <= 6; i++) {
    let rawdata = fs.readFileSync(`./data/${category_id}/${category_id}0${i}.json`);
    let topic_data = JSON.parse(rawdata);
    let quizzes = topic_data.quizzes;
    quizzes.forEach((quiz) => {
      extractUrls(quiz);
    });
  }
}

// getCategory("1");

// remove duplicate array using `Sets` which allows you to create collections of unique values:
// for other ways see: https://builtin.com/software-engineering-perspectives/remove-duplicates-from-array-javascript
categories.forEach((x) => {
  console.log(x);
  getCategory(x);
});
function removeDubplicates(arr) {
  return [...new Set(arr)];
}

let audios_set = removeDubplicates(AudioArray);
let images_set = removeDubplicates(ImageArray);

// console.log('joined audios_set:');
// console.log(audios_set.join('\n')); // working

// log urls
console.log('audios_set: ');
console.log(audios_set);
console.log("#########################");
console.log('images_set');
console.log(images_set);

// console.log("Audio Urls: ")
// console.log(AudioArray);
// console.log("#########################");
// console.log("Image Urls:")
// console.log(ImageArray);
// console.log("writing audio array to audio_urls.txt....");

fs.appendFileSync("./audios_urls.txt", audios_set.join("\n"), (err) => {
  if (err) console.log(err);
  console.log("OK...");
});
fs.appendFileSync("./images_urls.txt", images_set.join("\n"), (err) => {
  if (err) console.log(err);
  console.log("OK...");
});
