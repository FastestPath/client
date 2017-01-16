const addSeconds = (date = new Date(), seconds) => {
  const future = new Date(date.getTime());
  future.setSeconds(date.getSeconds() + seconds);
  return future;
};

export default addSeconds;