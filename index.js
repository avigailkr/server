const cors=require("cors");
//const io=require("socket.io");
const express=require("express");
const bodyparser=require("body-parser");
const app=express();




//ייבוא הראוטרים
const userrouter=require("./Router/userRouter");
const proprouter=require("./Router/propRouter");
const chatrouter=require("./Router/chatRouter");
const statisticRouter=require("./Router/statisticRouter");
const likeRouter=require("./Router/likeRouter");
const imgRouter=require("./Router/imgRouter");
const filterRouter=require("./Router/filterRouter")


app.use(cors());//מאפשר גישה מאתר לאתר
app.use(bodyparser.json());//מקבל מידע ומחזיר כמחרוזת
//app.use(express.static("html"));//clian של ה-htmlחשיפת קובץ   ה 

const port=8080;
const listener=app.listen(port,()=>{console.log("running server")});//תאזין ךפורט

// const socketServer=io(listener)//express של listenמשתנה שיכיל מה שחוזר מהפונקציה 
// let userCount=1;
// //socketServer-
// //socketsמאפשר להגיע לכל ה
// //on-שמחוברים ולהאזין
// //connection-לקוח חדש מצטרף לרשימה הזאת
// socketServer.on('connection', socket=> {
//    userCount++;
//    const username=`Guest ${userCount}`;

//    //פונקציות
//    //הודעה להוספת משתמש
//    //socket.emit('SET_USERNAME',username);
//    // הוספת משתמש בשרת
// //    socketServer.sockets.emit('CREATE_MASSAGE',{
// //     content:`${username} connected`
// //    });

// //שליחת הודעה לשרת
//    socket.on('SEND_MASSAGE',massageObject=>{
//     socketServer.sockets.emit('CREATE_MASSAGE',massageObject)
//    });

//    //משתמש שהתנתק
// //    socket.on('disconnected',()=> {
// //         socketServer.sockets.emit('CREATE_MASSAGE',{
// //         content:`${username} disconnected`

// //         })
// //     });
//  });

const {mysqlConnection}=require("./sql");//חיבור לדאטה בייס
mysqlConnection.connect((err)=>{
    if(!err)
    console.log("successful")
    else
    console.log("error")
})

//ניתוב שיעביר לראוטר
app.use("/user",userrouter);
app.use("/property",proprouter);
app.use("/chat",chatrouter);
app.use("/statistic",statisticRouter);
app.use("/like",likeRouter);
app.use("/img",imgRouter);
app.use("/filter",filterRouter)