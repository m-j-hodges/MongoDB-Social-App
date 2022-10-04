const router = require("express").Router();
const mongoose = require('mongoose')
const User = require('../models/users')

router.post('/', (req,res) => {
//according to model, body must include user name, username, email, and password
  const newUser = req.body

const createNewUser = User.create([{name: req.body.name, username: req.body.username, email: req.body.email, password: req.body.password }], (err, result) => 
{
 if(err) {
  console.log(err)
  res.json({message: 'There was an error creating this user. Please provide user, username, email, and password'}, err)

 } else { console.log(result)
res.json({message: "user created!", result})
}

})


})
//end of previous route
//get all users
router.get('/',  (req, res)=> {
  const allUsers = User.find({}, (err, result) => {
    if(err) {
      console.log(err)
      res.status(500).json({message: 'There was an error processing your request.', err})
    } else {console.log("successfully got users.")
    res.json({result})
  }
  })
})
//end of previous route.
//get Single user
router.get('/:id', (req,res) => {
  const selectedUser = req.params.id
  User.findOne({_id: selectedUser}, (err, result) => {
    if(err) {
      console.log(err);
      res.json({message: 'There was an error finding this id.'})
    } else {
      console.log('User found by _id.')
      res.json({result})}
  })

})

//put route
router.put('/:id', (req,res) => {
  const selectedUser = req.params.id
User.findOneAndUpdate({_id: req.params.id}, {name: req.body.name, username: req.body.username, email: req.body.email, password: req.body.password}, {new:true}, (err, result) => {
  if(err) {console.log(err)
  res.status(500).json({message: 'There was an error updating your record', err})
  }
  else { res.json({message: 'your record was updated successfully.', result})}

})

})

//end of previous route.

//delete one user route
router.delete('/:id', (req,res) => {
  const deleteUser = req.params.id
  User.findOneAndDelete({_id: deleteUser}, (err, result) => {
    if(err) { console.log(err)
    res.json({message: 'There was an error deleting this user by ID.', err})
    }
    else { console.log('user successfully deleted.')
    res.json({message: 'Selected User deleted', result})
  }
  })


})




module.exports = router;
