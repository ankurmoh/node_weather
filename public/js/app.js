//console.log('Client side JAVASCRIPT file is loaded!')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

const weather_form = document.querySelector('form')
const search_elem = document.querySelector('input')
const mesg_1 = document.querySelector('#message-1')
const mesg_2 = document.querySelector('#message-2')
//mesg_1.textContent = ''

weather_form.addEventListener('submit', (e) => {

    e.preventDefault()
    const loc = search_elem.value

    mesg_1.textContent = 'Loading...'
    mesg_2.textContent = ''

    fetch('/weather?address=' + loc).then((response) => {
    response.json().then((data) => {
        if (data.error)
        {
            //console.log(data.error)
            mesg_1.textContent = data.error
        }
        else{
            //console.log(data.location)
            //console.log(data.forecast)
            mesg_1.textContent = data.location
            mesg_2.textContent = data.forecast
        }
    })
})
    console.log(loc)
})