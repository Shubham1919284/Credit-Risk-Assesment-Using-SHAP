const form = document.getElementById("loanForm");

const result = document.getElementById("result");

const submitButton = document.querySelector(".submit");

const buttonText = document.getElementById("btn");

const spinner = document.getElementById("spin");


// =====================================================
// 1. LOAN / INCOME RATIO
// =====================================================

const incomeInput = document.querySelector(
    'input[name="person_income"]'
);

const loanAmountInput = document.getElementById(
    "loanAmount"
);

const ratioDisplay = document.getElementById(
    "ratioDisplay"
);

const ratioPercent = document.getElementById(
    "ratioPercent"
);

const ratioInput = document.getElementById(
    "loanPercentIncome"
);


function calculateRatio() {

    const income = parseFloat(
        incomeInput.value
    );

    const loanAmount = parseFloat(
        loanAmountInput.value
    );


    // If values are missing or invalid
    if (
        !income ||
        income <= 0 ||
        !loanAmount ||
        loanAmount <= 0
    ) {

        ratioDisplay.textContent = "—";

        ratioPercent.textContent =
            "Enter income and loan amount";

        ratioInput.value = "";

        return;
    }


    // Formula:
    // Loan / Annual Income

    const ratio =
        loanAmount / income;


    // Store value for the API

    ratioInput.value =
        ratio.toFixed(4);


    // Display decimal ratio

    ratioDisplay.textContent =
        ratio.toFixed(2);


    // Display percentage

    ratioPercent.textContent =
        `${(ratio * 100).toFixed(1)}% of annual income`;

}


// Recalculate whenever income changes

incomeInput.addEventListener(
    "input",
    calculateRatio
);


// Recalculate whenever loan amount changes

loanAmountInput.addEventListener(
    "input",
    calculateRatio
);


// Calculate once when page loads

calculateRatio();



// =====================================================
// 2. INFORMATION BUTTONS
// =====================================================

const infoButtons =
    document.querySelectorAll(".info-btn");


infoButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            event.stopPropagation();


            const message =
                button.getAttribute("data-help");


            // Remove an existing popup

            const oldPopup =
                document.querySelector(".help-popup");


            if (oldPopup) {
                oldPopup.remove();
            }


            // Create popup

            const popup =
                document.createElement("div");


            popup.className =
                "help-popup";


            popup.textContent =
                message;


            document.body.appendChild(
                popup
            );


            // Position popup near clicked button

            const rect =
                button.getBoundingClientRect();


            let top =
                rect.bottom + 8;


            let left =
                rect.left;


            // Prevent popup from going
            // outside the screen

            const popupWidth =
                300;


            if (
                left + popupWidth >
                window.innerWidth - 15
            ) {

                left =
                    window.innerWidth -
                    popupWidth -
                    15;

            }


            popup.style.top =
                `${top}px`;


            popup.style.left =
                `${left}px`;


            // Close when clicking elsewhere

            setTimeout(function () {

                document.addEventListener(
                    "click",
                    closePopup,
                    { once: true }
                );

            }, 10);


            function closePopup(event) {

                if (
                    !popup.contains(event.target) &&
                    event.target !== button
                ) {

                    popup.remove();

                }

            }

        }
    );

});



// =====================================================
// 3. FORM SUBMISSION
// =====================================================

form.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        // Make sure ratio is calculated
        // before sending the request

        calculateRatio();


        const formData =
            new FormData(form);


        const data = {};



        formData.forEach(
            function (value, key) {


                // Integer fields

                if (
                    key === "person_age" ||
                    key ===
                    "cb_person_cred_hist_length"
                ) {

                    data[key] =
                        parseInt(value, 10);

                }


                // Decimal fields

                else if (
                    key === "person_income" ||
                    key ===
                    "person_emp_length" ||
                    key === "loan_amnt" ||
                    key ===
                    "loan_int_rate" ||
                    key ===
                    "loan_percent_income"
                ) {

                    data[key] =
                        parseFloat(value);

                }


                // Text fields

                else {

                    data[key] =
                        value;

                }

            }
        );



        // Make sure ratio exists

        if (
            !data.loan_percent_income
        ) {

            result.className =
                "result error";


            result.innerHTML = `

                <h2>
                    Invalid Loan / Income Ratio
                </h2>

                <p class="sub">
                    Please enter a valid annual income
                    and loan amount.
                </p>

            `;


            result.classList.remove(
                "hidden"
            );


            return;

        }



        // =================================================
        // LOADING STATE
        // =================================================

        submitButton.disabled =
            true;


        buttonText.textContent =
            "Assessing...";


        spinner.classList.remove(
            "hidden"
        );


        result.classList.add(
            "hidden"
        );



        // =================================================
        // SEND REQUEST TO FASTAPI
        // =================================================

        try {


            const response =
                await fetch(
                    "/predict",
                    {

                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify(data)

                    }
                );



            const output =
                await response.json();



            // API error

            if (!response.ok) {

                throw new Error(
                    output.detail
                        ? JSON.stringify(
                            output.detail
                        )
                        : "Prediction failed."
                );

            }



            // =================================================
            // GET MODEL RESULT
            // =================================================

            const probability =
                Number(
                    output.default_probability
                ) * 100;


            const threshold =
                Number(
                    output.threshold
                ) * 100;


            const highRisk =
                output.default_prediction === 1;



            // =================================================
            // RESULT CARD
            // =================================================

            result.className =
                `result ${
                    highRisk
                        ? "high"
                        : "low"
                }`;


            result.innerHTML = `

                <h2>
                    ${
                        highRisk
                            ? "High Risk"
                            : "Low Risk"
                    }
                </h2>


                <p class="sub">

                    ${
                        highRisk
                            ? "The model indicates a higher likelihood of loan default."
                            : "The model indicates a lower likelihood of loan default."
                    }

                </p>


                <div class="metrics">


                    <div class="metric">

                        <small>
                            Default Probability
                        </small>

                        <strong>
                            ${probability.toFixed(2)}%
                        </strong>

                    </div>



                    <div class="metric">

                        <small>
                            Decision Threshold
                        </small>

                        <strong>
                            ${threshold.toFixed(2)}%
                        </strong>

                    </div>



                    <div class="metric">

                        <small>
                            Model Decision
                        </small>

                        <strong>

                            ${
                                highRisk
                                    ? "Default Risk"
                                    : "Lower Risk"
                            }

                        </strong>

                    </div>


                </div>

            `;


            // Show result

            result.classList.remove(
                "hidden"
            );


            // Scroll to result

            result.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });


        }


        catch (error) {


            // =================================================
            // ERROR
            // =================================================

            result.className =
                "result error";


            result.innerHTML = `

                <h2>
                    Prediction Error
                </h2>


                <p class="sub">
                    ${error.message}
                </p>

            `;


            result.classList.remove(
                "hidden"
            );

        }


        finally {


            // =================================================
            // RESET BUTTON
            // =================================================

            submitButton.disabled =
                false;


            buttonText.textContent =
                "Assess Credit Risk";


            spinner.classList.add(
                "hidden"
            );

        }

    }
);