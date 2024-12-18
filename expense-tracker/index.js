document.addEventListener('DOMContentLoaded', () => {
    const submitBtn = document.getElementById('submitBtn');
    const updateBtn = document.getElementById('updateBtn');
    const amountInput = document.getElementById('amountInput');
    const expenseCommentInput = document.getElementById('expenseCommentInput');
    const expenseList = document.getElementById('expenseList');
    const totalExpenses = document.getElementById('totalExpenses');
    let expenses = [];

    function renderExpenses() {
        expenseList.innerHTML = '';
        expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        
        const total = expenses?.reduce((acc, expense) => acc + expense.amount, 0);    
        totalExpenses.innerText = total;

        expenses?.forEach((expense, index) => {
            const li = document.createElement('li');
            li.classList.add('list-group-item', 'mb-2', "d-flex", "justify-content-between");
            li.innerHTML = `
                <span>
                    <span class="fw-bold">${index + 1}.  Rs.${expense.amount}</span>
                    <span class="fw-bold">${expense.comment}</span>  
                </span>
                <span class="dropdown dropstart">
                    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    </button>
                    <ul class="dropdown-menu">
                        <li class="mb-2 mt-2 px-2"><button class="w-100 btn btn-danger deleteBtn" data-action="delete" data-id="${expense.id}">Delete</button></li>
                        <li class="mb-2 px-2"><button class="w-100 btn btn-warning updateBtn" data-action="update" data-id="${expense.id}">Update</button></li>
                    </ul>
                </span>
            `;
            expenseList.appendChild(li);
        });
    }

    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if(amountInput.value == "" || expenseCommentInput.value == "") return;
        expenses.push({
            id: Date.now(),
            amount: Number.parseInt(amountInput.value),
            comment: expenseCommentInput.value,
        });

        localStorage.setItem('expenses', JSON.stringify(expenses));

        renderExpenses();
    });

    expenseList.addEventListener('click', (e) => {
        if(e.target.dataset.action === "delete") {
            expenses = expenses.filter((expense) => expense.id !== Number.parseInt(e.target.dataset.id));
            localStorage.setItem('expenses', JSON.stringify(expenses));
            renderExpenses();
        } else if(e.target.dataset.action === "update") {

            sessionStorage.setItem('updateId', e.target.dataset.id);

            const expense = expenses.find((expense) => expense.id == e.target.dataset.id);
            console.log(expense)
            amountInput.value = expense?.amount
            expenseCommentInput.value = expense?.comment;
            
            updateBtn.classList.add('show');
            updateBtn.classList.remove('hide');
        }
    });

    updateBtn.addEventListener('click', (e) => {
        e.preventDefault();
        update();
    })

    function update() {
        const id = Number.parseInt(sessionStorage.getItem('updateId'));
        const expense = expenses.find((expense) => expense.id === id);

        expense.amount = Number.parseInt(amountInput.value);
        expense.comment = expenseCommentInput.value;

        localStorage.setItem('expenses', JSON.stringify(expenses));
        renderExpenses();
        updateBtn.classList.remove('show');
        updateBtn.classList.add('hide');
        sessionStorage.removeItem('updateId');
    }

    renderExpenses();
})