module.exports = mongoose => {
    const Note = mongoose.model(
        "note",
        mongoose.Schema(
            {
                pNoteId: {
                    type: String,
                    required: true,
                    maxLength: 10,
                    minLength: 10
                },
                pNoteName: {
                    type: String,
                    required: true
                },
                pNoteMessage: {
                    type: String,
                    required: true
                }
            },
            { timestamps: true }
        )
    );
    return Note;
};