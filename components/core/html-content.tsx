import React from 'react';
import parse, {
  attributesToProps,
  domToReact,
  type DOMNode,
  type Element as HtmlElement,
  type HTMLReactParserOptions,
} from 'html-react-parser';
import clsx from 'clsx';
import Markdown, { richTextClassMap } from '@/components/core/markdown';

type Props = { html: string };
type GenericProps = Record<string, unknown>;

const HTML_PATTERN = /<\/?[a-z][\s\S]*?>/i;

export default function HtmlContent({ html }: Props) {
  const normalized = normalizeInput(html);
  if (!normalized) return null;

  const looksLikeHtml = HTML_PATTERN.test(normalized);
  if (!looksLikeHtml) {
    return <Markdown content={normalized} />;
  }

  return <div>{parse(normalized, parserOptions)}</div>;
}

const parserOptions: HTMLReactParserOptions = {
  replace(node: DOMNode) {
    if (node.type !== 'tag') return undefined;
    const element = node as HtmlElement;
    const children = domToReact(element.children as unknown as DOMNode[], parserOptions);
    const reactProps = attributesToProps(element.attribs ?? {}, element.name) as GenericProps;
    const rawClassName =
      typeof reactProps.className === 'string'
        ? reactProps.className
        : typeof element.attribs?.class === 'string'
          ? element.attribs.class
          : undefined;
    const rest = { ...reactProps };
    delete rest.className;
    const withClasses = (base: string) => clsx(base, rawClassName);

    switch (element.name) {
      case 'h1':
        return (
          <h1 className={withClasses(richTextClassMap.h1)} {...rest}>
            {children}
          </h1>
        );
      case 'h2':
        return (
          <h2 className={withClasses(richTextClassMap.h2)} {...rest}>
            {children}
          </h2>
        );
      case 'h3':
        return (
          <h3 className={withClasses(richTextClassMap.h3)} {...rest}>
            {children}
          </h3>
        );
      case 'h4':
        return (
          <h4 className={withClasses(richTextClassMap.h4)} {...rest}>
            {children}
          </h4>
        );
      case 'p':
        return (
          <p className={withClasses(richTextClassMap.p)} {...rest}>
            {children}
          </p>
        );
      case 'ul':
        return (
          <ul className={withClasses(richTextClassMap.ul)} {...rest}>
            {children}
          </ul>
        );
      case 'ol':
        return (
          <ol className={withClasses(richTextClassMap.ol)} {...rest}>
            {children}
          </ol>
        );
      case 'li':
        return (
          <li className={withClasses(richTextClassMap.li)} {...rest}>
            {children}
          </li>
        );
      case 'a': {
        const { rel: relAttr, target, ...anchorRest } = rest;
        const anchorTarget = typeof target === 'string' ? target : undefined;
        const anchorRel = typeof relAttr === 'string' ? relAttr : undefined;
        const computedRel = anchorTarget === '_blank' ? 'noreferrer noopener' : anchorRel;
        return (
          <a className={withClasses(richTextClassMap.a)} target={anchorTarget} rel={computedRel} {...anchorRest}>
            {children}
          </a>
        );
      }
      case 'blockquote':
        return (
          <blockquote className={withClasses(richTextClassMap.blockquote)} {...rest}>
            {children}
          </blockquote>
        );
      case 'table':
        return (
          <div className={richTextClassMap.tableWrapper}>
            <table className={withClasses(richTextClassMap.table)} {...rest}>
              {children}
            </table>
          </div>
        );
      case 'th':
        return (
          <th className={withClasses(richTextClassMap.th)} {...rest}>
            {children}
          </th>
        );
      case 'td':
        return (
          <td className={withClasses(richTextClassMap.td)} {...rest}>
            {children}
          </td>
        );
      case 'strong':
        return (
          <strong className={withClasses(richTextClassMap.strong)} {...rest}>
            {children}
          </strong>
        );
      case 'em':
        return (
          <em className={withClasses(richTextClassMap.em)} {...rest}>
            {children}
          </em>
        );
      case 'hr':
        return <hr className={withClasses(richTextClassMap.hr)} {...rest} />;
      case 'code':
        return (
          <code className={withClasses(richTextClassMap.code)} {...rest}>
            {children}
          </code>
        );
      case 'img': {
        const { alt, ...imgRest } = rest;
        const imgAlt = typeof alt === 'string' ? alt : '';
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img className={withClasses(richTextClassMap.img)} alt={imgAlt} {...imgRest} />
        );
      }
      case 'br':
        return <br {...rest} />;
      default:
        return undefined;
    }
  },
};

function normalizeInput(value: string): string {
  if (!value) return '';
  const trimmed = value.trim();
  if (!trimmed) return '';
  const asJson = extractHtmlFromJson(trimmed);
  return (asJson || trimmed).replace(/\r\n/g, '\n');
}

function extractHtmlFromJson(candidate: string): string | null {
  const firstChar = candidate[0];
  if (firstChar !== '{' && firstChar !== '[') return null;
  try {
    const parsed = JSON.parse(candidate);
    return unwrapRichText(parsed);
  } catch {
    return null;
  }
}

function unwrapRichText(node: unknown): string | null {
  if (!node) return null;
  if (typeof node === 'string') return node;
  if (Array.isArray(node)) {
    const merged = node.map(unwrapRichText).filter(Boolean).join('\n\n');
    return merged || null;
  }
  if (typeof node === 'object') {
    const obj = node as Record<string, unknown>;
    const htmlKeys = ['html', 'rendered', 'content', 'body', 'value', 'text'];
    for (const key of htmlKeys) {
      const val = obj[key];
      if (typeof val === 'string' && val.trim().length > 0) return val;
    }
    if (Array.isArray(obj.children)) return unwrapRichText(obj.children);
    if (Array.isArray(obj.content)) return unwrapRichText(obj.content);
  }
  return null;
}
