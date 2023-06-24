const { Student, Teacher } = require("../models");
const { verifyToken } = require("./jwt");

async function validation(req, res, next) {
  try {
    let accessToken = req.headers.access_token;
    if (!accessToken) return res.status(401).json({ message: "Invalid Token" });

    let payload = verifyToken(accessToken);
    let user;

    if (payload.role === "student") {
      user = await Student.findOne({
        where: {
          id: +payload.id,
        },
      });
    } else {
      user = await Teacher.findOne({
        where: {
          id: +payload.id,
        },
      });
    }

    if (!user) return res.status(401).json({ message: "Invalid Token" });

    req.user = { id: user.id, role: payload.role, fullName: user.fullName };
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = validation;
