let items = {
    pointer: {
        costs: 50,
        clicks: 1,
        level: 0
    },
    auto: {
        costs: 125,
        clicks: 1,
        level: 0
    },
    rocket: {
        costs: 150,
        clicks: 5,
        level: 0
    },
    moon: {
        costs: 600,
        clicks: 6,
        level: 0
    },
}
const costs = []
const score = document.querySelector(".score")
const upgrades = document.querySelectorAll('.upgrade')
let nofc = 1
let autoc = 0

function init() {
    setInterval(()=> {
        score.innerHTML = parseInt(score.innerHTML) + autoc
    },1000)
    for(const [key, value] of Object.entries(items)) {
        costs.push(value.costs)
    }
    console.log(costs)
}

function increamentScore() {
    score.innerHTML = parseInt(score.innerHTML) + nofc 
    showNumOfClicks()
    checkActivate()
    changeImage()
}

function showNumOfClicks(){
    console.log(event.clientX, event.clientY);
    const left = document.querySelector(".left")
    const div = document.createElement("div")
    div.innerText=`+${nofc}`
    div.style.position="absolute"
    div.style.top=event.clientY + "px"
    div.style.left=event.clientX + "px"
    div.draggable = false;
    div.classList.add('show-nofc')
    left.appendChild(div)

    setTimeout(()=> {
        left.removeChild(div)
    },900)
}

function upgrade(type) {
    let sc = parseInt(score.innerHTML)
    let level = event.currentTarget.querySelector('.level')
    switch(type) {
        case "pointer":
            if(sc >= items.pointer.costs) {
                score.innerHTML = sc - items.pointer.costs
                nofc += items.pointer.clicks
                items.pointer.level++
            }
            break;
        case "auto":
            if(sc >= items.auto.costs) {
                score.innerHTML = sc - items.auto.costs
                autoc += items.auto.clicks
                items.auto.level++
            }
            break;
        case "rocket":
            if(sc >= items.rocket.costs) {
                score.innerHTML = sc - items.rocket.costs
                nofc += items.rocket.clicks
                items.rocket.level++
            }
            break;
        case "moon":
            if(sc >= items.moon.costs) {
                score.innerHTML = sc - items.moon.costs
                autoc += items.moon.clicks
                items.moon.level++
            }
            break;
    }
    
    level.innerHTML = items[type].level
    checkActivate()
}

function checkActivate() {        
    for(let i = 0; i< upgrades.length; i++) {
        if(parseInt(score.innerHTML) >= costs[i]) {
            upgrades[i].classList.remove('invalid')
        }else upgrades[i].classList.add('invalid')
    }
}

function save() {
    const info = {
        ...items, 
        "scores": score.innerHTML,
        nofc,
        autoc
    }
    console.log(info)
    localStorage.setItem('clicker', JSON.stringify(info))
}

function load() {
    let loaded = localStorage.getItem('clicker') 
    if(loaded){
        items = JSON.parse(loaded)
        score.innerHTML = items.scores
        nofc = items.nofc
        autoc = items.autoc
        let i = 0
        const levels = document.querySelectorAll('.level')
        for(const [key, value] of Object.entries(items)) {
            if(Object.hasOwn(value, 'level'))
                levels[i++].innerHTML = value.level
        }
        checkActivate()
        changeImage()
    }
}

function changeImage() {
    let sc = parseInt(score.innerHTML)
    const img = document.querySelector('.clicker-image')
    if(sc <= 1000) {
        img.src="img/earth.png"
    } else if(sc<=2500) {
        img.src="img/mars.png"
    } else if(sc<=4000) {
        img.src="img/venus.png"
    } else {
        img.src="img/sun.png"
    }
}

init()
