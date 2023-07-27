
var Icoimga = "";
function Icoimg(Img) {
    Icoimga = Img;
    console.log(Icoimga);
    closeModal();
}



function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

window.onclick = function (event) {
    var modal = document.getElementById("myModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

function handleFormSubmit(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    sendMessage();
}

function hasNonSpaceCharacter(str) {
    const regex = /[^ ]/; // This regular expression checks for at least one non-space character

    return regex.test(str);
}
document.addEventListener("keypress", function (event) {
    // Check if the pressed key is "/"
    if (event.key === "/") {
        event.preventDefault();
        // Focus on the input field
        document.getElementById("message-input").focus();
    }
});

const secretKey = "IamKousicandIamanIdiot!";
var soundsend = new Audio("./assets/s.mp3");





const simpleCrypto = new SimpleCrypto(secretKey);
// Your Firebase config here
var firebaseConfig = {


    authDomain: "chatwego.firebaseapp.com",
    databaseURL: "https://chatwego-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "chatwego",
    storageBucket: "chatwego.appspot.com",
    messagingSenderId: "330841690601",
    appId: "1:330841690601:web:1580dab9da7507d6feblob78",
    measurementId: "G-35M6MYG5LY"
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database().ref('messages');

function sendMessage() {

    var message = document.getElementById('message-input').value;
    if (hasNonSpaceCharacter(message)) {
        console.log("The string contains at least one non-space character.");
        // Your code for when the condition is true goes here
        message = simpleCrypto.encrypt(message)
        if (message.trim() !== '') {
            soundsend.play();
            database.push().set({
                icon: Icoimga,
                text: message,
                timestamp: Date.now()
            })
                .then(function () {
                    // Message sent successfully
                    document.getElementById('message-input').value = '';
                })
                .catch(function (error) {
                    // Handle errors during message sending
                });
        }
    } else {

    }

}
/*

database.on('child_added', function (snapshot) {
    var message = snapshot.val();
    var key = snapshot.key;

    var chatBox = document.getElementById('chat-box');
    var timestamp = message.timestamp;

    var messageElement = document.createElement('div');
    messageElement.classList.add('message');

    // Create a new div inside the 'message' div and add the 'xdiv' class
    var xDiv = document.createElement('div');
    xDiv.classList.add('xdiv');

    // Create an image element and set its source
    var imgElement = document.createElement("img");
    imgElement.src = message.icon;
    imgElement.style.width = "50px"; // Set the width of the image

    // Create a span for the arrow symbol
    var arrowSpan = document.createElement('span');
    arrowSpan.textContent = "➟";
    arrowSpan.style.marginRight = "1vw";
    arrowSpan.style.marginLeft = "1vw"; // Add some space between the image and the arrow symbol
    // Add some space between the image and the arrow symbol

    // Append the image element and arrow symbol span to the 'xdiv'
    xDiv.appendChild(imgElement);


    messageElement.appendChild(xDiv);
    messageElement.appendChild(arrowSpan);
    messageElement.innerHTML += simpleCrypto.decrypt(message.text); // Append decrypted text

    // Set the 'data-key' attribute to identify the message element by its key
    messageElement.setAttribute('data-key', key);

    chatBox.appendChild(messageElement);

    // Scroll to the bottom of the chat box to show the latest message.
    chatBox.scrollTop = chatBox.scrollHeight;

});
*/