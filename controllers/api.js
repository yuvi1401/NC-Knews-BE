const serveJSON = (req, res, next) => {
  res.sendFile(`${process.cwd()}/db/endpoints.JSON`);
};
module.exports = { serveJSON };
