module.exports = (app) => {
  app.post("/event/get", async (req, res) => {
    const { net_id } = req.body;
    const userRef = db.collection('user');
    const snapshot = await userRef.where('net_id', '==', net_id).get();
    if (!snapshot.events) {
      res.status(200).send();
    } else {
      let listOfEvent = snapshot.events;
      res.send(listOfEvent);
    }
    res.send([]);
  });
};