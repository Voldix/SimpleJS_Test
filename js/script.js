const form = document.getElementById("quiz-form");
const btnStart = document.querySelector(".btn-start");
const answers = Array.from(document.querySelectorAll(".answer"));
const answerContainer = document.querySelectorAll(".answers-container");
const questionHeader = document.querySelectorAll(".test-question");
const questions = document.querySelectorAll(".question-item");
const alert1 = document.querySelector("#alert1");
const overlay = document.querySelector("#overlay");
let score = 0;

// start buttom
btnStart.addEventListener("click", () => {
    form.classList.toggle("show");
    btnStart.style.display = "none";
})

form.addEventListener("submit", e => {
    e.preventDefault();
    score = 0;
    answerContainer.forEach(answerCon => {
        answerCon.classList.add("incorrect");
        answerCon.classList.remove("correct");
    })
    questionHeader.forEach(question => {
        question.classList.add("incorrect");
        question.classList.remove("correct");
    })
    //
    const checkedAnsw = answers.filter(answer => answer.checked);
    checkedAnsw.forEach(answer => {
        const theCorrect = answer.value === "true";
        const answersContainer = answer.closest(".answers-container");
        const testQuestion =  answersContainer.previousElementSibling;
        if (theCorrect) {
            score++;
            testQuestion.classList.add("correct");
            answersContainer.classList.add("correct");
            testQuestion.classList.remove("incorrect");
            answersContainer.classList.remove("incorrect");
        } else {
            testQuestion.classList.add("incorrect");
            answersContainer.classList.add("incorrect");
            testQuestion.classList.remove("correct");
            answersContainer.classList.remove("correct");
        }
        const allTrue = checkedAnsw.every(answer => answer.value === "true");
        const allGreen = checkedAnsw.length === questions.length;
        if (allTrue && allGreen) {
            Swal.fire({
                icon: 'success',
                title: "Congratulations!",
                text: "You have got the maximum of 21 points!",
                confirmButtonText: "Finish",
                width: 400,
                color: "hsl(100, 80%, 25%)",
                backdrop: `
                hsla(0, 0%, 10%, 0.8)
                url("./img/fire.gif")
                `
            }).then(result => {
                if (result.isConfirmed) {
                    location.reload();
                }
            })
        }
    })
    if (score <= 10) {
        alert1.classList.add("active");
        overlay.classList.add("active");
        document.getElementById("score").textContent = "You scored " + score + " point(s) out of " + questions.length;
        document.querySelector("#alert1-btn-close").addEventListener("click", () => {
            alert1.classList.remove("active");
            overlay.classList.remove("active");
        })
        document.querySelector("#alert1-btn-restart").addEventListener("click", () => {
            alert1.classList.remove("active");
            overlay.classList.remove("active");
            location.reload();
        })
    }
    if (score > 10 && score <= 18) {
        alert2.classList.add("active");
        overlay.classList.add("active");
        document.getElementById("score2").textContent = "You scored " + score + " point(s) out of " + questions.length;
        document.querySelector("#alert2-btn-close").addEventListener("click", () => {
            alert2.classList.remove("active");
            overlay.classList.remove("active");
        })
        document.querySelector("#alert2-btn-restart").addEventListener("click", () => {
            alert2.classList.remove("active");
            overlay.classList.remove("active");
            location.reload();
        })
    }
    if (score > 18 && score <= 20) {
        alert3.classList.add("active");
        overlay.classList.add("active");
        document.getElementById("score3").textContent = "You scored " + score + " point(s) out of " + questions.length;
        document.querySelector("#alert3-btn-close").addEventListener("click", () => {
            alert3.classList.remove("active");
            overlay.classList.remove("active");
        })
        document.querySelector("#alert3-btn-restart").addEventListener("click", () => {
            alert3.classList.remove("active");
            overlay.classList.remove("active");
            location.reload();
        })
    }
})

overlay.addEventListener("click", overlayClose);

function overlayClose() {
    overlay.classList.remove("active");
    alert1.classList.remove("active");
    alert2.classList.remove("active");
    alert3.classList.remove("active");
}