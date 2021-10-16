const balance = document.querySelector(`#balance`)
const moneyPlus = document.querySelector(`#money-plus`)
const moneyMinus = document.querySelector(`#money-minus`)
const list = document.querySelector(`#list`)
const form = document.querySelector(`form`)
const text = document.querySelector(`#text`)
const amount = document.querySelector(`#amount`)

const storedItems = () =>{
    try{
      const storedExpense =  localStorage.getItem(`expense`)
      const parsedExpense = JSON.parse(storedExpense)
      return storedExpense ? parsedExpense : []
    } catch (e){
       return []
    }
}
let transactions = storedItems()


function createTransaction(id,text,amount){
      
     return new FakeTransactions(id,text,amount);
}
class FakeTransactions{
   constructor (id,text,amount){
       this.id = id,
       this.text = text,
       this.amount = amount
   }
}
const generateId = () => Math.floor(Math.random() * 100000)

const removeTransaction = (id) =>{
    transactions = transactions.filter(transaction => transaction.id !== id)
    localStorage.setItem(`expense`,JSON.stringify(transactions))
    return init()
 }


function addTransactionDom(transaction){
    //may have to scrape the object's 
    
    const sign = transaction.amount < 0 ? `-` : `+`;
    const item = document.createElement('li');
    //add class based on value
    item.classList.add(transaction.amount < 0 ? `minus` : `plus`);

    item.innerHTML = 
    `${transaction.text} <span>${sign} ${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>`;
    item.addEventListener(`click`,(e)=>{
        const delBtn = document.querySelectorAll(`.delete-btn`)
        if (e.target === delBtn){
            console.log(`clicked`)
        }
    })
    list.appendChild(item);
    
    
}

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



function init(){
    list.innerHTML = ``
    if (transactions){
        transactions.forEach(transaction => addTransactionDom(transaction))
        updateValue()
    }
    
}

init()

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


