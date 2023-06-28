import { gql, useQuery } from '@apollo/client';
import { getFirstResult } from '../utils/graphql';

const myQuestionsQuery = gql`
    query questions {
        questions {
        _id
        text
        url
        answers {
            _id
            text
            isCorrect
            questionId
        }
        answerIds
    }
}
`;
const useAllQuestions = () => {
    const { loading, data, error, ...rest } = useQuery(myQuestionsQuery, { fetchPolicy: 'cache-and-network' });
    return [getFirstResult(data) || [], { loading, error, ...rest }];
};

export default useAllQuestions;
