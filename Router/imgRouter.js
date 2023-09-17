const {Router} = require('express');//ייבוא הראוטר ממודול אקספרס
const imgRouter=new Router();//יצירת מופע ממחלקת הראוטר

const fs=require('fs');//ייבוא המודול 
const multer = require("multer");

const {promiseQuery}=require("../sql")//ייבוא של אובייקט שיודע לשלוח שאילתה

//שליפת כל התמונות של דירה מסויימת
imgRouter.get("/getAllImgByPropId/:id",async (req,res)=>{
    try{
    const queryString=`SELECT * FROM  nadlan.img WHERE IdProp=${req.params.id}`;
    const rows= await promiseQuery(queryString);
    res.send(rows);}
    catch(e){
        console.log(e)
        res.send(e.sqlMessage)
}})


//יצירת אובייקט מולטר
const storage = multer.diskStorage({

  // פורמטים של הקבצים שאתה רוצה לקלוט
    fileFilter(req, file, cb) {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
      cb(null, true);
    } else {
      cb(new Error("סוג הקובץ אינו נתמך"));
    }
  },

  //יעד: לאיזו תקיה התמונה נכנסת
    destination: function (req, file, cb) {
      cb(null,'images/')
    },
    
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() 
      cb(null, uniqueSuffix + file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })


//העלאת תמונה לSQL
imgRouter.post("/uploadImage", upload.single("image"), async (req, res)=>{
    try{
    const id=parseInt(req.body.idProp)+1;
     console.log(id)
     const imageName=req.file.filename;
    
     const query=`INSERT INTO nadlan.image (Name, File) VALUES ('${imageName}','images/${imageName}')`
     const result=await promiseQuery(query);
     const query2="SELECT Id FROM nadlan.img ORDER BY Id DESC LIMIT 1"
     const result2=await promiseQuery(query2);
     console.log(result2[0].Id);
     const query3=`INSERT INTO nadlan.images (IdProp, IdImg) VALUES (${id}, ${result2})`
     res.send("uploaded!!!");
}
catch(e){
    console.log(e)
    res.send(e.sqlMessage)
}
})

//to 2 fils or more....
// upload.fields(["image1", "image2"]), (req, res) => {
//     // קבל את הנתיבים של הקבצים שהועלו
//     const image1Name = req.file.image1.filename;
//     const image2Name = req.file.image2.filename;

imgRouter.put("updateIdImage", async (req, res)=>{
  try{
    // const id=parseInt(req.body.idProp)+1;
    //  const imageName=req.file.filename;
    //  const query=`INSERT INTO nadlan.images (idProp, name, file) VALUES (${id},'${imageName}','images/${imageName}')`
    //  const result=await promiseQuery(query);
    //  res.send("uploaded!!!");

}
catch(e){
    console.log(e)
    res.send(e.sqlMessage)
}
})

module.exports=imgRouter;