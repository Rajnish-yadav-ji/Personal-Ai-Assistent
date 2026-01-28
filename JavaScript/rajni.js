const micBtn = document.getElementById("micBtn");
const voiceGif = document.getElementById("voiceGif");
const usernameSpan = document.getElementById("username");
let content = document.getElementById("content");

const username = localStorage.getItem("username");
usernameSpan.textContent = username || "User";

const synth = window.speechSynthesis;
let hindiFemaleVoice = null;

function loadVoices() {
  const voices = synth.getVoices();

  hindiFemaleVoice =
    voices.find((v) => v.lang === "hi-IN" && v.name.includes("Google")) ||
    voices.find((v) => v.lang === "hi-IN");

  console.log("Rajni Voice:", hindiFemaleVoice?.name);
}

speechSynthesis.onvoiceschanged = loadVoices;


function speakHindi(text) {
  if (!hindiFemaleVoice) loadVoices();

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "hi-IN";
  utter.voice = hindiFemaleVoice;
  utter.rate = 1;
  utter.pitch = 1;
  utter.volume = 1;

  synth.speak(utter);
}

function greetUser() {
  const hour = new Date().getHours();
  let greet = "namaste";

  if (hour < 12) greet = "Good Morning";
  else if (hour < 17) greet = "Good afternoon";
  else if (hour < 21) greet = "Good Evening";
  else greet = "Good Night";

  speakHindi(`${greet} ${username}, मैं रजनी हूँ।`);
}

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = "hi-IN";

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
  changeContent(message);
};

function handleCommand(msg) {
  let userquery = "";
  if (msg.includes("मेरा नाम")) {
    speakHindi(`आपका नाम ${username} है।`);
  } else if (msg.includes("तुम कौन हो")) {
    speakHindi("मैं आपकी वर्चुअल असिस्टेंट रजनी हूँ।");
  } else if (msg.includes("यूट्यूब") || msg.includes("सर्च")) {
    let searchQuery = msg
      .replace("यूट्यूब पर", "")
      .replace("यूट्यूब", "")
      .replace("youtube पर", "")
      .replace("youtube", "")
      .replace("खोजो", "")
      .replace("सर्च करो", "")
      .replace("search karo", "")
      .trim();

    if (searchQuery.length === 0) {
      speakHindi("आप क्या सर्च करना चाहती हैं, कृपया बताइए।");
    } else {
      speakHindi(`यूट्यूब पर ${searchQuery} सर्च कर रही हूँ।`);
      window.open(
        `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`,
        "_blank",
      );
    }
  } else if (msg.includes("चाटबॉट बदल")) {
    speakHindi("चैट बोट बदल रही हूँ ");
    window.location.href = "index.html";
  }else if (msg.includes("आशुतोष ")) {
    speakHindi(
      "भाई वो तो बहुत ही अच्छा  लड़का है । बहुत पढ़ाई करता है । पहले उसे लोग बुढ़वा  कहकर बुलाते थे । उसका दिमाग पढ़ाई लिखाई मे भी लगता है और खेल कूद मे लगता है । कुल मिलाजुला कर वो एक अच्छा लड़का है .",
    );
  } else if (msg.includes("समय") || msg.includes("टाइम")) {
    const time = new Date().toLocaleTimeString("hi-IN", {
      hour: "numeric",
      minute: "numeric",
    });
    speakHindi(`समय है ${time}`);
  }
  else if (msg.includes("तारीख") || msg.includes("डेट")) {
    const date = new Date().toLocaleDateString("hi-IN", {
      day:"numeric",
      month:'short'
    });
    speakHindi(`tarikh है ${date}`);
  }
   else if (msg.includes("यूट्यूब खोलो ")|| msg.includes("open youtube")) {
    speakHindi("यूट्यूब खोला जा रहा है।");
    window.open("https://youtube.com", "_blank");
  } else {
    speakHindi("mujhe nahi pata yaar । tum khud kahi aur se pata kar lo ");
  }
}


micBtn.addEventListener("click", () => {
  recognition.start();
});
function changeContent(message) {
  content.innerText = message;
}

function changeBot() {
  window.location.href = "index.html";
}

window.onload = () => {
  greetUser();
};
