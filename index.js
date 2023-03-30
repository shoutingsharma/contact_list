const { response } = require("express");
const express = require("express");
const path = require("path");
const port = "8000";

const db = require("./config/mongoose");
const Contact = require("./models/contact");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded());
app.use(express.static("assests"));

//middleware1
// app.use(function(req,res,next){
//   console.log('middleware 1 called');
//   next();
// });

//middleware2
// app.use(function(req,res,next){
//   console.log('middleware 2 called');
//   next();
// })

var contactList = [
  {
    name: "Akash",
    phone: "8979002250",
  },
  {
    name: "tony stark",
    phone: "8979002259",
  },
  {
    name: "Coding Ninjas",
    phone: "8979002252",
  },
];

app.get("/", async function (req, res) {
  // console.log(req);
  // res.send('<h1>cool,it is running! or is it?</h1>')
  try {
    const contactList = await Contact.find({});
    return res.render("home", {
      title: "My Contact List",
      contact_list: contactList,
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/practice", function (req, res) {
  return res.render("practice", { title: "let us play with ejs" });
});

app.post("/create-contact", function (req, res) {
  // return res.redirect("/practice");
  // console.log(req.body.phone);
  // contactList.push({
  //   name: req.body.name,
  //   phone: req.body.phone
  // });
  // contactList.push(req.body);

  Contact.create({
    name: req.body.name,
    phone: req.body.phone,
  })
    .then((response) => {
      console.log(response);
      // res.send(response);
      return res.redirect("back");
    })
    .catch((err) => {
      // res.send(err);
      console.error(err);
      return;
    });

  //  return res.redirect('/');
  // return res.redirect("back");
});

//by using params
// app.get('/delete-contact/:phone',function(req,res){
//   let phone =req.params.phone;
//   console.log(req.params);
// });

//by using query for deleting the contact
app.get("/delete-contact", async function (req, res) {
  //get the id from query in the url
  let id = req.query.id;
  // console.log(req.query.phone);
  await Contact.deleteOne({id });

  return res.redirect("back");
});

app.listen(port, function (err) {
  if (err) {
    console.log("error in running the server", err);
  }
  console.log("yup!My Express Server is running on port:", port);
});
