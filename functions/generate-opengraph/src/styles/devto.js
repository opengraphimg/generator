/** @jsx jsx */
import { jsx } from "@emotion/core";

export default () => {
  const background = window.background ? `#${window.background}` : "#fff";
  const boxBackground = window.boxBackground
    ? `#${window.boxBackground}`
    : "#fff";
  const boxOverlayBackground = window.boxOverlayBackground
    ? `#${window.boxOverlayBackground}`
    : "#1C64F2";
  const borderColor = window.borderColor ? `#${window.borderColor}` : "#1C64F2";
  const titleAlign = window.titleAlign ? window.titleAlign : "text-left";
  const titleSize = window.titleSize ? window.titleSize : "text-6xl";
  const titleMargin = window.titleMargin ? window.titleMargin : "-mt-8 -mx-32";
  const titleColor = window.titleColor ? `#${window.titleColor}` : "#1C64F2";
  const detailsMargin = window.detailsMargin
    ? window.detailsMargin
    : "-my-20 -mx-32";
  const tagsSize = window.tagsSize ? window.tagsSize : "text-2xl";
  const tagsColor = window.tagsColor ? `#${window.tagsColor}` : "#1C64F2";
  const authorSize = window.authorSize ? window.authorSize : "text-2xl";
  const authorColor = window.authorColor ? `#${window.authorColor}` : "#1C64F2";
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
        className="z-10 flex flex-col justify-between flex-1 p-32 m-12 rounded-t-2xl"
        css={{
          background: boxBackground,
          border: `2px solid ${borderColor}`,
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
        </div>
      </div>

      <div
        className="absolute rounded-t-2xl"
        css={{
          background: boxOverlayBackground,
          width: `calc(100% - 96px)`,
          height: `calc(100% - 96px)`,
          marginTop: 56,
          marginLeft: 56,
          zIndex: 5,
        }}
      ></div>
    </div>
  );
};
