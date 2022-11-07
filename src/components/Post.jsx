
import { Comment } from "./Comment"
import styles from "./Post.module.css"
import { Avatar } from './Avatar';
import {format, formatDistanceToNow} from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { useState } from "react";


export function Post(props) {

    const [comments, setComments] = useState([
        "testando primeiro"
    ])

    const [newCommentText, setNewCommentText] = useState("")

    const handleCreateNewComment = () => {
        event.preventDefault()
        setComments([...comments, newCommentText]);
        setNewCommentText("");
    }

    const handleNewCommentInvalid = () => {
        event.target.setCustomValidity("campo obrigatório") 
    }

    const handleNewCommentChange = () => {
        event.target.setCustomValidity("");
        setNewCommentText(event.target.value);
    }
  
    const publishedDateFormatted = format(props.publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
        locale: ptBR
    })
    const publishedDateRelativeToNow = formatDistanceToNow (props.publishedAt, {
        locale: ptBR,
        addSuffix: true
    })

    const deleteComment = (commentToDelete) => {
        const commentsWithoutDeletedOne = comments.filter(comment => {
            return comment != commentToDelete;
        })
        setComments(commentsWithoutDeletedOne);
    }


    return (
        <article className = {styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar hasBorder = {true} src={props.author.avatarUrl} />
                    <div className={styles.authorInfo}>
                        <strong>{props.author.name}</strong>
                         <span>{props.author.role}</span>
                    </div>
                </div>
                <time title = "11 de maio 23:00" dateTime = {props.publishedAt.toISOString()}>
                    {publishedDateRelativeToNow}
                </time>
            </header>
            <div className={styles.content}>
                {props.content.map(line => {
                    if (line.type === "paragraph") {
                        return <p key = {line.content}>{line.content}</p>
                    } else if (line.type === "link"){
                        return <p key = {line.content}><a href="#">{line.content}</a></p>
                    }
                })}
            </div>

            <form onSubmit = {handleCreateNewComment} className={styles.commentForm}>
                <strong>Deixe seu comentário</strong>
                <textarea 
                nome = "comment"
                placeholder = "deixa aí"
                value = {newCommentText}
                onChange={handleNewCommentChange}
                onInvalid = {handleNewCommentInvalid}
                required
                />
                <footer>
                    <button type = "submit" disabled={newCommentText.length === 0}>Publicar</button>
                </footer>
            </form>
            <div className={styles.commentList}>
               {comments.map(comment => {
                    return <Comment key={comment} commentContent = {comment} onDeleteComment={deleteComment}/>
               })}
            </div>
        </article>
    )
  }
  