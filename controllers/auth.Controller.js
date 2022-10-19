const config = require("../config/auth.config");
const db = require("../models");
const Employee = db.employees;

var jwt = require("jsonwebtoken");


      var passwordIsValid = () => {
        if(req.body.password == user.password)
            return true
        else
            false;

      }

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      res.status(200).send({
        id: user._id,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        mobile: user.mobile,
        address: user.address,
        password: user.password,
        accessToken: token
      });
    });
};