// Gestion de la progresse barre et du timer

let bar = document.querySelector(".progressbar");
let containerTime = document.querySelector(".container-time");
let counter = document.querySelector(".counter");
let quizs = document.querySelector(".quizs");

let time = 20;
let progression = 100;
const intervalle = 1000;
const progressBar = (timeSecond) => {

  let increment = (99 / (timeSecond * 1000)) * intervalle;
   const timId = setInterval(() => {
    progression -= increment;
    if (timeSecond <= 0) {
      clearInterval(timId)
      gameOver()
    }
    if (progression < increment) {
      progression = 0;
      bar.style.width = `${progression}%`;
    }
    counter.innerHTML = formatTime(timeSecond--);
    bar.style.width = `${progression}%`;
  }, intervalle);
};

const formatTime = (secondes) => {
  const min = Math.floor(secondes / 60);
  const sec = secondes % 60;
  return `${min < 10 ? "0" : ""}${min}:${sec < 10 ? "0" : ""}${sec}`;
};



/**Gestion des questions avec les API */
let quizs_content = document.querySelector(".quiz-content");
let question = document.querySelector(".quiz-content .question");

const postData = () => {
  try {
    const response = () => fetch("http://localhost:3000/quiz");
    response()
      .then( (res) => res.json())
      .then((data) => {
        let props = data.data;
        nextQuiz(props);
      });
  } catch (error) {
    console.log(`Impossible de récuperer les données ${error}`);
  }
};

const currentQuiz = (data) => {
  let propHtml = "";
  data.prop.forEach((prop) => {
    propHtml += `<div class="prop-input ">
    ${prop}
    </div>`;
  });
  quizs_content.innerHTML = `<div class="question">${data.question}</div> ${propHtml}`;
  let choices = document.querySelectorAll(".quiz-content .prop-input ");
  addChoice(choices, data);
};

let tab = []

const addChoice = (ch, data) => {
  removeChoice(ch);
  ch.forEach((choice) => {
    choice.onclick = () => {
      removeChoice(ch);
      if (choice.innerText === data.correct && !tab.includes(choice.innerText )) {
          tab.push(data.correct);
        }
        choice.classList.add("checked");
      };
    });
};
const removeChoice = (ch) => {
  ch.forEach((c) => {
    c.classList.remove("checked");
  });
};


let resultat = document.querySelector(".resultat");
let btn = document.querySelector("#sub");
let next = 1;

const nextQuiz = (datas) => {

  progressBar(time);
  currentQuiz(datas[next-1]);
  
  btn.onclick = (e) => {
    if (datas.length > next) {      
      e.preventDefault();
      currentQuiz(datas[next]);
      next++;
    } else {
      let table = tab
      gameOver(table,datas)
    }
  };
};

const score = (tableV,alldata) => {
  let scoreResultat = document.querySelector(".resultat p");
  let scoreLabel = document.querySelector(".resultat h2");
  if (tab.length>0) {
    let note = tab.length*5
    let sur = alldata.length*5
    scoreLabel.innerHTML = `${note<=10 ? "Vous n'avez pas la Moyenne":note<=25 ? "Continuez ainsi, vous avez obtenu": note<=30 ? "Bravo Vous Avez Travaillez" : "Vous Êtes Excelent 🎇🎉!!"}`
    return scoreResultat.innerHTML = `${note<10 ? "0":""}${note}/${sur}`;
  }
  if(tableV.length<=0){
    scoreLabel.innerHTML = "Vous n'avez répondu a aucune Question";
    scoreResultat.innerHTML = `🤷🏿‍♂️`;
  }
    
};

const gameOver = (tableV,alldata)=>{

  quizs_content.style.visibility = "hidden";
  containerTime.style.display = "none";
  resultat.style.display = "block";
  btn.innerText = "Rejouer";
  btn.onclick = () => {
    window.location.reload();
  };
  score(tableV,alldata)
}
postData();
