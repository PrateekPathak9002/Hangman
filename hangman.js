window.onload = function () {
    //initialize variables
    let word = "";
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    let input = document.getElementById("input")
    let display = []
    let incorrect = 0

    // get random word from https://random-words-api.herokuapp.com/w?n=1 using ajax
    $.ajax({
        type: "GET",
        url: "https://random-words-api.herokuapp.com/w?n=1",
        data: "data",
        dataType: "json",
        async: false,
        success: function (response) {
            word = response[0]
        }
    });

    for (let i = 0; i < word.length; i++) {
        display.push('_')
        $("#wordDisplay").append('_ ')
    }


    //draw the hangman
    function drawHangman() {
        ctx.beginPath();

        ctx.moveTo(c.width / 2 - 100, 400);
        ctx.lineTo(c.width / 2 + 100, 400);

        ctx.moveTo(c.width / 2, 400);
        ctx.lineTo(c.width / 2, 100);

        ctx.moveTo(c.width / 2, 100);
        ctx.lineTo(c.width / 2 - 100, 100);

        ctx.moveTo(c.width / 2 - 100, 100);
        ctx.lineTo(c.width / 2 - 100, 150);

        ctx.stroke();
    }
    drawHangman()

    $("#submit").click(function () {
        if (input.value == "" || input.value == " ") {
            alert('Please enter a letter')
            return
        } else {
            if (word.includes(input.value)) {
                for (let n = 0; n < word.length; n++) {
                    if (word[n] == input.value) {
                        display.splice(n, 1, input.value)
                        document.getElementById('wordDisplay').innerHTML = "";
                        display.forEach(function (element) {
                            document.getElementById('wordDisplay').innerHTML += element + " ";
                        })
                        if (!display.includes('_')) {
                            alert('You win! Ok to start a new game')
                            window.location.reload()
                        }
                    }
                }
            } else {
                incorrect++
                switch (incorrect) {
                    case 1:
                        ctx.beginPath();
                        //draw the head
                        ctx.arc(c.width / 2 - 100, 190, 40, 0, 2 * Math.PI);
                        ctx.stroke();
                        break;
                    case 2:
                        ctx.beginPath();
                        //draw the body
                        ctx.moveTo(c.width / 2 - 100, 230);
                        ctx.lineTo(c.width / 2 - 100, 300);
                        ctx.stroke();
                        break;
                    case 3:
                        ctx.beginPath();
                        //draw the left arm
                        ctx.moveTo(c.width / 2 - 100, 250);
                        ctx.lineTo(c.width / 2 - 150, 300);
                        ctx.stroke();
                        break;
                    case 4:
                        ctx.beginPath();
                        //draw the right arm
                        ctx.moveTo(c.width / 2 - 100, 250);
                        ctx.lineTo(c.width / 2 - 50, 300);
                        ctx.stroke();
                        break;
                    case 5:
                        ctx.beginPath();
                        //draw the left leg
                        ctx.moveTo(c.width / 2 - 100, 300);
                        ctx.lineTo(c.width / 2 - 150, 350);
                        ctx.stroke();
                        break;
                    case 6:
                        ctx.beginPath();
                        //draw the right leg
                        ctx.moveTo(c.width / 2 - 100, 300);
                        ctx.lineTo(c.width / 2 - 50, 350);
                        ctx.stroke();
                        break;
                    case 7:
                        alert(`You lose! The word was ${word}. Ok to start a new game`)
                        window.location.reload()
                        break;
                }
            }
        }
    })

}