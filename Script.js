// Define the database tables and challenges  
const databaseTables = {  
  customers: {  
   challenges: [  
    {  
      query: "SELECT * FROM customers WHERE country='USA'",  
      answer: "SELECT * FROM customers WHERE country='USA'"  
    },  
    {  
      query: "SELECT * FROM customers WHERE age>30",  
      answer: "SELECT * FROM customers WHERE age>30"  
    },  
    // Add more challenges here  
   ]  
  },  
  orders: {  
   challenges: [  
    {  
      query: "SELECT * FROM orders WHERE total_amount>100",  
      answer: "SELECT * FROM orders WHERE total_amount>100"  
    },  
    {  
      query: "SELECT * FROM orders WHERE order_date>'2020-01-01'",  
      answer: "SELECT * FROM orders WHERE order_date>'2020-01-01'"  
    },  
    // Add more challenges here  
   ]  
  },  
  products: {  
   challenges: [  
    {  
      query: "SELECT * FROM products WHERE category='Electronics'",  
      answer: "SELECT * FROM products WHERE category='Electronics'"  
    },  
    {  
      query: "SELECT * FROM products WHERE price<50",  
      answer: "SELECT * FROM products WHERE price<50"  
    },  
    // Add more challenges here  
   ]  
  },  
  employees: {  
   challenges: [  
    {  
      query: "SELECT * FROM employees WHERE department='Sales'",  
      answer: "SELECT * FROM employees WHERE department='Sales'"  
    },  
    {  
      query: "SELECT * FROM employees WHERE salary>50000",  
      answer: "SELECT * FROM employees WHERE salary>50000"  
    },  
    // Add more challenges here  
   ]  
  },  
  sales: {  
   challenges: [  
    {  
      query: "SELECT * FROM sales WHERE sales_date>'2020-01-01'",  
      answer: "SELECT * FROM sales WHERE sales_date>'2020-01-01'"  
    },  
    {  
      query: "SELECT * FROM sales WHERE sales_amount>1000",  
      answer: "SELECT * FROM sales WHERE sales_amount>1000"  
    },  
    // Add more challenges here  
   ]  
  }  
};  
  
// Get the query builder elements  
const tableSelect = document.getElementById('table');  
const columnSelect = document.getElementById('columns');  
const conditionSelect = document.getElementById('condition');  
const valueInput = document.getElementById('value');  
const addConditionButton = document.getElementById('add-condition');  
const executeQueryButton = document.getElementById('execute-query');  
  
// Initialize the query object  
let query = {  
  table: '',  
  columns: [],  
  conditions: []  
};  
  
// Function to handle table selection  
function handleTableSelection(event) {  
  query.table = event.target.value;  
  renderColumns();  
}  
  
// Function to handle column selection  
function handleColumnSelection(event) {  
  query.columns = Array.from(event.target.selectedOptions).map(option => option.value);  
}  
  
// Function to handle condition selection  
function handleConditionSelection(event) {  
  const condition = event.target.value;  
  query.conditions.push({  
   condition,  
   value: valueInput.value  
  });  
  valueInput.value = '';  
}  
  
// Function to handle add condition button click  
function handleAddConditionClick(event) {  
  handleConditionSelection(event);  
  renderQuery();  
}  
  
// Function to handle execute query button click  
function handleExecuteQueryClick(event) {  
  const queryString = generateQueryString(query);  
  // Execute the query and display the results  
  console.log(queryString);  
}  
  
// Function to generate the query string  
function generateQueryString(query) {  
  const queryString = `SELECT ${query.columns.join(', ')} FROM ${query.table}`;  
  if (query.conditions.length > 0) {  
   queryString += ` WHERE ${query.conditions.map(condition => `${condition.condition} ${condition.value}`).join(' AND ')}`;  
  }  
  return queryString;  
}  
  
// Function to render the query  
function renderQuery() {  
  const queryElement = document.getElementById('query');  
  queryElement.innerText = generateQueryString(query);  
}  
  
// Function to render the columns  
function renderColumns() {  
  const columns = databaseTables[query.table].columns;  
  columnSelect.innerHTML = '';  
  columns.forEach(column => {  
   const option = document.createElement('option');  
   option.value = column;  
   option.text = column;  
   columnSelect.appendChild(option);  
  });  
}  
  
// Add event listeners  
tableSelect.addEventListener('change', handleTableSelection);  
columnSelect.addEventListener('change', handleColumnSelection);  
conditionSelect.addEventListener('change', handleConditionSelection);  
addConditionButton.addEventListener('click', handleAddConditionClick);  
executeQueryButton.addEventListener('click', handleExecuteQueryClick);  
  
// Render the columns for the default table  
renderColumns();
