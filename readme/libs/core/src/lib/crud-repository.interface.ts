export interface CRUDRepository<E,I,R> {
    findById(id: E): Promise<R | null>;
    create(item: E): Promise<R>;
    update(id: I, item: E): Promise<R>;
    destroy(id:I): Promise<void>;
}