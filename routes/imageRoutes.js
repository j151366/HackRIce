module.exports = (app) => {
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
  
        const usersRef = db.collection('user');
        const snapshot = await usersRef.where('net_id', '==', net_id).get();
        if (snapshot.password === password) {
          res.send({"password_correction": true});
        } else {
          res.send({"password_correction": false});
        }
        res.send({});
      }
    );
  };