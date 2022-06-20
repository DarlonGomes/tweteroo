import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const users = [];
const tweets = [];

app.post("/sign-up", (req, res) => {

    const userID = users.length;
    const login = {id: userID, ...req.body};
    if(login.username === '' || login.avatar === ''){
        return res.status(400).send("Todos os campos são obrigatórios")
    }
    users.push(login);
    res.status(201).send("OK");
})

app.post("/tweets", (req, res) => {
    const tweetID = tweets.length;
    const tweet = {id: tweetID, username: req.headers.user, tweet: req.body.tweet}
    if(tweet.username === '' || tweet.tweet === ''){
        return res.status(400).send("Todos os campos são obrigatórios")
    }
    for(let i = 0; i < users.length; i++){
        const user = users[i];
        if( user.username === tweet.username){
            tweet.avatar = user.avatar;
            break;
        }
    }

    tweets.unshift(tweet);
    return res.status(201).send("OK");
})

app.get("/tweets", (req, res) => {
   
    return res.send(tweets.slice(0,10));
})

app.listen(5000);