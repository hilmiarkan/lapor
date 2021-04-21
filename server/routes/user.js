const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = (app, db) => {
  const userKey =
    "EA4D02BE0C3FCC2F953AB65E628459FC811DC398E3B52FA79F46F06A90CA80BD";

  const userAuth = (request, result, next) => {
    if (typeof request.headers["token"] == "undefined") {
      return result.status(403).json({
        success: false,
        message: "Unauthorized. Token Is Not Provided Or Invalid",
      });
    }

    let token = request.headers["token"];

    jwt.verify(token, userKey, (err, decoded) => {
      if (err) {
        return result.status(401).json({
          success: false,
          message: "Unauthorized. Token is Token Is Not Provided Or Invalid",
        });
      }
    });

    // lanjut ke next request
    next();
  };

  let sql = "";

  app.get("/user", (req, res) => {
    sql = `select * from user`;
    db.query(sql, (err, data) => {
      if (err) throw err;
      else res.send(data);
    });
  });

  // CREATE NEW USER

  app.post("/user", async (req, res) => {
    const { email, password, username, telp } = req.body;
    const hash = await bcrypt.hash(password, 10);
    sql = `insert into user (email ,username, password, telp)
    values ('${email}', '${username}', '${hash}', '${telp}');`;
    verif = `select * from user where email='${email}'`;
    db.query(verif, (err, dat) => {
      if (dat.length <= 0) {
        db.query(sql, (err, data) => {
          if (err) {
            throw err;
          } else {
            res.send("Working");
          }
        });
      } else {
        res.send("Error!");
      }
    });
  });

  // USER LOGIN

  app.post("/user/auth", async (req, res) => {
    const { email, password } = req.body;
    //const token = Math.random() * (24 + 4232); // Token using Math.random function
    const token = jwt.sign(
      {
        email,
        password,
      },
      userKey
    );
    sql = `select * from user where email=?`;
    db.query(sql, [email], (err, data) => {
      if (err) {
        throw err;
      } else if (data.length > 0) {
        bcrypt.compare(password, data[0].password, (error, validate) => {
          if (validate == true) {
            res.json({
              ...data[0],
              token,
            });
          } else {
            res.json({
              message: "Invalid credentials!",
            });
          }
        });
      } else {
        res.json({
          message: "Invalid credentials",
        });
      }
    });
  });

  app.put("/user/:id", userAuth, (req, res) => {
    req.body.password = bcrypt
      .hash(req.body.password, 10)
      .then((data) => {
        sql = `update user set email = '${req.body.email}', username = '${req.body.username}', telp = ${req.body.telp}, password = '${data}' where id_user= ${req.params.id}`;
        db.query(sql, (err, data) => {
          try {
            res.send(data);
          } catch (err) {
            console.log(err);
          }
        });
      })
      .catch((err) => console.log(err));
  });

  // CREATE NEW REPORT

  app.post("/report", userAuth, (req, res) => {
    const { content, status, id_user } = req.body;
    sql = `insert into report (content, status, id_user)
  values ("${content}", 'Pending', '${id_user}')`;
    db.query(sql, (err, data) => {
      if (err) throw err;
    });
  });

  // GET USER REPORT

  app.get("/report/user/:id", userAuth, (req, res) => {
    sql = `select * from report where id_user = '${req.params.id}'`;
    db.query(sql, (err, data) => {
      if (err) throw err;
      else res.send(data);
    });
  });
};
