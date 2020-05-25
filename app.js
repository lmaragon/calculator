const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const display = document.querySelector('.display');
const clear_display = document.querySelector('.reset');
const equals = document.querySelector('.enter');

let nums = [];
// let ops = [];

const add = (a, b) => {
    return a + b;
}

const subtract = (a, b) => {
    return a - b;
}

const multiply = (a, b) => {
    return a * b;
}

const divide = (a, b) => {
    return a / b;
}

const operate = (func, a, b) => {
    return func(a, b);
}

const clear = () => {
    display.innerHTML = "";
    nums = [];
    ops = [];
}

const eval = (n) => {

    console.log(n);

    idx = n.findIndex((el) => { return el == "x" || el == "/"; });

    while(idx != -1){
        if(n[idx] == "x"){
            n.splice(idx-1, 3, operate(multiply, n[idx-1], n[idx+1]));
        }else{
            if(n[idx+1] == 0){
                clear();
                return "Can't divide by 0!";
            }
            n.splice(idx-1, 3, operate(divide, n[idx-1], n[idx+1]));
        }
        idx = n.findIndex((el) => { return el == "x" || el == "/"; });
        console.log(n);
    }

    idx2 = n.findIndex((el) => { return el == "+" || el == "-"; });

    while(idx2 != -1){
        if(n[idx2] == "+"){
            n.splice(idx2-1, 3, operate(add, n[idx2-1], n[idx2+1]));
        }else{
            n.splice(idx2-1, 3, operate(subtract, n[idx2-1], n[idx2+1]));
        }
        idx2 = n.findIndex((el) => { return el == "+" || el == "-"; });
        console.log(n);
    }

    return n[0];
}

numbers.forEach((n) => {
    n.addEventListener("click", (e) => {
        display.innerHTML += e.target.innerText
    });
});

operators.forEach((o) => {
    o.addEventListener("click", (e) => {
        nums.push(parseInt(display.innerText));
        nums.push(e.target.innerText);
        display.innerHTML = "";
    });
});

equals.addEventListener("click", () => {
    nums.push(parseInt(display.innerText));
    display.innerHTML = eval(nums);
})

clear_display.addEventListener("click", () => {
    clear();
});