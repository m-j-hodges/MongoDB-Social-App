
const router = require('express').Router();
const Thoughts = require('../models/thoughts');
const thoughts = require('../models/thoughts')


//get all thoughts
router.get('/', (req,res) => {

const allThoughts = thoughts.find({},(err, result) => {
  if(err) {console.log(err)}
  else(res.json({result}))

});

})

router.get('/:id', (req,res) => {
const selectedItem = req.params.id 

const newResult = Thoughts.find({_id: selectedItem}, (err, result) => {
  err ? console.log(err) : res.json({result})

})

})

//create a single thought.
router.post('/', async (req, res) => {
  const newThought = await thoughts.create({content: req.body.content, user: req.body.user}, (err, result) => {
    if(err) {
      res.status(500).json({message: `There was an error: ${err}`})
    } else {
      res.json({message: `Your thought was successfully created. ${result}`})
    }

  })
  

})
//create many thoughts using this route.
router.post('/manyThoughts', (req, res) => {
  const manyThoughts = req.body.thoughts

  Thoughts.insertMany(manyThoughts, (err, result) => {
    if(err) { console.log(err)
    res.json({message: 'There was an error inserting your documents.'})
    } else { res.json({message: 'Successfully created documents.', result})}
  })

})
//update a single thought
router.put('/', async (req,res) => {

  if(req.body.content) {
  const newDoc = Thoughts.findOneAndUpdate({_id: req.body.id}, {content: req.body.content}, {new: true}, (err, result) => 
  {
  if(err) {console.log(err)}
  else {
  console.log(result)
  res.json(result)
}})

  } else if (req.body.content && req.body.newId) {
    //a newId property needs to be provided by the client.
    Thoughts.findOneAndUpdate({_id: req.body.id}, {$set: {_id: req.body.newId, content: req.body.content }}, {new: true})

  } else {res.json({message: 'Please provide new content for the thought, and newId if applicable.'})}

})

router.delete('/', (req,res) => {
  const selectedItem = req.body.id
  
  Thoughts.deleteOne({_id: selectedItem}, (err, result) => {
    if(err) {
      console.log(err)
      res.json({message: "There was an error deleting this thought ID."})
    } 
    else { res.json({message: 'Item successfully deleted.', result})}

  } )


})


module.exports = router;