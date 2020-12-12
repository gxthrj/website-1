import React from 'react'
import { NextPage } from "next";
import { TFunction } from "next-i18next";
import { NextSeo } from "next-seo";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FooterLinks from "@/components/FooterLinks";

import { withTranslation } from "../../i18n";
import { getPosts } from '../../helpers';
import { SWrapper } from './style'

type Props = {
  t: TFunction;
  type: "usercases" | "blog";
  list: Post[]
};

const PostList: NextPage<Props, any> = ({ t, type, list = [] }) => {
  return (
    <SWrapper>
      <NextSeo title={t(`common:${type}`)} />
      <div>
        <Nav />
        <div>
          {list.map(item => (
            <div key={item.title}>
              <a href={`${item.pathname}`}>
                <h2>{item.title}</h2>
              </a>
              <span>{new Date(item.date).toLocaleDateString()}</span>
            </div>
          ))}
        </div>
        <Footer />
        <FooterLinks />
      </div>
    </SWrapper>
  )
}

PostList.getInitialProps = async (context) => {
  const { pathname } = context
  let type = pathname.slice(1)

  if (type === 'usercases') {
    type = 'usercase'
  }

  const { lng = "zh-CN" } = (context.req as any) || {};

  const posts = getPosts(type, lng)

  return {
    namespacesRequired: ["common"],
    type,
    list: posts
  }
}

export default withTranslation("postlist")(PostList as any);