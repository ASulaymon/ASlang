translationMap = {}


setInterval(() => {
    const nom = document.querySelector(".name");
    const name_container = document.querySelector(".name_cont");
    
    if (nom && name_container) {
        const existingAlert = name_container.querySelector(".alert");
        if (existingAlert) {
            existingAlert.remove();
            nom.style.outline = " var(--text) 3px solid";
        }

        if (nom.value.length < 5) {
            const data = nom.getAttribute("alert");
            if (data) {
                let alert = document.createElement("p");
                alert.textContent = `${data}`;
                alert.className = "alert";
                
                name_container.appendChild(alert);

                nom.style.outline = "var(--main) 3px solid";
            }
        }
    }
}, 1000);

function handleInputEvents(inputs) {
    inputs.forEach((input, index1) => {
        input.addEventListener("keyup", (e) => {
            const currentInput = input,
                  nextInput = currentInput.nextElementSibling,
                  prevInput = currentInput.previousElementSibling,
                  parentDiv = currentInput.parentNode;

            if (currentInput.value.length === 1 && nextInput) {
                nextInput.removeAttribute("disabled");
                nextInput.focus();
            }

            if (e.key === "Backspace") {
                if (currentInput.value === "") {
                    if (prevInput) {
                        prevInput.focus();
                    } else {
                        const allInputs = document.querySelectorAll('.input');
                        const allInputsArray = Array.from(allInputs);
                        const currentIndex = allInputsArray.indexOf(currentInput);
                        if (currentIndex > 0) {
                            allInputsArray[currentIndex - 1].focus();
                        }
                    }
                }
                if (parentDiv.querySelectorAll('input').length === 2 && 
                    parentDiv.querySelectorAll('input')[0].value === "" && 
                    parentDiv.querySelectorAll('input')[1].value === "") {
                    if (parentDiv !== firstInputsDiv) {
                        parentDiv.remove();
                    }
                }
            }
        });
    });
}

const initialInputs = document.querySelectorAll(".input");
handleInputEvents(initialInputs);

const firstInputsDiv = document.querySelector('.inputs');
if (firstInputsDiv) {
    const firstInput = firstInputsDiv.querySelector('input');
    if (firstInput) {
        firstInput.disabled = false;
    }
}

const addBtn = document.querySelector(".add"),
      cont = document.querySelector(".container");

function addNewInputDiv() {
    const newInputsDiv = document.createElement("div");
    newInputsDiv.classList.add("inputs");

    const input1 = document.createElement("input");
    input1.type = "text";
    input1.maxLength = "1";
    input1.classList.add("input");

    const input2 = document.createElement("input");
    input2.type = "text";
    input2.maxLength = "1";
    input2.classList.add("input");
    input2.disabled = true;

    newInputsDiv.appendChild(input1);
    newInputsDiv.appendChild(input2);

    cont.appendChild(newInputsDiv);

    const newInputs = newInputsDiv.querySelectorAll(".input");
    handleInputEvents(newInputs);

    input1.focus();
}

addBtn.addEventListener("click", addNewInputDiv);

document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addNewInputDiv();
    }
});

window.addEventListener("load", () => initialInputs[0].focus());

function checkAndAddInput() {
    const lastInputsDiv = cont.lastElementChild;
    const lastInputs = lastInputsDiv.querySelectorAll('input');
    if (Array.from(lastInputs).every(input => input.value !== "")) {
        addNewInputDiv();
    }
}

document.addEventListener('input', () => {
    checkAndAddInput();
});

function removeEmptyInputDivs() {
    const inputsDivs = document.querySelectorAll(".inputs");
    inputsDivs.forEach(div => {
        const inputs = div.querySelectorAll("input");
        if (Array.from(inputs).every(input => input.value === "")) {
            if (div !== firstInputsDiv) {
                div.remove();
            }
        }
    });
}

function saveInputsAsDict() {
    const inputsDivs = document.querySelectorAll(".inputs");
    const data = {};

    inputsDivs.forEach(div => {

        const inputs = div.querySelectorAll("input"),
        l1 = inputs[0].value.toUpperCase(),
        l2 = inputs[1].value.toUpperCase() 

        if (inputs.length === 2 && l1 && l2) {
            data[l1] = l2;
            data[l2] = l1;
        }
    });

    const result = {};
    translationMap = data;

    console.log(result);
    return result;
}

const saveBtn = document.querySelector(".save"),
translator = document.querySelector(".translator"),
barrier = document.querySelector(".barrier")
saveBtn.addEventListener("click", () => {
    const nom = document.querySelector(".name");
    if (nom.value.length < 5) {
        alert(nom.getAttribute("alert"));
        return;
    }
    translator.style.display = "flex";
    barrier.style.display = "flex";
    removeEmptyInputDivs();
    saveInputsAsDict();
    body.style.overflow = "hidden"
    body.style.zIndex =  "-10"

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
    
        let wordSmall = document.querySelector(".tarea").value,
        res = document.querySelector(".result > h3")
    
        if(res.length = 1){
            let gap = wordSmall.toUpperCase()
            let translatedWord = changer(gap);
            res.innerHTML = translatedWord.toLocaleLowerCase(); 
        }else{
            res.innerHTML = "Tarjima...";
        }
        copy.addEventListener("click", () => {
            navigator.clipboard.writeText(res.innerHTML);
        })
    }, 100);
    
});

document.querySelector(".name").addEventListener("keydown", (e) => {
    if (e.key === " ") {
        e.preventDefault();
    }
});

const x = document.querySelector(".exit")

x.addEventListener("click", () => {
    translator.style.display = "none"
    barrier.style.display = "none"
    body.style.overflow = "auto"
    body.style.zIndex = "1"
})


const darkmode = document.querySelector(".md")
const body = document.querySelector("body")

darkmode.addEventListener("click", () => {
    body.classList.toggle("dark")
})
