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

    // adress: "שלום עליכם 6"
    // date:  "גמיש"
    // fileName: "isaac-benhesed-1SbJCq-vHpI-unsplash.jpg"
    // floor: "1"
    // halfRoom:  true
    // image:  "blob:http://localhost:3000/62c99542-e35c-4f81-aef1-8248889eb884"
    // inFloor  : "1"
    // mr: "1200"
    // name :  "אביגיל"
    // phoneNumber: 
    // "054678665" plus
    // :  {מרפסת: false, סורגים: true, ממ"ד: true, מחסן: false, מעלית: true, …}
    // price :  "1000000"
    //  rihut :  "ללא"
    // room: "6"
    // sito : "חדש"
    // status: "rent"
    // type: "דירה"


// ,${prop.IdCity} ,${prop.plus}$ ,{prop.IdKindProp}  ,
//  ${prop.ShowPrice},${prop.IdStatus}, '${prop.Description}',${prop.IdEnterDate}

    const query=`INSERT INTO nadlan.property (Price, IdCity, Adress, Sqm, Mmd, IdKindProp, IdTypeSale, InsertDate, IdUser, ShowPrice, Floor, InFloor, RoomNum, Active, IdStatus, Description, ImgUrl, IdEnterDate) VALUES 
    (${prop.price},${prop.city},'${prop.adress}',null,
    ${prop.halfRoom},${prop.type},${prop.isSale},'${prop.InsertDate}',${prop.IdUser},${prop.showPrice},
    ${prop.floor},${prop.inFloor},${prop.room},true,null,'${prop.discription}',
    null,${prop.date})`;
    // const query2=`SELECT  id FROM tasks.tasks WHERE tasks.desc='${task.desc}'`

    const result=await promiseQuery(query);
    // const result2=await promiseQuery(query2);
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
