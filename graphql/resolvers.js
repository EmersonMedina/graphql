import contentful from 'contentful'

export const resolvers = {
    User: {
        address: (parent) => `${parent.street}, ${parent.zipCode} ${parent.city}`
    },
    Query: {
        getUser: async () => {
            try {
                const client = contentful.createClient({
                    space: '13y2tya3vwhq',
                    environment: 'master', // defaults to 'master' if not set
                    accessToken: 'ZelLfOrWDGhC2JHr9d8sZfeN0OPkTXhAjYvDDtcoesA'
                })
    
                const entry = await client.getEntry('1GwoyTVB9WrWMoLym1FNbL')

                console.log(entry)
    
                return entry
            } catch (error) {
                console.log(error)
            }
           
        },
    }
}