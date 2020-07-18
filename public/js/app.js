//console.log('Client side js file is loaded!');

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     //console.log(response)
//     response.json().then((data) => {
//         console.log(data)
//     })
// })



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit', (e) => {
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    e.preventDefault()
    const location = search.value
    //console.log(location)
    fetch('/weather?address='+ location).then((response) => {
    //console.log(response)
    response.json().then((data) => {
        //console.log(data)
        if (data.error) {
            messageOne.textContent = data.error
        }
        else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
    }
    )
}
)
})