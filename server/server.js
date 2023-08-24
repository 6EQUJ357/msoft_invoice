let express = require("express")
let mongoose = require("mongoose")
let cors = require("cors")
let jwt = require("jsonwebtoken")
let middleware1 = require("./middleware1")
const multer = require('multer');
let path = require("path")
let bcrypt = require("bcrypt")
require("dotenv").config();




//.ENV
const port = process.env.PORT ||8080; 
const DB_connection = process.env.DB_CONNECTION;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

//const SERVER_IP_ADDRESS = "103.86.177.194"  

//Db modal schema
let mcreate = require("./model1");
let AddinvoiceModel = require("./addinvoiceModel");
let addUserDetailsModel = require("./adduserdetailsModel");
let addRegisterUserDetailsModel = require("./addregisteruserdetails");
let QuotationTransactionModel = require("./quotationtransactionmodel");
let salesPaymentsSchema = require("./salesPaymentsModel");
let company_profileModel = require("./company_profileModel");
let CategoryModel = require("./categoryModel");
let expansesModel = require("./expansesModel")
//capturing img schema

let captureImgModel = require("./captureImgSchema")

  
let app = express(); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));    

app.use(cors({origin:"*"})) 


mongoose.connect(DB_connection, {        
    useNewUrlParser: true, 
    useUnifiedTopology: true,
  }).then(()=>console.log("DB Authentication success...")).catch(err=>console.log(err))


app.get("/",(req,res)=>{
    res.send("node js...")  
})


//create user

// user details 

//multer image store in a images file

app.use("/UserImages", express.static("UserImages"))

const userStorage = multer.diskStorage({
    destination: (req, file, cb)=> {
      cb(null, 'UserImages'); 
    },
    filename: (req, file, cb)=> {
        //console.log(file)
      cb(null, Date.now() + path.extname(file.originalname)); 
    } 
  }); 


  //image file type  check
  const userImgfilter = (req, file, cb) => { 
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, "Only image files are allowed");
    }
  };
  
  const userUpload = multer({ storage: userStorage, filefilter: userImgfilter });
  //multer image store in a images file end
 
app.post("/muser",userUpload.single("userimg"), async(req,res)=>{
    try{
        const {username, userType, email, password, conformPassword} = req.body

        let images;
         if( req.body.userimg === 'null'){
             images = null
         }
         else{
        //   images =req.protocol + '://' + req.get('host') + '/UserImages/' + req.file.filename;
        images = req.file.filename;
         }


        let exist = await mcreate.findOne({email:email})
        if(exist){
            return res.json({status:400, response : false, message:"user already exist for this Email"})
        }

        // Generate a salt
        const salt = await bcrypt.genSalt(10);

        // Generate bcrypt password hash
        const hashedPassword = await bcrypt.hash(password, salt);

        // Compare bcrypt hash of password and confirm password
        const passwordMatch = await bcrypt.compare(conformPassword, hashedPassword);
        if (!passwordMatch) {
        return res.json({status : 400, response : false, message: 'Passwords do not match' });
        }
        

        let data = new mcreate({userimg : images, username, userType, email, password : hashedPassword})
        await data.save();

        return res.json({status:200, response : true, message:`${userType==="super Admin" ? userType.slice(6, userType.length): userType} registered successfully... `}) 

    }
    catch(err){
        console.log(err)
        return res.send({status:500, message:"internal server error line:134"})  
    }
})

//get all users include admin
app.get("/getallusers", async(req,res)=>{
    try{
        return res.status(200).json(await mcreate.find().select('-password').exec())
    }
    catch(err){
        console.log(err)
        return res.status(500).send("internal server error...")
    }
})

//delete user
app.delete("/deleteuserdetails/:id", async(req,res)=>{
    try{
        await mcreate.findByIdAndDelete(req.params.id);

        return res.status(200).json(await mcreate.find())
   }
   catch(err){
       console.log(err)
       return res.status(500).send("internal server error...")
   }
})


//edit user details


    app.put("/edituserdetails/:id",userUpload.single("userimg"), async(req,res)=>{
        try{
            const {editusername, edituseremail, edituserpassword} = req.body; 

            let images;
            if( req.body.userimg === 'null'){
                images = null
            }
            else{
             //images =req.protocol + '://' + req.get('host') + '/UserImages/' + req.file.filename;
             images = req.file.filename;
            }

            // Generate a salt
        const salt = await bcrypt.genSalt(10);

        // Generate bcrypt password hash
        const hashedPassword = await bcrypt.hash(edituserpassword, salt);
    
            await mcreate.findByIdAndUpdate(req.params.id, {
                userimg : images,
                username : editusername,
                email : edituseremail, 
                password : hashedPassword 
            }, {new : true})
            .then(updatedUser => {
                if (!updatedUser) { 
                  return res.status(404).json({ message: 'Error for Update  Client' });
                 }
                 return res.send({status: 200, message: "User Profile Updated successsfull..."}); 
               });
             
             
        }
        catch(err){
            console.log(err)
            return res.status(500).send("internal server error...")
        }
    })

//edit admin details
app.put("/editadmindetails/:id",userUpload.single("userimg"), async(req,res)=>{
    try{
        const {username, email, password} = req.body; 

        let images;
         if( req.body.userimg === 'null'){
             images = null
         }
         else{
        //   images =req.protocol + '://' + req.get('host') + '/UserImages/' + req.file.filename;
        images = req.file.filename;
         }

        // Generate a salt
    const salt = await bcrypt.genSalt(10);

    // Generate bcrypt password hash
    const hashedPassword = await bcrypt.hash(password, salt);

        await mcreate.findByIdAndUpdate(req.params.id, {
            userimg : images,
            username : username,
            email : email, 
            password : hashedPassword
        }, {new : true})
        .then(updatedUser => {
            if (!updatedUser) { 
              return res.status(404).json({ message: 'Error for Update  Client' });
             }
             return res.send({status: 200, message: "Admin Profile Updated successsfull..."});
           });
         
         
    }
    catch(err){
        console.log(err)
        return res.status(500).send("internal server error...")
    }
})

//signin user

app.post("/signin", async(req,res)=>{
    try{
        const {email,password} = req.body;

        if(!email || !password) {
            return res.send({status:400, message:"Fill the Fields First..."})
        }

        let exist = await mcreate.findOne({email:email})

        
        if(!exist){
            return res.send({status:400, message:"Invalid Email..."})
        }
         // Compare bcrypt hash of password and signin password
         const passwordMatch = await bcrypt.compare(password, exist.password);   
         //console.log("first", password, exist.password);  

         if (!passwordMatch) {
             return res.json({status : 400, response : false, message: 'Invalid Password Credential' }); //Passwords do not match
             }

         
        //json web token
        let payload = {
            user : {
                id : exist.id 
            }
        }
        jwt.sign(payload, JWT_SECRET_KEY, {expiresIn:"1d"}, (err,token)=>{  
            if(err) {
                console.log(err)
            }
            return res.json({status:200, token:token, message:"login successfully.."}) //send token

        })


    }
    catch(err){
        console.log(err) 
        return res.send({status:500, message:"internal server error line:87"})
    } 
})


//company profile


//multer image store in a images file

app.use("/companyprofileimg", express.static("companyprofileimg"))

const companyprofile_storage = multer.diskStorage({
    destination: (req, file, cb)=> {
      cb(null, 'companyprofileimg');  
    },
    filename: (req, file, cb)=> {
        //console.log(file)
      cb(null, Date.now() + path.extname(file.originalname)); 
    } 
  });

  //image file type  check
  const companyprofile_filefilter = (req, file, cb) => {
    if ( 
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, "Only image files are allowed");
    }
  };
  
  const companyprofile_upload = multer({ storage: companyprofile_storage, filefilter: companyprofile_filefilter });
  //multer image store in a images file end


app.post("/companyprofile",companyprofile_upload.single("company_logo"), async(req, res)=>{
    try{
        const {company_name, GST_No, mobile_No, email, address} = req.body;
        console.log("first", req.body)

        let images;
         if( req.body.company_logo === 'null' || ""){
             images = null
         }
         else{
        //   images =req.protocol + '://' + req.get('host') + '/companyprofileimg/' + req.file.filename;
        images = req.file.filename;
         }



        let exist = await company_profileModel.findOne({email:email})  
       
        if(exist){
            return res.send({status:400, message:"profile already exist for this Email"})
        }

        let data = new company_profileModel({company_name, GST_No, mobile_No, email, address, company_logo : images})
        await data.save();

        return res.json({status:200, message:"create profile successfully... "}) 
        

    }
    catch(err){
        console.log(err)
        return res.send({status:500, message:"internal server error line:44",})  
    }
})

//get company profile list

app.get("/getcompanyprofile",async(req,res)=>{
    try{
        
        return res.status(200).json(await company_profileModel.find())
     }
     catch(err){
         console.log(err)
         return res.status(500).send("internal server error...")
     }
})

//update company profile data
//edit product list


app.put("/updatecompanyprofiledata/:id",companyprofile_upload.single("company_logo"),async(req,res)=>{
    try{
    
         const userId = req.params.id;
         const {company_name, GST_No, mobile_No, email, address} = req.body;
          
         

         let images;
         if(req.body.company_logo === '' || null){ 
             images = null
         }
         else{
        //   images =req.protocol + '://' + req.get('host') + '/companyprofileimg/' + req.file.filename;
        images = req.file.filename
         }


          await company_profileModel.findByIdAndUpdate(userId, { company_name, GST_No, mobile_No, email, address, company_logo : images}, {new:true})
         .then(updatedUser => {
            if (!updatedUser) { 
              return res.status(404).json({ message: 'User not found' });
             }
             return res.json({status: 200, message: "Profile Updated successsfull..."}); 
           })
          
    }
    catch(err){
        console.log(err)
        return res.json({status:500, message:"internal server error line:407"})
    }
 })
//delete company profile data

app.delete("/deletecompanyprofiledata/:id",async(req,res)=>{
    try{
        await company_profileModel.findByIdAndDelete(req.params.id)

        return res.status(200).json(await company_profileModel.find())
    }
    catch(err){
        console.log(err)
        return res.status(500).send("internal server error...")
    }
}) 


//all protected routes

app.get(["/dashboard", "/edituser", "/companyprofile", "/companyprofiledata", "/editcompanyprofiledata", "/invoice", "/addinvoice", "/inviocedetails", "/quotation", "/addquotation", "/quotationdetails", "/salespayment", "/salespaymentdetails", "/taxes", "/users", "/salepaymentsummary", "/salereport", "/clientwisesalereport", "/saleperiod", "/expansesreport", "/transcationlist", "/newtranscation", "/viewcompanyprofiledata", "/registeruser", "/viewregisteruser", "/editregisteruser", "/viewuser", "/categories"], middleware1, async(req,res)=>{
    try{
        let exist = await mcreate.findById(req.user.id)
        if(!exist){ 
            return res.send({status:400, message:"user not found"}) 
        }
        // Exclude the password field from the user object
        const userWithoutPassword = { ...exist.toObject() };
        delete userWithoutPassword.password;
 
    // Send the user data without the password field to the front end
    return res.status(200).json(userWithoutPassword);
     }
     catch(err){
         console.log(err)
         return res.status(500).send("internal server error...")
     }
     

})



//category
app.post("/category", async(req, res)=>{
    try{
        const {producttype} = req.body;
        
        let exist = await CategoryModel.findOne({producttype : producttype});

        if(!exist){
            let saveCategory = new CategoryModel({producttype});

            await saveCategory.save();
            return res.json({status : 200, message:'Category Added'});
        }
        else{
            return res.json({status : 400, message :"Already Exist"});
        }

    }
    catch(err){
        console.log(err);
        return res.status(500).send("internal server error...");
    }
})


//get category list
app.get("/getcategory", async(req,res)=>{
    try{
        return res.json(await CategoryModel.find())
        
    }
    catch(err){
        console.log(err);
        return res.status(500).send("internal server error...");
    }
})

//delete category

app.delete("/deletecategory/:id", async(req,res)=>{
    try{
        await CategoryModel.findByIdAndDelete(req.params.id);

        return res.status(200).json(await CategoryModel.find())
    }catch(err){
        console.log(err);
        return res.status(500).send("internal server error...");
    }
})

//edit category

app.put("/editcategory/:id", async(req, res)=>{
    try{
        const {editproducttype} = req.body;
        //console.log("scfdvfvgb", editproducttype); 

        await CategoryModel.findByIdAndUpdate(req.params.id, {producttype : editproducttype}, {new : true}
            ).then(updatedproducttype => {
                if (!updatedproducttype) { 
                  return res.status(404).json({ message: 'product type not found' });
                 }
                 return res.send({status: 200, message: "Product Type Updated successsfull..."});
               });

    }catch(err){
        console.log(err);
        return res.status(500).send("internal server error...");
    }
})




//addinvoice post route

app.post("/invoicetransaction", async(req,res)=>{
    try{
       // console.log("invoicetransaction", req.body)

       const {invoiceno, dateofpurchase, paymentstatus, vendorname, vendorGSTno, vendoremail, vendornumber, vendoraddress, paymentmethod, holdername, cardnumber, subtotal, SGST, CGST, totalAmount, receiveAmount, rows} = req.body;

       let exist = await AddinvoiceModel.findOne({invoiceno : invoiceno});

       if(!exist){

       let savepurchase = new AddinvoiceModel({invoiceno, dateofpurchase, paymentstatus, vendorname, vendorGSTno, vendoremail, vendornumber, vendoraddress, paymentmethod, holdername, cardnumber, subtotal, SGST, CGST, totalAmount, receiveAmount, rows});

       await savepurchase.save();
       return res.json({status: 200, message :"Generate Invoice successfully..."});

       }
       else{
        return res.json({status: 400, message :"Result in Error For Generating Invoice"});
       }


       //check exist product in addproductschema
    
    //    let exist = await addproductschema.findOne({productname:productname});
       
    //    if(!exist) {
    //        return res.send({status:400, message : "product not found..."})
    //    }
    //    else{
    //        let totalQuantity = exist.items - quantity; 

    //        await addproductschema.findByIdAndUpdate(exist._id, {items: totalQuantity}, {new:true}).then(updateproduct => {
    //                 if (!updateproduct) { 
    //                   return res.status(404).json({ message: 'Not purchase The Product... ' });
    //                  }
    //                  return res.send({status: 200, message: "update purchase item successfully..."});
    //                })
    //    }

    // let results = []; // Array to store the results of each iteration

    // for (let i = 0; i < rows.length; i++) {

    // let mapp = rows[i].productname;
    // let exist = await addproductschema.findOne({ productname: mapp }); 

    // if (!exist) {
    //     // If product doesn't exist, add an error message to the results array
    //     results.push({ status: 400, message: "Product not found..." });
    // } else {
    //     let qua = rows[i].quantity;
    //     let totalQuantity = Number(exist.items) - Number(qua);

    //     await addproductschema.findByIdAndUpdate(exist._id, { items: totalQuantity }, { new: true })
    //     .then(updateproduct => {
    //         if (!updateproduct) {
    //         // If product update fails, add an error message to the results array
    //         results.push({ status: 404, message: 'Failed to update the product...' });
    //         } else {
    //         // If product update succeeds, add a success message to the results array
    //         results.push({ status: 200, message: 'Generate Invoice successfully...' });
    //         }
    //     })
    //     .catch(error => {
    //         // If an error occurs during the update, add an error message to the results array
    //         results.push({ status: 500, message: 'Internal server error...' });
    //     }); 
    // }
    // }

    // //Send the accumulated results as a response
    // res.send(results);

    }
    catch(err){
        console.log(err);
        return res.status(500).send("internal server error..."); 
    }
   
})

//addinvoice get route

app.get("/getinvoicetransaction", async(req,res)=>{
    try{
        
        return res.status(200).json(await AddinvoiceModel.find())
    }
    catch(err){
        console.log(err)
        return res.status(500).send("internal server error...")
    }
})

//delete invioce data

app.delete("/deleteinvoicetransaction/:id", async(req,res)=>{

    try{
        await AddinvoiceModel.findByIdAndDelete(req.params.id)

        return res.status(200).json(await AddinvoiceModel.find())
    }
    catch(err){
        console.log(err)
        return res.status(500).send("internal server error...")
    }
    
})


 // register user details (sales user)

 //multer image store in a images file

// app.use("/RegisterUserImages", express.static("RegisterUserImages"))

// const registerUserStorage = multer.diskStorage({
//     destination: (req, file, cb)=> {
//       cb(null, 'RegisterUserImages'); 
//     },
//     filename: (req, file, cb)=> {
//         //console.log(file)
//       cb(null, Date.now() + path.extname(file.originalname)); 
//     } 
//   }); 


  //image file type  check
//   const registerUserImgfilter = (req, file, cb) => { 
//     if (
//       file.mimetype === 'image/png' ||
//       file.mimetype === 'image/jpg' ||
//       file.mimetype === 'image/jpeg'
//     ) {
//       cb(null, true);
//     } else {
//       cb(null, "Only image files are allowed");
//     }
//   };
  
  //const registerUserUpload = multer({ storage: registerUserStorage, filefilter: registerUserImgfilter });
  //multer image store in a images file end

app.post("/registeruserdetails", async(req,res)=>{
   // console.log("second", req.body)
 

    try{
         const {registerusergstno, registerusername, registeruseremail, registerusernumber, registeruseraddress} = req.body;
        //  let images;
        //  if( req.body.userimg === 'null'){
        //      images = null
        //  }
        //  else{
        // //   images =req.protocol + '://' + req.get('host') + '/RegisterUserImages/' + req.file.filename;
        // images = req.file.filename;
        //  }

         let exist = await addRegisterUserDetailsModel.findOne({registeruseremail:registeruseremail});

         if(exist){
             return res.send({status:400, message:"Customer Already Exist"})
         }
         else{
             let saveData = new addRegisterUserDetailsModel({registerusergstno, registerusername, registeruseremail, registerusernumber, registeruseraddress})
             await saveData.save().then(respo=> res.send({status:200, message : "Client Added Successfull..."})).catch(err=> console.log(err));
         }
    }
    catch(err){
        console.log(err)
        return res.status(500).send("internal server error...")
    }
})

// get register user details (sales user)

app.get("/getregisteruserdetails", async(req,res)=>{
    try{
         res.status(200).json(await addRegisterUserDetailsModel.find()) 
    }
    catch(err){
        console.log(err)
        return res.status(500).send("internal server error...")
    }
}) 


// delete register user details (sales user)

app.delete("/deleteregisteruserdetails/:id", async(req,res)=>{
    try{
         await addRegisterUserDetailsModel.findByIdAndDelete(req.params.id);

         return res.status(200).json(await addRegisterUserDetailsModel.find())
    }
    catch(err){
        console.log(err)
        return res.status(500).send("internal server error...")
    }
})

// update register user details (sales user)

app.put("/editregisteruserdetails/:id", async(req,res)=>{
    try{
        const {editregisterusergstno, editregisterusername, editregisteruseremail, editregisterusernumber, editregisteruseraddress} = req.body;

        await addRegisterUserDetailsModel.findByIdAndUpdate(req.params.id, {
            registerusergstno : editregisterusergstno,
            registerusername : editregisterusername, 
            registeruseremail : editregisteruseremail,
            registerusernumber : editregisterusernumber,
            registeruseraddress : editregisteruseraddress
        }, {new : true})
        .then(updatedUser => {
            if (!updatedUser) { 
              return res.status(404).json({ message: 'Error for Update  Client' });
             }
             return res.send({status: 200, message: "Client Updated successsfull..."});
           });
         
         
    }
    catch(err){
        console.log(err)
        return res.status(500).send("internal server error...")
    }
})


//add quotatio post requerest

app.post("/quotationtransaction", async(req,res)=>{
    try{
        let {quotationno, dateofpurchase, paymentstatus, vendorname, vendorGSTno, vendoremail, vendornumber, vendoraddress, paymentmethod, holdername, cardnumber, subtotal, SGST, CGST, totalAmount, rows} = req.body;

        let exist = await AddinvoiceModel.findOne({quotationno : quotationno});

        if(!exist){

        let saveData = new QuotationTransactionModel({quotationno, dateofpurchase, paymentstatus, vendorname, vendorGSTno, vendoremail, vendornumber, vendoraddress, paymentmethod, holdername, cardnumber, subtotal, SGST, CGST, totalAmount, rows});

        await saveData.save().then(respo=> res.send({status:200, message : "Quotation Added..."})).catch(err=> console.log(err));
        }
        else{
            return res.json({status: 400, message :"Result in Error For Generating Quotation"});
           }

    }
    catch(err){
        console.log(err)
        return res.status(500).send("internal server error...")
    }
})

//get quotation transcation data

app.get("/getquotationtransaction", async(req,res)=>{
    try{
        return res.status(200).json(await QuotationTransactionModel.find())
    }
    catch(err){
        console.log(err)
        return res.status(500).send("internal server error...")
    }
})

//delete quotation transaction

app.delete("/deletequotationtransaction/:id", async(req,res)=>{
    try{
        await QuotationTransactionModel.findByIdAndDelete(req.params.id);

        return res.json(await QuotationTransactionModel.find())
    }
    catch(err){
        console.log(err)
        return res.status(500).send("internal server error...")
    }
})


//payment transcation post method

app.post("/salespayments", async(req,res)=>{
    try{
        const {dateOfPayment, invoiceno , vendorname , totalAmount ,receiveAmount,  PayAmount, paymentmethod , paymentstatus ,holdername, cardnumber, TranscationID } = req.body;
        const receiveAmounts =Number(receiveAmount) + Number(PayAmount); 

        let salesdata = new salesPaymentsSchema({dateOfPayment, invoiceno , vendorname , totalAmount , receiveAmount : receiveAmounts, PayAmount, paymentmethod , paymentstatus ,holdername, cardnumber, TranscationID});
 
        await salesdata.save();

        //update invoice transaction model 

        let exist = await AddinvoiceModel.findOne({invoiceno : invoiceno});

        if(!exist){
            res.status(400).send("Invoice No Not Found...")
        }
        
        if(paymentmethod === "Google Pay"){
            await AddinvoiceModel.findByIdAndUpdate(exist._id, {paymentmethod : paymentmethod, paymentstatus : paymentstatus, holdername : holdername, cardnumber :TranscationID, receiveAmount :receiveAmounts  }, {new: true})
            .then(transcation => {
                if (!transcation) {
                res.send({ status: 404, message: 'Payment Transcation Failed ...' });
                } else {
                res.send({ status: 200, message: 'Payment successfully...' });
                }
            })
            .catch(error => {
                // If an error occurs during the update, add an error message to the results array
                res.send({ status: 500, message: 'Internal server error...' });
            });
           
        }

        if(paymentmethod === "Credit Card"){
            await AddinvoiceModel.findByIdAndUpdate(exist._id, {paymentmethod : paymentmethod, paymentstatus : paymentstatus, holdername : holdername, cardnumber :cardnumber, receiveAmount :receiveAmounts }, {new: true})
            .then(transcation => {
                if (!transcation) {
                res.send({ status: 404, message: 'Payment Transcation Failed ...' });
                } else {
                    res.send({ status: 200, message: 'Payment successfully...' });
                }
            })
            .catch(error => {
                // If an error occurs during the update, add an error message to the results array
                res.send({ status: 500, message: 'Internal server error...' });
            });
           
        }

        if(paymentmethod === "Cash"){
            await AddinvoiceModel.findByIdAndUpdate(exist._id, {paymentmethod : paymentmethod, paymentstatus : paymentstatus, holdername : holdername, cardnumber :cardnumber, receiveAmount :receiveAmounts }, {new: true})
            .then(transcation => {
                if (!transcation) {
                 res.send({ status: 404, message: 'Payment Transcation Failed ...' });
                } else {
                    res.send({ status: 200, message: 'Payment successfully...' });
                }
            })
            .catch(error => {
                // If an error occurs during the update, add an error message to the results array
                res.send({ status: 500, message: 'Internal server error...' });
            });
           
        }

        if(paymentmethod === "Bank Transfer"){
            await AddinvoiceModel.findByIdAndUpdate(exist._id, {paymentmethod : paymentmethod, paymentstatus : paymentstatus, holdername : holdername, cardnumber :cardnumber, receiveAmount :receiveAmounts }, {new: true})
            .then(transcation => {
                if (!transcation) {
                res.send({ status: 404, message: 'Payment Transcation Failed ...' });
                } else {
                    res.send({ status: 200, message: 'Payment successfully...' });
                }
            })
            .catch(error => {
                // If an error occurs during the update, add an error message to the results array
                res.send({ status: 500, message: 'Internal server error...' });
            });
           
        }




     }
     catch(err){
         console.log(err)
         return res.status(500).send("internal server error...")
     }
})

//get sales payments

app.get("/getsalespayment", async(req,res)=>{
    try{
        res.status(200).json(await salesPaymentsSchema.find());
    }
    catch(err){
        console.log(err)
         return res.status(500).send("internal server error...")
    }
})


                                                                                            //demo  live capture image

app.use("/Captureimg", express.static("Captureimg"))

const captureimgStore = multer.diskStorage({
    destination: (req, file, cb)=> {
      cb(null, 'Captureimg'); 
    },
    filename: (req, file, cb)=> {
        
      cb(null, Date.now() + path.extname(file.originalname)); 
    } 
  }); 


  //image file type  check
  const captureimgFilter = (req, file, cb) => { 
    if ( 
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, "Only image files are allowed");
    }
  };
  
  const captureimgUpload = multer({ storage: captureimgStore, filefilter: captureimgFilter });
  //multer image store in a images file end


app.post("/captureImg", captureimgUpload.single("photo"),async(req,res)=>{
    try{
        console.log("first", req.body, req.file);

        // let images =req.protocol + '://' + req.get('host') + '/Captureimg/' + req.file.filename; 
        images = req.file.filename;

        let saveCapture = new captureImgModel({photo:images});
        await saveCapture.save();

        res.json({status:200, message:"successfull"})
    }
    catch(err){
        console.log(err)
        res.json({status:500, message:"not send"})
    }
})


//expanse post request

app.post("/expansesdetails", async(req, res)=>{
    try{

        const {expanseDate, expansestype, details, amount, PaymentDetails} = req.body;

        let sav = new expansesModel({expanseDate, expansestype, details, amount, PaymentDetails});

        await sav.save();

        return res.json({status:200, message : "expanses added..."});

    }catch(err){
        console.log(err)
        res.json({status:500, message:"not send"})
    }
})

//get expanses
app.get("/getexpansesdetails", async(req, res)=>{
    try{

        return res.json(await expansesModel.find())
    }catch(err){
        console.log(err)
        res.json({status:500, message:"not send"}) 
    }
})



//capturing img 

app.get("/getCaptureImg", async(req,res)=>{

    try{
        res.status(200).json(await captureImgModel.find());
    }
    catch(err){
        console.log(err);
        res.send({status : 500, message:"internal server error"})
    }
})

app.listen(port, ()=>console.log(`server is running at port : ${port}...`))