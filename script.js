// script.js

// 當選擇工號時，自動填充對應的姓名(英文名)
document.getElementById('employee-id').addEventListener('input', function() {
    const selectedId = this.value;
    const matchingEmployee = employeeData.find(emp => emp['工號'].toString() === selectedId);
    if (matchingEmployee) {
        const nameWithEnglish = `${matchingEmployee['姓名']}(${matchingEmployee['英文名']})`;
        document.getElementById('employee-name').value = nameWithEnglish;
    } else {
        document.getElementById('employee-name').value = '';
    }
});

// 當選擇姓名(英文名)時，自動填充對應的工號
document.getElementById('employee-name').addEventListener('input', function() {
    const selectedName = this.value;
    const matchingEmployee = employeeData.find(emp => {
        const nameWithEnglish = `${emp['姓名']}(${emp['英文名']})`;
        return nameWithEnglish === selectedName;
    });
    if (matchingEmployee) {
        document.getElementById('employee-id').value = matchingEmployee['工號'];
    } else {
        document.getElementById('employee-id').value = '';
    }
});

// 按鈕功能：新增或修改表格內容
document.getElementById('customize-button').addEventListener('click', function() {
    const employeeId = document.getElementById('employee-id').value;
    const employeeName = document.getElementById('employee-name').value;
    const meal = document.getElementById('meal').value;
    const customization = document.getElementById('customization').value;

    if (employeeId && employeeName && meal && customization) {
        const table = document.getElementById('orders-table').getElementsByTagName('tbody')[0];
        let rowExists = false;
        
        // 檢查表格中是否已存在相同的工號和姓名
        for (let i = 0; i < table.rows.length; i++) {
            const row = table.rows[i];
            if (row.cells[0].textContent === employeeId && row.cells[1].textContent === employeeName) {
                row.cells[2].textContent = meal;
                row.cells[3].textContent = customization;
                rowExists = true;
                break;
            }
        }

        // 如果表格中不存在相同的工號和姓名，則新增一行
        if (!rowExists) {
            const newRow = table.insertRow();

            const cell1 = newRow.insertCell(0);
            const cell2 = newRow.insertCell(1);
            const cell3 = newRow.insertCell(2);
            const cell4 = newRow.insertCell(3);

            cell1.textContent = employeeId;
            cell2.textContent = employeeName;
            cell3.textContent = meal;
            cell4.textContent = customization;
        }
    } else {
        alert('請填寫所有選項');
    }
});
