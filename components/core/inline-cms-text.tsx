import parse, {
  domToReact,
  type DOMNode,
  type Element as HtmlElement,
  type HTMLReactParserOptions,
} from 'html-react-parser';

type InlineCmsTextProps = {
  value?: string;
};

function normalizeInlineHtml(value: string) {
  return value
    .replace(/\\(<\/?(?:br|strong|b|em|i)\b[^>]*>)/gi, '$1')
    .replace(/&lt;(\/?(?:br|strong|b|em|i)\b[^&]*)&gt;/gi, '<$1>');
}

const parserOptions: HTMLReactParserOptions = {
  replace(node: DOMNode) {
    if (node.type !== 'tag') return undefined;
    const element = node as HtmlElement;
    const children = domToReact(element.children as DOMNode[], parserOptions);

    switch (element.name) {
      case 'br':
        return <br />;
      case 'strong':
      case 'b':
        return <strong className="font-bold">{children}</strong>;
      case 'em':
      case 'i':
        return <em>{children}</em>;
      case 'script':
      case 'style':
        return <></>;
      default:
        return <>{children}</>;
    }
  },
};

export default function InlineCmsText({ value }: InlineCmsTextProps) {
  if (!value) return null;
  return <>{parse(normalizeInlineHtml(value), parserOptions)}</>;
}
