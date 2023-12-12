const { validationResult } = require("express-validator");
const OpenAI = require("openai");

exports.getRecommendation = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Operation Failed.");
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }

    //Getting the data from the user
    let { genres, similarities } = req.body.criteria;

    //formatting the authors to be string
    similarities = similarities.map(s => {
        let authors = s.authors[0];

        if (s.authors.length > 1) {
            authors = s.authors.join(", ");
        }

        return ` Title: ${s.title} - Author/s: ${authors}`;
    })
    
    //creating openai object
    const openai = new OpenAI({
        apiKey: process.env.OPENAIAPIKEY
    });

    //Creating the messages object
    let messages = [
        { role: "system", content: "Act as a librarian of sorts by recommending a list of 10 books based on the criteria described. Format your responses as the following: [{ title: title, author: author}]. This format describes an array of objects with two parameters, title and author. Include only this format, no spaces, no new lines. Just one long string of the specified JSON format." },
        { role: "user", content: `The recommendations should be similar to the following books: ${similarities}. The recommendations should be of the genre/s: ${genres}.` }
    ];

    try {
        //Call the api
        const response = await openai.chat.completions.create({
            messages,
            model: "gpt-3.5-turbo",
            temperature: 0.7
        });

        //transforming the response into JSON
        let data = JSON.parse(response.choices[0].message.content);

        let recommendations = [];

        //Getting book information from google api so that the recommendations work with the rest of the application
        data.forEach(async book => {
            const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${book.title}+inauthor:${book.author}`);
            const resData = await res.json();

            if (res.ok) {
                recommendations.push(resData.items.map(i => {
                    let imageLink;

                    if (!i.volumeInfo.imageLinks || !i.volumeInfo.imageLinks.thumbnail) {
                        imageLink = null;
                    } else {
                        imageLink = i.volumeInfo.imageLinks.thumbnail
                    }

                    return {
                        bookId: i.id,
                        authors: i.volumeInfo.authors || [],
                        imageLink,
                        identifiers: i.volumeInfo.industryIdentifiers || [],
                        publishedDate: i.volumeInfo.publishedDate,
                        title: i.volumeInfo.title
                    };
                }));
            }
        });

        console.log("Recs", recommendations);

        //res.send(recommendations);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}