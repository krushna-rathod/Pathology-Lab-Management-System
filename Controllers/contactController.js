const Contact = require("../Models/contactModel");

exports.createContact = async (req, res) => {
  try {
    const data = await Contact.create(req.body);

    res.status(200).json({
      status: "success",
      data
    });

  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message
    });
  }
};