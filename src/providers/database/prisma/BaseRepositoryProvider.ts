import prismaInstance from './prismaInstance';

abstract class BaseRepositoryProvider {

    protected readonly _prisma = prismaInstance;

}

export { BaseRepositoryProvider };