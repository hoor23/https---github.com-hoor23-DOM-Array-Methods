const main = document.getElementById("main");
const addUserBtn=document.getElementById("add-user");
const doubleBtn= document.getElementById("double");
const showMillionaireBtn= document.getElementById("show-millionaires");
const sortBtn = document.getElementById("Sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];
// fetch random user and add money

async function getRandomUser()
{
    const res = await fetch('https://randomuser.me/api/');
    const data = await res.json();
    const user = data.results[0];

    const newUser = {
        name:`${user.name.first} ${user.name.last}` ,
        money: Math.floor(Math.random() * 1000000)
    };
    addData(newUser);
}
function addData(obj)
{
    data.push(obj);
    updateDom();
}
// double Mone
function doubleMoney()
{
    data= data.map((user)=>{
        return {...user, money:user.money*2};
    });
    updateDom();
}
// filter only millionaires
function showMillionaire()
{
data = data.filter((user)=>user.money>1000000);
updateDom();
}

//sorting function

function sortByRichest()
{
    data.sort((a,b)=>b.money-a.money);
    updateDom();
}

//calculate wealth
function calculateWealth()
{
    const wealth=data.reduce((accu, user)=>(accu+=user.money),0);
    const wealthElement= document.createElement('div');
wealthElement.innerHTML=`<h3>Total Wealth: <stron>${formatMoney(wealth)}</stron></h3>`;
main.appendChild(wealthElement);
}
function updateDom(providedData = data)
{
    //clear main div 
    main.innerHTML='<h2><strong>Person</strong>Wealth</h2>';
    providedData.forEach(items =>{
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML=`<strong>${items.name}</strong>${formatMoney(items.money)}`;
        main.appendChild(element);
    })
}

//format number as money

function formatMoney(number)
{
return `$` + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');  // 12,345.67

}

// add eventlistner
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click',doubleMoney);
showMillionaireBtn.addEventListener('click', showMillionaire);
sortBtn.addEventListener('click', sortByRichest);
calculateWealthBtn.addEventListener('click', calculateWealth);