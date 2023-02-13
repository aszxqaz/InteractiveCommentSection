import { UserContext } from "pages"
import React, { DetailedHTMLProps, FC, HTMLAttributes, useContext, useMemo, useState } from "react"
import { ReplyPanel } from "src/components/ReplyPanel/ReplyPanel"
import { Comment } from "../../components"
import { getClassName } from "../../utils/getClassName"
import { CommentsContext } from "./CommentsContext"
import { useCommentsMutations } from "./useCommentsMutations"
import { useCommentsQuery } from "client/api/useQueries"
import { BaseSpinner } from "src/components/Spinner/Spinner"

export const Comments: FC<DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>> = ({
  className,
  style,
}) => {
  const { data: comments = [], isLoading } = useCommentsQuery()
  const me = useContext(UserContext)
  const {
    handleCreateComment,
    handleCreateReply,
    handleDeleteComment,
    handleDeleteReply,
    handleUpdateComment,
    handleUpdateReply,
  } = useCommentsMutations()

  const [commentOrReplySelectedToReply, setCommentOrReplySelectedToReply] = useState<string | null>(
    null
  )
  const [commentOrReplyIdCreated, setCommentOrReplyIdCreated] = useState<string | null>(null)

  const voted = useMemo(() => {
    if (me?.username)
      return comments.map(comment =>
        comment.upvoted.includes(me.username)
          ? "upvoted"
          : comment.downvoted.includes(me.username)
          ? "downvoted"
          : undefined
      )
  }, [comments, me?.username])

  return isLoading ? (
    <BaseSpinner
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "scale(3) translate(-50%, -50%)",
        transformOrigin: "0 0",
      }}
    />
  ) : (
    <section className={getClassName(["comments", className])} style={style}>
      <CommentsContext.Provider
        value={{
          commentOrReplySelectedToReply,
          setCommentOrReplySelectedToReply,
          handleCreateReply,
          handleUpdateComment,
          handleUpdateReply,
          handleDeleteComment,
          handleDeleteReply,
          commentOrReplyIdCreated,
          setCommentOrReplyIdCreated,
        }}
      >
        {comments.map((comment, i) => (
          <Comment comment={comment} key={comment.id} voted={voted[i]} />
        ))}
      </CommentsContext.Provider>
      <ReplyPanel
        placeholder="Add a comment..."
        buttonText="Send"
        onSubmit={content => {
          return handleCreateComment({ content })
        }}
      />
    </section>
  )
}
