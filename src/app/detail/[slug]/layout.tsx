import { getProductBySlug, getProductsId } from "@/apis/detail";
import { getFileUrl } from "@/utils/images";
import { ResolvingMetadata } from "next";
import { Fragment, ReactNode } from "react";
type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props) {
  const { data, key, relates } = await getProductBySlug(params.slug as string);

  return {
    title: {
      default: data?.name,
    },
    description: data?.description,

    openGraph: {
      title: data?.name,
      description: data?.description,
      images: [
        {
          url: getFileUrl(data?.detail_info?.images?.[0]),
          alt: getFileUrl(data?.detail_info?.images?.[0]),
        },
      ],
    },
  };
}

const Layout = async ({ children }: { children: ReactNode }) => {
  return <Fragment>{children}</Fragment>;
};

export default Layout;
