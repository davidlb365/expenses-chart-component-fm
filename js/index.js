const chartList = document.querySelectorAll('.grid__chart')
const root = document.querySelector(':root')
const height = parseFloat(getComputedStyle(root).getPropertyValue('--bar-height'))

window.addEventListener('DOMContentLoaded', readJSON)

async function readJSON() {
    try {
        const res = await fetch('./data.json')
        const data = await res.json()
        let max = 0;
        data.forEach(elem => {
            const {amount} = elem
            if(max < amount) max = amount
        })
        let dictionary = Object.assign({}, ...data.map((x) => ({[x.day]: x.amount})));
        const array = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
        const currentDay = array[new Date().getDay()]
        chartList.forEach(chart => {
            const bar = chart.querySelector('.grid__bar')
            const day = chart.querySelector('.grid__text').textContent
            chart.querySelector('.popup')
            const finalHeight = parseFloat((height * dictionary[day]) / max).toFixed(2)
            bar.style.setProperty('height', `${finalHeight}rem`)
            chart.querySelector('.popup').textContent = `$${dictionary[day]}`
            const array = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
            if(currentDay === day) bar.classList.add('grid__bar--current')
        })
    } catch (error) {
        console.log(error)
    }
}