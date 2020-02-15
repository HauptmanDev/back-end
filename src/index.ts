import express from 'express'
import cors from 'cors'
import {Request, Response, NextFunction} from 'express'
import bodyParser from 'body-parser'

const app = express();

app.use(cors());

// parse application/json
app.use(bodyParser.json({limit: '50mb'}));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));

// log middleware
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log('Time: ', new Date().toString());
    console.log(req.method, req.url, 'params:', req.params);
    console.log('query:', req.query);
    console.log('body:', req.body);
    console.log('cookies:', req.cookies);
    // console.log('headers:', req.headers);
    // console.log('rawHeaders:', req.rawHeaders);
    next();
});

const fakeState = {
    counter: 0
};

const someRouter = express.Router();
app.use('/people', someRouter);
someRouter.get('/', (req: Request, res: Response) => {
    res.status(200).json({z: 1})
});

someRouter.get('/students', (req: Request, res: Response) => {
    if(req.query.id !== '1') {
        res.status(266).json({z: 'Давай'})
    } else {
        fakeState.counter += 1;
        res.status(266).json({z: 'Отстань', count: fakeState.counter})
    }
});



app.listen(process.env.PORT, () => {
    console.log('Back-end listening on port:' + process.env.PORT)
});