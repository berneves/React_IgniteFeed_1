import { ThumbsUp, Trash } from "phosphor-react";
import styles from "./Comment.module.css";
import { Avatar } from './Avatar';


export function Comment({content}) {
    return(
        <div className = {styles.comment}>
            <Avatar src="https://www.github.com/berneves.png" />
            <div className = {styles.commentBox}>
                <div className = {styles.commentContent}>
                    <header>
                        <div className={styles.authorAndTime}>
                            <strong>Bernardo Neves</strong>
                            <time title = "11 de maio 23:00" dateTime = "2022-05-11 08:13:20">
                                Cerca de 1hr atrás
                            </time>
                        </div>
                        <button title = "deletar comentário">
                            <Trash size={24}/>
                        </button>
                    </header>
                    <p>{content}</p>
                </div>
                <footer>
                    <button>
                        <ThumbsUp/>
                        Aplaudir <span>20</span>
                    </button>
                </footer>
            </div>
        </div>
    )
}