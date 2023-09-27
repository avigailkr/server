const {Router} = require('express');//ייבוא הראוטר ממודול אקספרס
const imgRouter=new Router();//יצירת מופע ממחלקת הראוטר
const path = require('path');


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

//to 2 fils or more....
// upload.fields(["image1", "image2"]), (req, res) => {
//     // קבל את הנתיבים של הקבצים שהועלו
//     const image1Name = req.file.image1.filename;
//     const image2Name = req.file.image2.filename;


//העלאת תמונה לSQL
imgRouter.post("/uploadImage", upload.single("image"), async (req, res)=>{
    try{
    const id=parseInt(req.body.idProp)+1;
     console.log(req.body.idProp)
     const imageName=req.file.filename;
     
    
     const query=`INSERT INTO nadlan.images (IdProp, Name, File) VALUES (${id},'${imageName}','images/${imageName}')`
     const rezult=await promiseQuery(query);
     res.send("uploaded!!!");
}
catch(e){
    console.log(e)
    res.send(e.sqlMessage)
}
})

imgRouter.put("/updateIdImage", async (req, res)=>{
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


imgRouter.get("/getAllImagesById/:id", async (req, res)=>{

  try{
   const query=`SELECT * FROM nadlan.images where IdProp=${req.params.id}`
   const rezalt=await promiseQuery(query);
   
   const rez2=[];
   rezalt.map((item,index)=>{
    // console.log(item.Name);
   const path=`images/${item.Name}`;
  //  console.log(path);
   rez2[index]=path;
   })
   
   res.send(rezalt);
  }
  catch(e){
    console.log(e)
    res.send(e.sqlMessage)
  }
})

//מביאה לי נתיב של התמונה
imgRouter.get("/apiImage", (req, res) => {
  const { imageName } = req.params;

  const imagePath = path.join(__dirname,'images', imageName);

  res.sendFile(imagePath);
  
});



module.exports=imgRouter;