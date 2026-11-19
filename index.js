const express = require('express');
const app = express();
const port = 8080;
const jwt = require("jsonwebtoken");

const cors = require('cors');
const bodyParser = require("body-parser");

const testRoutes = require("./Routes/testRoutes");
const patientRoutes = require("./Routes/patientRoutes");
const contactRoutes = require("./Routes/contactRoutes");
const authRoutes = require("./Routes/authRoutes"); // ✅ ADD THIS


// jwt.verify(token, process.env.JWT_SECRET);

app.use(cors());
// app.use(bodyParser.json());
app.use(express.json());

require('./connection.js');

// ✅ ROUTES
app.use('/auth', authRoutes);   // 🔐 LOGIN
app.use('/test', testRoutes);
app.use('/patient', patientRoutes);
app.use('/contact', contactRoutes);

app.listen(port, () => {
  console.log(`Server running on PORT ${port}`);
});







// const express = require('express')
// const app = express();
// const port = 8080;
// const cors=require('cors')
// const bodyParser =require ("body-parser")
// const testRoutes=require("./Routes/testRoutes.js");
// const patientRoutes=require("./Routes/patientRoutes.js");
// const contactRoutes = require("./Routes/contactRoutes");

// app.use(cors());
// app.use(bodyParser.json());
// require('./connection.js')
// app.use('/test',testRoutes);
// app.use('/patient',patientRoutes);
// app.use("/contact", contactRoutes);


// // app.get('/', (req, res) => {
// //   res.json({
// //     "name":"Danish",
// //     "age":"25",
// //     "place":"Delhi"
// //   });
// // })

// app.listen(port, () => {
//   console.log(`Example app listening on PORT ${port}`)
// })
