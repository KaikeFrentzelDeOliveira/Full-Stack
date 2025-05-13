let randomNumber = Math.floor(Math.random() * 100);

function checkGuess() {
    let userGuess = document.getElementById("guessInput").value;
    let feedback = document.getElementById("feedback");
    let inputField = document.getElementById("guessInput");

    if (userGuess == randomNumber) {
        feedback.textContent = "Parabéns! Você acertou!";
        inputField.style.backgroundColor = "green";
    } else if (userGuess < randomNumber) {
        feedback.textContent = "Tente um número maior.";
        inputField.style.backgroundColor = "red";
    } else {
        feedback.textContent = "Tente um número menor.";
        inputField.style.backgroundColor = "red";
    }
}