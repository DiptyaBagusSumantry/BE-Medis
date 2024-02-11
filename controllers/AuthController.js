const Models = require("../models/index.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = Models.User;

class AuthController {
  static async Login(req, res) {
    try {
      //scope show password setting in models
      const user = await User.scope("visiblePassword").findOne({
        where: { username: req.body.username },
      });
      if (!user)
        return res.status(400).json({ msg: "username tidak ditemukan" });

      //check password
      const match = await bcrypt.compare(req.body.password, user.password);
      if (!match) return res.status(400).json({ msg: "password anda salah" });

      //acces token expreid in 8 jam
      const accessToken = jwt.sign(
        {
          id: user.id,
          role: user.role,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "60m", //detik expreid 5 menit
        }
      );

      res.status(200).json({
        accessToken: accessToken,
        role: user.role.name,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  // static async Fetch(req, res) {
  //   try {
  //     const authHeader = req.headers["authorization"];
  //     const token = authHeader && authHeader.split(" ")[1];

  //     const user = jwt.verify(
  //       token,
  //       process.env.REFRESH_TOKEN_SECRET,
  //       (error, decoded) => {
  //         if (error) return res.sendStatus(403);
  //         return decoded;
  //       }
  //     );
  //     const fetch = await User.findOne({
  //       where: { id: user.id },
  //       attributes: ["username"],
  //     }).then((data) => {
  //       return {
  //         username: data.username,
  //         role: user.role,
  //       };
  //     });
  //     return res.status(200).json(fetch);
  //   } catch (error) {
  //     res.status(500).json({
  //       message: error.message,
  //     });
  //   }
  // }

  static async Logout(req, res) {
    try {
       const authHeader = req.headers["authorization"];
       const token = authHeader && authHeader.split(" ")[1];

      jwt.verify(
        token,
        process.env.REFRESH_TOKEN_SECRET,
        async (error, decoded) => {
          if (error) return res.sendStatus(403);
          res.clearCookie("refreshToken");
          return res.status(200).json({ msg: "Berhasil Logout" });
        }
      );
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

}

module.exports = AuthController;
