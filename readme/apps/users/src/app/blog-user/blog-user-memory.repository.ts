import {CRUDRepository} from '@readme/core'
import { User } from '@readme/shared-types';
import { BlogUserEntity } from './blog-user.entity.js';

export class BlogUserMemoryRepository implements CRUDRepository<BlogUserEntity, string, User> {
    private repository: {[key: string]: User} = {};
  
    public async create(item: BlogUserEntity): Promise<User> {
      const entry = { ...item.toObject(), _id: crypto.randomUUID()};
      this.repository[entry._id] = entry;
  
      return {...entry};
    }
  
    public async findById(id: string): Promise<User> {
      if (this.repository[id]) {
        return {...this.repository[id]};
      }
  
      return null;
    }

    public async findByMail(mail: string): Promise<User | null> {
        const existUser = Object.values(this.repository)
        .find((userItem) => userItem.mail === mail);

        if (! existUser) {
            return null;
        }
        return {...existUser};
      }

    public async destroy(id: string): Promise<void> {
        delete this.repository[id];
      }

    public async update(id: string, item: BlogUserEntity): Promise<User> {
        this.repository[id] = {...item.toObject(), id: id };
        return this.findById(id);
      }
}