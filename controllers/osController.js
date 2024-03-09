const os = require('os');

module.exports.getOsInformation = async (req,res) => {
    try {
        const osInformations = {
           hostname: os.hostname(),
           type: os.type(),
           platform: os.platform(),
         };
         if (!osInformations) {
           throw new Error("there s no information for your os");
         }
         res.status(200).json(osInformations);
       } catch (error) {
         res.status(500).json({ message: error.message });
       }
}

module.exports.osCpus = async (req, res) => {
    try {
        const osCpus = os.cpus();
        if (!osCpus) {
          throw new Error("no cpus was found!");
        }
        res.status(200).json(osCpus);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

module.exports.osCpusById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!Number.isInteger(parseInt(id))) {
          throw new Error("you must provide a Number!");
        }
        const osCpus = os.cpus();
        if (!osCpus) {
          throw new Error("no cpus was found!");
        }
        if (id < 0 || id > osCpus.length - 1) {
          throw new Error("you must provide a valid id");
        }
        res.json(osCpus[id]);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}