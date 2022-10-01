const mongoose = require('mongoose');


const Thoughts = require('../models/thoughts')


function seedThoughts() {
  const thoughtData = [{
    content: 'Javascript is awesome.', user: "633630b62efb1576c35468b9"},
    {content: 'Learning NodeJS is tough.', user: "633630b62efb1576c35468ba"},
    {content:'The internet is built on Javascript', user: '633630b62efb1576c35468ba'},
    {content: 'React is a very useful tool.', user: '633630b62efb1576c35468bb'}
  ]

Thoughts.insertMany(thoughtData, (err, result) => {
  if(err) {console.log(err)}
  else {console.log(`data seeded successfully ${result}`)}
})

}

module.exports = seedThoughts;