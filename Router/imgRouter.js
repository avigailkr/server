const {Router} = require('express');//ייבוא הראוטר ממודול אקספרס
const imgRouter=new Router();//יצירת מופע ממחלקת הראוטר

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

module.exports=imgRouter;