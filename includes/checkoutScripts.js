$(document).ready(function () {
    // Variable initialization, including getting userInfo from the locally stored JSON created by scripts.js
    $("#widgets").hide();
    $(".alert").hide();
    $("#items").append(localStorage.getItem('checked-out'));
    var userInfo = localStorage.getItem("userInfo");
    userInfo = JSON.parse(userInfo);

    // If a blimp package has been added to the checkout cart, this function will initialize and start the five
    // minute timer that will enable the user to purchase the package at a $2500 discount. (See startTimer for
    // further insight.)
    var inCheckout = (localStorage.getItem('was-added') == 'true');
    if (inCheckout) {
        var limitedTimeDiscount = localStorage.getItem('end-time') - localStorage.getItem('time');
        var showTimer = document.querySelector('#time');
        startTimer(limitedTimeDiscount, showTimer);
        $(".alert").show();
    }

    // If the "delete" button next to an in-cart blimp package is clicked on the Checkout page, this function will
    // subsequently remove that blimp package from the checkout cart.
    $(document).on("click", "#remove-item", function () {
        localStorage.removeItem('checked-out');
        $(".item").remove();
        $("#items").nextAll(':not(#checkout)').remove();
        localStorage.setItem('was-added', false);
        inCheckout = (localStorage.getItem('checked-out') == 'true');
    });

    // After clicking the button to checkout their order, this function prompts the user for an email address.
    // If the email address matches the valid format, it is accepted and stored into userInfo (see scripts.js
    // for further insight into userInfo initialization), and the checkout cart is removed to show the confirmation
    // message on the Checkout screen. This last part is accomplished by calling the separate function
    // orderConfirmationMessage (see below).
    $(document).on("click", "#checkout", function () {
        if (inCheckout) {
            var userEmail = prompt("Please enter your email address for the order.", "");
            while (!userEmail.match(/\S+@\S+\.\S/i)) {
                userEmail = prompt("Error: Please enter a valid email address.", "");
            }
            userInfo['userEmail'] = userEmail;
            localStorage.removeItem('checked-out');
            localStorage.setItem('item-name', $("#item-name").text());
            localStorage.setItem('item-price', $('#currPrice').text());
            $(".item").remove();
            $(".alert").remove();
            $("#checkout").remove();
            $("table").remove();
            $("br").remove();
            localStorage.setItem('was-added', false);
            inCheckout = (localStorage.getItem('checked-out') == 'true');

            orderConfirmationMessage();
        } else {
            alert("There are currently no items in your checkout.")
        }
    });
    // This function performs the countdown timer, which for five minutes will allow the user to purchase their chosen
    // blimp package for $2500 less than the standard cost. After five minutes, the price is readjusted to the standard cost.
    // This is achieved by first setting all prices $2500 lower when initializing the cart items (see scripts.js),
    // and then using this function to raise the prices by $2500 back to their standard cost if the item is not checked out
    // within the five minute time alottment.
    function startTimer() {
        var countDownDate = localStorage.getItem('endTime');
        var x = setInterval(function () {
            var now = new Date().getTime();
            var timeDisplacement = countDownDate - now;
            var minutes = Math.floor((timeDisplacement % 3600000) / 60000);
            var seconds = Math.floor((timeDisplacement % 60000) / 1000);

            if (seconds < 10) {
                seconds = ("0" + seconds);
            }
            $("#time").html(minutes + ":" + seconds);

            if (timeDisplacement < 0) {
                $("#checkout").nextAll().remove();
                var newPrice = $('#currPrice').text().split("");
                var temp = "";
                for (var i = 0; i < newPrice.length; i++) {
                    if (newPrice[i].match(/\d/)) {
                        temp += newPrice[i];
                    }
                }
                newPrice = parseInt(temp) + 2500;
                $("#currPrice").html(`<del>${$('#currPrice').text()}</del><br>$${newPrice}`);
                clearInterval(x);
            }
        }, 1000);
    };

    // After the chosen blimp package has been "checked out", this function modifies the Checkout page to show the order information and a thank you message.
    // The shown info includes the email, blimp package name and price.
    function orderConfirmationMessage() {
        $("#display-title").text("The sky is now officially your limit.")
        $(".lead").prepend(`<br>Your transaction receipt has been emailed to the provided email address: ${userInfo['userEmail']}. <br><br>Your purchase of ${localStorage.getItem('item-name')} (${localStorage.getItem('item-price')} value) will be delivered to you shortly after an agent has emailed you to confirm the best pickup location.</p>`);
        $(".lead").append(`<p>Thanks for your purchase! We can't wait for you to enjoy your new blimp experience. Please leave a review on our Google page afterwards and let us know how you enjoy it!</p>`);
    }
});