const { Sequelize } = require('sequelize');
const { Models, ModelNames } = require('./models');

let sequelize = undefined;
let modelDefinitions = undefined;

const getModelDefinitions = () => {
  if (!sequelize) {
    return null;
  }

  if (!modelDefinitions) {
    modelDefinitions = {};
    Object.entries(Models).forEach(([name, model]) => {
      modelDefinitions[name] = sequelize.define(name, model);
    });
  }

  return modelDefinitions;
};

const initialize = async () => {
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    pool: {
      max: 1,
    },
  });

  await sequelize.authenticate();
}

const getSequelizeInstance = async () => {
  return sequelize;
}

const sync = async () => {
  const defs = Object.values(getModelDefinitions());
  defs.forEach(async model => {
    await model.sync();
  });
};

const close = async () => {
  await sequelize.close();
}

const bulkCreate = async (modelName, data, options = {}) => {
  const model = getModelDefinitions()[modelName];
  return await model.bulkCreate(data, options);
}

const create = async (modelName, data) => {
  const model = getModelDefinitions()[modelName];
  return await model.create(data);
}

const update = async (modelName, data, options = {}) => {
  const model = getModelDefinitions()[modelName];
  return await model.update(data, options);
}

const destroy = async (modelName, options = {}) => {
  const model = getModelDefinitions()[modelName];
  return await model.destroy(options);
}

const findAll = async (modelName, options = {}) => {
  const model = getModelDefinitions()[modelName];
  return await model.findAll(options);
}

const findOne = async (modelName, options ={}) => {
  const model = getModelDefinitions()[modelName];
  return await model.findOne(options);
}

const findByPk = async (modelName, pk) => {
  const model = getModelDefinitions()[modelName];
  return await model.findByPk(pk);
}

const query = async (query, options = {}) => {
  const [result, metadata] = await sequelize.query(query, options);
  return {
    result,
    metadata,
  };
}

module.exports = {
  ModelNames,
  initialize,
  sync,
  close,
  create,
  bulkCreate,
  update,
  destroy,
  findAll,
  findOne,
  findByPk,
  query,
  getModelDefinitions,
  getSequelizeInstance
};