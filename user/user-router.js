const router = require("express").Router();

//Set DB, Import restrict-need token middleware.
const db = require("./user-model.js");
const restrict = require("../authorization/authorize-middleware.js");

//Bringing in cloudinary settings
const { cloudinaryConfig, uploader } = require("../images/cloudinaryConfig.js");
const { multerUploads, dataUri } = require("../images/multer.js");
cloudinaryConfig(router);

//Get Users
router.get("/", (req, res) => {
  db.getUsers()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json(err.message);
    });
});

//Get User by ID
router.get("/:id", (req, res) => {
  const id = req.params.id;

  db.getById(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(400).json({ message: "The specified user does not exist." });
      }
    })
    .catch(err => {
      res.status(500).json(err.message);
    });
});

//Update User Info.
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;

  db.update(id, changes)
    .then(changes => {
      if (changes) {
        res.status(200).json({ message: "User successfully updated." });
      } else {
        res.status(404).json({ message: "The specified user does not exist." });
      }
    })
    .catch(err => {
      res.status(500).json(err.message);
    });
});

//Get exercises by user ID
router.get("/:id/exercises", async (req, res) => {
  console.log(req.params.id);
  try {
    const exercises = await db.getUserExercises(req.params.id);
    res.status(200).json(exercises);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error getting the exercises for the user"
    });
  }
});

//Post an image to cloudinary.
router.post("/:id/upload", multerUploads, (req, res) => {
  if (req.file) {
    const file = dataUri(req).content;
    return uploader
      .upload(file)
      .then(result => {
        const image = result.url;
        return res
          .status(200)
          .json({
            message: "Your image has been uploaded to cloudinary!",
            data: { image }
          });
      })
      .catch(err => {
        res
          .status(400)
          .json({
            message: "An error occurred while processing your request.",
            err: err
          });
      });
  }
});

module.exports = router;
