import {Router, Request, Response} from 'express';
import MysQL from '../mysql/mysql';

const router = Router();

router.get('/api', (req: Request, res:Response)=>{

    const query = `
    SELECT * FROM heroes
    `;

    MysQL.ejecutarQuery(query, (err: any, heroes:Object[])=>{
       if(err){
           res.status(400).json({
               ok:false,
               error:err
           })
       }else{
            res.json({
                ok:true,
                heroes
            })
       }
    })
      
});

router.get('/api/:id', (req: Request, res:Response)=>{

    const id = req.params.id;

    const escapeId = MysQL.instance.cnn.escape(id);

    const query = `
    SELECT * FROM heroes
    where id = ${escapeId}
    `;

    MysQL.ejecutarQuery(query, (err: any, heroe:Object[])=>{
       if(err){
           res.status(400).json({
               ok:false,
               error:err
           })
       }else{
            res.json({
                ok:true,
                heroe: heroe[0]
            })
       }
    })
});

export default router; 