const BaseService = require('../BaseService');
const Industries = global.db.industries;

class IndustryService extends BaseService {
    constructor() {
        super();
    }

    async createSome() {
        await Industries.create({name: 'First Industry'});
        await Industries.create({name: 'Second Industry'});
        await Industries.create({name: 'Third Industry'});
        await Industries.create({name: 'Forth Industry'});

    }

    async getAll() {
        const industries = await Industries.findAll({});
        if (!industries || industries.length === 0) {
            await this.createSome();
            return await Industries.findAll({});
        }
        return industries;
    }


}

module.exports = new IndustryService();
