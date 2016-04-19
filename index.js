var express               =   require("express");
var app                   =   express();
var bodyParser            =   require("body-parser");
var router                =   express.Router();
var mongoose              =   require("mongoose");
var ItemModel             =   require("./model/item");
var UserModel             =   require('./model/user');
var CategoryModel         =   require('./model/category');
var SubCategoryModel      =   require('./model/subcategory');
var SmallBusinessModel    =   require('./model/smallbusiness');
var VolunteerModel        =   require('./model/volunteer');
var CompanyOfferModel     =   require('./model/companyoffer');


 mongoose.connect("mongodb://localhost/nodeapi", function(err, db) {
            if (!err) {
                console.log("We are connected on local");
            }
            else{
                console.log(err);
            }
        });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));


app.get('/api', function (req, res) {
  res.send('API is running');
});

// User Api Start
app.get('/api/getusers', function (req, res) {
  return UserModel.find(function (err, User) {
    if (!err) {
      return res.send(User);
    } else {
      return console.log(err);
    }
  });
});


app.get('/api/getidusers/:id', function (req, res) {
  return UserModel.findById(req.params.id, function (err, User) {
    if (!err) {
      return res.send(User);
    } else {
      return console.log(err);
    }
  });
});

app.post('/api/postusers', function (req, res) {
  var user;
  console.log("POST: ");
  console.log(req.body);
  user = new UserModel({
    username: req.query.username,
    email: req.query.email,
    contactno: req.query.contactno,
    password : req.query.password,
    confrimpassword : req.query.confrimpassword,
    images: req.query.images,
    male: req.query.male,
    verifycode :req.query.verifycode,
    status : req.query.status
  });
  user.save(function (err) {
    if (!err) {
      return console.log("created");
    } else {
      return console.log(err);
    }
  });
  return res.send(user);
});

app.delete('/api/deleteidusers/:id', function (req, res) {
  return UserModel.findById(req.params.id, function (err, User) {
    return UserModel.remove(function (err) {
      if (!err) {
        console.log("removed");
        return res.send('');
      } else {
        console.log(err);
      }
    });
  });
});



app.delete('/api/deleteusers', function (req, res) {
  UserModel.remove(function (err) {
    if (!err) {
      console.log("removed");
      return res.send('');
    } else {
      console.log(err);
    }
  });
});



// User Api End


// category API Start




app.get('/api/getcategory', function (req, res) {
  return CategoryModel.find(function (err, category) {
    if (!err) {
          res.header('Access-Control-Allow-Origin', "*");     // TODO - Make this more secure!!
      
      return res.send(category);
    } else {

      return console.log(err);
    }
  });
});

app.get('/api/getcategory/:id', function (req, res) {
  return CategoryModel.findById(req.params.id, function (err, category) {
    if (!err) {
      return res.send(category);
    } else {
      return console.log(err);
    }
  });
});


app.post('/api/postcategory', function (req, res) {
  var category;
  console.log("POST: ");
  console.log(req.body);
  category = new CategoryModel({
    category_name: req.body.category_name
  });
  category.save(function (err) {
    if (!err) {
      return console.log("created");
    } else {
      return console.log(err);
    }
  });
  return res.send(category);
});



// category API End

// sUBcategory API Start




app.get('/api/getsubcategory', function (req, res) {
  return SubCategoryModel.find(function (err, subcategory) {
    if (!err) {
          res.header('Access-Control-Allow-Origin', "*");     // TODO - Make this more secure!!
      
      return res.send(subcategory);
    } else {

      return console.log(err);
    }
  });
});

app.get('/api/getsubcategory/:p_category_name', function (req, res) {
  return SubCategoryModel.findOne(req.params.p_category_name, function (err, subcategory) {
    if (!err) {
      return res.send(subcategory);
    } else {
      return console.log(err);
    }
  });
});


app.post('/api/postsubcategory', function (req, res) {
  var subcategory;
  console.log("POST: ");
  console.log(req.body);
  subcategory = new SubCategoryModel({
    subcategory_name: req.body.subcategory_name,
    p_category_name: req.body.p_category_name
  });
  subcategory.save(function (err) {
    if (!err) {
      return console.log("created");
    } else {
      return console.log(err);
    }
  });
  return res.send(subcategory);
});



// SUBcategory API End


// Item API Start


// List products
app.get('/api/getitem', function (req, res) {
  return ItemModel.find(function (err, item) {
    if (!err) {
       res.header('Access-Control-Allow-Origin', "*");     // TODO - Make this more secure!!
      return res.json(item);
    } else {
      return console.log(err);
    }
  });
});

// Single product
app.get('/api/getiditem/:id', function (req, res) {
  return ItemtModel.findById(req.params.id, function (err, item) {
    if (!err) {
      return res.send(item);
    } else {
      return console.log(err);
    }
  });
});






app.post('/api/postitem', function (req, res) {
  var item;
  console.log("POST: ");
  console.log(req.body);
  item = new ItemModel({
    title: req.query.title,
    comment: req.query.comment,
    price: req.query.price,
    contactno: req.query.contactno,
    images: req.query.images,
    category: req.query.categories,
    subcategory: req.query.subcategory,
     status: req.query.status
  });
  item.save(function (err) {
    if (!err) {
      return console.log("created");
    } else {
      return console.log(err);
    }
  });
  return res.send(item);
});


//remove bulk item
app.delete('/api/deleteitem', function (req, res) {
  ItemModel.remove(function (err) {
    if (!err) {
      console.log("removed");
      return res.send('');
    } else {
      console.log(err);
    }
  });
});


// remove a single item
app.delete('/api/deleteiditem/:id', function (req, res) {
  return ItemModel.findById(req.params.id, function (err, item) {
    return item.remove(function (err) {
      if (!err) {
        console.log("removed");
        return res.send('');
      } else {
        console.log(err);
      }
    });
  });
});




//small business API start

//list business
app.get('/api/getsmallbusiness', function (req, res) {
  return SmallBusinessModel.find(function (err, business) {
    if (!err) {

      return res.send(business);
    } else {

      return console.log(err);
    }
  });
});

//get single business

app.get('/api/getidsmallbusiness/:id', function (req, res) {
  return SmallBusinessModel.findById(req.params.id, function (err, business) {
    if (!err) {
      return res.send(business);
    } else {
      return console.log(err);
    }
  });
});

//add business 

app.post('/api/postsmallbusiness', function (req, res) {
  var smallbusiness;
  console.log("POST: ");
  console.log(req.body);
  smallbusiness = new SmallBusinessModel({
    title: req.query.title,
    comment: req.query.comment,
    price: req.query.price,
    contactno: req.query.contactno,
    images: req.query.images,
    logo: req.query.categories,
    status: req.query.status,
    location: req.query.location
  });
  smallbusiness.save(function (err) {
    if (!err) {
      return console.log("created");
    } else {
      return console.log(err);
    }
  });
  return res.send(smallbusiness);
});



//remove bulk business
app.delete('/api/deletebusiness', function (req, res) {
  SmallBusinessModel.remove(function (err) {
    if (!err) {
      console.log("removed");
      return res.send('');
    } else {
      console.log(err);
    }
  });
});


// remove a single business 
app.delete('/api/deleteidbusiness/:id', function (req, res) {
  return SmallBusinessModel.findById(req.params.id, function (err, smallbusiness) {
    return smallbusiness.remove(function (err) {
      if (!err) {
        console.log("removed");
        return res.send('');
      } else {
        console.log(err);
      }
    });
  });
});

//business API end


//Volunteer API start

//list volunteer
app.get('/api/getvolunteer', function (req, res) {
  return VolunteerModel.find(function (err, volunteer) {
    if (!err) {

      return res.send(volunteer);
    } else {

      return console.log(err);
    }
  });
});

//get single volunteer

app.get('/api/getidvolunteer/:id', function (req, res) {
  return VolunteerModel.findById(req.params.id, function (err, volunteer) {
    if (!err) {
      return res.send(volunteer);
    } else {
      return console.log(err);
    }
  });
});

//add volunteer 

app.post('/api/postvolunteer', function (req, res) {
  var volunteer;
  console.log("POST: ");
  console.log(req.body);
   volunteer = new VolunteerModel({
    title: req.query.title,
    comment: req.query.comment,
    price: req.query.price,
    contactno: req.query.contactno,
    images: req.query.images,
    logo: req.query.categories,
    status: req.query.status,
    location: req.query.location
  });
  volunteer.save(function (err) {
    if (!err) {
      return console.log("created");
    } else {
      return console.log(err);
    }
  });
  return res.send(volunteer);
});



//remove bulk volunteer
app.delete('/api/deletevolunteer', function (req, res) {
  VolunteerModel.remove(function (err) {
    if (!err) {
      console.log("removed");
      return res.send('');
    } else {
      console.log(err);
    }
  });
});


// remove a single volunteer 
app.delete('/api/deleteidvolunteer/:id', function (req, res) {
  return VolunteerModel.findById(req.params.id, function (err, volunteer) {
    return volunteer.remove(function (err) {
      if (!err) {
        console.log("removed");
        return res.send('');
      } else {
        console.log(err);
      }
    });
  });
});


//Volunteer API End

//CompanyOffer API Start

//list Companyoffer
app.get('/api/getcompanyoffer', function (req, res) {
  return CompanyOfferModel.find(function (err, company) {
    if (!err) {

      return res.send(company);
    } else {

      return console.log(err);
    }
  });
});

//get single CompanyOffer
app.get('/api/getidcompanyoffer/:id', function (req, res) {
  return CompanyOfferModel.findById(req.params.id, function (err,company) {
    if (!err) {
      return res.send(company);
    } else {
      return console.log(err);
    }
  });
});



//add CompanyOffer 

app.post('/api/postcompanyoffer', function (req, res) {
  var company;
  console.log("POST: ");
  console.log(req.body);
   company = new CompanyOfferModel({
    title: req.query.title,
    description: req.query.description,
    name: req.query.name,
    contactno: req.query.contactno,
    images: req.query.images,
    categoryoffer: req.query.categoryoffer,
    status: req.query.status
    
  });
  company.save(function (err) {
    if (!err) {
      return console.log("created");
    } else {
      return console.log(err);
    }
  });
  return res.send(company);
});



//remove bulk CompanyOffer
app.delete('/api/deletecompanyoffer', function (req, res) {
  CompanyOfferModel.remove(function (err) {
    if (!err) {
      console.log("removed");
      return res.send('');
    } else {
      console.log(err);
    }
  });
});

// remove a single CompanyOffer 
app.delete('/api/deleteidcompanyoffer/:id', function (req, res) {
  return VolunteerModel.findById(req.params.id, function (err, company) {
    return company.remove(function (err) {
      if (!err) {
        console.log("removed");
        return res.send('');
      } else {
        console.log(err);
      }
    });
  });
});


//End CompanyOffer API



// PUT to UPDATE

// Bulk update
// app.put('/api/products', function (req, res) {
//     var i, len = 0;
//     console.log("is Array req.body.products");
//     console.log(Array.isArray(req.body.products));
//     console.log("PUT: (products)");
//     console.log(req.body.products);
//     if (Array.isArray(req.body.products)) {
//         len = req.body.products.length;
//     }
//     for (i = 0; i < len; i++) {
//         console.log("UPDATE product by id:");
//         for (var id in req.body.products[i]) {
//             console.log(id);
//         }
//         ProductModel.update({ "_id": id }, req.body.products[i][id], function (err, numAffected) {
//             if (err) {
//                 console.log("Error on update");
//                 console.log(err);
//             } else {
//                 console.log("updated num: " + numAffected);
//             }
//         });
//     }
//     return res.send(req.body.products);
// });

// // Single update
// app.put('/api/products/:id', function (req, res) {
//   return ProductModel.findById(req.params.id, function (err, product) {
//     product.title = req.body.title;
//     product.description = req.body.description;
//     product.style = req.body.style;
//     product.images = req.body.images;
//     product.categories = req.body.categories;
//     product.catalogs = req.body.catalogs;
//     product.variants = req.body.variants;
//     return product.save(function (err) {
//       if (!err) {
//         console.log("updated");
//       } else {
//         console.log(err);
//       }
//       return res.send(product);
//     });
//   });
// });

// GET to READ

// DELETE to DESTROY

// Bulk destroy all products


 // var product = new ProductModel({
 //  title: "fdsgfjjhfjhfjhhs",  
 //  description: "Aljkhgkgkukugl", 
 //    "price": "1234",
 //  "contactno": "5482", 
 //  images: [  
 //    {  
 //      "kind": "thumbnail",  
 //      "url": "images/products/1234/main.jpg"  
 //    }  
 //  ],  
 //  "categories": [  
 //      { "name": "Clothes" } 
 //  ],
 //  "subcategory": [  
 //        { "name": "shirt" } 
 //    ],


 //  }); 
 // product.save();
 // 


app.listen(3000);
