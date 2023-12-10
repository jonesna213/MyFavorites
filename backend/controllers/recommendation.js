const { validationResult } = require("express-validator");

exports.getRecommendation = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Operation Failed.");
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }

    const criteria = req.body.criteria;

    //creating openai object
    const openai = new OpenAI({
        apiKey: process.env.OPENAIAPIKEY
    });

    //setting message to correct format
    let messages = [
        { role: "system", content: "" },
        { role: "user", content: "" }
    ];

    //Call the api
    const response = await openai.chat.completions.create({
        messages,
        model: "gpt-3.5-turbo",
        temperature: 0.7
    });

    /*
        Then use the author and title to search the google api to get the book information so that it can be used with the rest of the application
    */

    console.log("Response", response);

    res.send(recommendations);
}