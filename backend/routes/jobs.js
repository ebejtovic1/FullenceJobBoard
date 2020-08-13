const express = require("express");
const router = express.Router();
const multer = require("multer");
const Job = require("../models/job");

const checkAuth = require("../middleware/check-auth");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  },
});

router.post(
  "",
  checkAuth,
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const post = new Job({
      //ovo je post iz baze
      title: req.body.title,
      description: req.body.description,
      imagePath: url + "/images/" + req.file.filename,
      location: req.body.location,
      jobType: req.body.jobType,
      firm: req.body.firm,
      creator: req.userData.userId,
      companyInfo: req.body.companyInfo,
    });

    post
      .save()
      .then((result) => {
        res.status(201).json({
          message: "Job added succesfully!",
          post: {
            ...result,
            id: result._id,
          },
        });
      })
      .catch((error) => {
        res.status(500).json({
          message: "Creating a job failed!",
        });
      });
  }
);

router.get("", (req, res, next) => {
  Job.find()
    .then((documents) => {
      res.status(200).json({
        message: "Jobs fetched succesfully!",
        jobs: documents,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Fetching jobs failed!",
      });
    });
});

router.put(
  "/:id",
  checkAuth,
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    let imagePath = req.body.imagePath;

    if (req.file) {
      const url = req.protocol + "://" + req.get("host");
      imagePath = url + "/images/" + req.file.filename;
    }
    const post = new Job({
      _id: req.body.id,
      title: req.body.title,
      description: req.body.description,
      imagePath: imagePath,
      location: req.body.location,
      jobType: req.body.jobType,
      firm: req.body.firm,
      creator: req.userData.userId,
      companyInfo: req.body.companyInfo,
    });

    Job.updateOne({ _id: req.params.id, creator: req.userData.userId }, post)
      .then((result) => {
        if (result.nModified > 0) {
          res.status(200).json({ message: "Update successful!" });
        } else {
          res.status(401).json({ message: "Not authorized!" });
        }
      })
      .catch((error) => {
        res.status(500).json({
          message: "Couldn't udpate job!",
        });
      });
  }
);

router.get("/:id", (req, res, next) => {
  Job.findById(req.params.id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({
          message: "Job not found!",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Fetching job failed!",
      });
    });
});

router.delete("/:id", checkAuth, (req, res, next) => {
  console.log(req.params.id);
  Job.deleteOne({ _id: req.params.id, creator: req.userData.userId })
    .then((result) => {
      console.log(result);
      res.status(200).json({ message: "Job deleted" });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Deleting posts failed!",
      });
    });
});

module.exports = router;
