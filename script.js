window.addEventListener("load", function () {
    let plength = prompt("How many characters long do you want your password to be?");

    while (plength < 8 || plength > 128) {
        plength = prompt("Password length must be 8-128 characters. Try again.");
    }

    let yesUpper = confirm("Include uppercase letters?");
    let yesLower = confirm("Include lowercase letters?");
    let yesNumber = confirm("Include numbers?");
    let yesSymbol = confirm("Include special characters?");

    while (!(yesUpper || yesLower || yesNumber || yesSymbol)) {
        alert("You must select at least one character type.");

        yesUpper = confirm("Include uppercase letters?");
        yesLower = confirm("Include lowercase letters?");
        yesNumber = confirm("Include numbers?");
        yesSymbol = confirm("Include special characters?");
    }

    //DOM elements - replaced Assignment Code with following
    const resultEl = document.getElementById("password");

    document.getElementById("generate").addEventListener("click", () => {
        resultEl.value = generatePassword(yesLower, yesUpper, yesNumber, yesSymbol, plength);
    });
    
    //  cleaned up here

    if (!password) {
        return;
    }

    // create random function
    const randomFunc = {
        lower: getRandomLower,
        upper: getRandomUpper,
        number: getRandomNumber,
        symbol: getRandomSymbol
    };

    // create generate password function

    function generatePassword(lower, upper, number, symbol, length) {
        let generatedPassword = "";
        const typesCount = lower + upper + number + symbol;
        const typesArr = [{
            lower
        }, {
            upper
        }, {
            number
        }, {
            symbol
        }].filter(item => Object.values(item)[0]);

        // creating for loop
        for (let i = 0; i < length; i += typesCount) {
            typesArr.forEach(type => {
                const funcName = Object.keys(type)[0];
                generatedPassword += randomFunc[funcName]();
            });
        }

        // using slice here to pick random character
        const finalPassword = generatedPassword.slice(0, length);

        return finalPassword;
    }

    // strings for each character type

    function getRandomLower() {
        return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
    }

    function getRandomUpper() {
        return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
    }

    function getRandomNumber() {
        return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
    }

    function getRandomSymbol() {
        const symbol = "!@#$%^&*()_{}[]-=<>/,.";
        return symbol[Math.floor(Math.random() * symbols.length)];
    }
})