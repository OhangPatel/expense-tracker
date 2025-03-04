import mongoose from 'mongoose';

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('Connected to MongoDB successfully');
        })

        connection.on('error', (error) => {
            console.log('MongoDB connection failed');
            console.log(error);
            process.exit();
        })
    } catch (error) {
        console.log('Something went wrong!');
        console.log(error);
    }
}