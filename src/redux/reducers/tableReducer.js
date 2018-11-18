const initialState = {
    info:[{
        tableId: 1,
        tabelStatus: 'free',
        orders: {
            dzuk: 100,
            gini: 250,
        },
        countOfChair: 4,
    },
    {
        tableId: 2,
        tabelStatus: 'busy',
        orders: {
            dzuk: 100,
            gini: 250,
        },
        countOfChair: 4,
    },
    {
        tableId: 3,
        tabelStatus: 'reserved',
        orders: {
            dzuk: 100,
            gini: 250,
        },
        countOfChair: 4,
    }
    ],
  }
  
  export default function tableReducer(state = initialState, action) {
    switch(action.type) {
        default:
          return state
    }
  }