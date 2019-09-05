module.exports = `
    type IndustryData{
        id: Int
        name: String
    }
  extend type Query {
        industries: [IndustryData]!
   }
`;
