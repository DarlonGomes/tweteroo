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
    users.push(login);
    res.status(201).send("OK");
})

app.post("/tweets", (req, res) => {
    const tweetID = tweets.length;
    const tweet = {id: tweetID, username: req.headers.user, tweet: req.body.tweet}
    for(let i = 0; i < users.length; i++){
        const user = users[i];
        if( user.username === tweet.username){
            tweet.avatar = user.avatar;
            break;
        }
    }

    tweets.unshift(tweet);
    res.status(201).send("OK");
})

app.get("/tweets", (req, res) => {
   
    res.send(tweets);
})

app.listen(5000);