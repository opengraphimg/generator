/** @jsx jsx */
import { jsx } from "@emotion/core";

export default () => {
  const background = window.background ? `#${window.background}` : "#ffffff00";
  const boxBackground = window.boxBackground
    ? `#${window.boxBackground}`
    : "#161E2E";
  const titleAlign = window.titleAlign ? window.titleAlign : "text-center";
  const titleSize = window.titleSize ? window.titleSize : "text-6xl";
  const titleMargin = window.titleMargin ? window.titleMargin : "";
  const titleColor = window.titleColor ? `#${window.titleColor}` : "#ffffff";
  const tagsMargin = window.tagsMargin ? window.tagsMargin : "-mx-16 -mt-16";
  const tagBackground = window.tagBackground
    ? `#${window.tagBackground}`
    : "#1C64F2";
  const authorMargin = window.authorMargin
    ? window.authorMargin
    : "-mx-16 -mb-16";
  const authorBackgroud = window.authorBackgroud
    ? `#${window.authorBackgroud}`
    : "#1C64F2";
  const tagsSize = window.tagsSize ? window.tagsSize : "text-2xl";
  const tagsColor = window.tagsColor ? `#${window.tagsColor}` : "#ffffff";
  const authorSize = window.authorSize ? window.authorSize : "text-2xl";
  const authorColor = window.authorColor ? `#${window.authorColor}` : "#ffffff";
  const logoSize = window.logoSize ? window.logoSize : "w-10 h-10";
  const logoMargin = window.logoMargin ? window.logoMargin : "mr-4";
  const logo = window.logoUrl && (
    <img
      src={window.logoUrl}
      alt={window.title}
      className={`${logoSize} inline-block ${logoMargin}`}
    />
  );
  const atSymbol = window.atSymbol && "@";
  const author = window.author ? window.author : "";

  return (
    <div
      className="absolute flex overflow-hidden"
      css={{
        width: 1200,
        height: 630,
        background,
      }}
    >
      <div
        className="flex flex-col justify-between flex-1 p-32"
        css={{
          background: boxBackground,
        }}
      >
        <div className={`flex justify-center ${tagsMargin}`}>
          <ul
            className={`${tagsSize} flex space-x-6`}
            css={{
              color: tagsColor,
            }}
          >
            {window.tags.map((tag) => (
              <li
                key={tag}
                className="px-5 py-1 rounded"
                css={{ background: tagBackground }}
              >
                #{tag}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center flex-1">
          <h1
            className={`w-full ${titleAlign} ${titleSize} ${titleMargin}`}
            css={{
              color: titleColor,
            }}
            dangerouslySetInnerHTML={{
              __html: decodeURIComponent(decodeURIComponent(window.title)),
            }}
          ></h1>
        </div>

        <div className={`flex justify-center ${authorMargin}`}>
          <span
            className={`px-5 py-1 rounded ${authorSize}`}
            css={{
              color: authorColor,
              background: authorBackgroud,
            }}
          >
            {logo}
            {atSymbol}
            {author}
          </span>
        </div>
      </div>
    </div>
  );
};
