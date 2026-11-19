const Admin = require("../Models/admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const SECRET = "MY_SECRET_KEY";

// Register Admin
exports.registerAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existing = await Admin.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await Admin.create({
      email,
      password: hashedPassword
    });

    res.json({ message: "Admin Registered" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login Admin
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      SECRET,
      { expiresIn: "1d" }
    );

    // ✅ IMPORTANT
    res.json({
      token,
      role: admin.role,
      email: admin.email
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




// const Admin = require("../Models/admin");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");

// const SECRET = "MY_SECRET_KEY";

// // ✅ Register Admin (run once using Postman)
// exports.registerAdmin = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const hashedPassword = await bcrypt.hash(password, 10);

//     await Admin.create({
//       email,
//       password: hashedPassword
//     });

//     res.json({ message: "Admin Registered" });

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // ✅ Login
// exports.loginAdmin = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const admin = await Admin.findOne({ email });
//     if (!admin) return res.status(404).json({ message: "Admin not found" });

//     const isMatch = await bcrypt.compare(password, admin.password);
//     if (!isMatch) return res.status(400).json({ message: "Wrong password" });

//     const token = jwt.sign(
//       { id: admin._id, role: admin.role },
//       SECRET,
//       { expiresIn: "1d" }
//     );

//    res.json({
//   token,
//   role: admin.role,
//   email: admin.email
// });

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
