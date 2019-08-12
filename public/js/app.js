console.log('Client side javascript file is loaded!');



const weatherFrom = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

// messageOne.textContent = '';

weatherFrom.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const location = search.value;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch('http://192.168.1.152:3004/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            messageOne.textContent = data.error;
        } else {
            messageOne.textContent = data.address;
            messageTwo.textContent = data.forecast;
        }

        });
    });
});