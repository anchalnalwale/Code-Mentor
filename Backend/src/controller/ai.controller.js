const generateContent = require('../services/ai.services');

module.exports.getReview = async (req , res) =>{
    const code = req.body.code ;
    if(!code){
        return res.status(400).send("No Prompt Provided!! Please provide prompt.")
    }
    const response = await generateContent(code);

    res.status(200).json({ review: response });
}

// const { GoogleGenerativeAI } = require("@google/generative-ai");

// // Initialize the GoogleGenerativeAI with your API key
// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

// const getReview = async (req, res) => {
//   try {
//     const { code, language } = req.body;

//     // Validate input
//     if (!code || !language) {
//       return res.status(400).json({ 
//         error: 'Code and language are required' 
//       });
//     }

//     // Get the generative model
//     const model = genAI.getGenerativeModel({ model: "gemini-pro" });

//     // Create the prompt for code review
//     const prompt = `
//       Please review the following ${language} code and provide a comprehensive analysis:

//       \`\`\`${language}
//       ${code}
//       \`\`\`

//       Please provide:
//       1. Code quality assessment
//       2. Potential bugs or issues
//       3. Performance improvements
//       4. Best practices recommendations
//       5. Security considerations (if applicable)
//       6. Code readability and maintainability suggestions

//       Format your response with clear sections and include code examples where helpful.
//     `;

//     // Generate the review
//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const review = response.text();

//     res.json({ review: review });

//   } catch (error) {
//     console.error('Error in getReview:', error);
    
//     if (error.message.includes('API key')) {
//       return res.status(401).json({ 
//         error: 'Invalid API key. Please check your Google AI API key.' 
//       });
//     }
    
//     res.status(500).json({ 
//       error: 'Internal server error. Please try again later.' 
//     });
//   }
// };

// module.exports = {
//   getReview
// };