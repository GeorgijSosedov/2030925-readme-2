import { User, UserRole } from '@readme/shared-types';
import { compare, genSalt, hash } from 'bcrypt';
import { SALT_ROUNDS } from './blog-user.constant';

export class BlogUserEntity implements User {
    _id?: string;
    mail: string;
    firstName: string;
    lastName: string;
    password: string;
    avatar?: string;
    posts?: number;
    regDate: Date;
    followers?: number;
    pasHash: string;
    role: UserRole;

    constructor(blogUser: User) {
        this.fillEntity(blogUser);
    }

    public async setPassword(password: string): Promise<BlogUserEntity> {
        const salt = await genSalt(SALT_ROUNDS);
        this.pasHash = await hash(salt,password);
        return this;
    }

    public async comparePassword(password:string): Promise<Boolean> {
        return compare(password,this.pasHash);
    }
    
    public toObject() {
        return {...this};
    }

    public fillEntity(blogUser: User) {
        this._id = blogUser._id;
        this.mail = blogUser.mail;
        this.firstName = blogUser.firstName;
        this.lastName = blogUser.lastName;
        this.avatar = blogUser.avatar;
        this.posts = blogUser.posts;
        this.regDate = blogUser.regDate;
        this.followers = blogUser.followers;
        this.pasHash = blogUser.pasHash;
        this.role = blogUser.role;
    }
}