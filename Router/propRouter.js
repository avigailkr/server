const {Router} = require('express');//ייבוא הראוטר ממודול אקספרס
const propRouter=new Router();//יצירת מופע ממחלקת הראוטר

const {promiseQuery}=require("../sql")//ייבוא של אובייקט שיודע לשלוח שאילתה

//שליפת כל הדירות
propRouter.get("/getAllPropertys",async (req,res)=>{
    try{
    const query=`SELECT * FROM nadlan.property`;
    const rows= await promiseQuery(query);
    res.send(rows);}
    catch(e){
        console.log(e)
        res.send(e.sqlMessage)
    }

})
//שליפת כל הדירות של משתמש מסויים
propRouter.get("/getAllApartmentsByUserId/:id",async (req,res)=>{
    try{
    const queryString=`SELECT * FROM  nadlan.property WHERE IdUser=${req.params.id}`;
    const rows= await promiseQuery(queryString);
    res.send(rows);}
    catch(e){
        console.log(e)
        res.send(e.sqlMessage)
}})
//שליפת בעל הדירה 
propRouter.get("/getOwner/:id",async (req,res)=>{
    try{
    const query=`SELECT * FROM nadlan.user WHERE Id=${req.params.id}`;
    const rows= await promiseQuery(query);
    res.send(rows);}
    catch(e){
        console.log(e)
        res.send(e.sqlMessage)
}})
//מחיקת דירה
propRouter.put("/deleteProp/:id",async(req,res)=>{
    const id=req.params.id;
    const query=`UPDATE nadlan.property SET
    Active=False
    WHERE Id=${id}
`;
    const result=await promiseQuery(query);
    res.send(result);
})

//הוספת דירה
propRouter.post("/addProp",async (req,res)=>{
    const prop=req.body;
    console.log(prop)
console.log(prop.adress)
    const query=`INSERT INTO nadlan.property (Price, IdCity, Adress, Sqm, IdKindProp, IdTypeSale, InsertDate, IdUser, ShowPrice, Floor, InFloor, RoomNum, Active, IdStatus, Description, ImgUrl, IdEnterDate, HalfRoom, added, nameOwner,ActiveMyArea) VALUES 
    (${prop.price},${prop.city},'${prop.adress}',${prop.mr},
   ${prop.type},${prop.isSale},'${prop.InsertDate}',${prop.IdUser},${prop.showPrice},
    ${prop.floor},${prop.inFloor},${prop.room},true,${prop.sito},'${prop.discription}',
    null,${prop.date}, ${prop.halfRoom},'${prop.added}','${prop.name}',true)`;
    //problem in added
    const result=await promiseQuery(query);
    res.send("add property is success!!!");
});

//bring from sql all cityis
propRouter.get("/getAllCityis", async (req, res)=>{
    try{
    const query=`SELECT * FROM nadlan.city`
    const rows=await promiseQuery(query);
    res.send(rows);
     }
 catch(e){
    console.log(e)
   res.send(e.sqlMessage)
    }
    })
    
    //bring from sql all type of property
    propRouter.get("/getAllTypeProp",async (req, res)=>{
    try{
     const query=`SELECT * FROM nadlan.kindprop`
     const rows=await promiseQuery(query);
     res.send(rows);
     }
     catch(e){
    console.log(e)
     res.send(e.sqlMessage)
    }
    })
    
    //bring from sql status of property
    propRouter.get("/getStatus",async (req, res)=>{
     try{
     const query=`SELECT * FROM nadlan.status`
     const rows=await promiseQuery(query);
     res.send(rows);
     }
     catch(e){
    console.log(e)
    res.send(e.sqlMessage)
     }
    })

    //bring from sql property details
    propRouter.get("/getDetailsProp/:id", async (req, res)=>{
        try{
            const id=req.params.id;
            console.log(id);
            const query=`SELECT * FROM nadlan.property WHERE Id=${id}`
            const rows=await promiseQuery(query);
            res.send(rows)
        }
        catch(e){
            console.log(e)
            res.send(e.sqlMessage)
             }
    })
    
    
    // propRouter.put("/updateTask/:id",async (req,res)=>{
    //     const id=req.params.id;
    //     const task=req.body;
    //     const query=`UPDATE tasks SET
    //                  id='${task.id}',
    //                  desc='${task.desc}',
    //                  date=${task.date},
    //                  rank=${task.rank},
    //                  complete=${task.complete},
    //                  userId=${task.userId}
    //     `;
    //     const result=await promiseQuery(query);
    //     res.send(result);
    // })
    // aparRouter.delete("/deleteTask/:id",async(req,res)=>{
    //     const id=req.params.id;
    //     const query=`DELETE FROM tasks
    //     WHERE id=${id}`;
    //     const result=await promiseQuery(query);
    //     res.send(result);
    // })
 module.exports=propRouter;//ייצוא המופע
