import { HttpException, HttpStatus } from "@nestjs/common";
import { log } from "console";
import { extname } from "path";

export const imageFileFilter = (req, file, callback) => {
  console.log('filefilter' ,file);
  
  if (!file.originalname.match(/\.(jpg|jpeg|png|PNG|gif)$/)) {
    return callback(new HttpException('erreur le type de fichier est invalide', HttpStatus.BAD_REQUEST), false);
    
  }
  callback(null, true);
};

export const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  console.log("name",name);
  console.log("fileExtName",fileExtName);

  
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join(''); 
    console.log("randomName",`${Date.now()}-${randomName}${fileExtName}`);
       
  callback(null, `${Date.now()}-${randomName}${fileExtName}`);
};

export const fileLimite = (req, file, callback) => {
  console.log( `dsdgvsscbyscbyb`);

  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  console.log( `dsdgvsscbyscbyb${name}-${fileExtName}`);

  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
    
  callback(null, `${name}-${randomName}${fileExtName}`);
};