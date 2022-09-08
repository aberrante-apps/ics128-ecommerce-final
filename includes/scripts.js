$(document).ready(function () {
    // Hides the filtered results screen while the qualifying questions are still being asked.
    $("#sales-jumbotron").hide();

    // Initialize the userInfo variable to store IP-based API data locally.
    // Initialize variables to store answers for each of the four questions.
    var userInfo = 0;
    var answer1, answer2, answer3, answer4;

    // Assign variables which store the html and style information for each of the 8 blimp options.
    // These packages can be appended later either after the qualifying questions as a relevant package, or altogether on the Full Packages List
    // These variables are not used on the Checkout page. See the createCartItem function for further info below.
    let bigSpeedSelf =
        "<div class='card mb-3'style='max-width: 20rem; display: inline-block; margin: 10px 5%;'><div class='card-body'><h5 class='card-title'>The Big Speedy Self-Pilot Blimp</h5><h6 class='card-subtitle price-tag text-muted'>$20000</h6></div><div class='card-body'><p class='card-text'>Look out, Al Gore! This self-service zeppelin from Umlaut Fabrication burns so much fuel hitting its ludicrous top-speed, it can punch holes in the ozone layer like swiss cheese. Arguably though, most say it's worth it.<br>(Pilot Not Included)</p></div><a class='btn btn-primary btn-lg add-to-cart' id='BSS' href='checkout.html' role='button'style='margin: 10px 57px;'>Select This Experience</a></div>";

    let bigSpeedPilot =
        "<div class='card mb-3'style='max-width: 20rem; display: inline-block; margin: 10px 5%;'><div class='card-body'><h5 class='card-title'>The Big Speedy Professional-Pilot Blimp</h5><h6 class='card-subtitle price-tag text-muted'>$25000</h6></div><div class='card-body'><p class='card-text'>What could possibly be a more practical investment than a massive, fast, fuel-guzzling airship? Perhaps having a professionally accredited pilot run it for you. There's a school for everything, apparently.<br>(Pilot Included)</p></div><a class='btn btn-primary btn-lg add-to-cart' id='BSP' href='checkout.html' role='button'style='margin: 10px 57px;'>Select This Experience</a></div>";

    let bigComfortSelf =
        "<div class='card mb-3'style='max-width: 20rem; display: inline-block; margin: 10px 5%;'><div class='card-body'><h5 class='card-title'>The Big Comfy Self-Pilot Blimp</h5><h6 class='card-subtitle price-tag text-muted'>$25000</h6></div><div class='card-body'><p class='card-text'>Need room for more than just you and your family? Want to have hold the whole family reunion at 15,000 feet in the air? You shouldn't, but now you can.<br>(Pilot Not Included)</p></div><a class='btn btn-primary btn-lg add-to-cart' id='BCS' href='checkout.html' role='button'style='margin: 10px 57px;'>Select This Experience</a></div>";

    let bigComfortPilot =
        "<div class='card mb-3'style='max-width: 20rem; display: inline-block; margin: 10px 5%;'><div class='card-body'><h5 class='card-title'>The Big Comfy Professional-Pilot Blimp</h5><h6 class='card-subtitle price-tag text-muted'>$30000</h6><div class='card-body'><p class='card-text'>Did someone say Hinden-splurge? This ultra-luxury Nemo class ship will have you gently cruising the skies in massive, absolute comfort. <br>(Pilot Included)</p></div><a class='btn btn-primary btn-lg add-to-cart' id='BCP' href='checkout.html' role='button'style='margin: 10px 57px;'>Select This Experience</a></div>";

    let smallSpeedSelf =
        "<div class='card mb-3'style='max-width: 20rem; display: inline-block; margin: 10px 5%;'><div class='card-body'><h5 class='card-title'>The Small Speedy Self-Pilot Blimp</h5><h6 class='card-subtitle price-tag text-muted'>$10000</h6><div class='card-body'><p class='card-text'>Some call it the Kawasaki Ninja of derigibles. We call it the cheapest and fastest way to get your head in the clouds.<br>(Pilot Not Included)</p></div><a class='btn btn-primary btn-lg add-to-cart' id='SSS' href='checkout.html' role='button'style='margin: 10px 57px;'>Select This Experience</a></div>";

    let smallSpeedPilot =
        "<div class='card mb-3'style='max-width: 20rem; display: inline-block; margin: 10px 5%;'><div class='card-body'><h5 class='card-title'>The Small Speedy Professional-Pilot Blimp</h5><h6 class='card-subtitle price-tag text-muted'>$15000</h6><div class='card-body'><p class='card-text'>Does the phrase \"Jesus take the wheel\" strike fear into your heart? Us too. Have a blast of fast, while letting a professional pilot do the heavy lifting instead of you.<br>(Pilot Included)</p></div><a class='btn btn-primary btn-lg add-to-cart' id='SSP' href='checkout.html' role='button'style='margin: 10px 57px;'>Select This Experience</a></div>";

    let smallComfortSelf =
        "<div class='card mb-3'style='max-width: 20rem; display: inline-block; margin: 10px 5%;'><div class='card-body'><h5 class='card-title'>The Small Comfy Self-Pilot Blimp</h5><h6 class='card-subtitle price-tag text-muted'>$15000</h6><div class='card-body'><p class='card-text'>The perfect size for the single individual, couple or family looking for just a small display of obscene wealth without \"going overboard.\"<br>(Pilot Not Included)</p></div><a class='btn btn-primary btn-lg add-to-cart' id='SCS' href='checkout.html' role='button'style='margin: 10px 57px;'>Select This Experience</a></div>";

    let smallComfortPilot =
        "<div class='card mb-3'style='max-width: 20rem; display: inline-block; margin: 10px 5%;'><div class='card-body'><h5 class='card-title'>The Small Comfy Professional-Pilot Blimp</h5><h6 class='card-subtitle price-tag text-muted'>$20000</h6></div><div class='card-body'><p class='card-text'>Take a family road trip to remember, or a magical couple's trip in style with this fully-chaufered offering for up to four<br>(Pilot Included).</p></div><a class='btn btn-primary btn-lg add-to-cart' id='SCP' href='checkout.html' role='button'style='margin: 10px 57px;'>Select This Experience</a></div>";

    // An API that both retrieves IP-based public information regarding the user and saves it locally to userInfo, where further information can be added or modified.
    // The userEmail will be filled in later on the checkout page.
    $.ajax({
        type: "GET",
        url: "https://ipinfo.io/json?token=706e9331e72832",
        success: function (data) {
            userInfo = {
                userLoc: data.loc,
                userCity: data.city,
                userReg: data.region,
                userCn: data.country,
                userTZ: data.timezone,
                latLong: data.loc.split(","),
                userEmail: "",
            };
            localStorage.setItem("userInfo", JSON.stringify(userInfo));
        },
    });

    // Places all 8 blimp options neatly onto the page.
    // This can be seen in action on the Packages page.
    $("#welcome-back-title").html("Full Package List");
    $("#sales-packs").append(bigSpeedSelf);
    $("#sales-packs").append(bigSpeedPilot);
    $("#sales-packs").append(bigComfortSelf);
    $("#sales-packs").append(bigComfortPilot);
    $("#sales-packs").append(smallSpeedSelf);
    $("#sales-packs").append(smallSpeedPilot);
    $("#sales-packs").append(smallComfortSelf);
    $("#sales-packs").append(smallComfortPilot);

    // Initializes the question counter and begins populating the qualifying question information.
    var questionNumber = 0;
    $("#ques-cont").click(function () {
        questionNumber++;
        populate();
    });

    // Gets the result of each Yes or No question by extracting the text value from the selected radio buttons
    $(document).on("click", "#q-next", function () {
        switch (questionNumber) {
            case 1:
                answer1 = $('input[name="optionsRadios"]:checked')[0].value;
                questionNumber++;
                populate();
                break;

            case 2:
                answer2 = $('input[name="optionsRadios"]:checked')[0].value;
                questionNumber++;
                populate();
                break;

            case 3:
                answer3 = $('input[name="optionsRadios"]:checked')[0].value;
                questionNumber++;
                populate();
                break;
            case 4:
                answer4 = $('input[name="optionsRadios"]:checked')[0].value;
                questionNumber++;
                populate();
                if (answer4 == "Yes") {
                    if (answer1 == "Yes") {
                        if (answer2 == "Yes") {
                            if (answer3 == "Yes") {
                                $("#sales-jumbotron").append(bigSpeedPilot);
                            }
                            else {
                                $("#sales-jumbotron").append(bigSpeedSelf);
                            }
                        }
                        else {
                            if (answer3 == "Yes") {
                                $("#sales-jumbotron").append(bigComfortPilot);
                            }
                            else {
                                $("#sales-jumbotron").append(bigComfortSelf);
                            }
                        }
                    }
                    else {
                        if (answer2 == "Yes") {
                            if (answer3 == "Yes") {
                                $("#sales-jumbotron").append(smallSpeedPilot);
                            }
                            else {
                                $("#sales-jumbotron").append(smallSpeedSelf);
                            }
                        }
                        else {
                            if (answer3 == "Yes") {
                                $("#sales-jumbotron").append(smallComfortPilot);
                            }
                            else {
                                $("#sales-jumbotron").append(smallComfortSelf);
                            }
                        }
                    }
                }
                $("#questions-jumbotron").hide();
                $("#sales-jumbotron").show();
                break;
        }
    });

    // The populate function injects the appropriate question text and answer options based on the current qualifying question the user is on.
    // Question four, if answered "no", will prevent any blimps from being shown in the filtered results as a preventative cautionary measure due to safety.
    function populate() {
        switch (questionNumber) {
            case 1:
                $("#current-question").html("Do you want a big blimp?");
                $("#possible-answers").html(
                    " <div class='form-check'><label class='form-check-label'><input type='radio' class='form-check-input' name='optionsRadios' id='yes' value='Yes'>Yes</label></div><div class='form-check'><label class='form-check-label'><input type='radio' class='form-check-input' name='optionsRadios' id='no' value='No'>No</label></div><br><a id='q-next' class='btn btn-primary btn-lg' role='button' style='margin: 10px 30px; color:#FFFFFF'>Next</a>"
                );
                break;

            case 2:
                $("#current-question").html("Do you want a fast blimp?");
                $("#possible-answers").html(
                    " <div class='form-check'><label class='form-check-label'><input type='radio' class='form-check-input' name='optionsRadios' id='yes' value='Yes'>Yes</label></div><div class='form-check'><label class='form-check-label'><input type='radio' class='form-check-input' name='optionsRadios' id='no' value='No'>No</label></div><br><a id='q-next' class='btn btn-primary btn-lg' role='button' style='margin: 10px 30px; color:#FFFFFF'>Next</a>"
                );
                break;
            case 3:
                $("#current-question").html("Do you need a professional pilot?");
                $("#possible-answers").html(
                    " <div class='form-check'><label class='form-check-label'><input type='radio' class='form-check-input' name='optionsRadios' id='yes' value='Yes'>Yes</label></div><div class='form-check'><label class='form-check-label'><input type='radio' class='form-check-input' name='optionsRadios' id='no' value='No'>No</label></div><br><a id='q-next' class='btn btn-primary btn-lg' role='button' style='margin: 10px 30px; color:#FFFFFF'>Next</a>"
                );
                break;
            case 4:
                $("#current-question").html("Do you agree not to use our blimps for general acts of buffoonery or evil?");
                $("#possible-answers").html(
                    " <div class='form-check'><label class='form-check-label'><input type='radio' class='form-check-input' name='optionsRadios' id='yes' value='Yes'>Yes</label></div><div class='form-check'><label class='form-check-label'><input type='radio' class='form-check-input' name='optionsRadios' id='no' value='No'>No</label></div><br><a id='q-next' class='btn btn-primary btn-lg' role='button' style='margin: 10px 30px; color:#FFFFFF'>Next</a>"
                );
                break;
        }
    }

    $(document).on("click", ".add-to-cart", function () {
        let selectedItem = $(this).attr("id");
        createCartItem(selectedItem);
        let time = new Date();
        localStorage.setItem("endTime", time.getTime() + 300000);
        localStorage.setItem("was-added", true);
    });

    // The createCartItem function populates the checkout table with information on the selected blimp.
    // This function serves only to render information on the checkout page, and does not render the filtered blimp package info on the Home page.
    function createCartItem(selectedItem) {
        if (selectedItem == "BSS") {
            var plain =
                "<tbody class='item'><tr class='table-active'><td id='item-name'>The Big Speedy Self-Pilot Blimp</td><td id='currPrice'>$17500</td><td><button type='button' id='remove-item' class='btn btn-danger'>Delete</button></td></tr>";
        } else if (selectedItem == "BSP") {
            var plain =
                "<tbody class='item'><tr class='table-active'><td id='item-name'>The Big Speedy Professional-Pilot Blimp</td><td id='currPrice'>$22500</td><td><button type='button' id='remove-item' class='btn btn-danger'>Delete</button></td></tr>";
        } else if (selectedItem == "BCS") {
            var plain =
                "<tbody class='item'><tr class='table-active'><td id='item-name'>The Big Comfy Self-Pilot Blimp</td><td id='currPrice'>$22500</td><td><button type='button' id='remove-item' class='btn btn-danger'>Delete</button></td></tr>";
        } else if (selectedItem == "BCP") {
            var plain =
                "<tbody class='item'><tr class='table-active'><td id='item-name'>The Big Comfy Professional-Pilot Blimp</td><td id='currPrice'>$27500</td><td><button type='button' id='remove-item' class='btn btn-danger'>Delete</button></td></tr>";
        } else if (selectedItem == "SSS") {
            var plain =
                "<tbody class='item'><tr class='table-active'><td id='item-name'>The Small Speedy Self-Pilot Blimp</td><td id='currPrice'>$7750</td><td><button type='button' id='remove-item' class='btn btn-danger'>Delete</button></td></tr>";
        } else if (selectedItem == "SSP") {
            var plain =
                "<tbody class='item'><tr class='table-active'><td id='item-name'>The Small Speedy Professional-Pilot Blimp</td><td id='currPrice'>$12500</td><td><button type='button' id='remove-item' class='btn btn-danger'>Delete</button></td></tr>";
        } else if (selectedItem == "SCS") {
            var plain =
                "<tbody class='item'><tr class='table-active'><td id='item-name'>The Small Comfy Self-Pilot Blimp</td><td id='currPrice'>$12500</td><td><button type='button' id='remove-item' class='btn btn-danger'>Delete</button></td></tr>";
        } else if (selectedItem == "SCP") {
            var plain =
                "<tbody class='item'><tr class='table-active'><td id='item-name'>The Small Comfy Professional-Pilot Blimp</td><td id='currPrice'>$17500</td><td><button type='button' id='remove-item' class='btn btn-danger'>Delete</button></td></tr>";
        }
        localStorage.setItem("checked-out", plain);
        console.log("Stored as: " + localStorage.getItem("checked-out"));
    }
});
