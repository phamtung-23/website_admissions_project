import { ipAddress } from "../constants";
import axios from "axios";

// ========= chat GPT API ===================================================
const client = axios.create({
  headers:{
    // "Content-Type": "application/json",
    // "Authorization": `Bearer ${process.env.API_KEY}`
  }
})

// const chatGptEndpoint = `https://api.openai.com/v1/chat/completions`

export const callAPI = async (prompt)=>{
  try {
    // const res = await client.post(chatGptEndpoint,{
    //   model: "gpt-3.5-turbo",
    //   messages: [
    //     {
    //       "role": "user",
    //       "content": prompt
    //     }
    //   ], 
    // })
    
    // console.log(res.data)
    // let answer = res.data.choices[0].message
    // // console.log(answer)
    // let result = [answer]
    const res = await client.post(`http://${ipAddress}:3300/chat/gpt`,{
      prompt:  prompt
    })
    return ({success: true, data: res.data})
  } catch (error) {
    console.log('error:', error)
    return ({success: false, msd: error.message})
  }
}
export const callAPIChatPdf = async (prompt)=>{
  try {
    const res = await client.post(`http://${ipAddress}:3300/chat/pdf`,{
      prompt: prompt
    })
    return ({success: true, data: res.data})
  } catch (error) {
    console.log('error:', error)
    return ({success: false, msd: error.message})
  }
}

export const callAPIChatPdfDTT = async (prompt)=>{
  try {
    const client1 = axios.create({
      headers:{
        "Content-Type": "application/json",
      }
    })
    const res = await client1.post(`http://${ipAddress}:3000/api/v1/prediction/47ffa23d-89f8-4179-8e05-c334e633e685`,{
      question: prompt
    })
    // console.log(res.data)
    const result = {
      role: 'assistant',
      content: res.data.text
    } 
    return ({success: true, data: result})
  } catch (error) {
    console.log('error:', error)
    return ({success: false, msd: error.message})
  }
}





// ======== chat flowise ========================================================
// const client = axios.create({
//   headers:{
//   }
// })

// const chatGptEndpoint = `http://${ipAddress}:3300/api/flowise`

// export const callAPI = async (prompt)=>{
//   try {
//     const res = await client.post(chatGptEndpoint,{
//       question:  prompt,
//     })

//     let answer = res.data.message
//     let result = [{role: "assistant", content: answer}]
//     return ({success: true, data: result})
//   } catch (error) {
//     console.log('error:', error)
//     return ({success: false, msd: error.message})
//   }
// }

const chatgptApiCall = async (prompt, messages) => {
  try {
    const res = await client.post(chatGptEndpoint,{
      model: "gpt-3.5-turbo",
      messages
    })
    let answer = res.data?.choices[0]?.message?.content
    messages.push({role: "assistant", content: answer.trim()})
    return Promise.resolve({success: true, data: messages})

  } catch (error) {
    console.log('error:', error)
    return Promise.resolve({success: false, msd: error.message})
  }
}
