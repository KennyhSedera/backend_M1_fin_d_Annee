import { Injectable } from '@nestjs/common';
import { User } from './interfaces/users.interface';
import { log } from 'console';

@Injectable()
export class UsersService {
    users: User[] = [
        {id:1, username:'Kennyh', useremail:'kennyh@gmail.com', password:'12301230', status:true},
        {id:2, username:'Sedera', useremail:'sedera@gmail.com', password:'12301230', status:false},
        {id:3, username:'Martin', useremail:'martin@gmail.com', password:'12301230', status:true},
    ]

    getOne(id:string) {
        return this.users.find(u=> u.id === +id);
    }

    getAll(): User[] {
        return this.users;
    }

    create(user: User) {
        this.users = [...this.users, user];
        return {success: true, message:'Users created with success. '}
    }

    update(id:string, user:User){
        const userToUpdate = this.users.find(u => u.id === +id);
        if (userToUpdate) {
            userToUpdate.username = user.username,
            userToUpdate.useremail = user.useremail
        }
        const users = this.users.map(u =>u.id !== +id ? u : userToUpdate)
        this.users = [... users];
        return {success: true, message:'Users updated with success. '}
    }

}
