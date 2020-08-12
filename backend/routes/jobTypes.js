const express = require("express");
const router = express.Router();
const multer = require('multer');
const JobType = require('../models/jobType');

router.post("/",(req, res, next) => {
  const type = new JobType({                         //ovo je post iz baze
    job_type: req.body.job_type
  });

  type.save()
    .then(result => {
      res.status(201).json({
        message: "Job type added succesfully!",
        job_type: {
          ...result,
          id: result._id
        }
      });
    });

});

router.get('/', (req, res, next) => {
  JobType.find()
    .then(documents => {
      res.status(200).json({
        message: "Jobs fetched succesfully!",
        job_type: documents
      });
    });
});


module.exports = router;
