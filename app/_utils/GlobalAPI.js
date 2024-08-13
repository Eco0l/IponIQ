import { gql, request } from 'graphql-request'


const MASTER_URL="https://api-ap-northeast-1.hygraph.com/v2/"+process.env.NEXT_PUBLIC_HYGRAPH_API_KEY+"/master"

const getAllCourseList=async()=>{
  const query=gql `
  query Assets {
  courseLists {
    description
    id
    name
    publishedAt
    totalChapters
    chapter {
      ... on Chapter {
        id
      }
    }
  }
}
  `

  const result=await request(MASTER_URL, query);
  return result;
}
export default {
  getAllCourseList
}