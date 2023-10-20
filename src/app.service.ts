import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      route: {
        direction: {
          post:'http://192.168.1.14:3000/api/direction/',
          get:{
            getAll:'http://192.168.1.14:3000/api/direction/',
            getOne:'http://192.168.1.14:3000/api/direction/1'
          },
          update:'http://192.168.1.14:3000/api/direction/:id',
          delete:'http://192.168.1.14:3000/api/direction/:id',
        },
        departement:{
          post:'http://192.168.1.14:3000/api/departement/',
          get:{
            getAll:'http://192.168.1.14:3000/api/departement/',
            getOne:'http://192.168.1.14:3000/api/departement/1'
          },
          update:'http://192.168.1.14:3000/api/departement/:id',
          delete:'http://192.168.1.14:3000/api/departement/:id',
        },
        poste: {
          post:'http://192.168.1.14:3000/api/poste/',
          get:{
            getAll:'http://192.168.1.14:3000/api/poste/',
            getOne:'http://192.168.1.14:3000/api/poste/1'
          },
          update:'http://192.168.1.14:3000/api/poste/:id',
          delete:'http://192.168.1.14:3000/api/poste/:id',
        },
        service: {
          post:'http://192.168.1.14:3000/api/service/',
          get:{
            getAll:'http://192.168.1.14:3000/api/service/',
            getOne:'http://192.168.1.14:3000/api/service/1'
          },
          update:'http://192.168.1.14:3000/api/service/:id',
          delete:'http://192.168.1.14:3000/api/service/:id',
        },
        collaborateur: {
          post:'http://192.168.1.14:3000/api/colaborateur/',
          get:{
            getAll:'http://192.168.1.14:3000/api/colaborateur/',
            getOne:'http://192.168.1.14:3000/api/colaborateur/1'
          },
          update:'http://192.168.1.14:3000/api/colaborateur/:id',
          delete:'http://192.168.1.14:3000/api/colaborateur/:id',
        },
        link: {
          post:'http://192.168.1.14:3000/api/link/:UserId',
          get:{
            getAll:'http://192.168.1.14:3000/api/link/:UserId',
            getOne:'http://192.168.1.14:3000/api/link/:id/users/:userId'
          },
          update:'http://192.168.1.14:3000/api/api/link/:id/users/:userId',
          delete:'http://192.168.1.14:3000/api/api/link/:id/users/:userId',
        },

      }
    };
  }
}
