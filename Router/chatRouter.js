const {Router} = require('express');//ייבוא הראוטר ממודול אקספרס
const chatRouter=new Router();//יצירת מופע ממחלקת הראוטר

const {promiseQuery}=require("../sql")//ייבוא של אובייקט שיודע לשלוח שאילתה

//שליפת הודעות של חדר מסויים
chatRouter.get("/getChat/:idroom",async (req,res)=>{
    try{
    const query=`SELECT Massage,IdUser FROM nadlan.chat where IdRoom=${req.params.idroom}`;
    const rows= await promiseQuery(query);
    res.send(rows);}
    catch(e){
        console.log(e)
        res.send(e.sqlMessage)
    }

})
//מחיקת צאט של חדר מסויים
chatRouter.delete("/deleteMass/:id",async(req,res)=>{

    try{
    const query=`DELETE FROM nadlan.chat WHERE IdRoom=${req.params.id} `;
    const result=await promiseQuery(query);
    res.send(result);}
    catch(e){ 
        console.log(e)
        res.send(e.sqlMessage)
    }
    
})


//הוספת הודעה
chatRouter.post("/AddMass",async (req,res)=>{ 
    const DetailsMass=req.body;
    //איך עושים תאריך נוכחייייייייייייייייי
    const query=`INSERT INTO nadlan.chat  VALUES(0,${DetailsMass.idroom},${DetailsMass.iduser},'${DetailsMass.massage}','2000-4-6')`;
    const result=await promiseQuery(query);
    const query2=`SELECT * FROM nadlan.chat WHERE chat.Massage='${DetailsMass.massage}' order by chat.Id desc LIMIT 1`
    const result2=await promiseQuery(query2);
    console.log(result2[0])
    res.send(result2[0]);
})


//הוספת חדר- פתיחת חדר לשיחה חדשה
chatRouter.post("/addRoom",async (req,res)=>{ 
    const DetailsMass=req.body;
        try{
        const query=`INSERT INTO nadlan.room (UserId1,UserId2,Private)  VALUES(${DetailsMass.id1},${DetailsMass.id2},True)`;
        const result=await promiseQuery(query);
        const query2=`SELECT Id FROM nadlan.room WHERE UserId1=${DetailsMass.id1} and UserId2=${DetailsMass.id2} or UserId1=${DetailsMass.id2} and UserId2=${DetailsMass.id1}`;
    const result2= await promiseQuery(query2);
        res.send(result2);
    
    
    }
        catch(e){
            console.log(e)
            res.send(e.sqlMessage)
        }
        
})


//שליפת חדר
chatRouter.get("/getRoom/:id1/:id2",async (req,res)=>{
    try{
    const query=`SELECT Id FROM nadlan.room WHERE UserId1=${req.params.id1} and UserId2=${req.params.id2} or UserId1=${req.params.id2} and UserId2=${req.params.id1}`;
    const rows= await promiseQuery(query);
    res.send(rows);}
    catch(e){
        console.log(e)
        res.send(e.sqlMessage)
}})

//שליפת שם בעל הדירה 
chatRouter.get("/getNameOwner/:id",async (req,res)=>{
    try{
    const query=`SELECT Name FROM nadlan.user WHERE Id=${req.params.id}`;
    const rows= await promiseQuery(query);
    res.send(rows);}
    catch(e){
        console.log(e)
        res.send(e.sqlMessage)
}})
module.exports=chatRouter;




//שלבים בבניית צאט בזמן אמת

//server
//התקנה 
//npm i socket.io --save

//index.js:
//const io=require("socket.io");
//app.use(express.static(___dirname));clian של ה-htmlחשיפת קובץ   ה 
//const socketServer=io(listener)//express של listenמשתנה שיכיל מה שחוזר מהפונקציה 
//io פונקציות בשרת ה 
//socketServer.sockets.on('connection', function (socket) {
//     console.log('new client connected');

//     socket.on('echo', function(data) {
//         socket.emit('echo', data);
//     });
// });

//react
//התקנה
//npm i socket.io-client --save
//Chat
//import socketIoClient from  'socket.io-client';
// import socketIoClient from  'socket.io-client'; 
// import React from 'react';
//let socket=null;
//האזנות
// if(socket===null)
//     socket=socketIoClient('http://localhost:8080')
  
//     socket.on('SET_USERNAME',username=>{//הוספת המשתמש
//       this.setState({username});
//     })
//     socket.on('CREATE_MASSAGE',massageObject=>{//הוספת המשתמש
//       this.setState({
//         massages:[...this.state.massage,massageObject]
//       });
//       this.myref.current.scrollTop=this.myref.current.clientHeight;//כל פעם שיש הודעה חדשה נראה אותה ולא נצטרך לגלול
//     })
  
//     this.myref=React.createRef();//שרואים את ההודעה האחרונה בלי להוריד למטה



