import SingleTagAllTutorial from "@/app/(withCommonLayout)/tutorials/_AllTutorials/Components/SingleTagAllTutorial/SingleTagAllTutorial";
export async function generateMetadata({ params }, parent) {
  const metaData = {
    title: `${decodeURI(params?.tagName)} - RobomartBD tutorials tag`,
    alternates: {
      canonical: `https://www.robomartbd.com/blogs/tag/${params?.tagId}/${params?.tagName}`,
    },
  };
  return metaData;
}
const TagBlogs = ({ params }) => {
  return (
    <>
      <SingleTagAllTutorial params={params} />
    </>
  );
};

export default TagBlogs;
