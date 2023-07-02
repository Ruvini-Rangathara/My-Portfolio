function sendMail() {
    var params = {

        from_name: document.getElementById("name").value,
        email_id: document.getElementById("email").value,
        message: document.getElementById("msg").value
    }

    emailjs.send("service_dsacr36","template_ez72rkn",params).then(function (res) {
        alert("Success!" + res.status);

    })
}