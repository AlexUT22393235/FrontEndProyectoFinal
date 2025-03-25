import axios from 'axios';

export const genericRequest = async (
  url: string,
  method: string,
  body?: any,
  headers: any = { 'Content-Type': 'application/json' } // 22393139
) => {
  try {
    const response = await axios({
      url: url,
      method: method,
      headers: headers, //  Ahora puedo recibo header 22393139
      data: body,
    });
    return response.data;
  } catch (error: any) {
    console.log('error', `Error in genericRequest: ${error.message}`, {
      url,
      method,
      body,
      headers,
      error,
    });
    throw error;
  }
};


export const genericRequestAutheticated = async (
  headers: any,
  url: string,
  method: string,
  body?: any,
) => {
  try {
    const response = await axios({
      url: url,
      method: method,
      headers: headers,
      data: body,
    })
    return response.data
  } catch (error: any) {
    console.log('error', `Error in genericRequestAutheticated: ${error.message}`, {
      url,
      method,
      body,
      headers,
      error,
    })
    throw error
  }
}
