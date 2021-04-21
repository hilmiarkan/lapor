const jwt = require("jsonwebtoken");
module.exports = (app, db) => {
  let sql = "";

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

  app.post("/admin", (req, res) => {
    const { email, password } = req.body;
    const tokenAdmin = jwt.sign(
      {
        email,
        password,
      },
      userKey
    );
    sql = `select * from admin where email=? and password=?`;
    db.query(sql, [email, password], (err, data) => {
      if (err) {
        throw err;
      }
      if (data.length > 0) {
        res.json({ ...data[0], tokenAdmin });
      } else {
        res.json({ message: "Email/kata sandi tidak cocok, coba lagi" });
      }
    });
  });

  // DELETE USER ACCOUNT

  app.delete("/admin/user/:id/delete", userAuth, (req, res) => {
    sql = `delete from user where id_user = '${req.params.id}'`;
    // sql = `select * from report where id_user = '${req.params.id}'`;
    db.query(sql, (err, data) => {
      if (err) throw err;
      else res.send(data);
    });
  });

  // DELETE STAFF ACCOUNT

  app.delete("/admin/staff/:id/delete", userAuth, (req, res) => {
    sql = `delete from staff where id_staff = ${req.params.id}`;
    db.query(sql, (err, data) => {
      if (err) throw err;
      else res.send(data);
    });
  });

  // GET ALL USER

  app.get("/report/user/total", userAuth, (req, res) => {
    sql = `select * from report`;
    db.query(sql, (err, data) => {
      if (err) throw err;
      else res.send(data);
    });
  });

  // DELETE REPORT

  app.delete("/report/user/:id/delete", (req, res) => {
    sql = `delete from report where id_report = ${req.params.id}`;
    db.query(sql, (err, data) => {
      if (err) throw err;
      else res.send(data);
    });
  });
};
