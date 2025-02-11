import BlogData from "@/components/Blog/blogData";
import GalleryItem from "@/components/Blog/GalleryItem";
import { Metadata } from "next";
import storageService from '@/services/gstorage';

export const metadata: Metadata = {
  title: "Renderizaí | Plataforma de Renderização",
  description: "Plataforma de Renderizaçãoes e Design de Interiores",
  // other metadata
};

const BlogPage = async () => {  

  const url = await storageService.generateSignedUrl(process.env.BUCKET_PORTFOLIO, 'render1.png');

  BlogData.forEach(post => {
    post.mainImage = url;
  });

  return (
    <>
      {/* <!-- ===== Blog Grid Start ===== --> */}
      <section className="py-20 lg:py-25 xl:py-30">
        <div className="mx-auto mt-15 max-w-c-1280 px-4 md:px-8 xl:mt-20 xl:px-0">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:gap-5">
            {BlogData.map((post, key) => (
              <GalleryItem key={key} blog={post} />
            ))}
          </div>
        </div>
      </section>
      {/* <!-- ===== Blog Grid End ===== --> */}
    </>
  );
};

export default BlogPage;
