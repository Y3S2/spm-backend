module.exports = mongoose => {
    const Schema = mongoose.Schema;
    const Channell = mongoose.model(
        "channell",
        mongoose.Schema(
            {
                dSession: { type: Schema.Types.ObjectId, ref: 'Session' },
                fullname: String,
                nic: String,
                email: String,
                mobile: Number,
                age: Number,
                status: String,
            },
            {timestamps: true}
        )
    );

    return Channell;
};