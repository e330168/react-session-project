import Button from "../UI/Button";
import styles from "./SessionItem.module.css";

type SessionItemProps={
    id: string;
    title: string;
    summary: string;
    description: string;
    duration: number;
    date: string;
    image: string;
};

export default function SessionItem({
    image,
    title,
    summary,
    id
}:SessionItemProps){
    return (
        <article className={styles.sessionItem}>

            <img src={image} alt={summary} className={styles.imgage}/>

            <div className={styles.sessionData}>
                <div>
                    <div>
                       <h3 className={styles.title}>{title}</h3>
                       <p className={styles.summary}>{summary}</p>
                    </div>

                    <p className={styles.actions}>
                      <Button to={id}>Learn More</Button>
                    </p>
                </div>
            </div>

        </article>
    )
}