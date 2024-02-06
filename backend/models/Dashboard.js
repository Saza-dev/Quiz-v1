const mongoose = require('mongoose');

const dashboardSchema = new mongoose.Schema({
    index: String,
    result: [{ id: Number, qName: String, marks: String, modName: String }]
});

const dashboardModel = mongoose.model("dashboard", dashboardSchema);

module.exports = dashboardModel;
