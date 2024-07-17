var accounts = [
    { name: "Hugo", balance: 500, password: "1234" },
    { name: "Paco", balance: 700, password: "5678" },
    { name: "Luis", balance: 800, password: "6816" }
];

var currentAccount = null;

function login() {
    var accountIndex = document.getElementById("account").value;
    var password = document.getElementById("password").value;
    var loginMessage = document.getElementById("login-message");

    if (accounts[accountIndex].password === password) {
        currentAccount = accounts[accountIndex];
        document.getElementById("account-selection").style.display = "none";
        document.getElementById("actions").style.display = "block";
        loginMessage.textContent = "";
    } else {
        loginMessage.textContent = "Incorrect password. Please try again.";
    }
}

function logout() {
    currentAccount = null;
    document.getElementById("account-selection").style.display = "block";
    document.getElementById("actions").style.display = "none";
    document.getElementById("balance").style.display = "none";
    document.getElementById("transaction").style.display = "none";
    document.getElementById("login-message").textContent = "";
    document.getElementById("password").value = "";
}

function checkBalance() {
    document.getElementById("balance").textContent = "Current Balance: $" + currentAccount.balance;
    document.getElementById("balance").style.display = "block";
    document.getElementById("transaction").style.display = "none";
}

function showDeposit() {
    document.getElementById("balance").style.display = "none";
    document.getElementById("transaction").style.display = "block";
    document.getElementById("amount").value = "";
    document.getElementById("transaction-message").textContent = "";
    document.getElementById("transaction").setAttribute("data-type", "deposit");
}

function showWithdraw() {
    document.getElementById("balance").style.display = "none";
    document.getElementById("transaction").style.display = "block";
    document.getElementById("amount").value = "";
    document.getElementById("transaction-message").textContent = "";
    document.getElementById("transaction").setAttribute("data-type", "withdraw");
}

function performTransaction() {
    var amount = parseInt(document.getElementById("amount").value);
    var transactionType = document.getElementById("transaction").getAttribute("data-type");
    var transactionMessage = document.getElementById("transaction-message");

    if (isNaN(amount) || amount <= 0) {
        transactionMessage.textContent = "Please enter a valid amount.";
        return;
    }

    if (transactionType === "deposit") {
        if (currentAccount.balance + amount > 990) {
            transactionMessage.textContent = "Cannot deposit. Balance cannot exceed $990.";
        } else {
            currentAccount.balance += amount;
            transactionMessage.textContent = "Deposited: $" + amount + ". New Balance: $" + currentAccount.balance;
        }
    } else if (transactionType === "withdraw") {
        if (currentAccount.balance - amount < 10) {
            transactionMessage.textContent = "Cannot withdraw. Balance cannot be less than $10.";
        } else {
            currentAccount.balance -= amount;
            transactionMessage.textContent = "Withdrawn: $" + amount + ". New Balance: $" + currentAccount.balance;
        }
    }
}
