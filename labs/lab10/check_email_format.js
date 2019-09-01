// bind event
document.getElementById("check").addEventListener("click", checkEmail);

function checkEmail() {
    // get the email
    const email = document.getElementById("email");
    const emailAddress = email.value;
    // check the format
    if (/^[0-9a-z]+@[0-9a-z]+\.[0-9a-z]+$/i.exec(emailAddress)) {
        email.style.color = "green";
    } else {
        email.style.color = "red";
    }
}