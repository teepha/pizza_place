import DocumentNotFound from './RepositoryErrors';
export default class BaseRepository {

  constructor(name, db) {
    this.name = name;
    this.model = db.sequelize.models[this.name];
  }

  async create(options) {
    try {
      const data = await this.model.create(options);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const data = await this.model.findAll();
      return data;
    } catch (error) {
      throw error;
    }
  }

  async findById(id) {
    try {
      const data = await this.model.findOne({
        where: { id },
      });
      if (!data) throw new DocumentNotFound(`${this.name} not found`);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async find(query) {
    try {
      const data = await this.model.findOne(query);
      return data;
    } catch (error) {
      throw error;
    }
  }
}
