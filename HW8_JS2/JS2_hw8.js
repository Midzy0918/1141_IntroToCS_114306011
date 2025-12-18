// 1. 指定的四則運算獨立函數
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    // 4. 檢查除數是否為零
    if (b === 0) {
        return "Error (Div by 0)";
    }
    return a / b;
}

// 2. 主計算函數
function calculate() {
    // 使用 getElementById 獲取使用者輸入
    const num1 = parseFloat(document.getElementById("num1").value);
    const num2 = parseFloat(document.getElementById("num2").value);
    const op = document.getElementById("operator").value;
    const display = document.getElementById("resultDisplay");

    // 檢查輸入是否為有效數字
    if (isNaN(num1) || isNaN(num2)) {
        display.innerHTML = "請輸入有效數字";
        return;
    }

    let finalResult;

    // 依據下拉選單判斷執行的函數
    switch (op) {
        case "+":
            finalResult = add(num1, num2);
            break;
        case "-":
            finalResult = subtract(num1, num2);
            break;
        case "*":
            finalResult = multiply(num1, num2);
            break;
        case "/":
            finalResult = divide(num1, num2);
            break;
        default:
            finalResult = 0;
    }

    // 5. 顯示結果並四捨五入至小數點後 2 位
    if (typeof finalResult === "number") {
        display.innerHTML = "Result = " + finalResult.toFixed(2);
    } else {
        display.innerHTML = finalResult; // 顯示錯誤訊息 (如除以零)
    }
}