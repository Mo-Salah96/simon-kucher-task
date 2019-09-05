const Projection = require('./projection');

const baseUserLogin = '_id mobile name roles token employeeInfo profile_image';
const baseUserBasicData = '_id mobile name roles profile_image';
const baseOfferData = '_id order.products';
module.exports = {
    pUserLogin: new Projection(baseUserLogin),
    pUserBasicData: new Projection(baseUserBasicData),
    pOfferBasicDate: new Projection(baseOfferData)
};
