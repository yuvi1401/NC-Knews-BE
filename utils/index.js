exports.formatDate = timestamp => new Date(timestamp);

exports.createRefArticlesData = (data, name, id) => data.reduce((acc, row) => {
  acc[row[name]] = row[id];
  return acc;
}, {});
