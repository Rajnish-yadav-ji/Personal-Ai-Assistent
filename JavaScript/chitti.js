
const micBtn = document.getElementById("micBtn");
const voiceGif = document.getElementById("voiceGif");
const usernameSpan = document.getElementById("username");

const username = localStorage.getItem("username") || "User";
usernameSpan.textContent = username;

const synth = window.speechSynthesis;
let maleEnglishVoice = null;

function loadVoices() {
  const voices = synth.getVoices();


  maleEnglishVoice =
    voices.find(v =>
      v.lang === "en-US" &&
      (v.name.toLowerCase().includes("male") ||
       v.name.toLowerCase().includes("david") ||
       v.name.toLowerCase().includes("mark"))
    )
    || voices.find(v => v.lang === "en-US");

  console.log("Chitti Voice:", maleEnglishVoice?.name);
}

speechSynthesis.onvoiceschanged = loadVoices;

function speakEnglish(text) {
  if (!maleEnglishVoice) loadVoices();

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "en-US";
  utter.voice = maleEnglishVoice;
  utter.rate = 1;
  utter.pitch = 0.9;
  utter.volume = 1;
  synth.speak(utter);
}

function greetUser() {
  const hour = new Date().getHours();
  let greeting = "Hello";

  if (hour < 12) greeting = "Good morning";
  else if (hour < 18) greeting = "Good afternoon";
  else greeting = "Good evening";
  speakEnglish(`${greeting} ${username}, I am Chitti.`);
}

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.lang = "en-US";

recognition.onstart = () => {
  micBtn.style.display = "none";
  voiceGif.style.display = "block";
};

recognition.onend = () => {
  micBtn.style.display = "flex";
  voiceGif.style.display = "none";
};

recognition.onresult = (event) => {
  const message = event.results[0][0].transcript.toLowerCase();
  handleCommand(message);
  
};


function handleCommand(msg) {
  if(msg.includes("hello")){
        speakEnglish("Hello sir How are you ")
    }
  else if(msg.includes("who is rajneesh?")){
        speak("Rajnish is a very good boy. he is currently persuing BCA from ignou.he is 20 years old . he is my creator")
    }
  else if (msg.includes("your name")) {
    speakEnglish("My name is Chitti.");
  }
  else if (msg.includes("who are you")) {
    speakEnglish("I am your personal AI assistant.");
  }
  else if (msg.includes("change")) {
    speakEnglish("changing chatbot . please select a chatbot");
    window.location.href = "index.html"
  }
  else if (msg.includes("time")) {
    const time = new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric" });
    speakEnglish(`The time is ${time}`);
  }
  else if (msg.includes("open youtube")) {
    speakEnglish("Opening YouTube.");
    window.open("https://youtube.com", "_blank");
  }
  else {
    speakEnglish("Sorry, I did not understand that.");
  }
}

micBtn.addEventListener("click", () => {
  recognition.start();
});

function changeBot() {
  window.location.href = "index.html";
}


window.onload = () => {
  greetUser();
};
