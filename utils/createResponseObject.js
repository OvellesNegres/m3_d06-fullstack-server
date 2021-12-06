export default function createResponseObject(data, message, error){
  if(Array.isArray(data)) return {data}
  else  return { data: [data] }
}