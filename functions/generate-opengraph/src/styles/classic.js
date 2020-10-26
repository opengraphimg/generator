/** @jsx jsx */
import { jsx } from "@emotion/core";

export default () => {
  const background = window.background ? `#${window.background}` : "#1C64F2";
  const boxBackground = window.boxBackground
    ? `#${window.boxBackground}`
    : "#161E2E";
  const titleAlign = window.titleAlign ? window.titleAlign : "text-center";
  const titleSize = window.titleSize ? window.titleSize : "text-6xl";
  const titleMargin = window.titleMargin ? window.titleMargin : "-mt-8 -mx-32";
  const titleColor = window.titleColor ? `#${window.titleColor}` : "#ffffff";
  const detailsMargin = window.detailsMargin ? window.detailsMargin : "-m-20";
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
        className="flex flex-col justify-between flex-1 p-32 m-10 shadow-2xl rounded-2xl"
        css={{
          background: boxBackground,
        }}
      >
        <h1
          className={`h-full ${titleAlign} ${titleSize} ${titleMargin}`}
          css={{
            color: titleColor,
          }}
          dangerouslySetInnerHTML={{
            __html: decodeURIComponent(decodeURIComponent(window.title)),
          }}
        ></h1>

        <div className={`flex justify-between ${detailsMargin}`}>
          <ul
            className={`${tagsSize} flex`}
            css={{
              color: tagsColor,
              "& li": {
                marginRight: ".5rem",
                "&:not(:last-child):after": {
                  content: "'•'",
                  marginLeft: ".5rem",
                },
              },
            }}
          >
            {window.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          <span
            className={authorSize}
            css={{
              color: authorColor,
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
