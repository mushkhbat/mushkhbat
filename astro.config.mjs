import { defineConfig } from 'astro/config';
import rehypeImg from "rehype-figure-for-img";
import remarkUnwrap from "remark-unwrap-images";
import rehypeWrap from "rehype-wrap-all"
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import {remarkExtendedTable, extendedTableHandlers} from 'remark-extended-table';
import react from "@astrojs/react";
import sitemap from '@astrojs/sitemap';

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [sitemap(), react(), mdx(
    {remarkPlugins: {extends: [remarkUnwrap]},
      rehypePlugins: [rehypeImg, [rehypeWrap, {
        selector: 'table',
        wrapper: 'figure'
      }], 
      [rehypeWrap, {
        selector: 'img',
        wrapper: 'picture.hi'
      }]]
    }
  )],
  site: "https://www.mushkhbat.com/"
});