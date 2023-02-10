import demoimg from "../../assets/travelcoverpic2.jpeg";
import styles from "./RecommendCard.module.scss";

type Suggestion = {
  id: number;
  img: string;
  description: string;
  likes: number;
};

function RecommendCard(props: { suggest: Suggestion }) {
  const { suggest } = props;

  return (
    <div className={styles.suggestionmargin}>
      <img src={demoimg} alt="demo" width={"300px"} />
      <p className={styles.wordbreak}>{suggest.description}</p>
      <p>{suggest.likes} Likes</p>
    </div>
  );
}

export default RecommendCard;
