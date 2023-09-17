const {Router} = require('express');//ייבוא הראוטר ממודול אקספרס
const propRouter=new Router();//יצירת מופע ממחלקת הראוטר

//ייבוא של אובייקט שיודע לשלוח שאילתה
const {promiseQuery}=require("../sql");

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
// (Price, IdCity, Adress, Sqm, IdKindProp, IdTypeSale, InsertDate, Floor, IdUser,ShowPrice, InFloor,  RoomNum, Active, IdStatus, Description,IdEnterDate,IsSaleOrRent,UpdateDate,LastDateSaleOrRent, ActiveMyArea, HalfRoom)
    const query=`INSERT INTO nadlan.property (Price, IdCity, Adress, Sqm, IdKindProp, IdTypeSale, InsertDate, Floor, IdUser,ShowPrice, InFloor,  RoomNum, Active, IdStatus, Description,IdEnterDate,IsSaleOrRent,UpdateDate,LastDateSaleOrRent, ActiveMyArea, HalfRoom) VALUES 
    (${prop.price},${prop.city},'${prop.adress}',${prop.mr},
   ${prop.type},${prop.isSale},'${prop.InsertDate}', ${prop.floor},${prop.IdUser},${prop.showPrice},
   ${prop.inFloor},${prop.room},true,${prop.sito},'${prop.discription}',
   ${prop.date}, false, NULL,NULL, false, ${prop.halfRoom})`;
    
    const result=await promiseQuery(query);
 
    //שאילתא שמחזירה את האי די של הדירה האחרונה
    const query2="select Id from nadlan.property ORDER BY Id DESC LIMIT 1"
   const rows=await promiseQuery(query2);

     res.send(rows);
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
    
    // //bring from sql idProp of property
    // propRouter.get("/getIdProp", async (req, res)=>{
    //     try{
    //         const query="select id from nadlan.property ORDER BY id DESC LIMIT 1"
    //         const rows=await promiseQuery(query);
    //         res.send(rows)
    //     }
    //     catch(e){
    //         console.log(e)
    //         res.send(e.sqlMessage)
    //          }
    // })
    
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
