import {
  insertJurnal
} from "../models/JurnalUmun.model.js";


export const CreateJurnal = async (req, res) =>{
    try {
        await new insertJurnal(req.body).save();
        return res.status(201).json(req.body);
      } catch (error) {
        return res.status(400).json(error);
      }
    }
