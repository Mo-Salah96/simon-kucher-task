const BaseService = require('../BaseService');
const Customers = global.db.customers;
const Profiles = global.db.profiles;
const Industries = global.db.industries;
const Op = global.db.Sequelize.Op;

class CustomerService extends BaseService {
    async create(data) {
        if (data.industryId) {
            const industry = await Industries.findOne({where: {id: data.industryId}});
            if (!industry) {
                throw new this.NotFoundError(0, `there is no Industry with id ${data.industryId}`);
            }
        }
        const customer = await Customers.create(
            data,
            {
                include: [
                    Profiles,
                ]
            });
        console.log(JSON.stringify(customer));
        return customer;
    }

    async getAll(filters) {
        const query = {};
        if (filters && filters.name) {
            query.name = {
                [Op.like]: `%${filters.name}%`
            }
        }
        return await Customers.findAll({
            include: [
                {model: Profiles, as: 'profile', where: query,},
                {model: Industries, as: 'industry',},
            ],

        });
    }

    async getById(id) {
        const customer = await Customers.findOne({
            where: {
                id
            },
            include: [
                {model: Profiles, as: 'profile'},
                {model: Industries, as: 'industry',},
            ],

        });
        if (!customer) {
            throw new this.NotFoundError(0, `there is no customer with id ${id}`);
        }

        return customer;
    }

    async delete(id) {
        const customer = await Customers.findOne({
            where: {
                id
            }
        });
        if (!customer) {
            throw new this.NotFoundError(0, `Can't delete customer not exist`);
        }
        return await Customers.destroy({
            where: {
                id
            }
        });
    }

    async update(id, data) {
        // I've made a lot of search to make nested update but didn't find it (still searching )
        await Customers.update(data, {where: {id: id}, returning: true});
        if (data.profile) {
            await Profiles.update(data.profile, {where: {id: id}});
        }

        return await this.getById(id);
    }
}

module.exports = new CustomerService();
