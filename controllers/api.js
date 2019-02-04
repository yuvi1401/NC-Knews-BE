const serveJSON = (res, req, next) => {
  res.sendFile(`${process.cwd()}/db/endpoints.JSON`);
};
module.exports = { serveJSON };
