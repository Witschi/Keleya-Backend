import express from 'express';
import Sequelize from 'sequelize';
import crypto from 'crypto';
import { Request, Response } from 'express';
import { createModels } from './models';
import { PostInstance } from 'models/Post';
import { UserInstance } from 'models/User';
import {verifyJWTToken,createJWTToken} from './auth';

const Op = Sequelize.Op;

const app: express.Application = express();

const sequelizeConfig = require('./config/sequelizeConfig.json');
const db = createModels(sequelizeConfig);
db.sequelize.sync();

//app.get('/', (req: Request, res: Response) => {
//  res.status(200).json({ message: 'hello, world' });
//});

//app.get('/users', (req: Request, res: Response) => {
//  db.User.findAll()
//    .then((users: UserInstance[]) => res.status(200).json({ users }))
//    .catch(err => res.status(500).json({ err: ['oops', err] }));
//	db.User.create({name:res[name]});
//});


app.get('/posts', (req: Request, res: Response) => {
  let limit = 0
  if(typeof req.query.limit != "undefined") limit = req.query.limit
  else limit=20
  db.Post.findAll({order: [['createdAt', 'DESC']], limit: limit})
    .then((posts: PostInstance[]) => res.status(200).json({ posts }))
    .catch(err => res.status(500).json({ err: ['oops', err] }));
});

app.get('/posts/:id', (req: Request, res: Response) => {
console.log(req.params.id)
console.log("a")
  db.Post.findById(req.params.id)
    .then(post => 
      res.status(200).json({ post })
    )
    .catch(err => res.status(500).json({ err: ['oops', err] }))
});

app.post('/users/auth', (req: Request, res: Response) => {
    if(typeof req.query.name == "undefined") res.status(500).json({ err: ['please provide name parameter']})
    else if(typeof req.query.password == "undefined") res.status(500).json({ err: ['please provide password parameter']})
    else db.User.findOne({ where: { name: req.query.name } }).then(user => {
       if(user.password == crypto.createHash('sha256').update(req.query.password).digest('base64')) 
		res.status(201).json({token: createJWTToken({name: req.query.name})})
	   else res.status(500).json({err: ['auth error']})
	}).catch(err => res.status(500).json({err: ['auth error']}))

})


app.post('/users', (req: Request, res: Response) => {

  let user 
  if(typeof req.query.name == "undefined") res.status(500).json({ err: ['please provide name parameter']})
  else if(typeof req.query.password == "undefined") res.status(500).json({ err: ['please provide password parameter']})
  else db.User.create({
    name: req.query.name,
	password: crypto.createHash('sha256').update(req.query.password).digest('base64'),
  })
    .then(user => res.status(201).json({ token: createJWTToken({name: req.query.name}) }))
    .catch(err => res.status(500).json({ err: ['oops', err] }))
});


app.post('/posts',(req: Request, res: Response) => {
    if(typeof req.query.title == "undefined") res.status(500).json({ err: ['please provide title parameter']})
    else
       if(typeof req.query.text == "undefined") res.status(500).json({ err: ['please provide text parameter']})
       else
         if(typeof req.header("x-token") != "undefined") 
         	verifyJWTToken(req.header("x-token")).then(token => 
	    	    db.User.findOne({ where: { name: token['data']['name'] } }).then(	
				  user => db.Post.create({
					    	  	title: req.query.title,
						    	text: req.query.text,
								author_id: user.id
     				    	}).then(post => res.status(201).json(post))
	            ).catch(err => res.status(500).json({err:err}))
			).catch(err => res.status(500).json({err:"auth fail"}))
         else res.status(500).json({err:"please provide x-token header"})

})


app.listen(3000, () => {
  console.log('App listening on port 3000');
});
