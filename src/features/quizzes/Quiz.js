import { Link, useParams } from "react-router-dom";
import Card from "../cards/Card";
import ROUTES from "../../app/routes";
import { useSelector } from "react-redux";
import { selectAllQuizzes } from "./quizzesSlice";

export default function Topic() {
  const quizzes = useSelector(selectAllQuizzes);
  let { quizId } = useParams();
  const quiz = quizzes[quizId];

  return (
    <section className="center">
      <h1>{quiz.name}</h1>
      <Link to={ROUTES.quizzesRoute()} className="button right-side-button">
        Back to quizzes
      </Link>
      <ul className="cards-list">
        {quiz.cardIds.map((id) => (
          <Card key={id} id={id} />
        ))}
      </ul>
    </section>
  );
}
