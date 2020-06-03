const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')
const geocode = require('./geocode')
const forecast = require('./forecast')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const publicpath = path.join(__dirname, '../public')
const viewpath = path.join(__dirname,'../templates/views')
const partialpath = path.join(__dirname,'../templates/partials')

//hbs - handlebars -> to create dynamic pages
app.set('view engine', 'hbs')
app.set('views', viewpath)
hbs.registerPartials(partialpath)

app.use(express.static(publicpath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name : 'Ankur'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me!',
        name : 'Ankur'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page!',
        name: 'Ankur',
        helptext : 'This is some help text'
    })
})
//render HTML
// app.get('', (req, res) => {

//     res.send('<h1>Hello Express</h1>')
// })


//render JSON
// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Ankur',
//         age : 25
//     },
//     {
//         name : 'Eva',
//         age  : 23
//     }])
// })

// app.get('/about', (req, res) => {
//     res.send('About page')
// })


app.get('/weather', (req, res) => {
    if(!req.query.address)
    {
        return res.send({
            error: 'You must provide an addresss'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
            if(error)
            {
                return res.send({error})
            }
            forecast(latitude, longitude, (error, forecastData) => {
                if(error)
                {
                    return res.send({error})
                }
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
            })
    })
    // res.send({
    //     forecast : 'It is snowing',
    //     location : 'Philadelphia',
    //     address : req.query.address
    // })
})

//query -> query string in the URL
app.get('/products', (req, res) => {
    if (!req.query.search)
    {
        return res.send({
            error: 'You must provide a search term!'
        })
    }
    console.log(res.query.search)
    res.send({
        products : []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title : '404_Help',
        name : 'Ankur',
        errormessage : 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title : '404',
        name : 'Ankur',
        errormessage : 'Page not found!'
    })
})

//3000 -> default development port
app.listen(3000, () => {
    console.log('Server started on port 3000')
})

