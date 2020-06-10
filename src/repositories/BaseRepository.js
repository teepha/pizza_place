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
      if (!data) return false;
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
      if (!data) return false
      return data;
    } catch (error) {
      throw error;
    }
  }

  async find(query) {
    try {
      const data = await this.model.findOne(query);
      if (!data) return false;
      return data;
    } catch (error) {
      throw error;
    }
  }
}
