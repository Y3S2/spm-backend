module.exports = mongoose => {
    const Tests = mongoose.model(
        "tests",
        mongoose.Schema(
            {
                specimenid: String,
                subbmitteddate: Date,
                starteddate: Date,
                completeddate: Date,
                status:String,
                contactnumber:Number,
                patientsname:String,
                dateofbirth:String,
                testtype:String,
                collectedperson:String,
                inchargelabass:String,
                inchargelabassid:String,
                specimenproperty:String,
                specimenpropertyresult:String,

            },
            { timestamps: true }
        )
    );

    return Tests;
};