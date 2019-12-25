let getID = (id) => document.getElementById(id);
let getSel = (x) => document.querySelector(x);
let mainForm = document.forms['comandsForm'];
let badWordsarr = [];
let result = '';
let char = '*';
mainForm.badWordsArea.onchange = function () {
    getSel('.mainInput').style.borderColor = '';
    if (mainForm.badWordsArea.value !== "") {
        badWordsarr.push(mainForm.badWordsArea.value);
    }
};
mainForm.addBtn.onclick = function () {
    if (mainForm.badWordsArea.value == "") {
        getSel('.mainInput').style.borderColor = 'red';
        mainForm.badWordsArea.placeholder = 'Please write word here!';
    }
    else {
        mainForm.badWordsArea.value = '';
        getSel('.badWords').innerHTML = badWordsarr.join(', ');
        mainForm.badWordsArea.placeholder = 'text here';
    }
};
mainForm.resetBtn.onclick = function () {
    getSel('.badWords').innerHTML = '';
    badWordsarr = [];
    mainForm.checkArea.value = '';
    mainForm.badWordsArea.placeholder = 'text here';
    mainForm.badWordsArea.placeholder = 'text here';
};
function cenzor() {
    let str = mainForm.checkArea.value;
    let regexp;
    badWordsarr.forEach((elements, index) => {
        regexp = new RegExp(badWordsarr[index].toLowerCase(), 'g');
        let checkArr = str.split(" ");
        checkArr.forEach((element, index) => {
            if (regexp.test(checkArr[index].toLowerCase()) == true) {
                for (let y = 0; y < checkArr[index].length; y++) {
                    result += char;
                }
                let newStr = str.replace(checkArr[index], result);
                mainForm.checkArea.value = newStr;
                result = '';
            }
        });
    });
}
mainForm.cenzorBtn.addEventListener('click', function () {
    if (mainForm.checkArea.value == "") {
        getSel('.checkInput').style.borderColor = 'red';
        mainForm.checkArea.placeholder = 'Please write word here!';
    }
    else {
        getSel('.checkInput').style.borderColor = '';
        mainForm.badWordsArea.placeholder = 'text here';
        cenzor();
        function WordCount(str) {
            return str.split(" ").length;
        }
        let checkAreaWordCount = WordCount(mainForm.checkArea.value);
        for (let i = 0; i < checkAreaWordCount; i++) {
            cenzor();
        }
    }
});
