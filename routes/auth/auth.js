const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const users = require('../../models/user');

router.get("/", (req, res) => {
  res.send("auth's Route");
});

/*
*Middleware Function, which will first execute on api call
 */

const validateUserDetails = (req, res, next) => {
  if(req.body.length < 1){
    next();
  }
  else{
    res.status(400).json({
      status:'failed',message:'please send data'
    })
  }
}

/**
 *  Create Operation
 */
router.post("/users/create", validateUserDetails, (req, res) => {

  const user = new users({
    _id: new mongoose.Types.ObjectId,
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email
  });

  user.save().then(value => {
    res.status(200).json({status:'success',data:value});
  }).catch(error => {
    res.status(400).json({status:'failed',message:error});
  })

})

/**
 *  Read Operation
 */
router.get("/users", (req,res) => {
  users.find().then(value => {
    res.status(200).json({status:'success',data:value});
  }).catch(error => {
    res.status(400).json({status:'failed',message:error});
  })
})

/**
 *  Read One Operation
 */
router.get("/users/id/:id", (req,res) => {
  const id = req.params.id;
  users.findById(id).then(value => {
    res.status(200).json({status:'success',data:value});
  }).catch(error => {
    res.status(400).json({status:'failed',message:error});
  })
})

/**
 *  Delete Operation
 */
router.delete("/users/id/:id", (req, res) => {
  const id = req.params.id;
  users.deleteOne({_id:id}).then(value => {
    res.status(200).json({status:'success',data:value});
  }).catch(error => {
    res.status(400).json({status:'failed',message:error});
  });
});

/**
 *  Update Operation
 */
router.patch("/users/id/:id", (req, res) => {
  const id = req.params.id;
  const updateOps = req.body;

    users.updateOne({_id:id},{ $set: updateOps }).then(value => {
      res.status(200).json({status:'success',data:value});
    }).catch(error => {
      res.status(400).json({status:'failed',message:error});
    });
    
})

module.exports = router;
