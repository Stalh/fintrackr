const database = 'fintrackr';
const collection = 'NEW_COLLECTION_NAME';

use(database);

db.users.insertMany([
    {
        username: "Sam",
        password: "hashed_password_123",
        balance: 1000.00,
        expenses: [
            {
                amount: 50.00,
                date: new Date("2023-04-10T00:00:00Z"),
                description: "Achat de nourriture"
            },
            {
                amount: 150.00,
                date: new Date("2023-04-12T00:00:00Z"),
                description: "Vêtements"
            },
        ]
    },
    {
        username: "jane_smith",
        password: "hashed_password_456",
        balance: 2500.00,
        expenses: [
            {
                amount: 700.00,
                date: new Date("2023-03-21T00:00:00Z"),
                description: "Electronique"
            },
            {
                amount: 45.00,
                date: new Date("2023-04-05T00:00:00Z"),
                description: "Livres"
            },
        ]
    },
]);

