import React from "react";

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return (
    <div>
      <h1>Blog post: {params.slug}</h1>
    </div>
  );
}
