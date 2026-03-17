import Button from "../UI/Button";

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
        <article className="session-item">

            <img src={image} alt={summary}/>

            <div className="sessio-data">
                <div>
                    <div>
                       <h3>{title}</h3>
                       <p>{summary}</p>
                    </div>

                    <p className="actions">
                      <Button to={id}>Learn More</Button>
                    </p>
                </div>
            </div>

        </article>
    )
}