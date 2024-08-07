import { gql, request } from 'graphql-request'


const MASTER_URL="https://api-ap-northeast-1.hygraph.com/v2/"+process.env.NEXT_PUBLIC_HYGRAPH_API_KEY+"/master"

const getAllCourseList=async()=>{
  const query=gql `
  query MyQuery {
  courseList {
    id
    name
    publishedAt
    chapter {
      id
    }
    stage
    tag
    totalChapters
  }
}
  `

  const result=await request(MASTER_URL, query);
  return result;
}
export default {
  getAllCourseList
}