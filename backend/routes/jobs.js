const express = require ("express");
const router = express.Router();
const multer = require('multer');
const Job = require('../models/job');
const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg'

};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if(isValid){
      error = null;
    }
    cb(error, "backend/images");

  },
  filename: (req, file, cb)=>{

    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});
router.post("", multer({storage: storage}).single("image"),(req, res, next) =>{
  const url = req.protocol + '://' + req.get("host");
  const post = new Job ({ //ovo je post iz baze
      title: req.body.title,
      description: req.body.description,
      imagePath: url + "/images/" + req.file.filename,
      location: req.body.location,
      jobType: req.body.jobType,
      firm: req.body.firm
  });
  post.save()
  .then(result =>{
    res.status(201).json({
      message:"Post added succesfully!",
      post:{
        ...result,
        id: result._id
      }
  });
  });
});

module.exports = router;
