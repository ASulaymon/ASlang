const translationMap = {
    "A": "E",
    "B": "P",
    "C": "S",
    "D": "T",
    "E": "A",
    "F": "K",
    "G": "J",
    "H": "X",
    "I": "L",
    "J": "G",
    "K": "F",
    "L": "I",
    "M": "N",
    "N": "M",
    "O": "U",
    "P": "B",
    "Q": "Z",
    "R": "W",
    "S": "C",
    "T": "D",
    "U": "O",
    "V": "W",
    "W": "V",
    "X": "H",
    "Y": "R",
    "Z": "Q",
    "'": "-"
};


function changer(word) {
    let result = "";

    for (let char of word) {
        if (translationMap[char]) {
            result += translationMap[char];
        } else {
            result += char;
        }
    }
    return result;
}


setInterval(() =>{
    const copy = document.querySelector(".copy")

    let wordSmall = document.querySelector(".input"),
    res = document.querySelector(".result > h3")

    if(res.length = 1){
        let gap = wordSmall.value.toUpperCase()
        let translatedWord = changer(gap);
        res.innerHTML = translatedWord.toLocaleLowerCase(); 
    }else{
        res.innerHTML = "Tarjima...";
    }
    copy.addEventListener("click", () => {
        navigator.clipboard.writeText(res.innerHTML);
    })
}, 100);

const darkmode = document.querySelector(".md")
const body = document.querySelector("body")

darkmode.addEventListener("click", () => {
    body.classList.toggle("dark")
})