console.log('client side java script file is loaded')

// fetch('http://localhost:3000/weather?address=boston').then((response) => {
//     response.json().then((error, {data} = {}) =>{
//         if (error) {
//             return console.log(error)
//         }
//         else
//         console.log(response.body.location)
//         console.log(response.body.forecast)
//     })
// })



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

//messageOne.textContent ='From Javascript'

weatherForm.addEventListener('submit', (e) => {
    
    e.preventDefault()

    messageOne.textContent ='Loading'
    messageOne.textContent =' '

    const location = search.value
    fetch('/weather?address=' + location).then((response) => {
    response.json().then((data = {}) =>{
        if (data.error) {
            return messageOne.textContent = data.error
        }
        else
        messageTwo.textContent = data.location + ' ' + data.forecast
    })
})
    console.log(location)
})