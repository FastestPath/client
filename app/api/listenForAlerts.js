const ALERTS_REF = '/alerts';

const listenForAlerts = (offset, limit = 10) => {
  return new Promise((resolve) => {
    firebase.database()
      .ref(ALERTS_REF)
      .orderByKey()
      .startAt(offset)
      .limitToFirst(limit)
      .on('value', (snapshot) => {
        resolve(snapshot.val());
      });
  });
};

export default listenForAlerts;