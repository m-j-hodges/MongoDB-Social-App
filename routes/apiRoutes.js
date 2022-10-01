const router = require('express').Router();

const Thought = require('../models/thoughts')
const reactions = require('../models/reactions')


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


module.exports = router;