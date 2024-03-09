const express = require("express");
const router = express.Router();
const os = require("os");
const osController = require("../controllers/osController");

 router.get("/",osController.getOsInformation);
// router.get("/", (req, res, next) => {
//   try {
//     const osInformations = {
//       hostname: os.hostname(),
//       type: os.type(),
//       platform: os.platform(),
//     };
//     if (!osInformations) {
//       throw new Error("there s no information for your os");
//     }
//     res.json(osInformations);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

router.get("/cpus",osController.osCpus);

router.get("/cpus/:id",osController.osCpusById);

 module.exports = router;