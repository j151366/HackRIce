module.exports = (app, db) => {
  app.post('/user/add', async (req, res) => {
      const { name, net_id, password, duration } = req.body;
      let data = {
          name: name,
          net_id: net_id,
          password: password
      };
      const result = await db.collection('user').doc().set(data);
      res.send(result);
    }
  );

  app.post('/user/get', async (req, res) => {
      const { net_id, password } = req.body;

      const usersRef = db.collection("user");
      const snapshot = await usersRef.get();
      let password_confirm;
      snapshot.forEach(doc => {
        if (doc.data().net_id == net_id) {
          password_confirm = doc.data().password;
          if (password_confirm == password) {
            res.send({"password_correction": true});
          } else {
            res.send({"password_correction": false});
          }
        }
      });
    }
  );
};