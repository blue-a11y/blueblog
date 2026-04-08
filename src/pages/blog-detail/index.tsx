import { useParams } from "react-router";

function BlogDetail() {
  const { id } = useParams();

  return (
    <div>
      <h1>博客详情</h1>
      <p>文章 ID: {id}</p>
    </div>
  );
}

export default BlogDetail;
