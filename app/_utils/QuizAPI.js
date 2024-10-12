import { gql, request } from 'graphql-request';

const MASTER_URL = "https://api-ap-northeast-1.hygraph.com/v2/" + process.env.NEXT_PUBLIC_HYGRAPH_API_KEY + "/master";

const getAllQuiz = async () => {
  const query = gql`
   query Quiz($where: QuizWhereInput = {}) {
  quizzes(where: $where) {
    quizId
    quizName
    banner {
      url
      id
    }
    diff
  }
  questions {
    questionText
    choices
    correctAnswer
    questionId
  }
}





  `;

  const result = await request(MASTER_URL, query);
  return result;
};

export default {
  getAllQuiz,
};
