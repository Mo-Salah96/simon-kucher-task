module.exports = `

    type ProfileData{
        id: Int
        name: String
        last_name: String
        email: String
        number: String
        website: String
    }
    type CustomerData{
        id: Int
        code: Int 
        profile: ProfileData
        profileId: Int
        industryId: Int
        industry: IndustryData
        balance: Int
    }
    
   type Query {
        customers(name: String): [CustomerData]!
        customer(id: Int): CustomerData!
   }
   input profileInput{
        name: String
        last_name: String
        email: String
        number: String
        website: String
    }
   input CustomerInput{
        code: Int 
        profile: profileInput
        industryId: Int
        balance: Int
   }

    type Mutation {
        createCustomer(input: CustomerInput): CustomerData
        deleteCustomer(id: Int): String
        updateCustomer(id: Int, input:CustomerInput): CustomerData
    }
    `;
