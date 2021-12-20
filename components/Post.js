import classes from "../styles/Home.module.css";

export default function Post(props) {
  const { title, url, headline } = props;

  return (
    <div className={classes.post}>
      <a href={url} className={classes.card} target="_blank">
        <h2>{headline} &rarr;</h2>
        <p>{title}.</p>
      </a>
    </div>
  );
}
