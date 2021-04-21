module.exports = (app, db) => {
  let sql = "";

  app.get("/report", (req, res) => {
    res.send("Report API");
  });

  // GET FINISHED & REJECTED REPORT (FOR ADMIN & STAFF)

  app.get("/report/user/history", (req, res) => {
    sql = `select * from report where status IN ('Finished', 'Rejected')`;
    db.query(sql, (err, data) => {
      if (err) throw err;
      else res.send(data);
    });
  });
};
