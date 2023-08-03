const uuid = require("uuid");

class Question {
  constructor(fileLine, gameId) {
    const line = fileLine.split(";");
    this.id = uuid.v4();
    this.questionType = line[0];
    this.theme = line[1];
    this.question = line[2];
    this.answer = line[3];
    this.points = parseInt(line[4]);
    this.choices = line[5]; // For the DB, it will be a string like "1/2/3/4"
    this.explanation = line[6];
    this.imageName = line[7];
    this.isBonus = Boolean(parseInt(line[8]));
    this.gameId = gameId;
    this.isAsked = false;
  }
}

module.exports = Question;

/* Function to read data from a csv file formatted like specified in the README.md

const fs = require("fs");
const Question = require("./model/Question");

var questions = [];

fs.readFile("./src/test.csv", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const fileContent = data.split("\n").slice(1);
  fileContent.forEach((line) => {
    questions.push(new Question(line, game.id));
  });
});

*/
