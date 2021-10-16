//variable declatations and DOM querySelectors
const balance = document.querySelector(`#balance`)
const moneyPlus = document.querySelector(`#money-plus`)
const moneyMinus = document.querySelector(`#money-minus`)
const list = document.querySelector(`#list`)
const form = document.querySelector(`form`)
const text = document.querySelector(`#text`)
const amount = document.querySelector(`#amount`)
//Local storage try catch block to help data persist
const storedItems = () =>{
    try{
      const storedExpense =  localStorage.getItem(`expense`)
      const parsedExpense = JSON.parse(storedExpense)
      return storedExpense ? parsedExpense : []
    } catch (e){
       return []
    }
}
//stores LS conditional in a let variable 
let transactions = storedItems()
//Little bit of OOP creates classes of transaction 
class FakeTransactions{
    constructor (id,text,amount){
        this.id = id,
        this.text = text,
        this.amount = amount
    }
 }
//Function which calls constructor when needed      
const createTransaction = (id,text,amount)=>{
      
     return new FakeTransactions(id,text,amount);
}
//Generates a random number for ID
const generateId = () => Math.floor(Math.random() * 100000)
//removes element from DOM if filter Bool is met, sets in LS and calls init function
const removeTransaction = (id) =>{
    transactions = transactions.filter(transaction => transaction.id !== id)
    localStorage.setItem(`expense`,JSON.stringify(transactions))
    return init()
 }

//Adds DOM el
function addTransactionDom(transaction){
    //helps clarify to user if expense or income    
    const sign = transaction.amount < 0 ? `-` : `+`;
    const item = document.createElement('li');
    //add class based on value
    item.classList.add(transaction.amount < 0 ? `minus` : `plus`);
    //format HTML of Li el
    item.innerHTML = 
    `${transaction.text} <span>${sign} ${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>`;
    //append item
    list.appendChild(item);
    
    
}
//updates DOM el according to transation array content
const updateValue = ()=>{
    const amounts = transactions.map(transaction => transaction.amount)
    const total = amounts.reduce((acc,item)=>(acc += item), 0)
    .toFixed(2);
    
    const income = amounts
    .filter(item=>item > 0)
    .reduce((acc,item)=>(acc+=item),0)
    .toFixed(2)

    const expense = amounts
    .filter(item=>item < 0)
    .reduce((acc,item,)=>(acc-=item),0) * -1
    
    console.log(transactions,amounts,income,expense)

    balance.innerHTML =`€${total}`
    moneyMinus.innerHTML = `€${expense}`
    moneyPlus.innerHTML = `€${income}`

}


//Initialises app and updates DOM
function init(){
    list.innerHTML = ``
    if (transactions){
        transactions.forEach(transaction => addTransactionDom(transaction))
        updateValue()
    }
    
}

init()

//Input data added to DOM and normalised, LS array edited
form.addEventListener(`submit`,(e)=>{
    e.preventDefault()
    if ((amount.value.trim() || text.value.trim()) === ``){
        alert(`Please fill in all fields`)
    } else{
       const newTransac = createTransaction(generateId(),text.value.trim(),parseInt(amount.value.trim()))
       transactions.push(newTransac)    
       localStorage.setItem(`expense`,JSON.stringify(transactions))

  
       return init()    
    }   
})


