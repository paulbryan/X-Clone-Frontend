import { useParams } from "react-router-dom";
import FullPostTemplate from "./FullPostTemplate";

function FullPost() {
  const { postId } = useParams();
  const numericPostId = Number(postId);

  return (
    <div className="flex flex-col w-full text-white">

      <FullPostTemplate key={postId} mainPost={true} fullPost={true} postId={numericPostId} />

    </div>
  );
}

export default FullPost;