
declare type Parameters = {
  [key: string]: string
}

declare type Filter = (key: string) => boolean

declare type Model = {
  name: string,
  attributes: {[key: string]: any},
  options: {
    setterMethods?: {[key: string]: any}
  },
  associations: {
    [key: string]: any
  },
  readbodyFilter?: Filter,
  findAll: Function,
  create: Function,
  bulkCreate: Function,
  sequelize: {
    transaction: Function,
    Utils: { inflection: { [key: string]: Function }}
  }
}

declare type Order = [string, 'ASC'|'DESC'][]

declare type Attributes = Model | string[]
