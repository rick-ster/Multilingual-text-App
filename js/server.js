const countries = {
    "ar-SA": "Arabic",
    "bn-IN": "Bengali",
    "bo-CN": "Tibetan",
    "de-DE": "German",
    "el-GR": "Greek",
    "en-GB": "English",
    "es-ES": "Spanish",
    "fa-IR": "Persian",
    "fr-FR": "French",
    "gu-IN": "Gujarati",
    "hi-IN": "Hindi",
    "id-ID": "Indonesian",
    "it-IT": "Italian",
    "ja-JP": "Japanese",
    "kn-IN": "Kannada",
    "ko-KR": "Korean",
    "la-VA": "Latin",
    "lv-LV": "Latvian",
    "ms-MY": "Malay",
    "ne-NP": "Nepali",
    "nl-NL": "Dutch",
    "ur-PK": "Pakistani",
    "pa-IN": "Panjabi",
    "pl-PL": "Polish",
    "pt-PT": "Portuguese",
    "ru-RU": "Russian",
    "ta-LK": "Tamil",
    "te-IN": "Telugu",
    "th-TH": "Thai",
    "tr-TR": "Turkish",
    "uk-UA": "Ukrainian",
    "vi-VN": "Vietnamese",
}

selectTag = document.querySelectorAll("select");

selectTag.forEach((tag, id) => {
    for (let country_code in countries) {
        let selected = id == 0 ? (country_code == "en-GB" ? "selected" : "") : (country_code == "hi-IN" ? "selected" : "");
        let option = `<option ${selected} value="${country_code}">${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);
    }
});

const fromText = document.querySelector(".from-text");
toText = document.querySelector(".to-text");
translateBtn = document.querySelector("button");

// Clear the output text field when the input text field is empty
fromText.addEventListener("keyup", () => {
    if(!fromText.value) {
        toText.value = "";
    }
});

// Trigger translation when the Enter key is pressed
fromText.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); 
      translateBtn.click(); 
    }
  });
  
// Perform the translation when the translate button is clicked
translateBtn.addEventListener("click", () => {
    let text = fromText.value.trim(); // Get the input text and remove leading/trailing whitespace
    translateFrom = selectTag[0].value; // Get the selected source language
    translateTo = selectTag[1].value; // Get the selected target language
    if(!text) return; // If input text is empty, exit the function
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
        toText.value = data.responseData.translatedText; // Set the translated text as the value of the output text field

        // Iterate through the translation matches
        data.matches.forEach(data => {
            if(data.id === 0) {
                toText.value = data.translation; // Set the translation as the value of the output text field
            }
        });
    });
});


