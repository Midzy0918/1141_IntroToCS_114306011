var mathInput;
var englishInput;
var submitButton;
var tableBody;
var rowCount = 0; // 用於計數學生編號 (#)

// 在整個頁面載入完成後執行start
window.addEventListener("load", start, false);


function start() {
    mathInput = document.getElementById("math-grade");
    englishInput = document.getElementById("english-grade");
    submitButton = document.getElementById("submitBtn");
    tableBody = document.getElementById("table-body");

    submitButton.addEventListener("click", addGradeRow, false);

    updateColumnAverages();
}

// 函數：新增成績行
function addGradeRow() {

    var mathGrade = parseFloat(mathInput.value);
    var englishGrade = parseFloat(englishInput.value);

    if (isNaN(mathGrade) || isNaN(englishGrade) || mathGrade < 0 || englishGrade < 0 || mathGrade > 100 || englishGrade > 100) {
        alert("Please enter valid grades between 0 and 100 for both subjects.");
        return;
    }
    
    rowCount++; 

    // 計算平均成績 [cite: 253]
    var average = (mathGrade + englishGrade) / 2;

    // 創建新的表格行 (<tr>)
    var newRow = document.createElement("tr");

    // 創建並設定每個單元格的內容
    
    // # (序號)
    var numCell = document.createElement("td");
    numCell.textContent = rowCount;
    newRow.appendChild(numCell);
    
    // Math 成績
    var mathCell = document.createElement("td");
    mathCell.textContent = mathGrade;
    newRow.appendChild(mathCell);
    
    // English 成績
    var englishCell = document.createElement("td");
    englishCell.textContent = englishGrade;
    newRow.appendChild(englishCell);
    
    // Average 成績（四捨五入到兩位小數）
    var avgCell = document.createElement("td");
    avgCell.textContent = average.toFixed(2);
    newRow.appendChild(avgCell);

    // 將新行添加到表格主體中
    tableBody.appendChild(newRow);

    // 清空輸入框
    mathInput.value = "";
    englishInput.value = "";

    updateColumnAverages();
}

// 函數：計算並更新所有列的平均值
function updateColumnAverages() {
    var rows = tableBody.getElementsByTagName("tr");
    var totalRows = rows.length;

    var totalMath = 0;
    var totalEnglish = 0;
    var totalAverage = 0;
    
    // 檢查是否有數據行
    if (totalRows === 0) {
        // 如果沒有數據，所有平均值都設為 0
        document.getElementById("math-avg").textContent = "0.00";
        document.getElementById("english-avg").textContent = "0.00";
        document.getElementById("overall-avg").textContent = "0.00";
        return;
    }

    // 迴圈遍歷每一行成績 
    for (var i = 0; i < totalRows; i++) {
        // 獲取該行的所有單元格 (td)
        var cells = rows[i].getElementsByTagName("td");

        var math = parseFloat(cells[1].textContent);
        var english = parseFloat(cells[2].textContent);
        var average = parseFloat(cells[3].textContent);

        totalMath += math;
        totalEnglish += english;
        totalAverage += average;
    }

    // 計算列平均值（四捨五入到兩位小數）
    var mathAvg = totalMath / totalRows;
    var englishAvg = totalEnglish / totalRows;
    
    // 計算總平均值：用 (各科平均之平均) = (mathAvg + englishAvg) / 2
    var overallAvg = (mathAvg + englishAvg) / 2;
    

    document.getElementById("math-avg").textContent = mathAvg.toFixed(2);
    document.getElementById("english-avg").textContent = englishAvg.toFixed(2);
    document.getElementById("overall-avg").textContent = overallAvg.toFixed(2);
}