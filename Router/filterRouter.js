const { Router } = require("express"); //ייבוא הראוטר ממודול אקספרס
const filterRouter = new Router(); //יצירת מופע ממחלקת הראוטר

const { promiseQuery } = require("../sql"); //ייבוא של אובייקט שיודע לשלוח שאילתה

// SELECT * FROM nadlan.property where RoomNum=1 and IdCity=1 and price<=10000 and year(InsertDate) between 2000 and 2023
//  and IdKindProp=1 and Sqm  between 200 and 500
//  and IdTypeSale=1

filterRouter.post("/getAllPropsByFilter", async (req, res) => {
  try {
    const filter = req.body;
    let queryString = "";
    
//     console.log(filter);
// if(req.body.type == [])

console.log(req.body)
    if (
      req.body.type == null ||
      req.body.city == null ||
      req.body.typesale == null
    )
      {
        if (
            req.body.type == null &&
            req.body.city == null &&
            req.body.typesale == null
          )
       {
        console.log("11111111111111111111111111")
       queryString = `SELECT * FROM nadlan.property where RoomNum>=${filter.room}
        and price between ${filter.fromprice} and ${filter.untilprice} and year(InsertDate) between ${filter.fromyear} and ${filter.untilyear}
         and Sqm  between ${filter.fromsize} and ${filter.untilsize} 
        `;
     }
       else{ 
        
        if (
            req.body.type == null &&
            req.body.city == null 
          )
   { console.log("22222222222")
   queryString = `SELECT * FROM nadlan.property where RoomNum>=${filter.room}
    and price between ${filter.fromprice} and ${filter.untilprice} and year(InsertDate) between ${filter.fromyear} and ${filter.untilyear}
     and Sqm  between ${filter.fromsize} and ${filter.untilsize} 
    and IdTypeSale=${filter.typesale}`;}
    
      else  if (
            req.body.type == null &&
            req.body.typesale == null
          )
          {console.log("3333333333333333")
          queryString = `SELECT * FROM nadlan.property where RoomNum>=${filter.room} and IdCity=${filter.city}
          and price between ${filter.fromprice} and ${filter.untilprice} and year(InsertDate) between ${filter.fromyear} and ${filter.untilyear}
          and Sqm  between ${filter.fromsize} and ${filter.untilsize} `;}
          
       else  if (
            req.body.city == null &&
            req.body.typesale == null
          )
          {console.log("4444444444444")
            queryString = `SELECT * FROM nadlan.property where RoomNum>=${filter.room}
          and price between ${filter.fromprice} and ${filter.untilprice} and year(InsertDate) between ${filter.fromyear} and ${filter.untilyear}
          and IdKindProp=${filter.type} and Sqm  between ${filter.fromsize} and ${filter.untilsize}`;}

        else if(req.body.city == null)
        {console.log("55555555555555")
        queryString = `SELECT * FROM nadlan.property where RoomNum>=${filter.room}
        and price between ${filter.fromprice} and ${filter.untilprice} and year(InsertDate) between ${filter.fromyear} and ${filter.untilyear}
        and IdKindProp=${filter.type} and Sqm  between ${filter.fromsize} and ${filter.untilsize} 
        and IdTypeSale=${filter.typesale}`;}

        else if(req.body.typesale == null)
        {console.log("666666666666666")
        queryString = `SELECT * FROM nadlan.property where RoomNum>=${filter.room} and IdCity=${filter.city}
        and price between ${filter.fromprice} and ${filter.untilprice} and year(InsertDate) between ${filter.fromyear} and ${filter.untilyear}
        and IdKindProp=${filter.type} and Sqm  between ${filter.fromsize} and ${filter.untilsize}`;}

        else if(req.body.type == null)
       {console.log("77777777777777") 
        queryString = `SELECT * FROM nadlan.property where RoomNum>=${filter.room} and IdCity=${filter.city}
       and price between ${filter.fromprice} and ${filter.untilprice} and year(InsertDate) between ${filter.fromyear} and ${filter.untilyear}
       and Sqm  between ${filter.fromsize} and ${filter.untilsize} 
       and IdTypeSale=${filter.typesale}`;}}
        
        }

          else
   { console.log("88888888888888888")
    queryString = `SELECT * FROM nadlan.property where RoomNum>=${filter.room} and IdCity=${filter.city}
        and price between ${filter.fromprice} and ${filter.untilprice} and year(InsertDate) between ${filter.fromyear} and ${filter.untilyear}
        and IdKindProp=${filter.type} and Sqm  between ${filter.fromsize} and ${filter.untilsize} 
        and IdTypeSale=${filter.typesale}`;}
    const rows= await promiseQuery(queryString);
    res.send(rows);
  } catch (e) {
    console.log(e);
    res.send(e.sqlMessage);
  }
});

//סינון דירות לפי- מקבלים את כל הדירות לפי

//עיר
//מקבלים קוד עיר ומחזירים את כל הדירות בעיר הזו
// filterRouter.get("/getAllPropsByCity/:id",async (req,res)=>{
//     try{
//     const queryString=`select * from nadlan.property a join nadlan.city c on a.IdCity=c.Id where c.Id=${req.params.id}`;
//     const rows= await promiseQuery(queryString);
//     res.send(rows);
// }
//     catch(e){
//         console.log(e)
//         res.send(e.sqlMessage)
// }})

//מחזירים את כל שמות הערים מהדאטה בייס
filterRouter.get("/getAllNamesCity", async (req, res) => {
  try {
    const queryString = `select Name from nadlan.city`;
    const rows = await promiseQuery(queryString);
    res.send(rows);
  } catch (e) {
    console.log(e);
    res.send(e.sqlMessage);
  }
});
//מקבלים שם עיר ומקבלים את המזהה שלו
filterRouter.get("/getIdCity/:name", async (req, res) => {
  try {
    const queryString = `select Id from nadlan.city where Name=${req.params.name}`;
    const rows = await promiseQuery(queryString);
    res.send(rows);
  } catch (e) {
    console.log(e);
    res.send(e.sqlMessage);
  }
});
//חדר
//מקבלים מס חד ומחזירים את הדירות שיש להם את המס הרצוי
// filterRouter.get("/getAllPropsByRoom/:roomnum",async (req,res)=>{
//     let queryString=``
//     try{
//         if(req.params.roomnum<6)
//     queryString=`select * from nadlan.property  where RoomNum=${req.params.roomnum}`;
//     else if(req.params.roomnum>=6)
//     queryString=`select * from nadlan.property  where RoomNum>=6`;
//     const rows= await promiseQuery(queryString);
//     res.send(rows);
// }
//     catch(e){
//         console.log(e)
//         res.send(e.sqlMessage)
// }})

//מחיר
//מקבלים טווח מחירים ומחזירים את הדירות שבטווח
// filterRouter.get("/getAllPropsByPrice/:minprice/:maxprice",async(req,res)=>{
//     try{
//         const queryString=`select * from nadlan.property  where Price between ${req.params.minprice} and ${req.params.maxprice}`;
//         const rows= await promiseQuery(queryString);
//         res.send(rows);
//     }
//         catch(e){
//             console.log(e)
//             res.send(e.sqlMessage)
//     }})

//גודל רבוע
//מקבלים טווח מטר רבוע ומחזירים את הדירות שבטווח
// filterRouter.get("/getAllPropsBySize/:minsize/:maxsize",async(req,res)=>{
//     try{
//         const queryString=`select * from nadlan.property  where Sqm between ${req.params.minsize} and ${req.params.maxsize}`;
//         const rows= await promiseQuery(queryString);
//         res.send(rows);
//     }
//         catch(e){
//             console.log(e)
//             res.send(e.sqlMessage)
//     }})
//סוג דירה
//מקבלים קוד סוג דירה ומחזירים את הדירות לפי קוד סוג הדירה
// filterRouter.get("/getAllPropsByTypeProp/:name",async(req,res)=>{
//     try{
//         const queryString=`select * from nadlan.property a join nadlan.kindprop k on a.IdKindProp=k.Id where k.Name='${req.params.name}'`;
//         const rows= await promiseQuery(queryString);
//         res.send(rows);
//     }
//         catch(e){
//             console.log(e)
//             res.send(e.sqlMessage)
//     }})
filterRouter.get("/getAllTypeProp", async (req, res) => {
  try {
    const queryString = `select Name from nadlan.kindprop`;
    const rows = await promiseQuery(queryString);
    res.send(rows);
  } catch (e) {
    console.log(e);
    res.send(e.sqlMessage);
  }
});
filterRouter.get("/getIdTypeProp/:type", async (req, res) => {
    try {
      const queryString = `SELECT Id FROM nadlan.kindprop where Name='${req.params.type}'`;
      const rows = await promiseQuery(queryString);
      res.send(rows);
    } catch (e) {
      console.log(e);
      res.send(e.sqlMessage);
    }
  });
//דירות למכירה או להשכרה
// filterRouter.get("/getAllPropsByTypeSale/:id",async(req,res)=>{
//     try{
//         const queryString=`select * from nadlan.property p join nadlan.typesale t on p.IdTypeSale=t.Id where t.Id=${req.params.id}`;
//         const rows= await promiseQuery(queryString);
//         res.send(rows);
//     }
//         catch(e){
//             console.log(e)
//             res.send(e.sqlMessage)
//     }})
filterRouter.get("/getIdTypeSaleProp/:typesale", async (req, res) => {
  try {
    const queryString = `SELECT Id FROM nadlan.typesale where type='${req.params.typesale}'`;
    const rows = await promiseQuery(queryString);
    res.send(rows);
  } catch (e) {
    console.log(e);
    res.send(e.sqlMessage);
  }
});
// //מצב
// //מקבלים קוד מצב ומחזירים לפי קוד הסטטוס
// filterRouter.get("/getAllPropsByStatus/:id",async(req,res)=>{
//     try{
//         const queryString=`select * from nadlan.property p join nadlan.status s on p.IdStatus=s.Id where s.Id=${req.params.id}`;
//         const rows= await promiseQuery(queryString);
//         res.send(rows);
//     }
//         catch(e){
//             console.log(e)
//             res.send(e.sqlMessage)
//     }})

// //קומה
// //מקבלים טווח קומות ומחזירים את הדירות שבטווח
// filterRouter.get("/getAllPropsByFloor/:minfloor/:maxfloor",async(req,res)=>{
//     try{
//         const queryString=`select * from nadlan.property where Floor between ${req.params.minfloor} and ${req.params.maxfloor}`;
//         const rows= await promiseQuery(queryString);
//         res.send(rows);
//     }
//         catch(e){
//             console.log(e)
//             res.send(e.sqlMessage)
//     }})
// // שנים
// //מקבלים טווח שנים ומחזירים את הדירות שתאריך העלאתם בטווח זה
// filterRouter.get("/getAllPropsByYears/:fromyear/:untilyear",async(req,res)=>{
//     try{
//         const queryString=`select * from nadlan.property where year(InsertDate) between ${req.params.fromyear} and ${req.params.untilyear}`;
//         const rows= await promiseQuery(queryString);
//         res.send(rows);
//     }
//         catch(e){
//             console.log(e)
//             res.send(e.sqlMessage)
//     }})
module.exports = filterRouter;
