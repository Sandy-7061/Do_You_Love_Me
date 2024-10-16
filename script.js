const startButton = document.getElementById("start_button");
const gifLanding = document.querySelector(".gif");
const questionLanding = document.querySelector(".question");

var questionMain = null;
var gifMain = null;
var yesButton = null;
var noButton = null;
var input = null;
var count = 0;
//This is Button
startButton.addEventListener("click", () => {
    input = document.getElementById("fname").value;

    if (input == "") {
        gifLanding.src = "https://media.giphy.com/media/VB3cK9oA48BbQWcObd/giphy.gif";
        questionLanding.innerHTML = "Please give me your name before you start!";
    } else {
        // Step 1: Will you go out with me?
        document.head.innerHTML = `
        <meta charset='UTF-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <title>Do You Love Me?</title>
        <link rel='stylesheet' href='styleMain.css'/>`;

        document.body.innerHTML = `
        <div class='wrapper'>
            <h2 class='question'>Hello ${input}! Will you go out with me?</h2>
            <img class='gif' alt='gif' src='https://media.giphy.com/media/0kDdAFAELmvvFNUKim/giphy.gif'/>
            <div class='btn-group'>
                <button class='yes-btn'>Yes</button>
                <button class='no-btn'>No</button>
            </div>
        </div>`;

        questionMain = document.querySelector(".question");
        gifMain = document.querySelector(".gif");
        yesButton = document.querySelector(".yes-btn");
        noButton = document.querySelector(".no-btn");

        yesButton.addEventListener("click", askForDinner);
        noButton.addEventListener("click", () => {
            gifMain.src = "https://media.giphy.com/media/hbOgjMOUfLdWV2Ty1j/giphy.gif";
            questionMain.innerHTML = "Oh no! Give me a chance! 😢";
        });
    }
});

// Step 2: Ask for dinner
function askForDinner() {
    questionMain.innerHTML = `Awesome! How about dinner sometime, ${input}?`;
    gifMain.src = "Dinner.gif";

    yesButton.addEventListener("click", askDoYouLoveMe); // Proceed to "Do you love me?"
    noButton.addEventListener("click", () => {
        gifMain.src = "https://media.giphy.com/media/hbOgjMOUfLdWV2Ty1j/giphy.gif";
        questionMain.innerHTML = "Oh no! Please reconsider! 😢";
    });
}

// Step 3: Ask "Do you love me?"
function askDoYouLoveMe() {
    questionMain.innerHTML = `Do you love me? 🥺`;
    gifMain.src = "do_you_love_me.gif"; // Use the local path for the GIF

    yesButton.removeEventListener("click", askForDinner); // Remove previous handler
    yesButton.addEventListener("click", askForCall); // Proceed to the final call
    
    // Activate No button hover dodge only here
    noButton.removeEventListener("click", askForDinner);
    noButton.addEventListener("mouseenter", dodgeNoButton); // Dodge on hover
    noButton.addEventListener("click", () => {
        // Play the song
        const audio = new Audio("Tu_nakriyo_fir_bhi.mp3"); // Provide the path to your audio file
        audio.play();
    
        gifMain.src = "https://media.giphy.com/media/hbOgjMOUfLdWV2Ty1j/giphy.gif"; // Default no response gif
        questionMain.innerHTML = "Oh no! Give me a chance! 😢";
    });
}

// Step 4: Ask for a call
// Step 4: Ask for a call
function askForCall() {
    // Play the song when asking for a call
    const audio = new Audio("Din_bhar_kare_baten_ham.mp3"); // Provide the path to your audio file
    audio.play();
    
    questionMain.innerHTML = `Yay! Call me at <strong>702-452-0740</strong> ❤️`;
    gifMain.src = "calling-call-me.gif"; // Final happy gif

    yesButton.style.display = 'none'; // Hide Yes/No buttons
    noButton.style.display = 'none';

    // Create Call button
    const callButton = document.createElement("button");
    callButton.innerHTML = "Call me!";
    callButton.classList.add('call-btn');
    document.querySelector('.btn-group').appendChild(callButton);

    // Trigger a simulated call when clicked
    callButton.addEventListener("click", () => {
        window.open(`tel:7024520740`, '_self');
    });
}

// Dodge the "No" button only on "Do you love me?" question
function dodgeNoButton() {
    if (count < 5) {
        gifMain.src = "https://media.giphy.com/media/hbOgjMOUfLdWV2Ty1j/giphy.gif";
        questionMain.innerHTML = "You don't love me? 😢";
    } else if (count >= 5 && count < 10) {
        gifMain.src = "https://media.giphy.com/media/QuCslOrnS649PSCnn7/giphy.gif";
        questionMain.innerHTML = "Stop playing with me! Do you love me or not?!";
    } else {
        gifMain.src = "https://media.giphy.com/media/8OPf6xrtXi3QEcu5h9/giphy.gif";
        questionMain.innerHTML = "JUST ANSWER! DO YOU LOVE ME?! 😤";

        isDodgeActive = false; // Stop dodging after 10 hovers
    }

    if (isDodgeActive) {
        const noButtonRect = noButton.getBoundingClientRect();
        const maxX = window.innerWidth - noButtonRect.width - 20; // Leave some margin
        const maxY = window.innerHeight - noButtonRect.height - 20; // Leave some margin

        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);

        noButton.style.position = 'absolute'; // Make sure the position is absolute
        noButton.style.left = randomX + "px";
        noButton.style.top = randomY + "px";
    }

    count++;
}




