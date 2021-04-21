const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = (app, db) => {

  const userKey =
    "EA4D02BE0C3FCC2F953AB65E628459FC811DC398E3B52FA79F46F06A90CA80BD";

    const userAuth = (request, result, next) => {
  
      if (typeof(request.headers['token']) == 'undefined') {
        return result.status(403).json({
          success: false,
          message: 'Unauthorized. Token Is Not Provided Or Invalid'
        })
      }
  
      let token = request.headers['token']
  
      jwt.verify(token, userKey, (err, decoded) => {
        if (err) {
          return result.status(401).json({
            success: false,
            message: 'Unauthorized. Token is Token Is Not Provided Or Invalid'
          })
        }
      })
  
      // lanjut ke next request
      next()
    }

  let sql = "";

  // GET STAFF DATA

  app.get("/staff", (req, res) => {
    sql = `select * from staff`;
    db.query(sql, (err, data) => {
      if (err) throw err;
      else res.send(data);
    });
  });

  // CREATE NEW STAFF

  app.post("/staff", async (req, res) => {
    const { email, password, username } = req.body;
    const hash = await bcrypt.hash(password, 10);
    sql = `insert into staff (email ,username, password)
    values ('${email}', '${username}', '${hash}');`;
    verif = `select * from staff where email='${email}'`;
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

  // STAFF LOGIN

  app.post("/staff/auth", async (req, res) => {
    const { email, password } = req.body;
    //const tokenStaff = Math.random() * (24 + 4232); // Token using Math.random function
    const tokenStaff = jwt.sign(
      {
        email,
        password,
      },
      userKey
    );
    sql = `select * from staff where email=?`;
    db.query(sql, [email], (err, data) => {
      if (err) {
        throw err;
      } else if (data.length > 0) {
        bcrypt.compare(password, data[0].password, (error, validate) => {
          if (validate == true) {
            res.json({
              ...data[0],
              tokenStaff,
            });
          } else {
            res.json({
              message: "Invalid credentials",
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

  // GET PENDING REPORT

  app.get("/report/user/pending", userAuth, (req, res) => {
    sql = `select * from report where status = 'Pending'`;
    db.query(sql, (err, data) => {
      if (err) throw err;
      else res.send(data);
    });
  });

    // GET ONGOING REPORT

    app.get("/report/user/ongoing", userAuth, (req, res) => {
      sql = `select * from report where status = 'Work in progress'`;
      db.query(sql, (err, data) => {
        if (err) throw err;
        else res.send(data);
      });
    })

  // UPDATE REPORT STATUS

  app.put("/report/user/:id/updateStatus", userAuth, (req, res) => {
    sql = `update report set status = '${req.body.status}', respon = '${req.body.respon}', id_staff = '${req.body.idStaff}' where id_report = ${req.params.id}`;
    db.query(sql, (err, data) => {
      if (err) throw err;
      else res.send(data);
    });
  });
};
