const router = require('express').Router();

const Thought = require('../models/thoughts')
const reactions = require('../models/reactions')
const User = require('../models/users')
const friend = require('../models/friends')


router.post('/reaction', async (req,res) => {
  const userReaction = req.body.username
  const findThought = req.body.thoughtId 

// client needs to provide a reactionCount, reactionContent, and thoughtId in the body.
const newReaction = await reactions.create([{reactionCount: req.body.reactionCount, reactionContent: req.body.reactionContent}], {lean: true})
    
Thought.findOneAndUpdate({_id: req.body.thoughtId}, {$addToSet: {reactions: newReaction[0]._id}}, (err, result) => {
      if(err) {
        console.log(err)
        res.status(500).json({message: 'There was an error completing this request.'})
      } else {
        console.log('reaction updated succesfully.')
        res.json({message: 'Your reaction has been added.', result})}
      }
    )

})

//delete a reaction to a thought
//client needs to provide a thoughtId and reaction
router.delete('/deleteReaction', (req,res)=> {
  const findThought = Thought.findOneAndUpdate({_id: req.body.thoughtId}, {$unset: {reactions: ''}}, {new: true}, (err, result) => {
    err ? console.log(err) : res.json({message: 'record updated',result});

    }

  )

})


//add a friend
router.post('/addFriend', async (req,res) => {
  const friendName = req.body.friendName
  const friendEmail = req.body.friendEmail
  const friendUserName = req.body.friendUserName
let createFriend
let newFriend
  const findFriend = await friend.findOne({email: friendEmail})
  

if(findFriend == null) {
  createFriend = await friend.create([{name: friendName, email:friendEmail, username: friendUserName}])
  newFriend = createFriend[0]._doc
  }
if(findFriend) {
  const newfriend = findFriend[0]._doc
  }
  const addFriend = User.findOneAndUpdate({_id:req.body.id}, {$addToSet: {friends: {_id:newFriend._id, email: newFriend.email, name: newFriend.name, username: newFriend.username}}}, {new:true}, (err, result)=> {
      if(err) {console.log(err)}
      else {}
  })
  const findUser = User.findOne({_id: req.body.id }, {new: true}).populate('friends').exec((err, result) => {
    if(err) {console.log(err)}
    const foundUser = result
    res.json({message: `New Friend created and added to ${req.body.id}`, result})
    console.log(result)
  })
})


//delete a friend. 

router.delete('/removeFriend', async (req,res) => {
  const selectUser = req.body.userId
  const selectFriend = req.body.id

 const findFriend = await User.updateOne({_id: selectUser}, {
  $pull: {
    friends: selectFriend
  }

 })

 if(findFriend) {
  res.json({message:'friend has been removed.', findFriend})

 }


})

module.exports = router;