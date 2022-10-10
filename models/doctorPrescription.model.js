module.exports = mongoose => {
    const Prescription = mongoose.model(
        "prescription",
        mongoose.Schema(
            {
                dId: {
                    type: String,
                    required: true
                },
                dPName: {
                    type: String,
                    required: true
                },
                dPDignosis: {
                    type: String,
                    required: true
                },
                dMed1: {
                    type: String,
                    required: true
                },
                dDose1: {
                    type: String,
                    required: true
                },
                dMed2: String,
                dDose2: String
            },
            { timestamps: true }
        )
    );
    return Prescription;
};