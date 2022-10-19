module.exports = (mongoose) => {
  const EmpDetails = mongoose.model(
    "employees",
    mongoose.Schema(
      {
        role: {
          type:String,
          required: true
        },

        firstName: {
          type:String,
          required: true
        },
        lastName: {
          type:String,
          required: true
        },
        email: {
          type:String,
          required: true
        },
        mobile: {
          type:String,
          required: true
        },
        address: {
          type:String,
          required: true
        },
        password: {
          type:String,
          required: true
        },
      },
      { timestamps: true }
    )
  );

  return EmpDetails;
};
