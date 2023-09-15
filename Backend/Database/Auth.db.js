const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
mongoose.connect("mongodb://127.0.0.1:27017/Slido",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("Data Base Connected Successfully");
}).catch((err) => {
    console.log("ERROR::",err);
});