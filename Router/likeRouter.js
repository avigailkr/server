const {Router} = require('express');//ייבוא הראוטר ממודול אקספרס
const likeRouter=new Router();//יצירת מופע ממחלקת הראוטר

const {promiseQuery}=require("../sql")//ייבוא של אובייקט שיודע לשלוח שאילתה

//שליפת דירה שאהבתי
likeRouter.get("/getPropLikeById/:id/:idprop",async (req,res)=>{
    try{
    const query=`SELECT * FROM nadlan.like WHERE IdUserLike=${req.params.id} and IdApartment=${req.params.idprop}`;
    const rows= await promiseQuery(query);
    res.send(rows);}
    catch(e){
        console.log(e)
        res.send(e.sqlMessage)
}})

//שליפת כל הדירות שאהבתי
likeRouter.get("/getAllLikeById/:id",async (req,res)=>{
    try{
    const query=`SELECT p.Id,Price,IdCity,Adress,Sqm,Mmd,IdKindProp,IdTypeSale,InsertDate,Floor,IdUser,ShowPrice,InFloor,RoomNum,Active,IdStatus,Description,ImgUrl,IdEnterDate,IsSaleOrRent,UpdateDate,LastDateSaleOrRent,LevelInterest FROM nadlan.property p right join nadlan.like l on p.Id=l.IdApartment 
    where l.IdUserLike=${req.params.id}`;
    const rows= await promiseQuery(query);
    res.send(rows);}
    catch(e){
        console.log(e)
        res.send(e.sqlMessage)
}})

likeRouter.delete("/deleteLike/:id/:idprop",async(req,res)=>{
    console.log(req.params.id+" "+req.params.idprop)
    try{const query=`DELETE FROM nadlan.like WHERE IdUserLike=${req.params.id} and IdApartment=${req.params.idprop}`;
    const result=await promiseQuery(query);
    res.send(result);}
    catch(e){
        console.log(e)
        res.send(e.sqlMessage)
    } 
})

likeRouter.post("/AddLike",async (req,res)=>{ 
    const like=req.body;
    console.log(like)
    const query=`INSERT INTO nadlan.like (IdUserLike,IdApartment)  VALUES(${like.iduser},${like.idprop})`;
    const result=await promiseQuery(query);
    res.send(result);
})

likeRouter.delete("/deleteLike/:id",async(req,res)=>{
    const id=req.params.id;
    const query=`DELETE FROM nadlan.like WHERE id=${id}`;
    const result=await promiseQuery(query);
    res.send(result);
})

//get- רק מקבל מהשרת בלי לקבל נתונים מהטופס
likeRouter.get("/getAllLike",async (req, res) => {
    const queryString = `SELECT * FROM nadlan.like`;
    const rows = await promiseQuery(queryString);
    res.send(rows);
})



module.exports=likeRouter;