let editIndex = null; 

    
    document.addEventListener('DOMContentLoaded', loadExpenses);

    function submitHandler(event) {
        event.preventDefault(); 
         console.log("working");
        const expenseAmount = document.getElementById('expenseAmount').value;
        const expenseName = document.getElementById('expenseName').value;
        const expenseCategory = document.getElementById('expenseCategory').value;

        if (expenseAmount && expenseName && expenseCategory) {
            const expense = {
                amount: expenseAmount,
                name: expenseName,
                category: expenseCategory
            };

            if (editIndex !== null) {
               
                updateExpenseInLocalStorage(expense);
                editIndex = null;
                document.getElementById('submitButton').textContent = 'Submit'; 
            } else {
                
                saveExpenseToLocalStorage(expense);
            }

        
            loadExpenses();
            document.getElementById('formone').reset();
        } else {
            alert('Please fill out all fields!');
        }
    }

    function saveExpenseToLocalStorage(expense) {
        let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        expenses.push(expense);
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }

    function loadExpenses() {
        const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        const list = document.getElementById('toShow');
        list.innerHTML = ''; 

        expenses.forEach((expense, index) => {
            addExpenseToList(expense, index);
        });
    }

    function addExpenseToList(expense, index) {
        const list = document.getElementById('toShow');

        const expenseItem = document.createElement('li');
        expenseItem.setAttribute("className","ok");
        expenseItem.innerHTML = `
            Amount: ${expense.amount}, Name: ${expense.name}, Category: ${expense.category}
            <span class="cp">
            <button onclick="editExpense(${index})" class="op">Edit</button>
            <button onclick="deleteExpense(${index})" class="op">Delete</button>
            </span>
        `;

        list.appendChild(expenseItem);
    }

    function editExpense(index) {
        const expenses = JSON.parse(localStorage.getItem('expenses')) || [];

        
        const expense = expenses[index];
        document.getElementById('expenseAmount').value = expense.amount;
        document.getElementById('expenseName').value = expense.name;
        document.getElementById('expenseCategory').value = expense.category;

        editIndex = index; 
        document.getElementById('submitButton').textContent = 'Update'; 
        
    }

    function updateExpenseInLocalStorage(expense) {
        let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

      
        expenses[editIndex] = expense;

        
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }

    function deleteExpense(index) {
        let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

        
        expenses.splice(index, 1);

        
        localStorage.setItem('expenses', JSON.stringify(expenses));

       
        loadExpenses(); }